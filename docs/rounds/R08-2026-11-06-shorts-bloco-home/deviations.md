# Deviations of round R08 — shorts-bloco-home
<!-- Every divergence between what was planned and what was implemented.
     An undeclared deviation is the embryo of contradictory documentation. -->

## Deviation 1 — Entrega direta em develop (sem PR)
- **Planned:** abertura de PR da branch `feat/361-shorts-latest-horizontal-posts` para `develop`, com revisão via PR antes do merge (plano de execução apresentado no consentimento de 2026-11-06).
- **Implemented:** commits aplicados diretamente em `develop` local, sem PR e sem push. A primeira entrega (merge fast-forward da branch do worktree) foi resetada pela desenvolvedora e refeita em `develop` incluindo o bump de versão do tema (1.9.3) no commit da feature.
- **Reason:** decisão da desenvolvedora — "faça o commit na develop. sem push" (@julialaurentino, 2026-11-09).
- **Decision registered at:** sessão da issue #361 (2026-11-09); veredito de aceite a registrar na issue.
- **Reference document updated:** seção "Entrega" do `scope.md` desta rodada.

## Deviation 2 — Correção do clipping: remoção da classe em vez de neutralização CSS
- **Planned:** neutralizar as sobreposições do CSS da home (`.home .model-videos`) no bloco de shorts via seletor `.home &` com `width:auto !important` nos slides.
- **Implemented:** removida a classe `model-videos` do bloco de shorts no PHP (`array_diff`), mantendo apenas `model-shorts`; a neutralização CSS foi descartada.
- **Reason:** a neutralização colapsou os slides para 0px no track flex da home (largura auto ← conteúdo ← largura do slide: referência circular, confirmada em geometria computada); a remoção da classe elimina o conflito na raiz e simplifica o CSS.
- **Decision registered at:** sessão da issue #361 (2026-11-12), decisão da desenvolvedora após revisão do clipping em homologação.
- **Reference document updated:** seção "Revisão 1" do `scope.md` desta rodada.
