/**
 * Modal do bloco de perfis do template Embed CPI da Covid.
 *
 * O conteúdo é raspado do site antigo (Divi), onde os cards de perfis usam
 * as classes `lightbox-trigger-perfilN` (gatilhos) e `lightbox-content-perfilN`
 * (conteúdo do modal, escondido). No antigo isso era ligado via jQuery +
 * Magnific Popup, que não existem neste tema — aqui é reimplementado em
 * vanilla JS, sem dependências.
 *
 * Além dos perfis, esta camada também cobre genericamente os demais padrões
 * de lightbox que o site antigo pode conter no HTML raspado:
 * - popups inline (`href="#id"` em gatilhos com semântica de popup:
 *   .magnific-popup, .et_pb_lightbox, [data-embed-lightbox]);
 * - lightbox de imagem (links para arquivos de imagem, padrão das galerias
 *   Divi e do Magnific);
 * - popup de vídeo/iframe (YouTube, Vimeo ou arquivo de vídeo direto).
 *
 * Também substitui o que o JS do Divi (custom.js) fazia pelos módulos que
 * existem de fato no HTML raspado (menu hamburguer das fullwidth menus; a
 * revelação de .et-waypoint é via CSS no template).
 */
export class EmbedCpiModal {

    constructor() {
        this.overlay   = null;
        this.lastFocus = null;
        this.init();
    }

    init() {
        const scope = document.querySelector('.embed-cpi-inner');

        if (!scope) {
            console.warn('[embed-cpi] .embed-cpi-inner não encontrado — scrape falhou ou seletores não batem');
            return;
        }

        // Esconde os conteúdos de modal embutidos no HTML raspado.
        scope.querySelectorAll('[class*="lightbox-content-"]').forEach((el) => {
            el.style.display = 'none';
        });

        // Camada dos módulos Divi que dependiam do custom.js do site antigo.
        this.initDiviModules(scope);

        // Delegação de clique: cobre cards, botões "Saiba mais" e os padrões
        // genéricos de lightbox (imagem, vídeo, inline).
        scope.addEventListener('click', (event) => {
            const trigger = event.target.closest('[class*="lightbox-trigger-"]');

            if (trigger) {
                event.preventDefault();

                const content = this.resolveTriggerContent(scope, trigger);

                if (content) {
                    this.open(content);
                }
                return;
            }

            // Gatilhos genéricos: apenas elementos com semântica explícita de
            // popup (o Magnific do antigo ligava via classe), para não sequestrar
            // âncoras internas (#secao) da página.
            const generic = event.target.closest('a.magnific-popup, a.et_pb_lightbox, [data-embed-lightbox]');

            if (generic) {
                const href = generic.getAttribute('href') || '';
                let handled = false;

                if (href.charAt(0) === '#' && href.length > 1) {
                    const target = document.getElementById(href.slice(1));

                    if (target) {
                        event.preventDefault();
                        this.open(target);
                        handled = true;
                    }
                } else {
                    handled = this.openByHref(href, event);
                }

                if (!handled && generic.tagName === 'A') {
                    // Deixa o navegador seguir o link normalmente.
                    return;
                }
                return;
            }

            // Lightbox de imagem/vídeo para qualquer link de mídia (padrão das
            // galerias Divi: <a href="imagem.jpg"><img ...></a>).
            const anchor = event.target.closest('a[href]');

            if (anchor) {
                this.openByHref(anchor.getAttribute('href') || '', event);
            }
        });
    }

    /**
     * Comportamentos dos módulos Divi presentes no HTML raspado cujo JS
     * original (custom.js + jQuery) não é carregado aqui.
     *
     * - Menu hamburguer (et_pb_fullwidth_menu): abaixo de 980px o CSS do
     *   Divi esconde nav+ul e só o clique no .mobile_nav reexibia (o estado
     *   aberto é estilizado no CSS do template via .menu-opened).
     *
     * A revelação de .et-waypoint/.et_animated (imagens e textos que o Divi
     * mantinha com opacity:0 até o scroll) é feita 100% em CSS no template,
     * para não depender do bundle nem cobrir clones do modal.
     */
    initDiviModules(scope) {
        scope.addEventListener('click', (event) => {
            const toggle = event.target.closest('.et_mobile_nav_menu .mobile_nav');

            if (!toggle) {
                return;
            }

            event.preventDefault();

            const menu = toggle.closest('.et_pb_fullwidth_menu');

            if (!menu) {
                return;
            }

            const opened = menu.classList.toggle('menu-opened');

            toggle.classList.toggle('opened', opened);
            toggle.classList.toggle('closed', !opened);
            toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
        });
    }

    /**
     * Roteia um href para o modal correspondente (imagem, vídeo ou iframe).
     * Retorna true quando abriu um modal (e chamou preventDefault).
     */
    openByHref(href, event) {
        if (!href || href.charAt(0) === '#') {
            return false; // âncoras internas: navegação normal dentro do embed
        }

        const video = this.parseVideoUrl(href);

        if (video) {
            if (event) {
                event.preventDefault();
            }

            if (video.provider === 'file') {
                this.openMedia({ video: video.src });
            } else {
                this.openMedia({ iframe: video.src });
            }
            return true;
        }

        if (this.isImageUrl(href)) {
            if (event) {
                event.preventDefault();
            }
            this.openMedia({ image: href });
            return true;
        }

        return false;
    }

