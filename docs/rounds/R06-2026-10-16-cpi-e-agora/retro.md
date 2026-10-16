# Retrospective — R06 (CPI da Covid: alinhamento do bloco E AGORA)

**Fechada em:** 2026-10-16 · **Demanda:** #335 (Minimal) · **Entrega:** PR #338 (4 commits, merge `f89dc852` em develop)

## O que funcionou

- Diagnóstico de causa raiz ANTES da classificação: variante e escopo saíram prontos da investigação (0 perguntas de eliciação na triagem).
- Desvios declarados no ato: 2/2 durante a execução, 0 descobertos na reconciliação.
- O teste humano local pegou a regressão de cor que a análise estática não via — o gate de aceitação funcionou como desenhado (2 rodadas de teste).

## O que melhorar

- **Diagnóstico estático não vê renderização:** o `color: white` do bloco removido era carga real e só apareceu no teste. Para rodadas de CSS visual: antes de remover um bloco, listar TODAS as suas declarações e classificar carga real × ruído contra o CSS de design (a auditoria que fizemos pós-fix passa a ser pré-fix).
- **Build do repo:** dist trackeado + `.gitignore` gera warnings no `git add`; e o formato real commitado é dev, não production (Deviation 1) — candidato a padronização futura.
- **Higiene:** worktree órfão pré-existente `.worktrees/feature-332-migracao-coauthors-fatima` (PR #333 já merged) — limpeza pendente de decisão do humano.

## Métricas da rodada

- Perguntas de eliciação: 0 · Desvios: 2 durante execução / 0 na reconciliação · Overrides: 0 · doc-bug: 0 · Rodadas de teste humano: 2 (alinhamento → cor).
- Follow-ups mapeados (sem issue): font-size por módulo (17px), Typekit/Archivo, `.container` fullwidth, perfis in-flow (pré-2024).
