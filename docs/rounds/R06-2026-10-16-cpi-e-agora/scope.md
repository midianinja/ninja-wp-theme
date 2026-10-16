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

## Entrega

*(a preencher no fechamento da rodada)*
