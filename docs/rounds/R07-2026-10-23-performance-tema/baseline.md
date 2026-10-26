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

## 3. Meta mensurável

- **Status: pendente de decisão** (critério de aceitação: "alvo de desempenho
  mobile com número, a definir com o baseline atual"). A ser registrada aqui
  quando decidida — é o ponto de parada da rodada.
