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

**Flags:** `--guest-author` (ID ou slug), `--before` (default `2023-12-01`), `--post-types` (default `post,opiniao`), `--limit`, `--post-ids`, `--dry-run`, `--pilot=<N>` (≤ 100), `--full-run`, `--backup-taken`, `--skip-theme-check`, `--yes` (tabela completa na seção do guia abaixo).

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

- **O que é:** comando WP-CLI dentro do tema (`library/cli/assign-legacy-guest-author.php`, registrado em `functions.php`, só carrega em CLI, zero impacto em runtime). Corrige o dado-raiz: associa o guest author aos posts antigos com byline preso em usuário WP sem avatar. Sem rodá-lo, os templates corrigidos não fazem o avatar aparecer onde não há guest author. O comando é **blindado para execução copiar-e-colar**: ele próprio recusa rodar fora da sequência abaixo.
- **Pré-requisitos (o comando verifica sozinho e ABORTA se faltar):**
    - **Tema ativo atualizado com a correção dos templates** — o comando lê `single.php` e `single-opiniao.php` do tema ativo e exige `coauthors_get_avatar()` em AMBOS antes de qualquer processamento (é exatamente o que quebrou as singles no dev quando o comando foi rodado antes de atualizar o tema). Escape de emergência: `--skip-theme-check` (emite warning registrada).
    - **Co-Authors Plus ativo** (senão aborta).
    - **Guest author alvo com imagem destacada** — sem thumbnail o comando ABORTA com erro fatal (atribuir guest author sem foto não conserta o avatar; é o pré-requisito nº 1). Verificar antes: `wp post meta get <id-do-guest-author> _thumbnail_id` (vazio = cadastrar a foto antes).
- **Sequência de execução copiar-e-colar (nesta ordem, slug `cap-ninja`):**

    ```bash
    # 1. Simulação — não pede confirmação, não muda nada.
    #    Conferir que os WOULD-ASSIGN são bylines quebrados (usuário WP sem avatar).
    wp ninja assign-legacy-guest-author --guest-author=cap-ninja --dry-run

    # 2. Piloto — escaneia sem mudar nada, aplica APENAS os 3 primeiros matches
    #    e imprime as URLs. Conferir o avatar do colunista no navegador antes de seguir.
    wp ninja assign-legacy-guest-author --guest-author=cap-ninja --pilot=3

    # 3. Lote total — recusa a rodar sem as DUAS flags juntas.
    #    Antes dela: backup do banco + horário de baixo tráfego.
    wp ninja assign-legacy-guest-author --guest-author=cap-ninja --full-run --backup-taken
    ```

- **Por que essa ordem:** o dry-run ensina o escopo sem risco (e não pede confirm — confirm em simulação treina o hábito de `--yes` que vaza para a aplicação real); o pilot aplica N ≤ 100 posts e devolve as URLs para validação visual; o lote total só roda com o reconhecimento explícito em DUAS flags (`--full-run` = "sei que vou afetar N posts"; `--backup-taken` = "há backup do banco feito agora") e UMA confirmação final mostrando o total previsto.
- **Flags:**

    | Flag | Descrição |
    |------|-----------|
    | `--guest-author` | Obrigatório (ID ou slug do guest author, ex.: `cap-ninja`) |
    | `--before` | Default `2023-12-01` |
    | `--post-types` | Default `post,opiniao` |
    | `--limit` | Limite de posts processados (≤ 500 dispensa as flags de lote total) |
    | `--post-ids` | IDs pontuais (sobrepõe `--before`; dispensa as flags de lote total) |
    | `--dry-run` | Simulação, sem aplicar — **sem confirmação** |
    | `--pilot=<N>` | Escaneia sem mudar nada até acumular N matches (N ≤ 100), aplica só esses e imprime as URLs para conferência |
    | `--full-run` | Reconhecimento: "sei que vou afetar todos os N posts do escopo" |
    | `--backup-taken` | Reconhecimento: "há backup do banco feito agora" (exigida junto com `--full-run`) |
    | `--skip-theme-check` | Pula a trava fail-closed de tema (emite warning registrada; só para emergências) |
    | `--yes` | Pula a confirmação interativa |

- **Garantias (travas):**
    1. **Trava de tema (fail-closed):** aborta antes de qualquer processamento se o tema ativo não tiver `coauthors_get_avatar()` em `single.php` E `single-opiniao.php`, citando o arquivo que faltou — atualize o tema ANTES de atribuir guest authors (`--skip-theme-check` pula, com warning registrada).
    2. **Erro sem thumbnail:** guest author alvo sem imagem destacada = **erro fatal** (antes era warning + seguia), pois atribuir sem foto não conserta o avatar.
    3. **Trava de lote total (threshold 500):** em modo APPLY, se o escopo passar de 500 posts sem `--post-ids`, `--pilot` ou `--limit` ≤ 500, o comando recusa e imprime o comando completo correto para copiar (com `--full-run` **e** `--backup-taken`); com as duas flags, segue com UMA confirmação mostrando o total previsto.
    4. **Pilot limitado a 100** e nunca conta como lote total; aplica pelo mesmo caminho de verificação do lote normal.
    5. (Demais garantias) nunca toca posts já OK (guest author com foto), nunca toca posts novos/colunistas funcionais, não cria usuários nem muda permissões (só termo de taxonomia `author`), dúvida = pula para revisão manual, pós-apply faz `wp_cache_flush()`.
- **Idempotência e rollback:** segunda execução não duplica (posts já atribuídos viram `skipped_already_assigned`); desfazer = reatribuir alvo anterior ou restaurar backup; falha no meio = re-rodar.

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
