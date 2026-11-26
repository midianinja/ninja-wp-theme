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

## Deviation 3 — Revisão 11 (#335): diagnóstico prosseguiu após veredito de deploy pendente

- **Planned:** se o chunk servido em produção fosse o antigo (pré-rev9/10), o diagnóstico CSS seria interrompido e reportado — "os sintomas mudam de leitura (problema de deploy/cache, não de CSS)".
- **Implemented:** veredito de deploy pendente reportado primeiro (produção ainda na revisão 8; PR #370 nunca deployado) e o diagnóstico prosseguiu: os 3 itens do feedback do cliente são condições pré-existentes do embed (regras inertes do CSS de design desde a R03 + fonte ETmodules bloqueada por CORS), independentes do deploy; a rev11 aplicada é aditiva e segura em qualquer ordem de deploy.
- **Reason:** em palavras do especialista — "a evidência falsificou aquela racional: os itens 2 e 3 são condições pré-existentes do embed que a rev9/rev10 (não implantadas) nunca abordariam e que persistiriam após o deploy". Interromper teria adiado a correção de problemas que o deploy não resolve.
- **Decision registered at:** issue #335 — comentário de auditoria da revisão 11 (https://github.com/midianinja/ninja-wp-theme/issues/335#issuecomment-7201912788), 2026-11-26.
- **Reference document updated:** comentário da revisão 11 na issue #335 (diagnóstico + entrega registrados; regime da revisão 2 sob override — registros de entrega vivem na issue, sem seção de escopo).

## Deviation 4 — Revisão 11 (#335): premissa do bump de versão

- **Planned:** bump da versão do tema (1.9.12 → 1.9.13) para renovar o `?ver=` do chunk no deploy (premissa herdada da revisão 10: "version bump 1.9.11 → 1.9.12, renews the chunk ?ver= on deploy").
- **Implemented:** bump realizado por convenção do repo (mesmo ponto e formato da rev10), com a premissa corrigida: o `?ver=` é `filemtime` do arquivo (`library/assets.php:169`) — renova automaticamente quando o arquivo novo substitui o antigo no deploy; o bump não participa do mecanismo.
- **Reason:** correção factual verificada na revisão 11 (e já apontada em auditoria anterior da rodada): o mecanismo de cache-bust é o mtime do arquivo, não a versão do tema.
- **Decision registered at:** issue #335 — comentário de auditoria da revisão 11 (https://github.com/midianinja/ninja-wp-theme/issues/335#issuecomment-7201912788), 2026-11-26.
- **Reference document updated:** comentário da revisão 11 na issue #335.
