# Motivação — R01 — Cache de página não invalidado em /noticias/

## Problema (com evidência)

Em produção, a home `/noticias/` era servida pelo page cache do W3 Total Cache com a
notícia principal repetida como primeiro item do grid. O flush manual
(`?w3tc_note=flush_all`) resolvia temporariamente. Diagnóstico completo registrado em
https://github.com/midianinja/ninja-wp-theme/issues/238#issuecomment-5509970071.

Causa raiz (duas camadas):

1. **Transient do tema** (`ninja_blog_header_excluded_ids_*`, chaveado pelo
   `post_modified_gmt` do CPT `header-footer`): com um post novo publicado, o destaque
   mudava mas o transient antigo continuava válido → destaque não excluído do grid.
   Fechado pelo commit `7617dcc1` (limpa transients na publicação de novo post).
2. **Page cache do W3TC**: nada no tema invalidava o page cache; o W3TC servia o HTML
   gerado quando o transient estava stale, até TTL ou flush manual. **Esta é a demanda
   desta rodada.**

## Meta mensurável (ponto de parada)

Após publicar um novo post em produção, `/noticias/` nunca exibe a notícia principal
duplicada, sem flush manual. Validação: publicar post de teste em produção e verificar o
grid em até 2 requisições servidas pelo cache.

## O que muda de propósito

Nada além da correção: o destaque continua sendo o post mais recente; a deduplicação
(transient + `pre_get_posts`) continua igual.

## Não-negociáveis

- A deduplicação atual continua funcionando como está.
- Nenhuma dependência dura do W3TC — o código funciona igual com o plugin desativado
  (guard `function_exists`).
- Nenhum commit sem validação prévia do responsável.

## Aprovação Stage 1

- **Responsável:** Filipe
- **Data:** 2026-09-02
- **Citação literal:** "inicie a implementação a partir da develop, me informe quando
  acabar, não commite."

## Impacto

- Arquivo: `themes/midia-ninja-theme/library/header-and-footer-archive/header-and-footer-archive.php`
- Deploy: CI/CD em `.gitlab-ci.yml` (GitLab, deploy via kubectl em K8s). Flush de page
  cache ao final do deploy (Fatia 2) identificado como oportunidade, ainda não aplicado.
