# Deviations of round R06 — CPI da Covid: alinhamento do bloco E AGORA

<!-- Every divergence between what was planned and what was implemented.
     An undeclared deviation is the embryo of contradictory documentation. -->

No deviations in this round.

<!-- (a linha acima é substituída pela Deviation 1 abaixo — declarada no ato, 2026-10-16) -->

## Deviation 1 — Build do chunk: development no lugar de production

- **Planned:** rebuild de `dist/css/_p-page.css` em build de produção (redação herdada das notas da R05, que descreviam seu build como "de produção").
- **Implemented:** rebuild com `npm run development` (container node:14 do watcher) — saída em formato dev (expanded + sourcemap stub), idêntico ao formato efetivamente commitado pela R05; o build de produção minificava, reescrevia o chunk inteiro e alterava `embed-cpi-modal.js`/`embed-cpi-modal.asset.php` (que no dev rebuild saíram byte-idênticos ao HEAD).
- **Reason:** em palavras do especialista — "o estado do dist commitado pela R05 é formato dev; o build de produção reescreveria o chunk inteiro e divergiria do estado validado em teste local". Mantida a convenção real do repo.
- **Decision registered at:** issue #335 (execução da R06, branch `fix/335-cpi-e-agora-alinhamento` → PR desta entrega) — desvio técnico de execução declarado no ato em 2026-10-16, sem override humano.
- **Reference document updated:** `docs/rounds/R06-2026-10-16-cpi-e-agora/scope.md`, seção Entrega (método de build registrado na entrega).
