# Issue #291 — Ajustes no bloco "Mais lidas" da página Colunistas

[Issue #291 no GitHub](https://github.com/midianinja/ninja-wp-theme/issues/291): _[Mobile] Ajuste dos autores / colunistas e submenus Especiais_

## Contexto

A página `/colunistas/` (`template-colunistas.php`) possui um layout de duas colunas:
- **Coluna esquerda:** banner cover com 506px de altura
- **Coluna direita:** bloco slider "Mais lidas" (`ninja/latest-vertical-posts`, `blockModel: "most-read"`) também com 506px de altura

O bloco usa o plugin Slick Slider com `slidesToShow: 1`, inicializado em `view.js`.

## Correções realizadas

### 1. Bug PHP — variável `$args` indefinida (arquivos PHP)

**Arquivo:** `library/blocks/src/latest-vertical-posts/latest-vertical-posts.php` (linhas 147–150)
**Arquivo:** `library/blocks/src/latest-horizontal-posts/latest-horizontal-posts.php` (linhas 143–146)

Quando `AjaxPageviews::get_top_viewed_by_terms()` retornava vazio (ex: ambiente local sem tracking), a variável `$args` nunca era definida, causando erro PHP e o bloco renderizando "content found" em vez dos posts.

**Solução:** Adicionado `else` no `build_posts_query()` como fallback quando AjaxPageviews não retorna dados.

```php
} else {
    // Fallback: quando AjaxPageviews não retorna dados (ex: ambiente local sem tracking)
    $args = build_posts_query( $attributes, $post__not_in );
}
```

### 2. CSS — Ajustes de layout no slider (SCSS)

**Arquivo:** `assets/scss/6-pages/_p-template-colunistas.scss`
**Compilado para:** `dist/css/_p-template-colunistas.css`

Todas as alterações CSS estão **escopadas exclusivamente** ao bloco slider dentro da página colunistas:

```scss
.page-template-template-colunistas .container
  .wp-block-columns:first-child
    .wp-block-column:last-child
      .latest-vertical-posts-block
```

#### a) Padding-top removido do container do bloco

```scss
// Antes
padding: 51px 33px 30px 33px;

// Depois
padding: 0 33px 30px 33px;
```

#### b) Altura máxima do slide trazida para `.slick-slide`

```scss
.slick-slider {
    .slick-slide {
        max-height: 506px;
    }
}
```

#### c) Tamanho da fonte do título reduzido com `!important`

```scss
.post-title {
    color: var(--White, #FFF);
    font-size: 14px !important;
}
```

#### d) Thumbnail reduzida de 80×80 para 60×60 com `!important`

```scss
.post-thumbnail--image {
    border-radius: 50%;
    object-fit: cover;
    height: 60px !important;
    width: 60px !important;
}
```

#### e) Títulos limitados a 4 linhas com ellipsis

```scss
.post-title {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

## Arquivos modificados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `library/blocks/src/latest-vertical-posts/latest-vertical-posts.php` | PHP | Fallback `$args` quando AjaxPageviews retorna vazio |
| `library/blocks/src/latest-horizontal-posts/latest-horizontal-posts.php` | PHP | Fallback `$args` quando AjaxPageviews retorna vazio |
| `assets/scss/6-pages/_p-template-colunistas.scss` | SCSS | Ajustes de layout do slider |
| `dist/css/_p-template-colunistas.css` | CSS | Arquivo compilado |

## Notas

- O `mix-manifest.json` tem permissões incorretas (proprietário root), mas a compilação CSS funciona normalmente via `npm run dev`.
- Todos os seletores CSS usam escopo restrito para não afetar outros templates.
- As propriedades com `!important` foram necessárias para sobrescrever estilos inline/JS do Slick Slider.
