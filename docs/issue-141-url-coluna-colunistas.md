# URL /coluna para a single de colunistas (ex-/author)

Troca da base do archive de autores do WordPress de `/author/{nicename}/`
para `/coluna/{nicename}/`, usada como página individual dos colunistas.

## Contexto

- A "single de colunistas" é o archive de autor nativo do WP (`author.php`),
  com Co-Authors Plus (guest authors com 223 perfis, ex.: `amandagondim`).
- Todos os 15+ pontos do tema geram links via `get_author_posts_url()`.
- Site multilíngue com WPML (modo diretórios): pt-br (default, sem prefixo),
  es e en.
- Decisão de produto: o slug `coluna` **não é traduzido** por idioma
  (o WPML não tem mecanismo nativo para isso; `/coluna` vale para todos).

## Solução

Arquivo novo: `library/author-base.php` (require em `functions.php`).

1. **Troca da base** — no hook `init`:
   ```php
   $wp_rewrite->author_base = 'coluna';
   unset( $wp_rewrite->author_structure ); // força recálculo lazy
   ```
   O `unset()` é necessário porque `get_author_permastruct()` cachearia a
   estrutura antiga se algo a resolvesse antes do hook.

2. **Flush de rewrite rules único e automático**, guardado pela option
   `ninja_author_base_flushed` (evita custo de flush a cada request).
   Também roda em `after_switch_theme`.

3. **Redirect 301 das URLs antigas** no hook `template_redirect` (priority 1):
   `/author/{nome}` → `/coluna/{nome}`, preservando idioma, feed e paginação.
   Só executa em 404 (após a troca, `/author/...` não casa com nenhuma rule).
   A priority 1 é essencial para vencer o `redirect_canonical` do core
   (priority 10): sem isso, o "chute" de permalink do WP redireciona
   `/author/{nome}` para um post com slug coincidente — existe, por exemplo,
   um post `opiniao` com slug `amandagondim`.

## Por que é compatível com WPML e Co-Authors Plus

| Componente | Como gera/trata a URL | Impacto |
|------------|----------------------|---------|
| WP core | `get_author_posts_url()` lê `get_author_permastruct()` | Segue a nova base |
| Co-Authors Plus | `filter_author_link()` também usa `get_author_permastruct()` | Guest authors seguem automaticamente |
| WPML | `SitePress::author_link()` → `convert_url()` só prefixa o idioma | `/es/coluna/...` e `/en/coluna/...` automáticos |
| Switcher de idioma WPML | `get_author_posts_url()` + `convert_url()` | Automático |
| Yoast (canonical/sitemap) | Usa `get_author_posts_url()` | Segue após o flush |

O parse do redirect descarta o diretório de idioma da URL antiga e deixa o
`home_url()` re-adicioná-lo — o WPML detecta o idioma da URL bruta antes do
rewrite, então o destino fica correto em qualquer idioma.

## Testes realizados (ambiente Docker local)

| URL | Resultado |
|-----|-----------|
| `/coluna/amandagondim/` (guest author) | 200, author.php |
| `/coluna/alesantos/` (WP user) | 200, author.php |
| `/author/amandagondim/` | 301 → `/coluna/amandagondim/` |
| `/es/author/amandagondim/` | 301 → `/es/coluna/amandagondim/` |
| `/en/author/amandagondim/` | 301 → `/en/coluna/amandagondim/` |
| `/es/coluna/amandagondim/` | 200 |
| `/coluna/amandagondim/feed/` | 200, RSS válido com self-link novo |
| `/author/amandagondim/feed/` | 301 → `/coluna/amandagondim/feed/` |
| `/author/amandagondim/page/2/` | 301 → `/coluna/amandagondim/page/2/` |
| Rewrite rules no banco | 5 rules `coluna/...`, 0 legadas `author/...` |
| `convert_url` WPML | pt-br `/coluna/x`, es `/es/coluna/x`, en `/en/coluna/x` |

## Notas de deploy

1. O flush é automático no primeiro request após o deploy (guardado por
   option). Verificar com `wp rewrite list | grep coluna` se necessário.
2. Purgar caches após deploy: **W3 Total Cache** (páginas em cache podem
   conter links antigos `/author/`), **Cloudflare** (APO/edge) e cache de
   URL do WPML.
3. Sitemap do Yoast regenera com as URLs novas; as antigas respondem 301.
4. Para reverter: remover o require de `library/author-base.php` — o guard
   do flush detecta a mudança de base e regrava as rules automaticamente.
   (Os 301 de `/author/` param junto; se necessário manter, usar o plugin
   Redirection com regex `^/(es/|en/)?author/(.*)$`.)

## Problemas pré-existentes (não causados por esta mudança)

- `/coluna/{inexistente}/` responde **200** (soft 404): com
  `author_name` inválido o WP cai para `post_author = 0`, e existem 2 posts
  publicados com `post_author = 0`. Comportamento idêntico ao antigo
  `/author/{inexistente}/`. Melhoria futura: endurecer com 404 real.
- Warning PHP em `library/utils.php:851` (`prevent_repeat_posts_archive`
  acessa `->taxonomy` em `get_queried_object()` falso) polui o feed de
  autores e quebra o `Content-Type` (o XML do feed em si é válido).
  Corrigir com guarda `is_object()` quando houver oportunidade.

## Arquivos modificados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `themes/midia-ninja-theme/library/author-base.php` | PHP (novo) | Base `/coluna`, flush guardado e redirects 301 |
| `themes/midia-ninja-theme/functions.php` | PHP | Require do arquivo novo |
