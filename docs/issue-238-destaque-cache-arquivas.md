# Destaque e cache nas arquivas — notícias e author

Relatório dos problemas e soluções aplicadas nas archives `/noticias/` (blog home) e `/author/<slug>/`. Abrange a issue #238 (rodada R01 e incremento R02) e os PRs #310, #311, #312 e #313.

---

## 1. Archive de notícias (`/noticias/`) — R01

### Problema

Em produção, a home `/noticias/` exibia a notícia principal (destaque/high-spot) **repetida como primeiro item do grid**. O flush manual do W3TC (`?w3tc_note=flush_all`) resolvia temporariamente, e o problema voltava a cada publicação.

Causa raiz em duas camadas:

1. **Transient do tema** (`ninja_blog_header_excluded_ids_*`): a lista de IDs excluídos do grid era cacheada em transient, chaveada pelo `post_modified_gmt` do CPT `header-footer`. Ao publicar um post novo, o destaque mudava, mas o transient antigo continuava válido → o novo destaque não era excluído do grid.
2. **Page cache do W3TC**: nada invalidava o page cache do tema. O W3TC servia o HTML gerado com o transient stale até o TTL ou um flush manual. Além disso, o **Cloudflare APO** cacheava o HTML da página no edge (observado `cf-cache-status: HIT` com `age` de ~11h), perpetuando o conteúdo antigo mesmo após flush local.

### Soluções aplicadas (PR #310, commits `adc92a2e`, `945af6f3`, `a654545a`)

- **Gatilho único de publicação** (`transition_post_status`): qualquer transição envolvendo `publish` do post type `post` dispara, num único funil:
  - limpeza dos transients de exclusão (`ninja_blog_header_excluded_ids_*`);
  - flush completo do page cache do W3TC (`w3tc_pgcache_flush`);
  - purge do cache Cloudflare (via API direta com `NINJA_CF_API_TOKEN`/`NINJA_CF_ZONE_ID`, ou via plugin oficial do Cloudflare).
- **Bypass determinístico do APO na home**: filtro `cloudflare_use_cache` retorna `false` em `is_home()`, ou seja, o HTML da `/noticias/` nunca é cacheado no edge — sempre busca na origem, onde o W3TC (invalidado na publicação) responde.
- Tudo com guardas (`function_exists`, `class_exists`): o tema funciona igual sem o W3TC ou o plugin Cloudflare ativos.

### Resultado (validado em produção em 02/09/2026)

- `/noticias/` responde `cf-cache-status: DYNAMIC`; destaque = post mais recente; grid sem duplicação; nenhum post some; sem flush manual.
- Janela de inconsistência após publicação: zero requisições.

---

## 2. Archive de author (`/author/<slug>/`) — R02 (incremento da #238)

### Problema inicial

A regra de não repetição não existia na archive de author: o post em destaque reaparecia no grid (ex.: `midianinja.org/author/rima-awada-zahra/`).

### Solução 1 — exclusão do destaque do grid (PR #311, commits `95b07135`, `8af42c30`)

- `library/utils.php`: hook `pre_get_posts` (`ninja_exclude_author_featured_post`) exclui o post mais recente da query principal da archive de author via `post__not_in`, espelhando o padrão da exclusão do header do blog.
- `author.php`: o post excluído é renderizado como banner de destaque.
- Defeito encontrado nos testes locais e corrigido ainda no PR: `setup_postdata()` sozinho não atualiza `$GLOBALS['post']` no WP atual — foi necessário atribuir o global explicitamente antes, senão o banner renderizava o primeiro post do grid e o repetia.

### Problema 2 — mesmo destaque em todos os autores (validação)

Após o PR #311, o banner passou a mostrar **a mesma notícia (a mais recente do site inteiro) em todas as páginas de author**.

Causa raiz: a busca do post em destaque copiava as vars da query principal para `get_posts()`, que por padrão roda com `suppress_filters => true`. Sem os filtros do plugin **Co-Authors Plus**:

- guest authors (colunistas, sem usuário WP) não eram resolvidos — a query degenerava para `post_author = 0`, retornava vazio, nenhuma exclusão era aplicada, e o banner caía no post global mais recente;
- autores usuários WP só casavam posts onde são `post_author` literal, ignorando posts de coautoria.

### Solução 2 — lookup com filtros ativos (PR #312, commit `5f014ae1`)

`ninja_get_author_featured_post_id()` passou a construir a query explicitamente (author/author_name, post_type, tax_query) com `suppress_filters => false`, para o Co-Authors Plus aplicar a mesma resolução por taxonomia de author usada pelo grid.

### Problema 3 — risco de cache stale no edge

O bypass de APO herdado da R01 cobria só `is_home()`. Páginas de author ficariam cacheadas no edge: a edição de um post já publicado (sem mudança de status, logo sem gatilho de purge) deixaria o destaque desatualizado até o TTL do APO.

### Solução 3 — bypass estendido às archives de author (PR #313, commit `ae7e52a3`)

O filtro `cloudflare_use_cache` agora retorna `false` em `is_home() || is_author()`. Páginas de author sempre buscam na origem (W3TC + purges de publicação permanecem ativos). Custo: offload de páginas de baixo tráfego, mitigado pela page cache de origem. Trade-off registrado na entrada 3 do `deviations.md` do round.

---

## 3. Como funciona hoje

| Camada | Comportamento |
|---|---|
| Exclusão do destaque do grid | `pre_get_posts` + `post__not_in` — blog home e archive de author |
| Banner de destaque | post excluído do grid, renderizado com `$GLOBALS['post']` + `setup_postdata` |
| Cache de origem (W3TC) | flush completo a cada publicação/despublicação de post |
| Cache de borda (Cloudflare APO) | bypass em `/noticias/` e `/author/`; purge completo a cada publicação |
| Cache de navegador | política do próprio W3TC (Browser Cache); não alterado pelo tema |

## 4. Pontos de atenção

- O purge é **total** (purge everything) — simples e seguro, mas invalida todo o site a cada publicação. Se o volume de publicações crescer muito, vale avaliar purge por tag/caminho.
- O plugin "Super Page Cache for Cloudflare" (`wp_cloudflare_page_cache`) segue instalado; monitorar conteúdo stale em outras páginas.
- Guest authors fora de `is_author()` (ex.: outras taxonomias de autor) não foram cobertos por este incremento.
