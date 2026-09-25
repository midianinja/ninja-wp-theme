# R05 — Afluentes: novo layout da archive (scope)

**Data:** 2026-09-25 · **Demanda:** issue #325 (Minimal) · **Fonte do design:** Figma "Mídia NINJA UI V2" (desktop node 8491-11399, mobile node 8511-9424) + arquivos no Drive (links no corpo da issue).

## Dentro do escopo

- Hero: imagem (Drive) + gradiente + selo "AFLUENTES" + título "Nossos rios voadores" + descrição.
- Busca (já existe como parcial — reestilizar), contador com o número real de afluentes, dropdown de ordenação.
- Grade de cards de afluente: 2 colunas no desktop (1440), 1 coluna no mobile (375) — card horizontal com moldura na cor da categoria, arte em FIT, chip de categoria, nome, divisória, descrição e ícones de redes.
- Arquivos alvo principais: `themes/midia-ninja-theme/archive-afluente.php`, `assets/scss/6-pages/_p-archive-afluente.scss`, novo partial do card, `template-parts/search-afluente.php`.

## Fora de escopo

- Single do afluente; header/rodapé/newsletter do site (chrome compartilhado permanece como está); novos critérios de ordenação; paginação (hoje 14 afluentes numa dobra; entra como ajuste se o volume crescer).

## Critérios de aceite

1. Desktop 1440 conforme Figma 8491-11399: hero completo, busca, contador real, ordenação, grade 2 colunas com card horizontal completo (moldura colorida + arte FIT, chip, nome, divisória, descrição, redes).
2. Mobile 375 conforme Figma 8511-9424: hero, busca, ordenação e grade 1 coluna com card compacto (thumb menor, nome 15px, descrição 2 linhas).
3. Busca filtra afluentes; ordenação muda a ordem; card leva à página do afluente.
4. Reconciliação da rodada R05 (revisão final: documentação e desvios conferidos).

## Notas de derivação (2026-09-25)

- Template atual (`archive-afluente.php`): cabeçalho de layout (`get_layout_header('afluentes')`), parcial de busca e loop de cards genéricos de post (`template-parts/content/post`). Hero, contador, ordenação, cards de afluente e chips coloridos são todos novos.
- O contador do Figma ("14 AFLUENTES") deve refletir o número real de afluentes publicados.
- Os 14 cards do Figma listam afluentes reais (Casa NINJA Amazônia … Zona de Propulsão) com descrições curtas e redes sociais — a fonte desses dados (term meta da taxonomia, perfis ou outra) será caracterizada na execução; divergência vira desvio declarado.
- **Pós-implementação:** afluente é CPT (Pods); nome=título, descrição=excerpt, arte=thumbnail. Redes sociais vêm do term meta do `marcador_afluente` (mesma fonte do single); linha de redes fica oculta quando vazia. Cores dos chips/molduras vêm do term meta existente `ninja_background_term_color`/`ninja_font_term_color` (`library/categories.php`) — sem hardcode da paleta do Figma; em produção, os termos de categoria precisam ter o meta preenchido.
- **Ordenação (atualizado pós-implementação):** o default muda de alfabético (`title ASC`) para "mais recentes" (`date DESC`), com "mais antigos" opcional — desvio declarado no `deviations.md` desta rodada.
- **Imagem do hero:** exportada direto do Figma (os arquivos do Drive não eram acessíveis ao especialista) — `assets/images/afluentes-hero.png`.
- **Atenção no deploy:** se o bloco header-footer `archive=afluentes` ainda renderizar um cover antigo em produção, aparecerá uma faixa legada acima do hero novo — ação de conteúdo (esvaziar/reapontar o bloco).

## Ajustes do teste humano (2026-09-25, 2ª rodada)

- **Bug corrigido — busca sobrepondo o contador** (commit `e8bd367e` no branch da feature): causa raiz foi o reset global `input[type=search] { box-sizing: content-box }` do `critical.css` — o input pintava ~526px dentro de um wrapper de 460px e transbordava sobre o contador. Correção local no SCSS da archive: `border-box` explícito no input e no select, linha de controles reorganizada conforme Figma (busca à esquerda, espaçador flexível, contador + ordenação à direita). Rebuild de produção do chunk no mesmo commit.
- **Seeding local (apenas banco local, não commitado):** os 31 posts de afluente não tinham categoria atribuída — por isso todas as molduras caíam na cor padrão. Inseridas 28 atribuições (14 pares pt-br/es) usando o mapeamento editorial do Figma e os termos canônicos com meta de cor. **Em produção, a atribuição de categorias aos afluentes é ação de conteúdo no deploy.**
- **Descoberta — bilíngue (WPML):** as "duplicatas" são pares de tradução pt-br/es; o arquivo filtra por idioma (contador e grade corretos, 14 no pt-br). Porém os termos ES não têm o meta de cor → em `/es/afluente/` 13/14 cards caem na cor padrão. **Pendência de conteúdo:** replicar `ninja_background_term_color`/`ninja_font_term_color` nos termos ES (e atribuir categorias aos afluentes ES) para o espanhol renderizar fiel.

## Ajustes do teste humano (2026-09-25, 3ª rodada — commit `966b658d` na feature)

- **Gutters laterais (corrigido):** causa dupla — o `.container` bootstrap conta os 15px de padding dentro do max-width (linha real de 1140px, não 1170) e, no mobile, o chunk genérico `_p-archive.css` somava `padding-inline:16px` ao do container (31px de margem). Fix escopado em `.post-type-archive-afluente`: container 1200px em desktop-large (1170 + 2×15) e 16px exatos no mobile. Medido em 1440: x:135 w:1170, igual ao frame do Figma.
- **Imagem de destaque dobrada (diagnóstico → ação de conteúdo):** não é bug do card (11 artes em 14 cards, 1 por card). É o bloco legado do chrome: o post `header-footer` (archive=afluentes, posição cabeçalho) renderiza um `wp-block-cover` com `afluentes-3.png`, eyebrow/H2 duplicados e descrição ANTIGA (fotojornalismo) empilhado acima do hero novo. **Ação de conteúdo (local e produção): remover o bloco cover desse post no admin (ou despublicar o post de header).** Enquanto existir, a imagem dobra e a busca não entra na primeira dobra mobile.
- **Primeira dobra mobile (corrigido):** bug principal era `flex: 0 1 460` no wrapper da busca — no mobile em coluna, o basis virava ALTURA (wrapper de 460px, botão da lupa flutuando a ~214px do input). Corrigido para `flex: 0 1 auto`; mobile re-medido conforme spec 8511:9424 (hero 343×400 com gradiente + backdrop-blur, chip dentro da imagem, H2 32px sem descrição, busca 343×46 borda 2px, ordenação 8px abaixo, grade 1 coluna gap 12, contador oculto).
- Build de produção do chunk no mesmo commit (via node 14 do container watcher; demais artefatos de dist restaurados ao HEAD).
