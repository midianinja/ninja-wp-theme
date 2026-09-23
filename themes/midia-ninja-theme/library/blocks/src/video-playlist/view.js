const args = window.videoPlaylistArgs || {}

const complianzActive = args.complianzActive === true || args.complianzActive === '1'

document.addEventListener('DOMContentLoaded', function () {
    initGalleries()
    document.addEventListener('cmplz_status_change', onConsentChange)
})

function hasVideoConsent() {
    if (!complianzActive) {
        return true
    }

    if (typeof cmplz_has_consent === 'function') {
        return cmplz_has_consent('marketing')
    }

    return document.body.classList.contains('cmplz-status-allow')
}

function onConsentChange() {
    document.querySelectorAll('.video-gallery-consent-overlay').forEach(overlay => overlay.remove())

    if (!hasVideoConsent()) {
        return
    }

    document.querySelectorAll('.video-gallery-block__player iframe').forEach(iframe => {
        if (iframe.getAttribute('src') === 'about:blank' && iframe.getAttribute('data-src-cmplz')) {
            iframe.setAttribute('src', iframe.getAttribute('data-src-cmplz'))
        }
    })
}

function buildEmbedUrl(videoId, { autoplay = false, loop = false, muted = false } = {}) {
    const params = new URLSearchParams({
        origin: window.location.origin,
        showinfo: '0',
        'video-id': videoId,
        modestbranding: '1',
        rel: '0',
        autoplay: autoplay ? '1' : '0',
        mute: muted ? '1' : '0',
        loop: loop ? '1' : '0'
    })

    if (loop) {
        params.set('playlist', videoId)
    }

    return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?' + params.toString()
}

function createConsentOverlay() {
    const overlay = document.createElement('div')
    overlay.className = 'video-gallery-consent-overlay'
    overlay.setAttribute('role', 'alert')

    const message = document.createElement('p')
    message.className = 'video-gallery-consent-overlay__message'
    message.textContent = 'Para assistir aos vídeos do YouTube, é necessário aceitar os cookies.'

    const button = document.createElement('button')
    button.className = 'video-gallery-consent-overlay__button'
    button.setAttribute('type', 'button')
    button.textContent = 'Gerenciar cookies'

    button.addEventListener('click', function () {
        document.dispatchEvent(new Event('cmplz_show_settings'))
    })

    overlay.appendChild(message)
    overlay.appendChild(button)

    return overlay
}

function ensureConsent(container) {
    if (hasVideoConsent()) {
        return true
    }

    if (!container.querySelector(':scope > .video-gallery-consent-overlay')) {
        container.appendChild(createConsentOverlay())
    }

    return false
}

function initGalleries() {
    document.querySelectorAll('.video-gallery-block').forEach(block => {
        if (block.classList.contains('video-gallery--popup')) {
            initPopupGallery(block)
        } else {
            initSidebarGallery(block)
        }
    })
}

function initSidebarGallery(block) {
    const player = block.querySelector('.video-gallery-block__player')

    if (!player) {
        return
    }

    const iframe = player.querySelector('iframe')
    const playerTitle = player.querySelector('.video-gallery-block__player-title')

    if (!iframe) {
        return
    }

    const setVideo = (videoId, title) => {
        const url = buildEmbedUrl(videoId, { autoplay: true })

        player.setAttribute('data-video-id', videoId)
        player.setAttribute('data-title', title)
        iframe.setAttribute('src', url)
        iframe.setAttribute('data-src-cmplz', buildEmbedUrl(videoId))

        if (playerTitle) {
            playerTitle.textContent = title
        }
    }

    block.querySelectorAll('.video-gallery-block__item').forEach(item => {
        item.addEventListener('click', function () {
            if (this.classList.contains('is-active')) {
                return
            }

            if (!ensureConsent(player)) {
                return
            }

            block.querySelectorAll('.video-gallery-block__item.is-active').forEach(active => active.classList.remove('is-active'))
            this.classList.add('is-active')

            setVideo(this.getAttribute('data-video-id'), this.getAttribute('data-title'))
        })
    })

    if (!hasVideoConsent()) {
        ensureConsent(player)
    }
}

function initPopupGallery(block) {
    const autoplay = block.getAttribute('data-autoplay') === '1'
    const loop = block.getAttribute('data-loop') === '1'
    const muted = block.getAttribute('data-muted') === '1'

    block.querySelectorAll('.video-gallery-block__item').forEach(item => {
        item.addEventListener('click', function () {
            if (!ensureConsent(block)) {
                return
            }

            openVideoLightbox(this.getAttribute('data-video-id'), this.getAttribute('data-title'), { autoplay, loop, muted })
        })
    })
}

function openVideoLightbox(videoId, videoTitle, options) {
    if (!videoId) {
        return
    }

    closeVideoLightbox()

    const lightbox = document.createElement('div')
    lightbox.classList.add('video-gallery-lightbox')
    lightbox.setAttribute('role', 'dialog')
    lightbox.setAttribute('aria-modal', 'true')

    const inner = document.createElement('div')
    inner.classList.add('video-gallery-lightbox__inner')

    const closeButton = document.createElement('button')
    closeButton.classList.add('video-gallery-lightbox__close')
    closeButton.setAttribute('type', 'button')
    closeButton.setAttribute('aria-label', 'Fechar')
    closeButton.innerHTML = '&times;'

    const wrapper = document.createElement('div')
    wrapper.classList.add('video-gallery-lightbox__player')

    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', buildEmbedUrl(videoId, options))
    iframe.setAttribute('title', videoTitle || '')
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
    iframe.setAttribute('allowfullscreen', '')

    wrapper.appendChild(iframe)
    inner.appendChild(closeButton)
    inner.appendChild(wrapper)
    lightbox.appendChild(inner)
    document.body.appendChild(lightbox)
    document.body.classList.add('video-gallery-lightbox-open')

    closeButton.addEventListener('click', closeVideoLightbox)
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            closeVideoLightbox()
        }
    })
    document.addEventListener('keydown', handleLightboxEscape)
}

function handleLightboxEscape(event) {
    if (event.key === 'Escape') {
        closeVideoLightbox()
    }
}

function closeVideoLightbox() {
    const lightbox = document.querySelector('.video-gallery-lightbox')

    if (lightbox) {
        lightbox.remove()
    }

    document.body.classList.remove('video-gallery-lightbox-open')
    document.removeEventListener('keydown', handleLightboxEscape)
}