    isImageUrl(href) {
        return /\.(png|jpe?g|gif|webp|avif|bmp|svg)(\?|#|$)/i.test(href);
    }

    /**
     * Converte URLs de vídeo (YouTube/Vimeo/arquivo) para exibição em modal.
     */
    parseVideoUrl(href) {
        const yt = href.match(/^(?:https?:)?\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i);

        if (yt) {
            return { provider: 'youtube', src: 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1' };
        }

        const vimeo = href.match(/^(?:https?:)?\/\/(?:www\.)?vimeo\.com\/(\d+)/i);

        if (vimeo) {
            return { provider: 'vimeo', src: 'https://player.vimeo.com/video/' + vimeo[1] + '?autoplay=1' };
        }

        if (/\.(mp4|webm|ogv|ogg|mov)(\?|#|$)/i.test(href)) {
            return { provider: 'file', src: href };
        }

        return null;
    }

    extractSuffix(trigger) {
        for (const cls of trigger.classList) {
            if (cls.indexOf('lightbox-trigger-') === 0) {
                return cls.split('lightbox-trigger-')[1];
            }
        }

        return null;
    }

    /**
     * Resolves the modal content for a trigger. Numbered classes
     * (`lightbox-trigger-perfilN` → `.lightbox-content-perfilN`) resolve
     * directly. Fallback: the scraped page has "Saiba mais" buttons carrying
     * the bare class `lightbox-trigger-perfil` with no suffix (authoring bug
     * of the old site) — those resolve through the numbered trigger of the
     * profile card that shares the same Divi column.
     */
    resolveTriggerContent(scope, trigger) {
        const suffix = this.extractSuffix(trigger);

        if (suffix) {
            const content = scope.querySelector('.lightbox-content-' + suffix);

            if (content) {
                return content;
            }
        }

        const column = trigger.closest('.et_pb_column');

        if (!column) {
            return null;
        }

        for (const candidate of column.querySelectorAll('[class*="lightbox-trigger-"]')) {
            if (candidate === trigger) {
                continue;
            }

            const candidateSuffix = this.extractSuffix(candidate);
            const candidateContent = candidateSuffix
                ? scope.querySelector('.lightbox-content-' + candidateSuffix)
                : null;

            if (candidateContent) {
                return candidateContent;
            }
        }

        return null;
    }

    open(content) {
        // O conteúdo original fica escondido (display: none); o clone precisa reaparecer.
        const contentClone = content.cloneNode(true);
        contentClone.style.display = '';

        const panel = this.buildPanel();
        panel.appendChild(contentClone);
        this.mount(panel);
    }

    /**
     * Modal de mídia: imagem, <video> ou iframe (YouTube/Vimeo).
     */
    openMedia(media) {
        const panel = this.buildPanel(true);
        let el;

        if (media.image) {
            el = document.createElement('img');
            el.className = 'embed-cpi-modal__media';
            el.src = media.image;
            el.alt = '';
        } else if (media.video) {
            el = document.createElement('video');
            el.className = 'embed-cpi-modal__media';
            el.src = media.video;
            el.controls = true;
            el.autoplay = true;
        } else if (media.iframe) {
            el = document.createElement('iframe');
            el.className = 'embed-cpi-modal__media';
            el.src = media.iframe;
            el.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            el.allowFullscreen = true;
        }

        if (el) {
            panel.appendChild(el);
            this.mount(panel);
        }
    }

    buildPanel(media) {
        const panel = document.createElement('div');
        panel.className = 'embed-cpi-modal__panel' + (media ? ' embed-cpi-modal__panel--media' : '');

        const closeButton = document.createElement('button');
        closeButton.className = 'embed-cpi-modal__close';
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('aria-label', 'Fechar');
        closeButton.textContent = '×';

        panel.appendChild(closeButton);
        closeButton.addEventListener('click', () => this.close());

        return panel;
    }

    mount(panel) {
        this.lastFocus = document.activeElement;

        this.overlay = document.createElement('div');
        this.overlay.className = 'embed-cpi-modal';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');

        this.overlay.appendChild(panel);
        document.body.appendChild(this.overlay);

        document.body.style.overflow = 'hidden';

        this.overlay.addEventListener('click', (event) => {
            if (event.target === this.overlay) {
                this.close();
            }
        });
        this.onKeydown = (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.onKeydown);

        const closeButton = panel.querySelector('.embed-cpi-modal__close');

        if (closeButton) {
            closeButton.focus();
        }
    }

    close() {
        if (!this.overlay) {
            return;
        }

        this.overlay.remove();
        this.overlay = null;
        document.body.style.overflow = '';

        document.removeEventListener('keydown', this.onKeydown);

        if (this.lastFocus && this.lastFocus.focus) {
            this.lastFocus.focus();
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new EmbedCpiModal();
});
