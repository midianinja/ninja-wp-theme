/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = ".//dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/functionalities/embed-cpi-modal.js":
/*!**************************************************************!*\
  !*** ./assets/javascript/functionalities/embed-cpi-modal.js ***!
  \**************************************************************/
/*! exports provided: EmbedCpiModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmbedCpiModal", function() { return EmbedCpiModal; });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
 * existem de fato no HTML raspado:
 * - menu hamburguer das fullwidth menus;
 * - fade-in de .et-waypoint/.et_animated ao rolar (IntersectionObserver,
 *   com fallback no-JS via CSS no template — a marcação abaixo no <html>
 *   é o que habilita o estado animado);
 * - smooth scroll das âncoras internas (body.et_smooth_scroll no antigo);
 * - parallax do fundo .et_parallax_bg (mesma matemática do script do antigo).
 */

// Marks the document as JS-enhanced BEFORE first paint of below-fold content:
// the template CSS only hides .et-waypoint/.et_animated under this class, so
// a failed/absent JS bundle leaves every module visible (no-JS fallback).
document.documentElement.classList.add('embed-cpi-anim');
var EmbedCpiModal = /*#__PURE__*/function () {
  function EmbedCpiModal() {
    _classCallCheck(this, EmbedCpiModal);
    this.overlay = null;
    this.lastFocus = null;
    this.init();
  }
  _createClass(EmbedCpiModal, [{
    key: "init",
    value: function init() {
      var _this = this;
      var scope = document.querySelector('.embed-cpi-inner');
      if (!scope) {
        console.warn('[embed-cpi] .embed-cpi-inner não encontrado — scrape falhou ou seletores não batem');
        return;
      }

      // Camada dos módulos Divi que dependiam do custom.js do site antigo.
      this.initDiviModules(scope);
      this.initWaypoints(scope);
      this.initParallax(scope);

      // Delegação de clique: cobre cards, botões "Saiba mais" e os padrões
      // genéricos de lightbox (imagem, vídeo, inline).
      scope.addEventListener('click', function (event) {
        var trigger = event.target.closest('[class*="lightbox-trigger-"]');
        if (trigger) {
          event.preventDefault();
          var content = _this.resolveTriggerContent(scope, trigger);
          if (content) {
            _this.open(content);
          }
          return;
        }

        // Gatilhos genéricos: apenas elementos com semântica explícita de
        // popup (o Magnific do antigo ligava via classe), para não sequestrar
        // âncoras internas (#secao) da página.
        var generic = event.target.closest('a.magnific-popup, a.et_pb_lightbox, [data-embed-lightbox]');
        if (generic) {
          var href = generic.getAttribute('href') || '';
          var handled = false;
          if (href.charAt(0) === '#' && href.length > 1) {
            var target = document.getElementById(href.slice(1));
            if (target) {
              event.preventDefault();
              _this.open(target);
              handled = true;
            }
          } else {
            handled = _this.openByHref(href, event);
          }
          if (!handled && generic.tagName === 'A') {
            // Deixa o navegador seguir o link normalmente.
            return;
          }
          return;
        }

        // Lightbox de imagem/vídeo para qualquer link de mídia (padrão das
        // galerias Divi: <a href="imagem.jpg"><img ...></a>). Âncoras
        // internas (#secao) fazem smooth scroll dentro do embed, como o
        // body.et_smooth_scroll do antigo — sem tocar o chrome do site novo.
        var anchor = event.target.closest('a[href]');
        if (anchor) {
          var _href = anchor.getAttribute('href') || '';
          var hashIndex = _href.indexOf('#');
          var hash = hashIndex >= 0 ? _href.slice(hashIndex) : '';
          if (hash.length > 1) {
            var _target = _this.findAnchorTarget(scope, hash);
            if (_target) {
              event.preventDefault();
              _target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              return;
            }
            // Alvo inexistente: segue o comportamento nativo do navegador.
          } else if (hash === '#') {
            event.preventDefault(); // placeholder "#" do Divi: não navega
            return;
          }
          _this.openByHref(_href, event);
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
     * mantinha com opacity:0 até o scroll) e o parallax ficam em
     * initWaypoints/initParallax abaixo.
     */
  }, {
    key: "initDiviModules",
    value: function initDiviModules(scope) {
      scope.addEventListener('click', function (event) {
        var toggle = event.target.closest('.et_mobile_nav_menu .mobile_nav');
        if (!toggle) {
          return;
        }
        event.preventDefault();
        var menu = toggle.closest('.et_pb_fullwidth_menu');
        if (!menu) {
          return;
        }
        var opened = menu.classList.toggle('menu-opened');
        toggle.classList.toggle('opened', opened);
        toggle.classList.toggle('closed', !opened);
        toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
      });
    }

    /**
     * Fade-in on scroll, like the old site's Divi waypoints: elements with
     * .et-waypoint/.et_animated fade in (1s, Divi's own curve — the old page
     * ships .et-animated{animation:fade 1s cubic-bezier(.77,0,.175,1)} and
     * et_animation_data with fade 1000ms ease-in-out) the moment they enter
     * the viewport, once. Without this bundle the template CSS keeps them
     * visible (no-JS fallback).
     */
  }, {
    key: "initWaypoints",
    value: function initWaypoints(scope) {
      var targets = scope.querySelectorAll('.et-waypoint, .et_animated');
      if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) {
          return el.classList.add('embed-cpi-revealed');
        });
        return;
      }
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('embed-cpi-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -5% 0px'
      });
      targets.forEach(function (el) {
        return observer.observe(el);
      });
    }

    /**
     * Parallax for Divi parallax section backgrounds (.et_parallax_bg).
     * Same math as the script the old page ships itself ("aplica parallax
     * divi no mobile tbm" — a port of Divi's desktop behavior):
     *   height = 0.3 * viewportHeight + sectionHeight
     *   translateY = 0.3 * (viewportHeight - sectionTopRelativeToViewport)
     */
  }, {
    key: "initParallax",
    value: function initParallax(scope) {
      var backgrounds = scope.querySelectorAll('.et_pb_section_parallax .et_parallax_bg');
      if (!backgrounds.length) {
        return;
      }
      var ticking = false;
      var update = function update() {
        ticking = false;
        var viewportHeight = window.innerHeight;
        backgrounds.forEach(function (bg) {
          var section = bg.parentElement;
          if (!section) {
            return;
          }
          var rect = section.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > viewportHeight) {
            return; // off-screen: skip
          }
          var fullscreen = section.classList.contains('et_pb_fullscreen');
          var sectionHeight = fullscreen && viewportHeight > rect.height ? viewportHeight : rect.height;
          bg.style.height = 0.3 * viewportHeight + sectionHeight + 'px';
          bg.style.transform = 'translate(0, ' + 0.3 * (viewportHeight - rect.top) + 'px)';
        });
      };
      var requestTick = function requestTick() {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      };
      window.addEventListener('scroll', requestTick, {
        passive: true
      });
      window.addEventListener('resize', requestTick);
      update();
    }

    /**
     * Resolve the in-embed target of an internal anchor (#id), the way the
     * old page's sections are addressed (ids live inside .embed-cpi-inner).
     */
  }, {
    key: "findAnchorTarget",
    value: function findAnchorTarget(scope, hash) {
      var id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch (error) {
        // malformed escape sequence: keep raw id
      }
      var target = scope.querySelector('#' + (window.CSS && CSS.escape ? CSS.escape(id) : id));
      return target || document.getElementById(id);
    }

    /**
     * Roteia um href para o modal correspondente (imagem, vídeo ou iframe).
     * Retorna true quando abriu um modal (e chamou preventDefault).
     */
  }, {
    key: "openByHref",
    value: function openByHref(href, event) {
      if (!href || href.charAt(0) === '#') {
        return false; // âncoras internas: navegação normal dentro do embed
      }
      var video = this.parseVideoUrl(href);
      if (video) {
        if (event) {
          event.preventDefault();
        }
        if (video.provider === 'file') {
          this.openMedia({
            video: video.src
          });
        } else {
          this.openMedia({
            iframe: video.src
          });
        }
        return true;
      }
      if (this.isImageUrl(href)) {
        if (event) {
          event.preventDefault();
        }
        this.openMedia({
          image: href
        });
        return true;
      }
      return false;
    }
  }, {
    key: "isImageUrl",
    value: function isImageUrl(href) {
      return /\.(png|jpe?g|gif|webp|avif|bmp|svg)(\?|#|$)/i.test(href);
    }

    /**
     * Converte URLs de vídeo (YouTube/Vimeo/arquivo) para exibição em modal.
     */
  }, {
    key: "parseVideoUrl",
    value: function parseVideoUrl(href) {
      var yt = href.match(/^(?:https?:)?\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i);
      if (yt) {
        return {
          provider: 'youtube',
          src: 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1'
        };
      }
      var vimeo = href.match(/^(?:https?:)?\/\/(?:www\.)?vimeo\.com\/(\d+)/i);
      if (vimeo) {
        return {
          provider: 'vimeo',
          src: 'https://player.vimeo.com/video/' + vimeo[1] + '?autoplay=1'
        };
      }
      if (/\.(mp4|webm|ogv|ogg|mov)(\?|#|$)/i.test(href)) {
        return {
          provider: 'file',
          src: href
        };
      }
      return null;
    }
  }, {
    key: "extractSuffix",
    value: function extractSuffix(trigger) {
      var _iterator = _createForOfIteratorHelper(trigger.classList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cls = _step.value;
          if (cls.indexOf('lightbox-trigger-') === 0) {
            return cls.split('lightbox-trigger-')[1];
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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
  }, {
    key: "resolveTriggerContent",
    value: function resolveTriggerContent(scope, trigger) {
      var suffix = this.extractSuffix(trigger);
      if (suffix) {
        var content = scope.querySelector('.lightbox-content-' + suffix);
        if (content) {
          return content;
        }
      }
      var column = trigger.closest('.et_pb_column');
      if (!column) {
        return null;
      }
      var _iterator2 = _createForOfIteratorHelper(column.querySelectorAll('[class*="lightbox-trigger-"]')),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var candidate = _step2.value;
          if (candidate === trigger) {
            continue;
          }
          var candidateSuffix = this.extractSuffix(candidate);
          var candidateContent = candidateSuffix ? scope.querySelector('.lightbox-content-' + candidateSuffix) : null;
          if (candidateContent) {
            return candidateContent;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return null;
    }
  }, {
    key: "open",
    value: function open(content) {
      // O popup trabalha sobre uma cópia, como o Magnific do antigo (os
      // blocos de créditos seguem visíveis/empilhados no fluxo da página).
      var contentClone = content.cloneNode(true);
      contentClone.style.display = '';
      var panel = this.buildPanel();
      panel.appendChild(contentClone);
      this.mount(panel);
    }

    /**
     * Modal de mídia: imagem, <video> ou iframe (YouTube/Vimeo).
     */
  }, {
    key: "openMedia",
    value: function openMedia(media) {
      var panel = this.buildPanel(true);
      var el;
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
  }, {
    key: "buildPanel",
    value: function buildPanel(media) {
      var _this2 = this;
      var panel = document.createElement('div');
      panel.className = 'embed-cpi-modal__panel' + (media ? ' embed-cpi-modal__panel--media' : '');
      var closeButton = document.createElement('button');
      closeButton.className = 'embed-cpi-modal__close';
      closeButton.setAttribute('type', 'button');
      closeButton.setAttribute('aria-label', 'Fechar');
      closeButton.textContent = '×';
      panel.appendChild(closeButton);
      closeButton.addEventListener('click', function () {
        return _this2.close();
      });
      return panel;
    }
  }, {
    key: "mount",
    value: function mount(panel) {
      var _this3 = this;
      this.lastFocus = document.activeElement;
      this.overlay = document.createElement('div');
      this.overlay.className = 'embed-cpi-modal';
      this.overlay.setAttribute('role', 'dialog');
      this.overlay.setAttribute('aria-modal', 'true');
      this.overlay.appendChild(panel);
      document.body.appendChild(this.overlay);
      document.body.style.overflow = 'hidden';
      this.overlay.addEventListener('click', function (event) {
        if (event.target === _this3.overlay) {
          _this3.close();
        }
      });
      this.onKeydown = function (event) {
        if (event.key === 'Escape') {
          _this3.close();
        }
      };
      document.addEventListener('keydown', this.onKeydown);
      var closeButton = panel.querySelector('.embed-cpi-modal__close');
      if (closeButton) {
        closeButton.focus();
      }
    }
  }, {
    key: "close",
    value: function close() {
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
  }]);
  return EmbedCpiModal;
}();
document.addEventListener('DOMContentLoaded', function () {
  new EmbedCpiModal();
});

/***/ }),

/***/ 4:
/*!********************************************************************!*\
  !*** multi ./assets/javascript/functionalities/embed-cpi-modal.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /app/assets/javascript/functionalities/embed-cpi-modal.js */"./assets/javascript/functionalities/embed-cpi-modal.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2VtYmVkLWNwaS1tb2RhbC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsIkVtYmVkQ3BpTW9kYWwiLCJfY2xhc3NDYWxsQ2hlY2siLCJvdmVybGF5IiwibGFzdEZvY3VzIiwiaW5pdCIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiX3RoaXMiLCJzY29wZSIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwid2FybiIsImluaXREaXZpTW9kdWxlcyIsImluaXRXYXlwb2ludHMiLCJpbml0UGFyYWxsYXgiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ0cmlnZ2VyIiwidGFyZ2V0IiwiY2xvc2VzdCIsInByZXZlbnREZWZhdWx0IiwiY29udGVudCIsInJlc29sdmVUcmlnZ2VyQ29udGVudCIsIm9wZW4iLCJnZW5lcmljIiwiaHJlZiIsImdldEF0dHJpYnV0ZSIsImhhbmRsZWQiLCJjaGFyQXQiLCJsZW5ndGgiLCJnZXRFbGVtZW50QnlJZCIsInNsaWNlIiwib3BlbkJ5SHJlZiIsInRhZ05hbWUiLCJhbmNob3IiLCJoYXNoSW5kZXgiLCJpbmRleE9mIiwiaGFzaCIsImZpbmRBbmNob3JUYXJnZXQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJ0b2dnbGUiLCJtZW51Iiwib3BlbmVkIiwic2V0QXR0cmlidXRlIiwidGFyZ2V0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ3aW5kb3ciLCJmb3JFYWNoIiwiZWwiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJyb290TWFyZ2luIiwib2JzZXJ2ZSIsImJhY2tncm91bmRzIiwidGlja2luZyIsInVwZGF0ZSIsInZpZXdwb3J0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJiZyIsInNlY3Rpb24iLCJwYXJlbnRFbGVtZW50IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsInRvcCIsImZ1bGxzY3JlZW4iLCJjb250YWlucyIsInNlY3Rpb25IZWlnaHQiLCJoZWlnaHQiLCJzdHlsZSIsInRyYW5zZm9ybSIsInJlcXVlc3RUaWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicGFzc2l2ZSIsImlkIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZXJyb3IiLCJDU1MiLCJlc2NhcGUiLCJ2aWRlbyIsInBhcnNlVmlkZW9VcmwiLCJwcm92aWRlciIsIm9wZW5NZWRpYSIsInNyYyIsImlmcmFtZSIsImlzSW1hZ2VVcmwiLCJpbWFnZSIsInRlc3QiLCJ5dCIsIm1hdGNoIiwidmltZW8iLCJleHRyYWN0U3VmZml4IiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsImNscyIsInNwbGl0IiwiZXJyIiwiZSIsImYiLCJzdWZmaXgiLCJjb2x1bW4iLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlU3VmZml4IiwiY2FuZGlkYXRlQ29udGVudCIsImNvbnRlbnRDbG9uZSIsImNsb25lTm9kZSIsImRpc3BsYXkiLCJwYW5lbCIsImJ1aWxkUGFuZWwiLCJhcHBlbmRDaGlsZCIsIm1vdW50IiwibWVkaWEiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYWx0IiwiY29udHJvbHMiLCJhdXRvcGxheSIsImFsbG93IiwiYWxsb3dGdWxsc2NyZWVuIiwiX3RoaXMyIiwiY2xvc2VCdXR0b24iLCJ0ZXh0Q29udGVudCIsImNsb3NlIiwiX3RoaXMzIiwiYWN0aXZlRWxlbWVudCIsImJvZHkiLCJvdmVyZmxvdyIsIm9uS2V5ZG93biIsImZvY3VzIiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0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QztNQUNEM0ksUUFBUSxDQUFDb0IsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQzRILFNBQVMsQ0FBQztNQUVwRCxJQUFNUCxXQUFXLEdBQUdiLEtBQUssQ0FBQzlHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztNQUVsRSxJQUFJMkgsV0FBVyxFQUFFO1FBQ2JBLFdBQVcsQ0FBQ1EsS0FBSyxDQUFDLENBQUM7TUFDdkI7SUFDSjtFQUFDO0lBQUF2SSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBZ0ksTUFBQSxFQUFRO01BQ0osSUFBSSxDQUFDLElBQUksQ0FBQ3JJLE9BQU8sRUFBRTtRQUNmO01BQ0o7TUFFQSxJQUFJLENBQUNBLE9BQU8sQ0FBQzRJLE1BQU0sQ0FBQyxDQUFDO01BQ3JCLElBQUksQ0FBQzVJLE9BQU8sR0FBRyxJQUFJO01BQ25CTixRQUFRLENBQUM4SSxJQUFJLENBQUM5RCxLQUFLLENBQUMrRCxRQUFRLEdBQUcsRUFBRTtNQUVqQy9JLFFBQVEsQ0FBQ21KLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUNILFNBQVMsQ0FBQztNQUV2RCxJQUFJLElBQUksQ0FBQ3pJLFNBQVMsSUFBSSxJQUFJLENBQUNBLFNBQVMsQ0FBQzBJLEtBQUssRUFBRTtRQUN4QyxJQUFJLENBQUMxSSxTQUFTLENBQUMwSSxLQUFLLENBQUMsQ0FBQztNQUMxQjtJQUNKO0VBQUM7RUFBQSxPQUFBN0ksYUFBQTtBQUFBO0FBSUxKLFFBQVEsQ0FBQ29CLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDaEQsSUFBSWhCLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDIiwiZmlsZSI6Ii9qcy9mdW5jdGlvbmFsaXRpZXMvZW1iZWQtY3BpLW1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLy9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcbiIsIi8qKlxuICogTW9kYWwgZG8gYmxvY28gZGUgcGVyZmlzIGRvIHRlbXBsYXRlIEVtYmVkIENQSSBkYSBDb3ZpZC5cbiAqXG4gKiBPIGNvbnRlw7pkbyDDqSByYXNwYWRvIGRvIHNpdGUgYW50aWdvIChEaXZpKSwgb25kZSBvcyBjYXJkcyBkZSBwZXJmaXMgdXNhbVxuICogYXMgY2xhc3NlcyBgbGlnaHRib3gtdHJpZ2dlci1wZXJmaWxOYCAoZ2F0aWxob3MpIGUgYGxpZ2h0Ym94LWNvbnRlbnQtcGVyZmlsTmBcbiAqIChjb250ZcO6ZG8gZG8gbW9kYWwsIGVzY29uZGlkbykuIE5vIGFudGlnbyBpc3NvIGVyYSBsaWdhZG8gdmlhIGpRdWVyeSArXG4gKiBNYWduaWZpYyBQb3B1cCwgcXVlIG7Do28gZXhpc3RlbSBuZXN0ZSB0ZW1hIOKAlCBhcXVpIMOpIHJlaW1wbGVtZW50YWRvIGVtXG4gKiB2YW5pbGxhIEpTLCBzZW0gZGVwZW5kw6puY2lhcy5cbiAqXG4gKiBBbMOpbSBkb3MgcGVyZmlzLCBlc3RhIGNhbWFkYSB0YW1iw6ltIGNvYnJlIGdlbmVyaWNhbWVudGUgb3MgZGVtYWlzIHBhZHLDtWVzXG4gKiBkZSBsaWdodGJveCBxdWUgbyBzaXRlIGFudGlnbyBwb2RlIGNvbnRlciBubyBIVE1MIHJhc3BhZG86XG4gKiAtIHBvcHVwcyBpbmxpbmUgKGBocmVmPVwiI2lkXCJgIGVtIGdhdGlsaG9zIGNvbSBzZW3Dom50aWNhIGRlIHBvcHVwOlxuICogICAubWFnbmlmaWMtcG9wdXAsIC5ldF9wYl9saWdodGJveCwgW2RhdGEtZW1iZWQtbGlnaHRib3hdKTtcbiAqIC0gbGlnaHRib3ggZGUgaW1hZ2VtIChsaW5rcyBwYXJhIGFycXVpdm9zIGRlIGltYWdlbSwgcGFkcsOjbyBkYXMgZ2FsZXJpYXNcbiAqICAgRGl2aSBlIGRvIE1hZ25pZmljKTtcbiAqIC0gcG9wdXAgZGUgdsOtZGVvL2lmcmFtZSAoWW91VHViZSwgVmltZW8gb3UgYXJxdWl2byBkZSB2w61kZW8gZGlyZXRvKS5cbiAqXG4gKiBUYW1iw6ltIHN1YnN0aXR1aSBvIHF1ZSBvIEpTIGRvIERpdmkgKGN1c3RvbS5qcykgZmF6aWEgcGVsb3MgbcOzZHVsb3MgcXVlXG4gKiBleGlzdGVtIGRlIGZhdG8gbm8gSFRNTCByYXNwYWRvOlxuICogLSBtZW51IGhhbWJ1cmd1ZXIgZGFzIGZ1bGx3aWR0aCBtZW51cztcbiAqIC0gZmFkZS1pbiBkZSAuZXQtd2F5cG9pbnQvLmV0X2FuaW1hdGVkIGFvIHJvbGFyIChJbnRlcnNlY3Rpb25PYnNlcnZlcixcbiAqICAgY29tIGZhbGxiYWNrIG5vLUpTIHZpYSBDU1Mgbm8gdGVtcGxhdGUg4oCUIGEgbWFyY2HDp8OjbyBhYmFpeG8gbm8gPGh0bWw+XG4gKiAgIMOpIG8gcXVlIGhhYmlsaXRhIG8gZXN0YWRvIGFuaW1hZG8pO1xuICogLSBzbW9vdGggc2Nyb2xsIGRhcyDDom5jb3JhcyBpbnRlcm5hcyAoYm9keS5ldF9zbW9vdGhfc2Nyb2xsIG5vIGFudGlnbyk7XG4gKiAtIHBhcmFsbGF4IGRvIGZ1bmRvIC5ldF9wYXJhbGxheF9iZyAobWVzbWEgbWF0ZW3DoXRpY2EgZG8gc2NyaXB0IGRvIGFudGlnbykuXG4gKi9cblxuLy8gTWFya3MgdGhlIGRvY3VtZW50IGFzIEpTLWVuaGFuY2VkIEJFRk9SRSBmaXJzdCBwYWludCBvZiBiZWxvdy1mb2xkIGNvbnRlbnQ6XG4vLyB0aGUgdGVtcGxhdGUgQ1NTIG9ubHkgaGlkZXMgLmV0LXdheXBvaW50Ly5ldF9hbmltYXRlZCB1bmRlciB0aGlzIGNsYXNzLCBzb1xuLy8gYSBmYWlsZWQvYWJzZW50IEpTIGJ1bmRsZSBsZWF2ZXMgZXZlcnkgbW9kdWxlIHZpc2libGUgKG5vLUpTIGZhbGxiYWNrKS5cbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlbWJlZC1jcGktYW5pbScpO1xuXG5leHBvcnQgY2xhc3MgRW1iZWRDcGlNb2RhbCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5ICAgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RGb2N1cyA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVtYmVkLWNwaS1pbm5lcicpO1xuXG4gICAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignW2VtYmVkLWNwaV0gLmVtYmVkLWNwaS1pbm5lciBuw6NvIGVuY29udHJhZG8g4oCUIHNjcmFwZSBmYWxob3Ugb3Ugc2VsZXRvcmVzIG7Do28gYmF0ZW0nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbWFkYSBkb3MgbcOzZHVsb3MgRGl2aSBxdWUgZGVwZW5kaWFtIGRvIGN1c3RvbS5qcyBkbyBzaXRlIGFudGlnby5cbiAgICAgICAgdGhpcy5pbml0RGl2aU1vZHVsZXMoc2NvcGUpO1xuICAgICAgICB0aGlzLmluaXRXYXlwb2ludHMoc2NvcGUpO1xuICAgICAgICB0aGlzLmluaXRQYXJhbGxheChzY29wZSk7XG5cbiAgICAgICAgLy8gRGVsZWdhw6fDo28gZGUgY2xpcXVlOiBjb2JyZSBjYXJkcywgYm90w7VlcyBcIlNhaWJhIG1haXNcIiBlIG9zIHBhZHLDtWVzXG4gICAgICAgIC8vIGdlbsOpcmljb3MgZGUgbGlnaHRib3ggKGltYWdlbSwgdsOtZGVvLCBpbmxpbmUpLlxuICAgICAgICBzY29wZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbY2xhc3MqPVwibGlnaHRib3gtdHJpZ2dlci1cIl0nKTtcblxuICAgICAgICAgICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMucmVzb2x2ZVRyaWdnZXJDb250ZW50KHNjb3BlLCB0cmlnZ2VyKTtcblxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbihjb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBHYXRpbGhvcyBnZW7DqXJpY29zOiBhcGVuYXMgZWxlbWVudG9zIGNvbSBzZW3Dom50aWNhIGV4cGzDrWNpdGEgZGVcbiAgICAgICAgICAgIC8vIHBvcHVwIChvIE1hZ25pZmljIGRvIGFudGlnbyBsaWdhdmEgdmlhIGNsYXNzZSksIHBhcmEgbsOjbyBzZXF1ZXN0cmFyXG4gICAgICAgICAgICAvLyDDom5jb3JhcyBpbnRlcm5hcyAoI3NlY2FvKSBkYSBww6FnaW5hLlxuICAgICAgICAgICAgY29uc3QgZ2VuZXJpYyA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhLm1hZ25pZmljLXBvcHVwLCBhLmV0X3BiX2xpZ2h0Ym94LCBbZGF0YS1lbWJlZC1saWdodGJveF0nKTtcblxuICAgICAgICAgICAgaWYgKGdlbmVyaWMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBocmVmID0gZ2VuZXJpYy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhyZWYuY2hhckF0KDApID09PSAnIycgJiYgaHJlZi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhyZWYuc2xpY2UoMSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4odGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRoaXMub3BlbkJ5SHJlZihocmVmLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFoYW5kbGVkICYmIGdlbmVyaWMudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERlaXhhIG8gbmF2ZWdhZG9yIHNlZ3VpciBvIGxpbmsgbm9ybWFsbWVudGUuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMaWdodGJveCBkZSBpbWFnZW0vdsOtZGVvIHBhcmEgcXVhbHF1ZXIgbGluayBkZSBtw61kaWEgKHBhZHLDo28gZGFzXG4gICAgICAgICAgICAvLyBnYWxlcmlhcyBEaXZpOiA8YSBocmVmPVwiaW1hZ2VtLmpwZ1wiPjxpbWcgLi4uPjwvYT4pLiDDgm5jb3Jhc1xuICAgICAgICAgICAgLy8gaW50ZXJuYXMgKCNzZWNhbykgZmF6ZW0gc21vb3RoIHNjcm9sbCBkZW50cm8gZG8gZW1iZWQsIGNvbW8gb1xuICAgICAgICAgICAgLy8gYm9keS5ldF9zbW9vdGhfc2Nyb2xsIGRvIGFudGlnbyDigJQgc2VtIHRvY2FyIG8gY2hyb21lIGRvIHNpdGUgbm92by5cbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhW2hyZWZdJyk7XG5cbiAgICAgICAgICAgIGlmIChhbmNob3IpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBocmVmICA9IGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNoSW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gaGFzaEluZGV4ID49IDAgPyBocmVmLnNsaWNlKGhhc2hJbmRleCkgOiAnJztcblxuICAgICAgICAgICAgICAgIGlmIChoYXNoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5maW5kQW5jaG9yVGFyZ2V0KHNjb3BlLCBoYXNoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ3N0YXJ0JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBBbHZvIGluZXhpc3RlbnRlOiBzZWd1ZSBvIGNvbXBvcnRhbWVudG8gbmF0aXZvIGRvIG5hdmVnYWRvci5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc2ggPT09ICcjJykge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwbGFjZWhvbGRlciBcIiNcIiBkbyBEaXZpOiBuw6NvIG5hdmVnYVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQnlIcmVmKGhyZWYsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcG9ydGFtZW50b3MgZG9zIG3Ds2R1bG9zIERpdmkgcHJlc2VudGVzIG5vIEhUTUwgcmFzcGFkbyBjdWpvIEpTXG4gICAgICogb3JpZ2luYWwgKGN1c3RvbS5qcyArIGpRdWVyeSkgbsOjbyDDqSBjYXJyZWdhZG8gYXF1aS5cbiAgICAgKlxuICAgICAqIC0gTWVudSBoYW1idXJndWVyIChldF9wYl9mdWxsd2lkdGhfbWVudSk6IGFiYWl4byBkZSA5ODBweCBvIENTUyBkb1xuICAgICAqICAgRGl2aSBlc2NvbmRlIG5hdit1bCBlIHPDsyBvIGNsaXF1ZSBubyAubW9iaWxlX25hdiByZWV4aWJpYSAobyBlc3RhZG9cbiAgICAgKiAgIGFiZXJ0byDDqSBlc3RpbGl6YWRvIG5vIENTUyBkbyB0ZW1wbGF0ZSB2aWEgLm1lbnUtb3BlbmVkKS5cbiAgICAgKlxuICAgICAqIEEgcmV2ZWxhw6fDo28gZGUgLmV0LXdheXBvaW50Ly5ldF9hbmltYXRlZCAoaW1hZ2VucyBlIHRleHRvcyBxdWUgbyBEaXZpXG4gICAgICogbWFudGluaGEgY29tIG9wYWNpdHk6MCBhdMOpIG8gc2Nyb2xsKSBlIG8gcGFyYWxsYXggZmljYW0gZW1cbiAgICAgKiBpbml0V2F5cG9pbnRzL2luaXRQYXJhbGxheCBhYmFpeG8uXG4gICAgICovXG4gICAgaW5pdERpdmlNb2R1bGVzKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2dnbGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmV0X21vYmlsZV9uYXZfbWVudSAubW9iaWxlX25hdicpO1xuXG4gICAgICAgICAgICBpZiAoIXRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgbWVudSA9IHRvZ2dsZS5jbG9zZXN0KCcuZXRfcGJfZnVsbHdpZHRoX21lbnUnKTtcblxuICAgICAgICAgICAgaWYgKCFtZW51KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBvcGVuZWQgPSBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtb3BlbmVkJyk7XG5cbiAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuZWQnLCBvcGVuZWQpO1xuICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlZCcsICFvcGVuZWQpO1xuICAgICAgICAgICAgdG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW5lZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGYWRlLWluIG9uIHNjcm9sbCwgbGlrZSB0aGUgb2xkIHNpdGUncyBEaXZpIHdheXBvaW50czogZWxlbWVudHMgd2l0aFxuICAgICAqIC5ldC13YXlwb2ludC8uZXRfYW5pbWF0ZWQgZmFkZSBpbiAoMXMsIERpdmkncyBvd24gY3VydmUg4oCUIHRoZSBvbGQgcGFnZVxuICAgICAqIHNoaXBzIC5ldC1hbmltYXRlZHthbmltYXRpb246ZmFkZSAxcyBjdWJpYy1iZXppZXIoLjc3LDAsLjE3NSwxKX0gYW5kXG4gICAgICogZXRfYW5pbWF0aW9uX2RhdGEgd2l0aCBmYWRlIDEwMDBtcyBlYXNlLWluLW91dCkgdGhlIG1vbWVudCB0aGV5IGVudGVyXG4gICAgICogdGhlIHZpZXdwb3J0LCBvbmNlLiBXaXRob3V0IHRoaXMgYnVuZGxlIHRoZSB0ZW1wbGF0ZSBDU1Mga2VlcHMgdGhlbVxuICAgICAqIHZpc2libGUgKG5vLUpTIGZhbGxiYWNrKS5cbiAgICAgKi9cbiAgICBpbml0V2F5cG9pbnRzKHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldHMgPSBzY29wZS5xdWVyeVNlbGVjdG9yQWxsKCcuZXQtd2F5cG9pbnQsIC5ldF9hbmltYXRlZCcpO1xuXG4gICAgICAgIGlmICghKCdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93KSkge1xuICAgICAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZCgnZW1iZWQtY3BpLXJldmVhbGVkJykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2VtYmVkLWNwaS1yZXZlYWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgeyByb290TWFyZ2luOiAnMHB4IDBweCAtNSUgMHB4JyB9KTtcblxuICAgICAgICB0YXJnZXRzLmZvckVhY2goKGVsKSA9PiBvYnNlcnZlci5vYnNlcnZlKGVsKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyYWxsYXggZm9yIERpdmkgcGFyYWxsYXggc2VjdGlvbiBiYWNrZ3JvdW5kcyAoLmV0X3BhcmFsbGF4X2JnKS5cbiAgICAgKiBTYW1lIG1hdGggYXMgdGhlIHNjcmlwdCB0aGUgb2xkIHBhZ2Ugc2hpcHMgaXRzZWxmIChcImFwbGljYSBwYXJhbGxheFxuICAgICAqIGRpdmkgbm8gbW9iaWxlIHRibVwiIOKAlCBhIHBvcnQgb2YgRGl2aSdzIGRlc2t0b3AgYmVoYXZpb3IpOlxuICAgICAqICAgaGVpZ2h0ID0gMC4zICogdmlld3BvcnRIZWlnaHQgKyBzZWN0aW9uSGVpZ2h0XG4gICAgICogICB0cmFuc2xhdGVZID0gMC4zICogKHZpZXdwb3J0SGVpZ2h0IC0gc2VjdGlvblRvcFJlbGF0aXZlVG9WaWV3cG9ydClcbiAgICAgKi9cbiAgICBpbml0UGFyYWxsYXgoc2NvcGUpIHtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZHMgPSBzY29wZS5xdWVyeVNlbGVjdG9yQWxsKCcuZXRfcGJfc2VjdGlvbl9wYXJhbGxheCAuZXRfcGFyYWxsYXhfYmcnKTtcblxuICAgICAgICBpZiAoIWJhY2tncm91bmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgYmFja2dyb3VuZHMuZm9yRWFjaCgoYmcpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gYmcucGFyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGlmICghc2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjdC5ib3R0b20gPCAwIHx8IHJlY3QudG9wID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBvZmYtc2NyZWVuOiBza2lwXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZnVsbHNjcmVlbiA9IHNlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdldF9wYl9mdWxsc2NyZWVuJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IGZ1bGxzY3JlZW4gJiYgdmlld3BvcnRIZWlnaHQgPiByZWN0LmhlaWdodCA/IHZpZXdwb3J0SGVpZ2h0IDogcmVjdC5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBiZy5zdHlsZS5oZWlnaHQgPSAoMC4zICogdmlld3BvcnRIZWlnaHQgKyBzZWN0aW9uSGVpZ2h0KSArICdweCc7XG4gICAgICAgICAgICAgICAgYmcuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLCAnICsgKDAuMyAqICh2aWV3cG9ydEhlaWdodCAtIHJlY3QudG9wKSkgKyAncHgpJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlcXVlc3RUaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCByZXF1ZXN0VGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVxdWVzdFRpY2spO1xuICAgICAgICB1cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIHRoZSBpbi1lbWJlZCB0YXJnZXQgb2YgYW4gaW50ZXJuYWwgYW5jaG9yICgjaWQpLCB0aGUgd2F5IHRoZVxuICAgICAqIG9sZCBwYWdlJ3Mgc2VjdGlvbnMgYXJlIGFkZHJlc3NlZCAoaWRzIGxpdmUgaW5zaWRlIC5lbWJlZC1jcGktaW5uZXIpLlxuICAgICAqL1xuICAgIGZpbmRBbmNob3JUYXJnZXQoc2NvcGUsIGhhc2gpIHtcbiAgICAgICAgbGV0IGlkID0gaGFzaC5zbGljZSgxKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWQgPSBkZWNvZGVVUklDb21wb25lbnQoaWQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gbWFsZm9ybWVkIGVzY2FwZSBzZXF1ZW5jZToga2VlcCByYXcgaWRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHNjb3BlLnF1ZXJ5U2VsZWN0b3IoJyMnICsgKHdpbmRvdy5DU1MgJiYgQ1NTLmVzY2FwZSA/IENTUy5lc2NhcGUoaWQpIDogaWQpKTtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0IHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSb3RlaWEgdW0gaHJlZiBwYXJhIG8gbW9kYWwgY29ycmVzcG9uZGVudGUgKGltYWdlbSwgdsOtZGVvIG91IGlmcmFtZSkuXG4gICAgICogUmV0b3JuYSB0cnVlIHF1YW5kbyBhYnJpdSB1bSBtb2RhbCAoZSBjaGFtb3UgcHJldmVudERlZmF1bHQpLlxuICAgICAqL1xuICAgIG9wZW5CeUhyZWYoaHJlZiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKCFocmVmIHx8IGhyZWYuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gw6JuY29yYXMgaW50ZXJuYXM6IG5hdmVnYcOnw6NvIG5vcm1hbCBkZW50cm8gZG8gZW1iZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5wYXJzZVZpZGVvVXJsKGhyZWYpO1xuXG4gICAgICAgIGlmICh2aWRlbykge1xuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZpZGVvLnByb3ZpZGVyID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5NZWRpYSh7IHZpZGVvOiB2aWRlby5zcmMgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbk1lZGlhKHsgaWZyYW1lOiB2aWRlby5zcmMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW1hZ2VVcmwoaHJlZikpIHtcbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9wZW5NZWRpYSh7IGltYWdlOiBocmVmIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJbWFnZVVybChocmVmKSB7XG4gICAgICAgIHJldHVybiAvXFwuKHBuZ3xqcGU/Z3xnaWZ8d2VicHxhdmlmfGJtcHxzdmcpKFxcP3wjfCQpL2kudGVzdChocmVmKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0ZSBVUkxzIGRlIHbDrWRlbyAoWW91VHViZS9WaW1lby9hcnF1aXZvKSBwYXJhIGV4aWJpw6fDo28gZW0gbW9kYWwuXG4gICAgICovXG4gICAgcGFyc2VWaWRlb1VybChocmVmKSB7XG4gICAgICAgIGNvbnN0IHl0ID0gaHJlZi5tYXRjaCgvXig/Omh0dHBzPzopP1xcL1xcLyg/Ond3d1xcLik/KD86eW91dHViZVxcLmNvbVxcLyg/OndhdGNoXFw/W14jXSp2PXxzaG9ydHNcXC98ZW1iZWRcXC8pfHlvdXR1XFwuYmVcXC8pKFtcXHctXXs2LH0pL2kpO1xuXG4gICAgICAgIGlmICh5dCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcHJvdmlkZXI6ICd5b3V0dWJlJywgc3JjOiAnaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQvJyArIHl0WzFdICsgJz9hdXRvcGxheT0xJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmltZW8gPSBocmVmLm1hdGNoKC9eKD86aHR0cHM/Oik/XFwvXFwvKD86d3d3XFwuKT92aW1lb1xcLmNvbVxcLyhcXGQrKS9pKTtcblxuICAgICAgICBpZiAodmltZW8pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHByb3ZpZGVyOiAndmltZW8nLCBzcmM6ICdodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vJyArIHZpbWVvWzFdICsgJz9hdXRvcGxheT0xJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKC9cXC4obXA0fHdlYm18b2d2fG9nZ3xtb3YpKFxcP3wjfCQpL2kudGVzdChocmVmKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcHJvdmlkZXI6ICdmaWxlJywgc3JjOiBocmVmIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBleHRyYWN0U3VmZml4KHRyaWdnZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBjbHMgb2YgdHJpZ2dlci5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgIGlmIChjbHMuaW5kZXhPZignbGlnaHRib3gtdHJpZ2dlci0nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbHMuc3BsaXQoJ2xpZ2h0Ym94LXRyaWdnZXItJylbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyB0aGUgbW9kYWwgY29udGVudCBmb3IgYSB0cmlnZ2VyLiBOdW1iZXJlZCBjbGFzc2VzXG4gICAgICogKGBsaWdodGJveC10cmlnZ2VyLXBlcmZpbE5gIOKGkiBgLmxpZ2h0Ym94LWNvbnRlbnQtcGVyZmlsTmApIHJlc29sdmVcbiAgICAgKiBkaXJlY3RseS4gRmFsbGJhY2s6IHRoZSBzY3JhcGVkIHBhZ2UgaGFzIFwiU2FpYmEgbWFpc1wiIGJ1dHRvbnMgY2FycnlpbmdcbiAgICAgKiB0aGUgYmFyZSBjbGFzcyBgbGlnaHRib3gtdHJpZ2dlci1wZXJmaWxgIHdpdGggbm8gc3VmZml4IChhdXRob3JpbmcgYnVnXG4gICAgICogb2YgdGhlIG9sZCBzaXRlKSDigJQgdGhvc2UgcmVzb2x2ZSB0aHJvdWdoIHRoZSBudW1iZXJlZCB0cmlnZ2VyIG9mIHRoZVxuICAgICAqIHByb2ZpbGUgY2FyZCB0aGF0IHNoYXJlcyB0aGUgc2FtZSBEaXZpIGNvbHVtbi5cbiAgICAgKi9cbiAgICByZXNvbHZlVHJpZ2dlckNvbnRlbnQoc2NvcGUsIHRyaWdnZXIpIHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gdGhpcy5leHRyYWN0U3VmZml4KHRyaWdnZXIpO1xuXG4gICAgICAgIGlmIChzdWZmaXgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzY29wZS5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtY29udGVudC0nICsgc3VmZml4KTtcblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRyaWdnZXIuY2xvc2VzdCgnLmV0X3BiX2NvbHVtbicpO1xuXG4gICAgICAgIGlmICghY29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3MqPVwibGlnaHRib3gtdHJpZ2dlci1cIl0nKSkge1xuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZSA9PT0gdHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjYW5kaWRhdGVTdWZmaXggPSB0aGlzLmV4dHJhY3RTdWZmaXgoY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZUNvbnRlbnQgPSBjYW5kaWRhdGVTdWZmaXhcbiAgICAgICAgICAgICAgICA/IHNjb3BlLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1jb250ZW50LScgKyBjYW5kaWRhdGVTdWZmaXgpXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlQ29udGVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGVDb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgb3Blbihjb250ZW50KSB7XG4gICAgICAgIC8vIE8gcG9wdXAgdHJhYmFsaGEgc29icmUgdW1hIGPDs3BpYSwgY29tbyBvIE1hZ25pZmljIGRvIGFudGlnbyAob3NcbiAgICAgICAgLy8gYmxvY29zIGRlIGNyw6lkaXRvcyBzZWd1ZW0gdmlzw612ZWlzL2VtcGlsaGFkb3Mgbm8gZmx1eG8gZGEgcMOhZ2luYSkuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRDbG9uZSA9IGNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBjb250ZW50Q2xvbmUuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5idWlsZFBhbmVsKCk7XG4gICAgICAgIHBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnRDbG9uZSk7XG4gICAgICAgIHRoaXMubW91bnQocGFuZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vZGFsIGRlIG3DrWRpYTogaW1hZ2VtLCA8dmlkZW8+IG91IGlmcmFtZSAoWW91VHViZS9WaW1lbykuXG4gICAgICovXG4gICAgb3Blbk1lZGlhKG1lZGlhKSB7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5idWlsZFBhbmVsKHRydWUpO1xuICAgICAgICBsZXQgZWw7XG5cbiAgICAgICAgaWYgKG1lZGlhLmltYWdlKSB7XG4gICAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VtYmVkLWNwaS1tb2RhbF9fbWVkaWEnO1xuICAgICAgICAgICAgZWwuc3JjID0gbWVkaWEuaW1hZ2U7XG4gICAgICAgICAgICBlbC5hbHQgPSAnJztcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYS52aWRlbykge1xuICAgICAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VtYmVkLWNwaS1tb2RhbF9fbWVkaWEnO1xuICAgICAgICAgICAgZWwuc3JjID0gbWVkaWEudmlkZW87XG4gICAgICAgICAgICBlbC5jb250cm9scyA9IHRydWU7XG4gICAgICAgICAgICBlbC5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWEuaWZyYW1lKSB7XG4gICAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VtYmVkLWNwaS1tb2RhbF9fbWVkaWEnO1xuICAgICAgICAgICAgZWwuc3JjID0gbWVkaWEuaWZyYW1lO1xuICAgICAgICAgICAgZWwuYWxsb3cgPSAnYWNjZWxlcm9tZXRlcjsgYXV0b3BsYXk7IGNsaXBib2FyZC13cml0ZTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZSc7XG4gICAgICAgICAgICBlbC5hbGxvd0Z1bGxzY3JlZW4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBwYW5lbC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICB0aGlzLm1vdW50KHBhbmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkUGFuZWwobWVkaWEpIHtcbiAgICAgICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGFuZWwuY2xhc3NOYW1lID0gJ2VtYmVkLWNwaS1tb2RhbF9fcGFuZWwnICsgKG1lZGlhID8gJyBlbWJlZC1jcGktbW9kYWxfX3BhbmVsLS1tZWRpYScgOiAnJyk7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2VtYmVkLWNwaS1tb2RhbF9fY2xvc2UnO1xuICAgICAgICBjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdGZWNoYXInKTtcbiAgICAgICAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnw5cnO1xuXG4gICAgICAgIHBhbmVsLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXG4gICAgICAgIHJldHVybiBwYW5lbDtcbiAgICB9XG5cbiAgICBtb3VudChwYW5lbCkge1xuICAgICAgICB0aGlzLmxhc3RGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc05hbWUgPSAnZW1iZWQtY3BpLW1vZGFsJztcbiAgICAgICAgdGhpcy5vdmVybGF5LnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5LnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsICd0cnVlJyk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5LmFwcGVuZENoaWxkKHBhbmVsKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25LZXlkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duKTtcblxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5lbWJlZC1jcGktbW9kYWxfX2Nsb3NlJyk7XG5cbiAgICAgICAgaWYgKGNsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXkucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcblxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuXG4gICAgICAgIGlmICh0aGlzLmxhc3RGb2N1cyAmJiB0aGlzLmxhc3RGb2N1cy5mb2N1cykge1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9jdXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIG5ldyBFbWJlZENwaU1vZGFsKCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=