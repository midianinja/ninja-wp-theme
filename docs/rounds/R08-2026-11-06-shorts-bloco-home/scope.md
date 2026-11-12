# R08 — Shorts reais no bloco de vídeo (scope)

**Data:** 2026-11-06 · **Demanda:** issue #361 (Minimal) · **Relato:** @marinarcruz (2026-11-05) — "A cliente solicitou que o bloco de vídeo da home passe a exibir reels, no mesmo formato já apresentado na página TV Ninja (https://midianinja.org/tv-ninja/)." Esclarecimento da dev (@julialaurentino): os "reels" são **YouTube Shorts**; o bloco "Shorts" da referência tem formato vertical, mas exibe uma playlist comum de vídeos — não shorts da conta.

## Dentro do escopo

- **Backend** (`library/blocks/src/latest-horizontal-posts/includes/videos.php`): nova opção `videoModel: "shorts"` — busca os shorts reais do canal via YouTube Data API v3 (uploads do canal → pré-filtro por duração → validação pelo endpoint `/shorts/{id}`), com cache em transient reaproveitando a opção `youtube_api_cache_ttl`.
- **Frontend** (`latest-horizontal-posts.php` + `style.scss` do bloco): classe dedicada (ex.: `model-shorts`) quando o modelo for shorts, com estilos verticais **no nível do bloco** idênticos à referência da TV Ninja (cards 170×302, radius 12px, sem ícone de play, setas/dots customizados, comportamento mobile da referência) — portátil para qualquer página, sem depender de CSS de página.
- **Editor** (`edit.js`): nova opção "Shorts do canal" no seletor de modelo de vídeo, exibindo o campo de ID do canal.
- **Mobile (incremento de 2026-11-12):** o modelo shorts exibe **2 slides por view no mobile** (≤782px) — cards fluidos com altura fixa 9:16 (275px; 240px ≤359px), cap de 170px para não virar landscape em viewportes intermediários; desktop inalterado.
- **Build** dos blocos (`library/blocks`) e dos assets do tema, conforme convenção do repositório.
- **Última ação — humana (@julialaurentino):** configurar o bloco na **home em ambiente dev e em produção** (apontar o bloco de vídeo existente para o novo modelo "Shorts do canal" com o ID do canal).
- **Ação humana condicionada (@julialaurentino, mediante confirmação do produto):** reconfigurar o bloco "Shorts" da página **TV Ninja** para o novo modelo — só acontece se o produto confirmar; até lá o bloco de lá continua funcionando como está.

## Fora do escopo

- Instagram Reels / TikTok ou qualquer fonte que não seja YouTube Shorts.
- Alterar o CSS da página TV Ninja (`_p-page-videos.scss`) — os estilos verticais são replicados no nível do bloco, a página não é tocada.
- Alterar o bloco `video-playlist`.

## Critérios de aceite

1. Com `videoModel = shorts` + ID do canal configurados, o bloco lista os **shorts mais recentes do canal** — vídeos comuns não entram na lista.
2. Cards verticais visualmente idênticos à referência da TV Ninja, em desktop e mobile.
3. A opção "Shorts do canal" aparece no inspetor do editor com campo de ID do canal; ao selecioná-la, o bloco renderiza no editor via ServerSideRender.
4. Os modelos existentes `playlist` e `channel` continuam funcionando sem alteração de comportamento ou aparência.
5. Cache por transient mantido (sem chamada à API do YouTube a cada pageview); falhas de API degradam sem quebrar a página (comportamento atual preservado).
6. Bloco configurado na home em dev e produção — **ação humana final** (@julialaurentino), após aceite técnico.
7. **Mediante confirmação do produto:** bloco "Shorts" da página TV Ninja reconfigurado para o novo modelo — **ação humana** (@julialaurentino), executada só após o aceite do produto.
8. No mobile (≤782px), o bloco de shorts exibe **2 slides por view** (inclusive ≤359px, com cards menores), mantendo a proporção vertical dos cards, sem overflow ou clipping, com swipe e dots funcionando.

## Notas de derivação (2026-11-06)

- **Diagnóstico (sessão, somente-leitura):** o bloco "Shorts" de `/tv-ninja/` é `ninja/latest-horizontal-posts` com `blockModel: videos` + playlist comum (`block__latest-horizontal-posts-4545029-0`, `show-slides-5`). O formato vertical NÃO vem do bloco: vem de `_p-page-videos.scss` (escopo `body.page-tv-ninja`), que força cards de 170×302px, esconde o `.play` e customiza setas/dots. O estilo nativo do `model-videos` é 16:9 (`padding-top: 56.25%`). O backend (`includes/videos.php`) só conhece `playlist` e `channel`; a API v3 do YouTube não tem endpoint de Shorts.
- **Detecção de shorts (não-oficial, padrão da indústria):** `playlistItems` da playlist de uploads (1 unidade de cota) → `videos.list?part=contentDetails` em lote (1 unidade por 50) → pré-filtro duração ≤180s (desde out/2024 shorts podem ter até 3 min) → validação autoritativa: requisição a `https://www.youtube.com/shorts/{videoId}` — permanece em `/shorts/` = é short; redireciona para `/watch` = não é. Custo de cota desprezível; as N validações HTTP ocorrem só na renovação do cache.
- **Thumbnail vertical:** `https://i.ytimg.com/vi/{id}/oar2.jpg` (thumb 9:16 oficial de shorts), fallback `mqdefault.jpg`; `object-fit: cover` resolve ausências.
- **Classificação:** Minimal (adição única e bem delimitada em um bloco), confirmada em modo direto; 0 perguntas de elicitação (diagnóstico completo fornecido pela dev na abertura da sessão).

