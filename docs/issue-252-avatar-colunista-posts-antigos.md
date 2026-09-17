# Issue #252 — Avatar de colunista NINJA em posts antigos

[Issue #252 no GitHub](https://github.com/midianinja/ninja-wp-theme/issues/252): avatar do colunista NINJA não exibido em posts anteriores a dez/2023 (notícias e opiniões), ex.: post de 2017 "O medo inconsequente" e diversas opiniões legadas exibindo o boneco cinza do Gravatar no lugar do avatar da NINJA.

## Problema

Posts publicados antes de dez/2023 renderizavam a byline sem avatar de colunista — apenas o placeholder genérico do Gravatar — tanto em `single.php` (notícias) quanto em `single-opiniao.php` (opiniões). Posts novos e posts antigos de colunistas com guest author configurado funcionavam normalmente.

## Causa raiz

A migração de dez/2023 (plugin `ninja-wp-migration`, `wp-root/wp-content/plugins/ninja-wp-migration-plugin/ninja-wp-migration.php`) não associou guest authors à maioria dos posts antigos:

- **L592–594:** a criação de guest authors era limitada por `--limit` (`if (isset($limit) && $n >= $limit) break;`), interrompendo o loop muito antes de cobrir todos os usuários.
- **L619–623:** `assign-users-to-coauthor` só atribuía posts cujo `get_coauthor_by('user_login', 'co_' . $login)` existia; os demais eram pulados silenciosamente.
- **L1002–1011:** `ninja_assign_user_to_coauthor()` pula qualquer post que **já tinha termos de autor** (`cap_get_coauthor_terms_for_post()` não vazio) — como todos os posts antigos tinham `post_author` mapeado para termos, a esmagadora maioria foi ignorada.

Resultado no banco de produção: **~6.946 posts antigos quebrados vs 2.028 OK**; na amostra da notícia, **199 dos primeiros 200 posts antigos no estado quebrado**.

Sem guest author, `get_coauthors()` cai no usuário WP "casa" (`editorninja`, editor, sem avatar configurado) → Gravatar genérico.

Detalhe que explica as tentativas falhas anteriores da issue: **`add_coauthors()` é MÉTODO de `$coauthors_plus` (classe `CoAuthors_Plus`), não função global** — os scripts anteriores chamavam uma função inexistente.

## Efeito

Byline com avatar placeholder (boneco cinza do Gravatar) em milhares de posts antigos; impacto visual direto na credibilidade da assinatura de colunistas.

## Resolução

### a) Templates `single.php` / `single-opiniao.php`

Ambos passaram a usar `coauthors_get_avatar()` (API oficial do Co-Authors Plus, mesmo padrão dos blocos do tema) com fallback de 3 níveis para `get_avatar()`:

```php
$coauthor_avatar = ( function_exists( 'coauthors_get_avatar' ) && ! empty( $coauthor['coauthor_obj'] ) )
    ? coauthors_get_avatar( $coauthor['coauthor_obj'], 70 )
    : '';
if ( empty( $coauthor_avatar ) ) {
    $coauthor_avatar = get_avatar( $coauthor['author_id'], 70 );
}
echo $coauthor_avatar;
```

Nenhuma mudança de markup/cor/layout — apenas a resolução da imagem de avatar.

### b) WP-CLI `wp ninja assign-legacy-guest-author`

Novo comando em `themes/midia-ninja-theme/library/cli/assign-legacy-guest-author.php`, carregado **apenas em contexto CLI** via `functions.php` (L56–57: `if ( defined('WP_CLI') && WP_CLI )`). Atribui guest author aos posts legados que precisam.

**Salvaguardas:**
- Só toca posts cujo primeiro coautor é **usuário WP SEM avatar comprovado** — heurística `has_usable_avatar()` (tri-state): meta `simple_local_avatar` válida **ou** probe Gravatar `?d=404`; **inconclusivo (`null`, erro de rede) NUNCA é atribuído**.
- Pula automaticamente: posts já OK (guest author com thumbnail → `skipped_ok`), já atribuídos (`skipped_already_assigned`), guest authors sem thumbnail (revisão manual), WP users com avatar.
- Chama `$coauthors_plus->add_coauthors()` como **método** e verifica reconsultando `get_coauthors()` — o retorno do método é `false` mesmo no sucesso para guest authors não linkados a usuário WP.
- Batches de 200; `--dry-run` é o modo de segurança com `WP_CLI::confirm()` antes de aplicar.

**Flags:** `--guest-author` (ID ou slug), `--before` (default `2023-12-01`), `--post-types` (default `post,opiniao`), `--limit`, `--post-ids`, `--dry-run`, `--yes`.

## Validação executada

1. **Dry-run real no banco local** com `--limit=50`: 47 posts reportados como já OK, 2 atribuídos como teste — comportamento esperado.
2. **Aplicação pontual** em 2 opiniões (IDs 1112, 1285) e 1 notícia (ID 4099) via `--post-ids`.
3. **Validação visual** confirmada pelo humano no post de 2017 "O medo inconsequente", após inserir thumbnail no guest author `cap-ninja` (ID 4555465, linkado ao usuário editor `editorninja`, ID 5007).

## Instruções de validação para QA

1. **Antes de tudo:** rodar `--dry-run --limit=100` e conferir que nenhum post "already OK" aparece como `WOULD-ASSIGN`.
2. Aplicar com `--post-ids` em 2–3 posts de notícia e 2–3 de opinião anteriores a dez/2023; abrir cada single e conferir avatar + byline.
3. Conferir posts **novos** e posts antigos de colunistas nomeados (ex.: post de guest author com thumbnail) — avatar deve estar **idêntico** ao de antes (regressão).
4. Conferir uma página de arquivo de autor e listagens de opinião (cards) — sem mudança esperada.
5. Verificar o HTML: o avatar deve sair de `coauthors_get_avatar()` (img com classes do CAP / thumbnail do guest author).
6. Rodar o comando duas vezes no mesmo lote — o segundo run deve reportar tudo como `skipped_already_assigned` (idempotência).

## Guia de operação do comando (para infra)

- **O que é:** comando WP-CLI dentro do tema (`library/cli/assign-legacy-guest-author.php`, registrado em `functions.php`, só carrega em CLI, zero impacto em runtime). Corrige o dado-raiz: associa o guest author aos posts antigos com byline preso em usuário WP sem avatar. Sem rodá-lo, os templates corrigidos não fazem o avatar aparecer onde não há guest author.
- **Pré-requisitos:** tema atualizado; Co-Authors Plus ativo (senão o comando aborta com aviso); WP-CLI disponível; guest author alvo com imagem destacada — verificar com `wp post meta get 4555465 _thumbnail_id` (vazio = cadastrar a foto antes).
- **Sequência de execução (nesta ordem):**
    1. Simulação `--dry-run --limit=100 --yes`, conferindo que `WOULD-ASSIGN` são só bylines quebrados;
    2. Lote piloto `--post-ids=<id1,id2,id3> --yes` com conferência visual no navegador;
    3. Lote total `--before=2023-12-01 --yes` (~12 mil posts, batches de 200, alguns minutos; em produção: backup do banco antes + horário de baixo tráfego).
- **Flags:**

    | Flag | Descrição |
    |------|-----------|
    | `--guest-author` | Obrigatório |
    | `--before` | Default `2023-12-01` |
    | `--post-types` | Default `post,opiniao` |
    | `--limit` | Limite de posts processados |
    | `--post-ids` | IDs pontuais (sobrepõe `--before`) |
    | `--dry-run` | Simulação, sem aplicar |
    | `--yes` | Pula a confirmação interativa |

- **Garantias:** nunca toca posts já OK (guest author com foto), nunca toca posts novos/colunistas funcionais, não cria usuários nem muda permissões (só termo de taxonomia `author`), só age quando executado, dúvida = pula para revisão manual.
- **Idempotência e rollback:** segunda execução não duplica; desfazer = reatribuir alvo anterior ou restaurar backup; falha no meio = re-rodar.

## Roteiro de rollout

Procedimento detalhado (sequência, garantias, rollback) na seção **Guia de operação do comando (para infra)** acima. Status: **Local:** ✅ feito (dry-run + aplicação pontual + validação visual).

## Rollback

- **Templates:** reverter os commits de `single.php` / `single-opiniao.php` via git.
- **Atribuições:** ver procedimento na seção **Guia de operação do comando (para infra)** — a operação é uma troca de termos de taxonomia `author`, reversível por construção.

## Arquivos modificados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `themes/midia-ninja-theme/single.php` | PHP | Avatar via `coauthors_get_avatar()` com fallback para `get_avatar()` |
| `themes/midia-ninja-theme/single-opiniao.php` | PHP | Idem (3 pontos de renderização de avatar) |
| `themes/midia-ninja-theme/library/cli/assign-legacy-guest-author.php` | PHP (novo) | Comando WP-CLI `ninja assign-legacy-guest-author` |
| `themes/midia-ninja-theme/functions.php` | PHP | Carregamento condicional do CLI (`WP_CLI` apenas) |
