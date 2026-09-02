# Baseline — R01 — Cache de página não invalidado em /noticias/

Medido/caracterizado ANTES da mudança (worktree `fix/238-noticias-cache-invalidation`,
base develop `a7cf65f`).

## Comportamento caracterizado (estado atual do código)

Arquivo: `themes/midia-ninja-theme/library/header-and-footer-archive/header-and-footer-archive.php`

- `ninja_exclude_blog_header_posts_from_main_query()` (`pre_get_posts`, prio 20) exclui
  da main query os IDs coletados do header do layout (`header-footer`, `archive = blog`,
  `position = header`), cacheados no transient `ninja_blog_header_excluded_ids_<post_modified_gmt>`.
- Dois hooks limpam os transients:
  - (a) `ninja_clean_blog_header_transient_on_new_post` — `save_post`, apenas post novo
    publicado (`post` type, status `publish`).
  - (b) `ninja_clean_blog_header_transients` — `save_post_header-footer` e `post_updated`.
- **Nenhum dos dois hooks toca o page cache do W3TC.** Única referência a w3tc no tema:
  `library/show-thumbnail.php` (`save_post_opiniao`, irrelevante para `/noticias/`).

## Métrica do problema

- **Tempo de inconsistência após publicar um novo post:** TTL do page cache do W3TC
  (ou até flush manual) — em produção, suficiente para o bug ser reportado publicamente.
- **Sintoma observado:** HTML servido pelo cache com destaque desatualizado, incluindo
  notícia principal duplicada no grid (ver issue #238).

## Verificação de paridade pós-mudança

- `php -l` no arquivo alterado: sem erros de sintaxe.
- Paridade funcional: deduplicação inalterada (diff de +16 linhas, apenas helper
  `ninja_flush_page_cache()` + 2 chamadas; nenhuma lógica de query modificada).
- Métrica final (após deploy em produção): publicar post de teste e confirmar que o
  grid de `/noticias/` reflete o novo destaque sem duplicação em até 2 requisições
  servidas pelo cache → registrar em `resultados.md`.
