# Caracterização do tema — R07 (#345)

> Rodada R07 · Épica #225 (Melhorias de performance) · Tarefa #345
> Método: análise estática somente-leitura do repositório (sem alterações de código).
> Data: 2026-10-23 · Restrição da rodada: paridade visual e funcional é não negociável.

## 1. Inventário do tema

### 1a. Scripts enfileirados (frente do site)

Enfileiramento central em `themes/midia-ninja-theme/library/assets.php`
(`enqueue_javascripts`, linhas 196–219) — todos no footer (`true`), versão por
`filemtime`, sem dependências (JS vanilla):

| Handle | Arquivo (dist/js/functionalities/) | Tamanho em disco | Escopo |
|---|---|---|---|
| menu | menu.js | 37KB | global + preload no head |
| scroll-behavior | anchor-behavior.js | 44KB | global + preload no head |
| search | search.js | 15KB | global |
| copy-url | copy-url.js | 12KB | global |
| filter | perguntas-frequentes.js | 25KB | CPT perguntas_frequentes |
| anchor-sidebar | anchor-sidebar.js | 11KB | tpl page-anchor.php |
| archive-opiniao / single-opiniao / seja-ninja | (17 / 12 / **433**KB) | respectivos |
| embed-cpi-modal | embed-cpi-modal.js (69KB) | tpl template-embed-cpi.php, **dep [jquery]** (assets.php:742) |

**Achado crítico:** todo JS de `dist/` contém **source map inline base64** e está
**sem minificar** (`webpack.mix.js:106`, `devtool: "inline-source-map"`).
Medido: seja-ninja 337KB dos 433KB são source map; menu 26/37KB;
anchor-behavior 16/44KB; embed-cpi-modal 45/69KB. (Se o W3TC minificar no
servidor, o desperdício pode não chegar ao navegador — verificar em produção.)

### 1b. Scripts de blocos (view.js)

Enfileirados via `block.json` → `viewScript`; dependência declarada
**jquery** para os três sliders (view.asset.php):
`library/blocks/build/{latest-horizontal-posts, latest-vertical-posts,
opinion-posts}/view.js` = **96KB cada, builds de desenvolvimento não
minificados** (código-fonte slick legível, view.js.map externo commitado),
**cada um com uma cópia completa do slick-carousel 1.8.1**. Total ≈ 288KB
para 3 inicializações de slider.

> **Correção (2026-10-28, fatia 3):** os `view.js` e seus `.map` **não estão
> commitados no repo** — `build/` é gitignored (desde 0b0a9b9a; `git ls-files`
> não encontra nenhum `.map` no repo inteiro). São artefatos locais de build;
> os 96KB dev medidos na página de produção originaram-se de um zip de deploy
> que embalou build local de desenvolvimento. O build canônico de produção
> (`wp-scripts build` do `library/blocks`, via `compilar.sh`/docker node:18)
> já emite view.js minificados sem source map (~44KB cada; −151.295 bytes
> medidos nos 3). Gap real de pipeline: `.gitlab-ci.yml` (`build_assets`,
> node:12) builda apenas o tema (`dist/`), não os blocos. Os ~288KB medidos
> seguem válidos como medida do que está no ar; mudou a atribuição da causa
> (empacotamento de deploy, não estado do repo). Registrado em
> `deviations.md` (Deviation 2).

### 1c. CSS

- `critical.css` (**78KB não minificado**) inline via `file_get_contents` +
  `<style>` em **todas as páginas** (assets.php:147–149); na home, `_p-home.css`
  (**52KB**) também inline → **~130KB de CSS inline no HTML da home**.
- Demais CSS: `<link>` selecionado por `preload_callback` e reescrito para o
  truque `media='print'` + onload (assets.php:125–133) — CSS já não bloqueia
  renderização para anônimos. Porém callbacks super-inclusivos
  (`single-opiniao` + `single-galeria` em todo `is_single()`; `page-*` em todo
  `is_page()`) carregam ~40–70KB de CSS que a maioria das páginas não usa
  (assíncrono — custo em bytes/parser).
