# Resultados — R01 — Cache de página não invalidado em /noticias/

## Meta (ponto de parada)

Após publicar um novo post em produção, `/noticias/` nunca exibe a notícia principal
duplicada, sem flush manual — verificável em até 2 requisições servidas pelo cache,
em navegação anônima.

## Resultado final

**Meta atingida — validado em produção em 02/09/2026.**

- `/noticias/` responde `cf-cache-status: DYNAMIC` (Cloudflare APO não cacheia mais
  o HTML da home; bypass via filtro `cloudflare_use_cache`).
- Destaque exibe o post mais recente; grid inicia no penúltimo post; nenhum post
  some da página; nenhuma duplicação.
- Publicação pelo editor de blocos (Gutenberg) dispara, num único funil
  (`transition_post_status`): limpeza dos transients de exclusão, flush do W3TC
  page cache e purge do cache Cloudflare (via credenciais do plugin oficial).

## Evidências dos testes

| Ambiente | Teste | Resultado |
|---|---|---|
| dev | publicar post pelo Gutenberg | destaque = post novo, grid correto, sem duplicação |
| dev | header de `/noticias/` | `cf-cache-status: DYNAMIC`, `cf-apo-via: origin,host` |
| produção | publicar post + verificação anônima | destaque/grid corretos, sem duplicação, sem flush manual |

## Comparação com o baseline

- Baseline: após publicar um post, o HTML stale (com duplicação) era servido pelo
  page cache do W3TC **e** pelo Cloudflare APO até TTL/flush manual (em produção,
  observado `cf-cache-status: HIT` com `age` de ~11h).
- Pós-mudança: a home não é cacheada na borda (bypass determinístico) e o cache de
  origem é invalidado no momento da publicação — janela de inconsistência: zero
  requisições (o primeiro acesso após a publicação já vê o estado novo).

## Commits

- `5758b337` (pré-rodada) — mecanismo de exclusão dos posts do header
- `808584a5`, `7617dcc1` (pré-rodada) — ajustes do mecanismo (com defeitos corrigidos aqui)
- `adc92a2e` — flush do W3TC page cache nos gatilhos
- `945af6f3` — gatilho `transition_post_status` (funciona no fluxo do Gutenberg)
- `a654545a` — bypass do APO em `/noticias/` + purge Cloudflare via plugin oficial

## Desvios e notas

- O banco de dados **não** foi alterado em nenhum ambiente (decisão do responsável);
  a configuração do header (bloco Newspack em modo dinâmico) estava correta.
- Plugin "Super Page Cache for Cloudflare" (`wp_cloudflare_page_cache`) segue
  instalado; monitorar caso surjam conteúdos stale em outras páginas.
- Sem overrides de fluxo nesta rodada.
