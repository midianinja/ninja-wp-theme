# Baseline — R07 (#225)

> Medidas do "antes", tomadas antes da primeira fatia (critério de aceitação
> da rodada). O "depois" vai em `resultados.md` no fechamento.

## 1. Lighthouse mobile — home, produção (2026-10-26)

- **Método:** Lighthouse 13.5.0 local (npx), Chrome 156 headless, emulação
  mobile padrão, 3 execuções contra `https://midianinja.org/`; valores abaixo
  são as medianas (execuções: 33/34/34 de score).
- **Score performance (mobile): 34/100**
- **LCP:** 13,8 s (execuções: 14,3 / 13,4 / 13,8) — dirigido pelo hero de
  blocos Newspack + anúncios (fora do tema, `caracterizacao.md` §5)
- **TBT:** 1.810 ms (1.900 / 1.670 / 1.810)
- **FCP:** 3,5 s · **SI:** 7,3 s · **CLS:** 0,048 (bom)
- **Peso total transferido:** ~2,1 MB

Contexto da medição: o snapshot PageSpeed enviado pelo cliente (link no corpo
da #225) expirou e não é mais acessível ("A report does not exist"); a API
pública do PageSpeed estava com cota diária excedida no dia — a medição local
usa o mesmo motor (Lighthouse). Re-medição no fechamento da onda com o mesmo
método (3 execuções, mediana).

## 2. Payload estático controlado pelo tema (home, anônimo, sem compressão)

Detalhe e evidência em `caracterizacao.md` §1h:

- JS: ~540 KB (globais 108 KB + 3×96 KB sliders + jquery ~90 KB + migrate
  13 KB + tiny-slider 43 KB) — todos builds de desenvolvimento, com source
  map inline, sem minificação
- CSS: ~130 KB inline não minificado (critical 78 KB + _p-home 52 KB) +
  ~10 KB links assíncronos
- Fontes: ~690 KB em preload (5× Manrope + 3× Tungsten + ícone), TTF/OTF sem
  WOFF2, **preload sem `crossorigin`** (download duplo em rede)

**Total controlado pelo tema: ~1,36 MB dos ~2,1 MB transferidos.**

> **Nota (2026-10-28, fatia 4):** deriva do ar observada no meio da rodada —
> deploys intermediários com builds locais mistos já colocaram em produção o
> CSS inline **minificado** (critical ≈61KB + _p-home ≈43KB) e o `menu.js`
> **minificado** (4,7KB vs 37KB caracterizados). Parte do corte perseguido
> pela rodada já se realizou (ou foi suplantada) no ar; os sliders (96KB dev)
> e os preloads de fonte seguem como caracterizados. O "antes" acima
> permanece como registro do início da rodada; o "depois" no fechamento
> (`resultados.md`) usará o inventário do ar pelo método §1h. Registrado em
> `deviations.md` (Deviation 3).

## 3. Meta mensurável — REGISTRADA

> **Reduzir o payload bruto controlado pelo tema na home de ~1,36MB para
> ≤900KB** (corte de ~470KB, ~35%), usando apenas a onda segura aprovada
> (ranks 1–7 da caracterização).

- **Decidida por:** @filipesouzadev em 2026-10-26, confirmando a proposta
  apresentada ("faça isso").
- **Por que é atingível:** soma das estimativas conservadoras por alavanca —
  sliders rebuildados −150KB · JS globais minificados −40KB · CSS inline
  minificado −75KB · WOFF2 a 30% −205KB = −470KB. Se o WOFF2 entregar os
  40–50% típicos, há ~100–140KB de folga adicional.
- **Método de verificação:** inventário determinístico dos bytes dos artefatos
  enfileirados do tema (dist JS + CSS inline/links + arquivos de fonte em
  preload, sem compressão) — mesmo método do §1h da caracterização,
  executável no repo, imune a variância de anúncios/rede.
- **Evidência secundária (não é alvo):** Lighthouse antes/depois com o mesmo
  método do §1 (3 execuções, medianas). Score/LCP/TBT acompanham como
  evidência — dependem de ads/plugin, fora do controle do tema.
- **Ponto de parada:** a onda tem 7 alavancas finitas; alavanca que
  under-delivrar → desvio declarado no registro da rodada, sem maquiagem.