- Blocos: tiny-slider.css (2,2KB) + _b-query.css (3,7KB) + tiny-slider.js
  (32KB) + query-slider.js (11KB) quando `core/query` presente
  (assets.php:774–830).

> **Correção (2026-10-28, fatia 4):** critical.css/_p-home.css são gerados por
> laravel-mix (SCSS → `dist/css/`, gitignored) e o pipeline canônico de
> produção **já os minifica** (cssnano): 78.735→61.200 B e 52.025→43.122 B
> medidos em build local de produção. A página em produção hoje **já serve os
> dois minificados** — os 78/52KB acima refletiam um deploy anterior com build
> dev (mesma causa da correção §1b; `menu.js` no ar = 4,7KB minificado vs
> 37KB caracterizados). As medidas originais seguem como registro do baseline
> da rodada; nota de deriva em `baseline.md` §2. Registrado em
> `deviations.md` (Deviation 3).

### 1d. Fontes (assets.php:41–53, 569–667)

Locais TTF/OTF; 26 `@font-face` no critical.css, todas com `font-display:
swap` (bom). **9 fontes em preload no head** (5× Manrope ~97KB + 3× Tungsten
~53KB ≈ **690KB de preload**) **com `as="font"` mas SEM `crossorigin`**
(assets.php:49) → o preload é descartado e a fonte baixa **duas vezes** (bug
clássico). Nenhuma conversão WOFF2 (TTFs 30–50% maiores).

> **Correção (2026-10-26, fatia 1):** inspeção do código na execução mostrou
> que o **tema emite 8** desses preloads (5 Manrope + 3 Tungsten,
> `get_font_files()`, linhas 577–617); o 9º (fonte de ícone) vem de fora do
> tema (plugin) — fora do escopo da rodada ("mapear, não alterar"). Os ~690KB
> medidos na página seguem válidos como medida; mudou apenas a atribuição.
> Registrado em `deviations.md` (Deviation 1).

### 1e. Imagens

Tamanhos registrados: card-large 700×387, card-medium 300×166, card-small
219×121 (library/images.php:6–8). Blocos usam `get_the_post_thumbnail` com
srcset (bom), mas vários `<img loading="lazy">` **sem srcset/sizes/dimensões**
em templates brutos (post-photos.php:35, post-albums.php:34,
flickk-gallery/photo.php:35, collection.php:19…).

### 1f. Externos fixados em templates

- gpt.js/googlesyndication **comentados** (header.php:10–12) — anúncios vivos
  vêm do plugin Newspack Ads + GTM.
- Preconnects: googletagmanager + static.addtoany.com (header.php:16–17).
- Donate embed ninjaverso.com.br async (single.php:352, single-opiniao.php:372).
- **ElevenLabs player-audioNativeHelper.js síncrono, sem defer**
  (template-parts/content/player-elevenlabs.php:3; ativo em
  single-opiniao.php:342).
- embed-CPI raspa antigo.midianinja.org com cache transient 1h
  (template-embed-cpi.php:19–201).

