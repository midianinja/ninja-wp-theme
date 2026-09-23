/**
 * Modal do bloco de perfis do template Embed CPI da Covid.
 *
 * O conteúdo é raspado do site antigo (Divi), onde os cards de perfis usam
 * as classes `lightbox-trigger-perfilN` (gatilhos) e `lightbox-content-perfilN`
 * (conteúdo do modal, escondido). No antigo isso era ligado via jQuery +
 * Magnific Popup, que não existem neste tema — aqui é reimplementado em
 * vanilla JS, sem dependências.
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

        // Delegação de clique: cobre cards e botões "Saiba mais".
        scope.addEventListener('click', (event) => {
            const trigger = event.target.closest('[class*="lightbox-trigger-"]');

            if (!trigger) {
                return;
            }

            event.preventDefault();

            const suffix = this.extractSuffix(trigger);

            if (!suffix) {
                return;
            }

            const content = scope.querySelector('.lightbox-content-' + suffix);

            if (content) {
                this.open(content);
            }
        });
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
        this.lastFocus = document.activeElement;

        this.overlay = document.createElement('div');
        this.overlay.className = 'embed-cpi-modal';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');

        const panel = document.createElement('div');
        panel.className = 'embed-cpi-modal__panel';

        const closeButton = document.createElement('button');
        closeButton.className = 'embed-cpi-modal__close';
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('aria-label', 'Fechar');
        closeButton.textContent = '×';

        // O conteúdo original fica escondido (display: none); o clone precisa reaparecer.
        const contentClone = content.cloneNode(true);
        contentClone.style.display = '';

        panel.appendChild(closeButton);
        panel.appendChild(contentClone);
        this.overlay.appendChild(panel);
        document.body.appendChild(this.overlay);

        document.body.style.overflow = 'hidden';

        closeButton.focus();

        closeButton.addEventListener('click', () => this.close());
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
