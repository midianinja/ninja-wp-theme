# Aprovação Stage 1 — R07 (#225)

> Variante Técnica: Engenharia é a autora, o lado produto aprova o investimento.
> Registro do ato explícito de aprovação (trava anti-autoaprovação — o silêncio
> nunca aprova; a citação é literal, não paráfrase).

- **Aprovado por:** @filipesouzadev (Filipe — Product + Engineering + Delivery, team.md)
- **Data:** 2026-10-26
- **Citação literal:** "vamos seguir com correções no tema que sejam seguras e não afetem estruturalmente nada que possa quebrar."

## Escopo aprovado

Primeira onda segura da caracterização (ranks 1–7 — "mudam bytes, não
comportamento", `caracterizacao.md` §4/§6):

1. `crossorigin` nos preloads de fonte (`assets.php:49`)
2. Rebuild de produção do dist JS (sem source maps inline, minificado — `webpack.mix.js:106`)
3. Rebuild de produção dos view.js dos blocos (3 sliders)
4. Minificar critical.css/_p-home.css inline
5. Restringir callbacks de CSS por template (`assets.php:389–429`)
6. Fontes TTF/OTF → WOFF2
7. `defer` no ElevenLabs + preconnects (elevenlabs.io, ninjaverso.com.br)

## As duas listas

- **Não negociáveis:** paridade visual e funcional — estilos e comportamentos
  preservados; toda fatia comprova paridade pelo protocolo da caracterização
  (diff de handles/URLs, screenshots 320/768/1440, matriz de interação,
  Lighthouse mobile, scan de console).
- **Mudanças propositivas permitidas:** nenhuma — achado que exija mudar
  comportamento ou estilo volta para decisão, não entra por conta própria.

## Fora do escopo aprovado (riscos médios/estruturais — decisão posterior)

jquery-migrate fora da frente; dieta de DOM/menus no header; slick em handle
compartilhado; srcset/lazy ATF nos templates; itens de plugin/servidor
(newspack-blocks, hacklab-blocks, W3TC, ads/GTM — mapear, não alterar).

## Motivação

Registrada no corpo da épica #225 (contexto, meta, não negociáveis, fora de
escopo, critérios de aceitação) — sob o override de 2026-10-23, a rodada inteira
tramita na própria épica, sem issues filhas.