> **Correção (2026-10-28, fatia 7):** o embed do ninjaverso em
> `single-opiniao.php:372` é **código morto** — o bloco inteiro está dentro de
> `<?php if (false) : ?>` (linhas 357–376); o uso ativo do embed é apenas
> `single.php:352` (CPT post). O preconnect da alavanca L15 foi aplicado só
> onde o embed renderiza de fato (single de post). Achado adicional não
> caracterizado na R07: shortcode `[player_elevenlabs]`
> (`library/utils.php:883–890`) pode renderizar o player em qualquer conteúdo
> via BD — cobertura por `has_shortcode()` fica registrada como decisão
> futura (ver comentário da fatia 7 na #225).

### 1g. Código morto (nunca referenciado por PHP)

`assets/javascript/{app.js, acessibilidade.js, js.cookie.js,
masks/number-masker.js}`; `dist/js/functionalities/{featured-slider.js,
video-gallery.js}`; `dist/css/{_b-newspack-blocks-homepage-articles,
_b-timeline, _b-tags, _b-video-gallery, _c-top-menu,
menu-sempre-hamburguer}.css`; `template-parts/share-links.php`;
`languages/base-textdomain-pt_BR-featured-slider-block.json`.

### 1h. Payload aproximado da home controlado pelo tema (anônimo, sem compressão)

JS: globais 108KB + 3×96KB sliders + jquery(~90KB)+migrate(13KB) +
tiny-slider 43KB ≈ **540KB**; CSS: ~130KB inline + ~10KB links async;
fontes em preload ~690KB.

## 2. Caminho de renderização

1. `wp_head` → critical.css inline (78KB) + _p-home.css inline (52KB) → FCP
   dirigido pela transferência do HTML; nenhum CSS do tema bloqueia
   renderização para anônimos.
2. 2× preload de script (menu, anchor-behavior) + **9 preloads de fonte com
   crossorigin quebrado (690KB) competindo com a imagem LCP**.
3. jQuery + migrate no footer (padrão WP; forçado no head só no embed-CPI,
   assets.php:104–107). Sliders inicializam em DOMContentLoaded com gate por
   IntersectionObserver.
4. Candidatos a LCP na primeira dobra: hero da home em markup de **blocos
   Newspack (plugin)** — fora do tema.

## 3. Trabalho de 2024 — verificado presente

- Gate IntersectionObserver dos slick sliders (commit f9b57bff, 2024-09-11) ✅
- Scripts de emoji removidos (functions.php:31–35) ✅
- Fontes locais com font-display:swap (commit 0391d0a6) ✅
- CSS assíncrono via truque print (assets.php:125–133) ✅
- GPT comentado no header (anúncios pelo plugin) ✅
- embed-CPI com cache transient 1h ✅
- Config W3TC: lado servidor, fora do repo — não verificável aqui.

## 4. Alavancas candidatas (núcleo da entrega)

| # | Alavanca | Benefício | Risco de paridade | Prova de paridade |
|---|---|---|---|---|
| L1 | Rebuild do dist JS em modo produção (remover inline-source-map, minificar) — webpack.mix.js:106 | −400KB+ brutos (todas as páginas) | Baixo — mesmo código, sem maps/whitespace | Mesmos handles/URLs; screenshots 320/768/1440; scan de erros de console |
| L2 | Rebuild dos blocos em produção → view.js minificado (~96→~45KB cada) | −150KB nas páginas com slider | Baixo | Idem L1 + matriz manual de sliders (setas/dots/swipe) |
| L3 | Extrair slick para handle compartilhado (3 cópias → 1) | −~85KB | Baixo-Médio (wiring de build) | Provas L1/L2 + diff da versão do slick |
| L4 | Minificar + aparar critical.css/_p-home.css inline | ~−60% dos bytes de HTML; FCP | Baixo (só cssnano, sem mudar regras) | Screenshots full-page @320/768/1440; diff de computed styles |
| L5 | `crossorigin` nos preloads de fonte + preload só das fontes ATF | Mata download duplo; −300–690KB mobile | Baixo (atributo); subset ATF = Médio | Network: 1 fetch por fonte; screenshots de renderização |
| L6 | Converter TTF/OTF → WOFF2 + @font-face | −30–50% bytes de fonte | Baixo (conversão 1:1) | Screenshots em todos os pesos; teste de fallback |
| L7 | Restringir callbacks de CSS por template (assets.php:389–429) | −40–70KB CSS async | Baixo | Screenshots por template |
| L8 | Remover código morto (§1g) | Higiene; marginal | Baixo (grep sem referências) | Crawl 200s + screenshots |
| L9 | Defer no ElevenLabs (player-elevenlabs.php:3) | TTI/TBT em single-opinião | Baixo-Médio | Tocar áudio antes/depois |
| L10 | jquery-migrate fora da frente | −13KB + parse | Médio (plugins legados quebram em silêncio) | Scan de console em todos os templates |
| L12 | Dieta de DOM no chrome: header monta 2 árvores de menu inteiras + menu social ×3 (header.php:87,99; footer.php:14); hambúrguer lazy na 1ª abertura | −centenas de nós (DOM 1.886) | Médio | Menu em 3 breakpoints; navegação por teclado; contagem de nós |
| L13 | srcset/sizes + dimensões nos `<img>` brutos dos blocos | Downloads corretos, CLS↓ | Baixo-Médio | Lado a lado 320/768/1440; CLS no Lighthouse |
| L14 | Primeiro slide não-lazy quando slider está ATF | LCP↓ | Baixo | Trace do elemento LCP mobile |
| L15 | preconnect para elevenlabs.io e ninjaverso.com.br nos templates que usam | TTFB de embeds | Baixo | Waterfall |
| L17 | Deduplicar chamadas addtoany (single.php:219,226,335 — verificar se duplicatas são variantes mobile/desktop intencionais) | DOM↓ | Baixo | Screenshots mobile/desktop |

**Rejeitadas/adiadas** (risco de paridade): trocar slick por scroll-snap nativo;
inlinar CSS do Newspack (escopo plugin); remoção do jQuery (slick depende).

## 5. Os três bloqueios de 2024 — re-verificados pelo lado do código

1. **"Bloco Newspack na primeira dobra"** — a home é montada por blocos
   (front-page.php:17, `the_content()`); o bloco Homepage Articles e seus
   assets vêm do **plugin newspack-blocks**. O tema só acrescenta cores de
   categoria inline (categories.php:65) e um CSS não usado do bloco.
   → **Plugin/terceiro** (mapear, não alterar).
2. **"Anúncio na primeira dobra / JS dos anúncios"** — GPT do tema comentado;
   injeção viva é **Newspack Ads + GTM**. → **Plugin/terceiro**.
3. **"DOM 1.886"** — dividido: chrome do tema (2 menus + 3 sociais no header)
   vs conteúdo de blocos (Newspack + hacklab-blocks, cujos front scripts
   ~150–160KB não minificados estão no **submódulo plugins/hacklab-blocks**).
   → **Misto**: o tema corta a própria fatia; a do plugin é upstream.

## 6. Ranking forçado: quick wins → estruturais

| Rank | Item | Tag | Risco |
|---|---|---|---|
| 1 | L5 crossorigin nos preloads de fonte (1 linha, mata download duplo) | tema | Baixo |
| 2 | L1 rebuild produção do dist JS (sem source maps/minificado) | tema | Baixo |
| 3 | L2 rebuild produção dos view.js dos blocos | tema | Baixo |
| 4 | L4 minificar critical/home CSS inline | tema | Baixo |
| 5 | L7 restringir callbacks de CSS | tema | Baixo |
| 6 | L6 fontes WOFF2 (+subset) | tema | Baixo |
| 7 | L9 defer ElevenLabs + L15 preconnects | tema | Baixo-Médio |
| 8 | L10 jquery-migrate fora da frente | tema | Médio |
| 9 | L13/L14 srcset + slides ATF não-lazy | tema | Baixo-Médio |
| 10 | L3 slick em handle compartilhado | tema | Baixo-Médio |
| 11 | L17 dedup addtoany; L8 purga de código morto | tema | Baixo |
| 12 | hacklab-blocks: rebuild produção dos front scripts | plugin/terceiro | Baixo (upstream) |
| 13 | L12 dieta de menus/DOM no header | tema | Médio |
| 14 | Newspack/ads ATF, estratégia gtag/GTM | plugin/terceiro | — |
| 15 | Verificação W3TC minify/defer, CDN/WebP no servidor | servidor/config | — |

**Protocolo de prova (todas as alavancas):** antes/depois — (a) diff de
handles+URLs enfileirados; (b) screenshots full-page 320/768/1440 em home,
single, single-opinião, archive e pages; (c) matriz de interação (menus,
sliders, busca, copy-url, lightbox, embed CPI); (d) diff Lighthouse mobile;
(e) scan de erros de console. **As alavancas 1–7 mudam bytes, não
comportamento — primeira onda mais segura.**
