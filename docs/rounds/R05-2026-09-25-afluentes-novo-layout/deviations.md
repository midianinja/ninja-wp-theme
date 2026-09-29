# Deviations of round R05 — Afluentes: novo layout da archive

<!-- Every divergence between what was planned and what was implemented.
     An undeclared deviation is the embryo of contradictory documentation. -->

## Deviation 1 — Ordenação padrão da archive de Afluentes

- **Planned:** preservar o comportamento atual de ordenação (alfabética por título, `orderby=title ASC`, hardcoded em `alterar_consulta_pesquisa_afluente`).
- **Implemented:** ordenação padrão por data decrescente ("mais recentes", estado default do dropdown no Figma) + opção "mais antigos" via `ordem=oldest` (mesma convenção da busca do tema).
- **Reason:** em palavras do especialista — "o dropdown do design nasce no estado 'Ordenar por mais recentes'; manter alfabético contradiziria o design aprovado". Sem decisão humana contrária registrada: desvio decorrente do design aprovado na triagem.
- **Decision registered at:** issue #325 (critério de aceite 1 e escopo confirmados em 2026-09-25) — desvio de execução, não override humano.
- **Reference document updated:** `docs/rounds/R05-2026-09-25-afluentes-novo-layout/scope.md`, § Notas de derivação, item "Ordenação (atualizado pós-implementação)" — 2026-09-25.

## Deviation 2 — Ícone do dropdown de ordenação

- **Planned:** ícone `flowbite:sort-outline` conforme Figma.
- **Implemented:** glifo padrão de ordenação embutido em data-URI (aproximação visual).
- **Reason:** em palavras do especialista — "ícone vetorial do Figma não extraído; aproximação mantém o significado sem dependência externa".
- **Decision registered at:** https://github.com/midianinja/ninja-wp-theme/issues/325#issuecomment-5834871347 (relatório de implementação, escolha do especialista declarada, sem override humano).
- **Reference document updated:** este registro — detalhe visual a conferir no teste humano (checklist do critério 1 da issue #325).

## Deviation 3 — Hero da archive: do template para o bloco do cliente

- **Planned:** hero completo renderizado pelo template (imagem + gradiente + selo "AFLUENTES" + título "Nossos rios voadores" + descrição), conforme critério de aceite original e Figma 8491-11399.
- **Implemented:** hero removido do template (markup, SCSS e asset `afluentes-hero.png`, commit `5c3dd825`) — a primeira dobra é exclusivamente o bloco editável `header-footer` (conteúdo do cliente no painel). Critério de aceite 1 emendado na issue.
- **Reason:** em palavras do humano — "é pra remover o que vc adicionou via código e manter o do header and footer pq o cliente pode alterar no painel".
- **Decision registered at:** https://github.com/midianinja/ninja-wp-theme/issues/325#issuecomment-5837880485 (emenda do critério + decisão).
- **Reference document updated:** `docs/rounds/R05-2026-09-25-afluentes-novo-layout/scope.md`, seção "Decisão humana — hero deixa o template" (2026-09-25).
