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
- **2ª rodada de teste (cor):** commit `72d772f9` — regra escopada `.et_pb_text_inner p { color: white }` + rebuild; docs `c06b1744` (ajuste, auditoria de impacto, Deviation 2).
- **Merge:** PR #338 merged em `develop` com merge commit `f89dc852` (2026-10-16), por decisão humana: "faça merge desse ajuste na develop" — branch preservada (convenção do repo).
- **Aceitação:** veredito por critério no fechamento da issue #335. Critérios 1, 3 e 4 atendidos; **critério 2 emendado por decisão humana** (merge autorizado com 16px efetivos — a regra direta do tema `p { font-size: 1rem }` vence a herança dos 17px do módulo; entrelinha 34.2px e largura 74% corretas). Restauração do tamanho por módulo (`font-size: inherit` escopado) fica como follow-up.
- **Follow-ups mapeados (sem issue aberta — registrados aqui e no fechamento da #335):** font-size por módulo (17px), Typekit/Archivo Expanded, wrapper `.container` (fullwidth 768–1410px), perfis in-flow branco-sobre-branco (pré-existente desde 2024).

## Revisão 1 (2026-10-21) — ajustes mobile (feedback do Caio)

- **Contexto:** issue #335 reaberta em 2026-10-16 (label `revisão 1`) logo após a reconciliação da rodada. Feedback do Caio sobre a versão mobile do embed: (1) bloco **carômetro** sendo cortado, sem scroll lateral; (2) **títulos amarelos** (ex.: "Introdução") com as letras muito juntas.
- **Dentro do escopo (somente mobile, ≤768px):** carômetro completo e centralizado ao grid de forma responsiva (sem corte, sem scroll lateral); espaçamento entre letras (`letter-spacing`) nos títulos dourados.
- **Fora do escopo:** inalterado em relação à rodada — follow-ups já mapeados (Typekit/Archivo Expanded, wrapper `.container`, font-size por módulo 17px, perfis branco-sobre-branco pré-existentes).
- **Critérios de aceite (revisão 1):** espelham o comentário de registro na issue #335 (2026-10-21): carômetro completo/centralizado sem scroll lateral no mobile; títulos amarelos com letter-spacing legível no mobile; sem regressões (desktop inalterado, demais seções conferidas); chunk `dist/css/_p-page.css` recompilado (dev build — convenção R06).
- **Consentimento humano:** "pode executar." (2026-10-21).
- **Execução:** branch `fix/335-cpi-e-agora-mobile`, worktree `.worktrees/fix-335-cpi-e-agora-mobile`, a partir de `develop` @ `49f86561`. Escopo registrado na issue antes do início (comentário 2026-10-21); metadata corrigida para `in-execution`.

### Entrega da revisão 1 (2026-10-21)

- **Diagnóstico (causa raiz):** no mobile o CSS de design do antigo exibe as rows flex de 2 colunas do `#carometro` (as rows de 6 colunas são `display:none` ≤980px), mas o embed não carrega o CSS núcleo do Divi — as colunas `.et_pb_column_1_2` ficam sem largura e, como itens flex, caem no piso `min-width:auto` (~232px cada: retrato de 200px + margens). Duas colunas ≈464px > viewport de celular → transbordo cortado pelo `overflow-x:hidden` do template (`template-embed-cpi.php:208-209, 222-227`), sem scroll lateral. No antigo isso não ocorre porque o Divi núcleo define `width:47.25%` para essas colunas.
- **Correção (CSS aditivo, escopado, ≤768px, dentro de `.page-cpi-da-covid #app` em `_p-page.scss`):** rows do `#carometro` com `flex-wrap:wrap; justify-content:center`; colunas com `flex:1 1 240px; min-width:0; text-align:center` — 2-up em telas ≥~500px (como no antigo), 1-up centrado em celulares. Títulos dourados em tungsten (12 módulos `et_pb_text_0…98`, incl. E AGORA?): `letter-spacing:0.05em` somente no mobile.
- **Verificação (evidência executada):** diff exatamente +43 (SCSS) / +28 (chunk), 0 deleções, nenhum outro arquivo alterado (o chunk `_p-archive-afluente.css` reescrito pelo build foi restaurado ao HEAD); greps do chunk compilado — novo bloco nas linhas 83–107, guardas da R06 intactos (`.et_pb_section_2` l.45, `.et_pb_text_inner p` l.63, `.et_pb_row_52` l.67/73). Verificação estática; validação visual mobile pendente (teste humano).
- **Observação:** `et_pb_text_95` (E AGORA?) incluído no letter-spacing — afeta apenas o mobile (60px no design CSS mobile; o 100px do desktop fica intacto). Remoção a uma linha se o humano preferir.
