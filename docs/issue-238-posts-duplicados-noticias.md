# Issue #238 — Posts duplicados na página /noticias

[Issue #238 no GitHub](https://github.com/midianinja/ninja-wp-theme/issues/238)

## Contexto

A página `/noticias` (`index.php`, `is_home()`) possui o seguinte layout:

1. **Header do layout part** — bloco "Homepage Posts" do plugin Newspack (`newspack-blocks/homepage-articles`), exibindo uma coluna de posts em destaque
2. **Loop principal** — grid de posts via `while(have_posts())`, exibindo o arquivo do blog

**Problema:** os mesmos posts exibidos no Homepage Posts (header) também apareciam no grid (loop principal), criando duplicação visual.

## Mecanismo de exclusão existente

O tema possui um mecanismo para evitar essa duplicação, implementado em `library/header-and-footer-archive/header-and-footer-archive.php`:

### Fluxo

1. `ninja_exclude_blog_header_posts_from_main_query()` é adicionado ao hook `pre_get_posts` (prioridade 20)
2. Na execução, chama `ninja_collect_blog_header_post_ids()` que:
   - Busca o post do layout part (post type `header-footer`) com `archive = 'blog'` e `position = 'header'`
   - Zera os globals `$newspack_blocks_post_id` e `$latest_blocks_posts_ids`
   - Pré-renderiza o conteúdo do layout part via `apply_filters('the_content', $header_post->post_content)` dentro de um output buffer (descartado)
   - Durante o pré-render, os blocos populam os globals com os IDs dos posts exibidos
   - Coleta os IDs e armazena em um transient (chave baseada em `post_modified_gmt`)
3. Os IDs coletados são adicionados ao `post__not_in` da query principal, excluindo-os do grid

### Validade do mecanismo

- O bloco Homepage Posts do Newspack registra seus IDs em `$newspack_blocks_post_id` em `articles-loop.php:24`, **condicionalmente**:
  ```php
  if ( Newspack_Blocks::should_deduplicate_block( $attributes ) ) {
      $newspack_blocks_post_id[ get_the_ID() ] = true;
  }
  ```
- `should_deduplicate_block()` retorna `$attributes['deduplicate'] ?? true` (default: `true`)
- O transient é invalidado quando:
  - O layout part é editado (key muda com `post_modified_gmt`)
  - Um novo post é publicado (hook `save_post`, função `ninja_clean_blog_header_transient_on_new_post`)

## Causa raiz identificada

Durante o pré-render em `ninja_collect_blog_header_post_ids()`, o **`$post` global não era configurado** para o post do layout part.

O bloco Homepage Posts, ao renderizar, chama `Newspack_Blocks::build_articles_query()` que internamente executa:

```php
$blocks = parse_blocks( get_the_content() );
```

`get_the_content()` depende do `$post` global para retornar o conteúdo correto. Como o pré-render é executado durante `pre_get_posts` (antes da main query ter um `$post` válido), `get_the_content()` retornava conteúdo vazio ou de outro post.

Isso causava:

- `parse_blocks()` recebia conteúdo vazio → `get_specific_posts_from_blocks()` não encontrava outros blocos Homepage Posts
- A lógica de `post__not_in` dentro de `build_articles_query()` não excluía posts de outros blocos da mesma página
- Potencialmente, `setup_postdata()` não era chamado para o post do layout part, afetando funções de template dentro do render callback

## Correções aplicadas

### 1. Setup do `$post` global antes do pré-render

**Arquivo:** `library/header-and-footer-archive/header-and-footer-archive.php`

**Antes:**
```php
ob_start();
apply_filters( 'the_content', $header_post->post_content );
ob_end_clean();
```

**Depois:**
```php
// Configura o $post global e postdata para que get_the_content()
// (chamado dentro dos render callbacks dos blocos) retorne o conteúdo correto.
$prev_post = $GLOBALS['post'];
$GLOBALS['post'] = $header_post;
setup_postdata( $header_post );

ob_start();
apply_filters( 'the_content', $header_post->post_content );
ob_end_clean();

// Restaura o estado anterior do post.
$GLOBALS['post'] = $prev_post;
wp_reset_postdata();
```

**Por que:** Garante que quando o Homepage Posts (ou qualquer outro bloco) chama `get_the_content()` ou `get_the_ID()` durante o render callback, ele opera no contexto correto do post do layout part.

### 2. Invalidação do transient ao publicar novo post (commit anterior)

**Arquivo:** `library/header-and-footer-archive/header-and-footer-archive.php`

Adicionada a função `ninja_clean_blog_header_transient_on_new_post()` no hook `save_post` (prioridade 10, 3 argumentos). Quando um novo post é publicado, todos os transients `ninja_blog_header_excluded_ids_*` são deletados, forçando uma nova coleta de IDs no próximo pageview.

### 3. Headers de cache desabilitados na REST API (commit anterior)

**Arquivo:** `library/blocks/includes/api.php`

Adicionado `nocache_headers()` na função `get_posts_by_taxonomy_term()` para impedir que o browser cacheie respostas da API REST de posts por taxonomy term.

## Arquivos modificados

| Arquivo | Alteração |
|---------|-----------|
| `library/header-and-footer-archive/header-and-footer-archive.php` | Setup do `$post` global + `setup_postdata()` antes do pré-render |
| `library/header-and-footer-archive/header-and-footer-archive.php` | Invalidação de transient ao publicar novo post |
| `library/blocks/includes/api.php` | `nocache_headers()` na REST API |

## Notas

- O transient é chaveado por `post_modified_gmt` do layout part. Editar e salvar o layout part invalida o cache automaticamente.
- O mecanismo de exclusão aplica-se apenas a `is_home()` (página do blog). Páginas de categoria (`category.php`) possuem o mesmo layout com `get_layout_header()` mas **não** possuem exclusão via `pre_get_posts` — se necessário, o hook precisa ser estendido.
- O bloco Homepage Posts é o único bloco no header do layout part da página `/noticias`. Blocos do tema (high-spot, latest-horizontal-posts, etc.) também registram IDs corretamente nos globals.
