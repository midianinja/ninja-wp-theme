# Deviations of round R06 — CPI da Covid: alinhamento do bloco E AGORA

<!-- Every divergence between what was planned and what was implemented.
     An undeclared deviation is the embryo of contradictory documentation. -->

## Deviation 1 — Build do chunk: development no lugar de production

- **Planned:** rebuild de `dist/css/_p-page.css` em build de produção (redação herdada das notas da R05, que descreviam seu build como "de produção").
- **Implemented:** rebuild com `npm run development` (container node:14 do watcher) — saída em formato dev (expanded + sourcemap stub), idêntico ao formato efetivamente commitado pela R05; o build de produção minificava, reescrevia o chunk inteiro e alterava `embed-cpi-modal.js`/`embed-cpi-modal.asset.php` (que no dev rebuild saíram byte-idênticos ao HEAD).
- **Reason:** em palavras do especialista — "o estado do dist commitado pela R05 é formato dev; o build de produção reescreveria o chunk inteiro e divergiria do estado validado em teste local". Mantida a convenção real do repo.
- **Decision registered at:** issue #335 (execução da R06, branch `fix/335-cpi-e-agora-alinhamento` → PR #338) — desvio técnico de execução declarado no ato em 2026-10-16, sem override humano.
- **Reference document updated:** `docs/rounds/R06-2026-10-16-cpi-e-agora/scope.md`, seção Entrega (método de build registrado na entrega).

## Deviation 2 — Remoção pura do martelo → remoção + regra de cor escopada

- **Planned:** remoção integral do bloco `.et_pb_text_inner` (plano original: "a correção é a remoção", sem contraseletor).
- **Implemented:** remoção do martelo tipográfico + reescrita de UMA declaração em regra própria no mesmo ponto: `.et_pb_text_inner { p { color: white } }` (+ recompilação do chunk em dev build).
- **Reason:** o teste humano (2026-10-16) mostrou que o `color: white` do bloco era carga real — o CSS de design do antigo não define cor para os `p` do embed e a regra direta do tema (`p:not(.has-text-color)` em `_a-typography.scss:83`) tornava os parágrafos escuros sobre fundo escuro (ilegíveis).
- **Decision registered at:** issue #335 (teste humano da entrega, PR #338); consentimento humano explícito: "aplique e cheque" (2026-10-16).
- **Reference document updated:** `docs/rounds/R06-2026-10-16-cpi-e-agora/scope.md`, seção "Ajuste do teste humano (2026-10-16, 2ª rodada)".
