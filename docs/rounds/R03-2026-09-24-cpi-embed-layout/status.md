# R03 — CPI da Covid: embed fiel ao site antigo (status / handoff)

**Data:** 2026-09-24 (entregue em 2026-09-25) · **Estado:** entregue na develop (PR #327, mergeado) — pendente deploy + regularização · **Demanda urgente** — sem issue criada por decisão humana (override registrado na issue #220: "foque na resolução do problema").

## A demanda

A página https://midianinja.org/cpi-da-covid/ (produção) usa o template *Embed CPI da Covid* (`themes/midia-ninja-theme/template-embed-cpi.php`), que raspa e injeta o conteúdo de https://antigo.midianinja.org/cpi-da-covid/. Quando o site antigo perdeu a proteção por senha (basic auth no Traefik), a raspagem — que antes falhava com 401 e caía num iframe de fallback com o site antigo inteiro — passou a funcionar e injetou markup Divi cru, sem nenhum CSS do antigo: o layout colapsou.

## Critério de aceite (decisão humana, palavra final)

O embed deve ficar **exatamente como o site antigo**, mostrando **somente o conteúdo da página**: sem o header E sem o footer do site antigo. O chrome do site novo (header/rodapé do midianinja.org) permanece.

## Estado atual

- **Branch de teste:** `fix/cpi-covid-embed-layout-v6` — cadeia de 13 commits (10 originais `20659e5e` → `2a50b53a` + `bf99f32f` docs + `7224c235` rebuild do dist de produção validado no teste + `cf0d899c` gitignore de `.worktrees/`). **Entregue**: PR #327 → `develop`, merge commit `7b6f5f72` (2026-09-25). Aceitação humana 6/6 (veredito por critério no comentário da #220).
- **O que cada iteração entregou:**
  - v1 (`20659e5e`): extração do CSS de design inline do Divi (~255 KB) + enqueue das folhas estruturais do antigo (Divi pai, tema filho, Google Fonts) + guardas contra vazamento no chrome novo.
  - v2 (`c6dfd3d3`, `e237d87c`): revela `.et-waypoint`/`.et_animated` (88 avatares + 5 blocos de texto presos em `opacity:0`), jQuery garantido no `<head>`, menu hambúrguer mobile vanilla, vídeo fluido.
  - v3 (`6b208eab`, `433db625`): chave de transient versionada (`embed_cpi_cache_vN_<md5>`); botão "Saiba mais" sem sufixo (bug de autoria do antigo) abre o perfil vizinho.
  - v4 (`966785f4`): mídia reescrita para `midianinja.org` direto (fim dos saltos 302 do antigo; 233/233 imagens pintando).
  - v5 (`546e5460`, `76e7f868`): créditos empilhados como no antigo (51/51), fade-ins de 1s via IntersectionObserver (curva medida do antigo, fallback sem JS visível), rolagem suave nas âncoras, parallax; incluiu o footer do antigo (depois revertido).
  - v6 (`2a50b53a`): remove o footer do antigo — regra final "somente conteúdo da página".
- **Validações headless (evidências nas sessões de especialista):** créditos 51/51 empilhados e pintados; footer do antigo ausente; modais 11/11 (perfis, "Saiba mais" numerado e sem sufixo, imagem, ESC/clique-fora); 9 seções; zero erros de página.
- **Desvios declarados (conscientes):** glifo do menu hambúrguer usa fonte do antigo que falha por CORS (só o ícone); 37 avatares em grupos filtrados do carômetro só revelam quando o filtro os exibe (paridade com o antigo).

## Pendências (retomar daqui)

1. ~~Teste humano do v6~~ — **feito em 2026-09-25, 6/6 aprovados** (veredito por critério registrado na #220).
2. ~~Push + PR → develop + limpeza dos branches intermediários~~ — **feito em 2026-09-25**: PR #327 mergeado (`7b6f5f72`); branches intermediários locais removidos; remoto do v6 removido; v6 local mantido como registro.
3. **Deploy:** usar o dist de produção commitado (nunca o output do watch de dev — há um stash `ops: local dev-rebuild of embed-cpi dist…` com o output do watcher, descartável); transient `v6` invalida automaticamente os caches antigos.
4. **Regularização do fluxo (deferida pelo override):** desfecho na #220 (fechar ou converter em issue da correção); doc-bug do manual de instrumentação do plugin (nomes de campos divergem da ferramenta: `disputed_criterion`/`declared_reason` × documentado `contested_criterion`/`stated_reason`); migrar a pasta legada `.maestra/`.

## Onde as coisas estão

- **Worktree:** `.worktrees/cpi-covid-layout-fix` (detached @ `2a50b53a`, limpo) — obsoleta após a entrega; remoção opcional na regularização.
- **Branches:** `fix/cpi-covid-embed-layout-v6` mantido localmente (registro da rodada); worktree irmã `doe-page-scroll-css` intocada.
- **Artefatos efêmeros** (simulações PHP do pipeline, harness headless, screenshots) em `/tmp/opencode/` — podem não sobreviver a reboot; recriáveis a partir do repo (o pipeline de simulação espelha `template-embed-cpi.php`).
- **Registrado na plataforma:** issue #220 (override da triagem + eventos A/B/D + comentário de aceitação 6/6 com a entrega via PR #327).

## Como retomar

Abrir sessão neste repo e dizer "retomar a CPI da Covid" — este arquivo + a #220 + os branches dão o estado completo.
