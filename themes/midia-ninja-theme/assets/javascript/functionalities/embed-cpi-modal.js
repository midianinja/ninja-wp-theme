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

        // Delegação de clique: cobre cards, botões "Saiba mais" e os padrões
        // genéricos de lightbox (imagem, vídeo, inline).
        scope.addEventListener('click', (event) => {
            const trigger = event.target.closest('[class*="lightbox-trigger-"]');

            if (trigger) {
                event.preventDefault();

                const suffix = this.extractSuffix(trigger);

                if (!suffix) {
                    return;
                }

                const content = scope.querySelector('.lightbox-content-' + suffix);

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
