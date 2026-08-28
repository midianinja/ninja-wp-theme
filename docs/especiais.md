# Sistema de "Especiais" — ninja-wp-theme

Documentação do sistema de **especiais** (grandes coberturas editoriais, ex: Paris 2024, Círio 2025, COP-26/COP-30) do tema `midia-ninja-theme`.

> **Nota de arquitetura:** os "especiais" são configurados via **Pods Framework** na administração do WordPress. Os pods/configs **não são versionados** no repositório — só que o tema renderiza é versionado. Para criar/editar um especial, é preciso operar no admin do WP (pods + taxonomia + menus).

---

## Visão geral (arquitetura)

Um "especial" é montado a partir da combinação de **três conceitos do WordPress**:

1. **CPT `especial`** — os "posts" de cada especial (cada página/cobertura).
2. **Taxonomia `marcador_especial`** — agrupa os posts sob um "tema" de especial (ex: `cop-30`, `paris-2024`). É o **termo** que identifica um especial.
3. **Menu de navegação** — o "menu especial" (barra com logo + links) exibido no topo do especial. Vinculado ao termo via **term meta** do Pods.

### Cadeia de renderização

```
single-especial.php  (CPT "especial")
└── get_template_part('template-parts/header-especiais')   ← renderiza a barra do especial
archive-especial.php (lista de posts do especial)
└── get_layout_header('especiais') / get_layout_footer('especiais')
└── template-parts/search-especiais                        ← busca simples
└── template-parts/content/post + content/pagination
```

---

## Arquivos do tema envolvidos

| Arquivo | Papel |
|---------|-------|
| `single-especial.php` | Template do post único de especial. Chama o header-especiais. |
| `archive-especial.php` | Template de arquivo/lista de posts de um especial (com busca e paginação). |
| `template-parts/header-especiais.php` | **Núcleo da lógica** — resolve o termo, monta a barra/menu do especial. |
| `template-parts/search-especiais.php` | Form de busca simples (`?pesquisar=...`). |
| `library/utils.php` — `get_primary_term()` | Helper que resolve o termo primário (Yoast) de um post. |
| `assets/scss/6-pages/_p-single-especial.scss` | Estilos do especial + menu especial (barra, popover, tabs, responsividade). |

---

## `single-especial.php` — post único

```php
gt_set_post_view();                                    // registra view
get_header();
get_template_part('template-parts/header-especiais');  // barra do menu especial
// ... loop: the_content() dentro de .post-content
get_footer();
```

- Chama `gt_set_post_view()` (contador de views).
- Renderiza o header especial (menu) logo após o `get_header()` padrão.
- O corpo do post é o `the_content()` (blocos Gutenberg), dentro de `.container .post-content`.

---

## `archive-especial.php` — lista de posts de um especial

```php
get_header();
get_layout_header('especiais');                        // cabeçalho de arquivo
get_template_part('template-parts/search-especiais');  // campo "Buscar por"
while (have_posts()) -> get_template_part('template-parts/content/post');  // cards
get_template_part('template-parts/content/pagination');
get_layout_footer('especiais');
get_footer();
```

---

## `template-parts/header-especiais.php` — o coração da renderização

Este arquivo é o mais importante. Ele:

### 1. Resolve o termo do especial

```php
$especial_term = get_primary_term(get_the_ID(), 'marcador_especial');
```

**Fallback defensivo** (linhas 6–21): se `get_primary_term` falhar (WPML / object cache stale), busca o termo via meta do Yoast `_yoast_wpseo_primary_marcador_especial` com **query direta no banco** (`$wpdb->get_row`), montando um `WP_Term`. Constrói a query por `term_id` + `taxonomy = 'marcador_especial'`.

> Contexto: este fallback foi adicionado por causa do bug de cache stale no Redis + WPML que fazia o `marcador_especial` sumir em ES (ver `SESSION-2026-08-28.md`).

### 2. Busca os posts do especial

```php
$especial_pages = get_posts([
    'post_type' => 'especial',
    'tax_query' => [[
        'taxonomy' => 'marcador_especial',
        'field'    => 'term_id',
        'terms'    => $especial_term->term_id,
    ]],
]);
```

### 3. Monta a configuração visual do menu (term meta do Pods)

```php
$especial_menu = [
    'background_color' => '#333333',  // defaults
    'link_color'       => '#FFFFFF',
    'url'              => home_url("/especial/{$especial_term->slug}/"),
    // id, logo_desktop, logo_mobile, url...
];
```

Depois percorre as chaves `['background_color','id','link_color','logo_desktop','logo_mobile','url']` lendo o **term meta** `menu_<chave>` de cada chave via `get_term_meta(...)`, sobrescrevendo os defaults com o que estiver configurado no admin.

### 4. Renderiza a barra do menu (se houver menu id + posts)

Só renderiza o `<header class="header-especiais">` se `especial_menu['id']` estiver preenchido **e** existirem `$especial_pages`.

