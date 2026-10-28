# Deviations of round R07 — performance do tema (#225)
<!-- Every divergence between what was planned and what was implemented.
     An undeclared deviation is the embryo of contradictory documentation. -->

## Deviation 1 — fatia 1: contagem de preloads de fonte (2026-10-26)
- **Planned:** adicionar `crossorigin` aos **9** preloads de fonte atribuídos ao tema na caracterização (§1d: 5 Manrope + 3 Tungsten + 1 ícone, `assets.php:49`).
- **Implemented:** o tema emite **8** preloads de fonte (5 Manrope + 3 Tungsten, `get_font_files()` — `assets.php` linhas 577–617) e todos os 8 receberam `crossorigin` (diff de 1 linha, linha 49, `php -l` limpo). O 9º preload (fonte de ícone) não é emitido pelo PHP do tema — grep no worktree inteiro não encontra outra emissão de preload de fonte; vem de plugin fora do repo do tema.
- **Reason:** achado factual da execução — a caracterização contou os preloads renderizados na página e atribuiu todos ao tema; a inspeção do código na fatia corrigiu a atribuição. Os ~690KB medidos na página seguem válidos como medida; só a autoria mudou. (Sem palavra do humano no ato — descoberta mecânica; o item externo já constava como fora de escopo da rodada.)
- **Decision registered at:** este registro (deviations.md da rodada R07) — achado factual sem decisão nova: "itens fora do tema: mapear, não alterar" já constava do escopo aprovado (`aprovacao.md`).
- **Reference document updated:** `docs/rounds/R07-2026-10-23-performance-tema/caracterizacao.md` §1d — nota de correção adicionada neste ato (este repo ainda não possui `docs/reference/`; a caracterização é o documento de verdade da rodada).
