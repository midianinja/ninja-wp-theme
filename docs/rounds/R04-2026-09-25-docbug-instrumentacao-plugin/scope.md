# R04 — doc-bug: manual de instrumentação do plugin (scope)

**Data:** 2026-09-25 · **Demanda:** issue #328 (Minimal, doc-bug) · **Origem:** descoberta na rodada R03 — o comentário de override emitido pela ferramenta na #220 divergiu do formato documentado no manual.

## Dentro do escopo

- Atualizar o manual de instrumentação (`reference/instrumentation.md` na árvore instalada do plugin, `~/.config/opencode/maestra/instructions/`): as seções `type=override` e Event D passam a documentar exatamente os nomes que a ferramenta emite hoje (`disputed_criterion` / `declared_reason`).

## Fora do escopo

- Renomear os campos no código da ferramenta — decisão de manutenção do plugin, não desta correção.

## Critérios de aceite

- Manual sem divergência nas seções override e Event D (nomes = emitidos pela ferramenta).
- Ajuste verificado contra um registro real emitido pela ferramenta.

## Notas

- O plugin está instalado localmente (sem repo visível na conta ou no disco): a correção é aplicada na árvore instalada; quando o plugin ganhar repo próprio, o manual fonte recebe o mesmo ajuste.