- **Logo/símbolo**: `logo_desktop` (desktop) e `logo_mobile` (mobile), com o endereço `$logo_href = $especial_menu['url']`.
  - **Regra especial:** se `slug === 'cop30'`, o logo aponta para `/especial/cop-30/`.
- **Variáveis CSS de cor** injetadas inline via `style`:
  ```css
  --menu-especial-bg: {background_color};
  --menu-especial-link: {link_color};
  ```
- **Menu de links** via `wp_nav_menu(['menu' => $menu_id_i18n])`.
- **Seletor de idioma (WPML)** (linhas 92–151): injeta um `<li class="menu-item--lang">` com um `<select>` de troca de idioma no final do menu, via filtro `wp_nav_menu_items`. Usa `apply_filters('wpml_active_languages', ...)` e `wpml_object_id` para resolver o `nav_menu` no idioma atual (fallback para o id base).

### Sass visível (classes)

- `.header-especiais`, `.menu-especial`, `.menu-especial--<slug>`
- `.menu-especial__logo-desktop` / `__logo-mobile`
- `.menu-especial__links`, `.menu-especial__scroll-btn--left/right` (setas de rolagem)
- `.menu-especial__lang-select` (select de idioma)
- `.menu-especial__popover` / `__overlay` (menu mobile colapsado, `position: fixed`, escondido acima de 768px)

---

## `get_primary_term()` — helper (library/utils.php)

```php
function get_primary_term( $post_id, $taxonomy, $force_primary = false ) {
    $primary_term_id = get_post_meta( $post_id, '_yoast_wpseo_primary_' . $taxonomy, true );
    if ( ! empty( $primary_term_id ) ) {
        $primary_term = get_term( $primary_term_id, $taxonomy );
        if ( ! empty( $primary_term ) ) return $primary_term;   // uso do termo primário do Yoast
    }
    if ( ! $force_primary ) {
        $terms = get_the_terms( $post_id, $taxonomy );
        if ( ! empty( $terms ) ) return $terms[0];               // fallback: primeiro termo
    }
    return false;
}
```

- **Ordem de precedência:** termo primário do Yoast → primeiro termo associado → `false`.
- `$force_primary = true` **ignora** o fallback para o primeiro termo (só retorna o termo primário do Yoast ou `false`).

> Observação: `header-especiais.php` usa `get_primary_term(get_the_ID(), 'marcador_especial')` **sem** `force_primary`, e depois o fallback próprio via DB (caso o helper falhe por filtros/cache).

---

## Responsividade / Mobile (SCSS `_p-single-especial.scss`)

- `@media (max-width: 768px)`: o menu vira **scroll horizontal** com `scroll-snap`, botões de seta flutuantes (`.menu-especial__scroll-btn`), e `overflow-x: auto` (sem scrollbar).
- Breakpoints usados: 992px, 768px, 576px, 359px (tamanhos de slides/videos/imagens).
- Regras específicas por especial via `body.especial-<slug>` / `.especial-<slug>` (ex: `.especial-cirio-2025`, `.especial-paris-2024`, `.especial-cop-30`, `.especial-grammy2022`).
- Tabs (`wp-block-atbs-tabs`) com rolagem horizontal no mobile.

---

## Como criar/editar um especial (fluxo de trabalho)

> **Importante:** a configuração (pods, taxonomia, term meta, menus) é feita no **admin do WP**, não no código. O tema apenas **consome** o que está configurado.

1. **Criar o termo** na taxonomia `marcador_especial` (ex: `cop-30`).
2. **Criar posts** do CPT `especial` atribuídos a esse termo (via Pods no admin).
3. **Configurar o term meta do menu** no termo (via Pods):
   - `menu_id` (id do menu de navegação)
   - `menu_background_color`, `menu_link_color`
   - `menu_logo_desktop`, `menu_logo_mobile` (imagens)
   - `menu_url`
4. **Criar o menu de navegação** correspondente no WP (`Appearance → Menus` / Nav Menu), traduzido no WPML se aplicável.
5. (Opcional) **Template/CSS específico** por slug: adicionar regras em `_p-single-especial.scss` sob `body.especial-<slug>`.

---

## Resolução de problemas

- **Termo/menu não aparece:** verificar se o post tem o termo `marcador_especial` e se `menu_id` está preenchido (sem `menu_id`, a barra não renderiza).
- **Campos do especial somem em espanhol (WPML):** sintoma de **cache stale no Redis** do Pods. Ver `SESSION-2026-08-28.md` — o flush `?ninja_flush_redis=1` (dev-only) e o `pods-wpml-fix.php` resolvem.
- **Build SCSS:** a folha `dist/css/...` é compilada via Laravel Mix (Node). Se for mudar o `_p-single-especial.scss`, é preciso compilar (lembrar `NODE_OPTIONS=--openssl-legacy-provider` por causa da incompatibilidade Laravel Mix 4 × Node 24).
