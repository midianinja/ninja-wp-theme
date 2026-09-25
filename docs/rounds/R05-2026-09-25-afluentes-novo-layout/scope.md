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