## Entrega (2026-11-09)

- **Commit da feature:** `5d42d3ee` (`feat: add Shorts video model to latest-horizontal-posts block (1.9.3) (#361)`) — 7 arquivos: `edit.js` (opção "Shorts (channel)" + campo de canal), `includes/videos.php` (busca de shorts: uploads → duração ≤180s → validação `/shorts/{id}` → cache), `latest-horizontal-posts.php` (classe `model-shorts`), `style.scss` (cards verticais da referência), 2 assets de seta copiados para o bloco, e `style.css` do tema com o **bump de versão 1.9.1 → 1.9.3** (feito pela desenvolvedora).
- **Refação dos commits (2026-11-09):** a primeira entrega (`1c0b7e98` + `d9775562`, merge fast-forward da branch do worktree) foi **resetada pela desenvolvedora** e refeita diretamente em `develop`, desta vez incluindo o bump de versão do tema no commit da feature.
- **Verificação executada:** `php -l` ok nos 2 PHPs; build dos blocos compila (CSS compilado contém `.model-shorts` com 170×302 e `.play` oculto; opção presente no JS compilado); heurística `/shorts/` testada ao vivo (short → 200, vídeo comum → 303→`/watch`, inexistente → 404); parse de duração ISO 8601 testado (PT59S→59, PT1M1S→61, PT3M→180, PT5M30S→330 filtrado, PT1H2M→3720 filtrado); modelos `playlist`/`channel` com diff zero; ambiente local (docker) servindo a branch com HTTP 200.
- **Forma de entrega:** merge fast-forward em `develop` local, **sem push e sem PR** — decisão da desenvolvedora (Deviation 1).
- **Nota de deploy:** `library/blocks/build/` é gitignored neste repositório — o build dos blocos (`npm run build` em `themes/midia-ninja-theme/library/blocks`) precisa rodar no processo de deploy para o CSS/JS compilado chegar ao ambiente.
- **Pendências de validação humana:** teste E2E com a chave real da API do YouTube (banco local não tem a opção `youtube_key`); conferência visual desktop/mobile; após o aceite, configurar o bloco da home (dev e produção) e, mediante confirmação do produto, o bloco "Shorts" da TV Ninja (critérios 6 e 7).

## Incremento — 2 slides no mobile (2026-11-12)

- **Requisito (decisão da desenvolvedora):** "quando o bloco for de shorts, ele exiba 2 slides no mobile".
- **Implementação:** `view.js` (ramo `model-shorts` → `slidesToShowMobile = 2`) + `style.scss` (seção `model-shorts` reworkada no mobile: cards fluidos `width:100%` com altura fixa 275px @≤782px e 240px @≤359px, `max-width:170px` nos elementos do card para preservar o formato vertical em viewportes intermediárias, `.slick-list` 295px/260px; breakpoints desktop intocados).
- **Verificação executada:** build compila; JS compilado contém `model-shorts`→2; CSS compilado sem `325px`/`305px`, com `height:275px`, `height:240px` e `max-width:170px`; demais modelos com diff zero. Aritmética dos slots do slick documentada (card 148-155px × altura 9:16 em viewports 360-375px).
- **Ambiente local:** container `ninja-wp-361` servindo o checkout principal em `http://localhost:8080` (porta 80 ocupada pelo projeto adai-site; `siteurl`/`home` do WP local ajustados para `http://localhost:8080` — reverter ao encerrar).

## Revisão 1 (2026-11-12) — clipping mobile na home

- **Sintoma (reportado pela desenvolvedora, verificado em https://dev.midianinja.org/):** no mobile, os cards do bloco de shorts apareciam com o border-radius cortado embaixo (borda reta) e o layout quebrado.
- **Diagnóstico (evidência executada: CSS servido na dev + reprodução estática headless):** o bloco de shorts carrega as classes `model-videos` (de `model-` . $block_model) **e** `model-shorts`. O CSS de página da home, escrito para o bloco de vídeos legado (cards horizontais 325×182), aplica-se a `.home .model-videos` e atropela o layout: `width:325px !important` e `height:182px` nos slides + `display:flex` no track. A primeira tentativa de correção (seletor `.home &` com `width:auto !important`) colapsou os slides para **0px** — no track flex, `width:auto` usa a largura do conteúdo, que depende da largura do slide (referência circular), confirmado por geometria computada (slide/card/img = 0px).
- **Correção definitiva:** o bloco de shorts passa a usar **somente** `model-shorts` (removido `model-videos` via `array_diff` no ramo videos do `latest-horizontal-posts.php`). Todas as regras de página para `.model-videos` deixam de se aplicar ao bloco de shorts; o slick volta a controlar o sizing responsivo. A neutralização `.home &` foi **removida** (`style.scss` voltou ao estado do commit 5981ddc8).
- **Verificação (reprodução estática com markup real da dev home + CSS da home + build corrigido, chrome headless):** geometria computada a 500px — slick ativo com slots de 248px, card 170×275px com `border-radius:8px`, base do card (397.6px) dentro da faixa do slider (417.6px), margens e track limpos; screenshots em ~375px (2 cards completos lado a lado, raio intacto nos 4 cantos) e 1280px (5 cards verticais, formato da referência).
