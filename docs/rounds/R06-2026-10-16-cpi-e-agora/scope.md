# R06 — CPI da Covid: alinhamento do bloco E AGORA (scope)

**Data:** 2026-10-16 · **Demanda:** issue #335 (Minimal) · **Relato:** @marinarcruz (2026-10-14) — "Bloco está quebrado" + screenshot dos parágrafos em zigue-zague no bloco E AGORA de `/cpi-da-covid/`.

## Dentro do escopo

- Remoção do bloco global `.et_pb_text_inner` (linhas 68–87 de `themes/midia-ninja-theme/assets/scss/6-pages/_p-page.scss`, dentro de `.page-cpi-da-covid #app`) — o "martelo" tipográfico de 2024 que atropela, por especificidade de ID (`#app`), o CSS de design que o embed injeta (apenas classes).
- Rebuild do chunk `dist/css/_p-page.css` em build de produção (demais artefatos do dist restaurados ao HEAD — padrão R05).

## Fora do escopo (follow-up se persistir divergência)

- Enfileirar os CSS do Typekit (`use.typekit.net`) no embed — sem eles a Archivo Expanded cai no fallback (Helvetica).
- Wrapper `.container` do template engavetando o layout fullwidth do Divi em viewports 768–1410px.

## Critérios de aceite

Espelham a issue #335:

1. h1 "E AGORA?" renderiza a 100px, tungsten dourada (#f5d66f), módulo com largura máx. 74% centralizada — conforme o CSS de design do embed.
2. Parágrafos do bloco a 17px / entrelinha 34.2px (15px mobile), largura máx. 74% centralizada — quebra de linha correta, sem o zigue-zague atual.
3. Nenhuma regressão nas demais seções de `/cpi-da-covid/` (bloco `.et_pb_section_2` Tungsten permanece; página inteira conferida).
4. `dist/css/_p-page.css` recompilado sem os seletores removidos.
5. Reconciliação da rodada R06 (revisão final: documentação e desvios conferidos).

## Notas de derivação (2026-10-16)

- **Causa raiz (diagnóstico de sessão, somente-leitura, anterior à classificação):** a página CPI da Covid é um embed — `template-embed-cpi.php` raspa HTML + CSS de design de `antigo.midianinja.org/cpi-da-covid/` e injeta na página. O bloco global de 2024 (commit `a2916143`, 18/09/2024, "adds Tungsten font to cpi-da-covid page") foi escrito para a página nativa da época, que não existe mais. Com a migração para o embed (commit `20659e5e`, 23/09/2026, R03), o CSS de design injetado perde na cascata para o martelo (seletor com ID `(1,2,1)` vence seletores de classe `(0,1,0)`/`(0,1,1)` independente da ordem). Efeito no E AGORA: h1 a ~80px em vez de 100px; parágrafos em Tungsten condensada 24px em vez de Archivo Expanded 17px — a quebra de linha muda completamente e produz o zigue-zague do screenshot. Os `!important` do design só protegem a cor do h1.
- **Não usar contraseletor com `inherit` no template:** mataria o `font-size:100px` do h1 (herdaria 16px do módulo). A correção é a remoção.
- **Classificação:** Minimal (comportamento de um ponto — remoção de um bloco de CSS + rebuild de 1 chunk), confirmada pelo humano (@filipesouzadev) na sessão de 2026-10-16; 0 perguntas de eliciação (tudo derivado do diagnóstico).

## Ajuste do teste humano (2026-10-16, 2ª rodada) — regressão de cor

- **Contexto:** no teste local pós-PR #338, o alinhamento corrigiu, mas os parágrafos ficaram ilegíveis (escuros sobre fundo escuro). O bloco removido misturava dois efeitos: tipografia errada (o bug) e `p { color: white }` — carga real, pois o CSS de design do antigo não define cor para os `p` (só o h1 tem `#f5d66f !important`). Sem o martelo, a regra direta do tema `p:not(.has-text-color) { color: var(--primary-pure) }` (`_a-typography.scss:83`) vencia a cor herdada do módulo Divi.
- **Correção:** regra escopada de cor no mesmo ponto do SCSS — `.et_pb_text_inner { p { color: white } }` (especificidade (1,2,1), igual ao antigo martelo; perde apenas para a exceção `et_pb_row_52` (cartões claros, p preto) e para estilos inline/`!important`). Cor idêntica ao estado pré-fix + tipografia do design. Desvio do plano original declarado no `deviations.md` (Deviation 2).
- **Consentimento humano:** "aplique e cheque por favor se o bloco removido afeta outras áreas do site" (2026-10-16).

## Auditoria de impacto do bloco removido (2026-10-16)

- **Outras páginas do site: nenhuma afetada.** `page-cpi-da-covid` só nasce de `add_slug_body_class` (`library/utils.php:329`, `{post_type}-{post_name}`) — exclusiva da página CPI; os seletores removidos não existem em nenhum outro arquivo do tema.
- **Dentro da página: nenhuma regressão além da cor de p (corrigida acima).** Cobertura por módulo confirmada contra o `embed-cpi-design-css` de produção: títulos dourados por `!important` intactos; cartões claros (row_52) pretos por regra mais específica; clones de perfis no modal imunes (fora de `#app`).
- **Divergências PRÉ-EXISTENTES vs site antigo (não causadas por esta rodada — o martelo fazia igual; follow-ups):**
  1. Perfis no fluxo da seção 34 (módulos 99–149): p branco sobre cartão branco (design pedia `#000`) — invisíveis desde 2024; os clones no modal renderizam corretamente.
  2. `font-size` dos p: o design define tamanho por módulo (17px no E AGORA, 11px no rodapé), mas a regra direta do tema `p { font-size: 1rem }` vence a herança → 16px efetivos. Critério 2 da #335 meio-atendido (entrelinha 34.2px ✓, 17px ✗) — proposta de regra escopada `font-size: inherit` pendente de decisão humana.
  3. Typekit ausente (Archivo Expanded cai em Helvetica) — já mapeado no escopo.
  4. `li` herda 16px vs ~14px no antigo — cosmético.

## Entrega (2026-10-16)

- **PR #338** (`fix/335-cpi-e-agora-alinhamento` → `develop`): commits `01c2f249` (fix — −40 linhas em 2 arquivos: `_p-page.scss` −21, `dist/css/_p-page.css` −19) e `8b8cfd79` (docs R06: escopo + registro de desvios).
- **Build do chunk:** modo development via container node:14 do watcher — o dev rebuild reproduziu `embed-cpi-modal.js`/`embed-cpi-modal.asset.php` byte-idênticos ao HEAD; o build production minificava e reescrevia o chunk inteiro. Desvio declarado no `deviations.md` (Deviation 1).
- **Verificação (evidência executada):** diff exato de 2 arquivos; grep do chunk compilado sem os seletores globais removidos (resta apenas a regra escopada `.et_pb_row_52 .et_pb_text_inner p`); `.et_pb_section_2` preservado; contagem de blocos de regra 81 → 77.
- **Aceitação:** pendente — veredito humano por critério (issue #335), após validação local/dev.
