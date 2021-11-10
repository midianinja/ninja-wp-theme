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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/functionalities/anchor-behavior.js":
/*!**************************************************************!*\
  !*** ./assets/javascript/functionalities/anchor-behavior.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (document, history, location) {
  var HISTORY_SUPPORT = !!(history && history.pushState);
  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    OFFSET_HEIGHT_PX: 150,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function init() {
      this.scrollToCurrent();
      window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
      document.body.addEventListener('click', this.delegateAnchors.bind(this));
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function getFixedOffset() {
      return this.OFFSET_HEIGHT_PX;
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function scrollIfAnchor(href, pushToHistory) {
      var match, rect, anchorOffset;

      if (!this.ANCHOR_REGEX.test(href)) {
        return false;
      }

      match = document.getElementById(href.slice(1));

      if (match) {
        rect = match.getBoundingClientRect();
        anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
        window.scrollTo(window.pageXOffset, anchorOffset); // Add the state to history as-per normal anchor links

        if (HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return !!match;
    },

    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function scrollToCurrent() {
      this.scrollIfAnchor(window.location.hash);
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function delegateAnchors(e) {
      var elem = e.target;

      if (elem.nodeName === 'A' && this.scrollIfAnchor(elem.getAttribute('href'), true)) {
        e.preventDefault();
      }
    }
  };
  window.addEventListener('DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls));
})(window.document, window.history, window.location);

/***/ }),

/***/ "./assets/scss/5-blocks/_b-cover.scss":
/*!********************************************!*\
  !*** ./assets/scss/5-blocks/_b-cover.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-deforestation-info.scss":
/*!*********************************************************!*\
  !*** ./assets/scss/5-blocks/_b-deforestation-info.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-embed-template.scss":
/*!*****************************************************!*\
  !*** ./assets/scss/5-blocks/_b-embed-template.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-estimatives-area.scss":
/*!*******************************************************!*\
  !*** ./assets/scss/5-blocks/_b-estimatives-area.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-featured-slider.scss":
/*!******************************************************!*\
  !*** ./assets/scss/5-blocks/_b-featured-slider.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-image.scss":
/*!********************************************!*\
  !*** ./assets/scss/5-blocks/_b-image.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-tags.scss":
/*!*******************************************!*\
  !*** ./assets/scss/5-blocks/_b-tags.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-timeline.scss":
/*!***********************************************!*\
  !*** ./assets/scss/5-blocks/_b-timeline.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/5-blocks/_b-video-gallery.scss":
/*!****************************************************!*\
  !*** ./assets/scss/5-blocks/_b-video-gallery.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-404.scss":
/*!*****************************************!*\
  !*** ./assets/scss/6-pages/_p-404.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-archive-editais.scss":
/*!*****************************************************!*\
  !*** ./assets/scss/6-pages/_p-archive-editais.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-archive-perguntas-frequentes.scss":
/*!******************************************************************!*\
  !*** ./assets/scss/6-pages/_p-archive-perguntas-frequentes.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-archive.scss":
/*!*********************************************!*\
  !*** ./assets/scss/6-pages/_p-archive.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-home.scss":
/*!******************************************!*\
  !*** ./assets/scss/6-pages/_p-home.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-page.scss":
/*!******************************************!*\
  !*** ./assets/scss/6-pages/_p-page.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-projects.scss":
/*!**********************************************!*\
  !*** ./assets/scss/6-pages/_p-projects.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-search.scss":
/*!********************************************!*\
  !*** ./assets/scss/6-pages/_p-search.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/6-pages/_p-single.scss":
/*!********************************************!*\
  !*** ./assets/scss/6-pages/_p-single.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/scss/critical-app.scss":
/*!***************************************!*\
  !*** ./assets/scss/critical-app.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./assets/javascript/functionalities/anchor-behavior.js ./assets/scss/critical-app.scss ./assets/scss/6-pages/_p-404.scss ./assets/scss/6-pages/_p-archive-editais.scss ./assets/scss/6-pages/_p-archive-perguntas-frequentes.scss ./assets/scss/6-pages/_p-archive.scss ./assets/scss/6-pages/_p-home.scss ./assets/scss/6-pages/_p-page.scss ./assets/scss/6-pages/_p-projects.scss ./assets/scss/6-pages/_p-search.scss ./assets/scss/6-pages/_p-single.scss ./assets/scss/5-blocks/_b-cover.scss ./assets/scss/5-blocks/_b-deforestation-info.scss ./assets/scss/5-blocks/_b-embed-template.scss ./assets/scss/5-blocks/_b-estimatives-area.scss ./assets/scss/5-blocks/_b-featured-slider.scss ./assets/scss/5-blocks/_b-image.scss ./assets/scss/5-blocks/_b-tags.scss ./assets/scss/5-blocks/_b-timeline.scss ./assets/scss/5-blocks/_b-video-gallery.scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /app/assets/javascript/functionalities/anchor-behavior.js */"./assets/javascript/functionalities/anchor-behavior.js");
__webpack_require__(/*! /app/assets/scss/critical-app.scss */"./assets/scss/critical-app.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-404.scss */"./assets/scss/6-pages/_p-404.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-archive-editais.scss */"./assets/scss/6-pages/_p-archive-editais.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-archive-perguntas-frequentes.scss */"./assets/scss/6-pages/_p-archive-perguntas-frequentes.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-archive.scss */"./assets/scss/6-pages/_p-archive.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-home.scss */"./assets/scss/6-pages/_p-home.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-page.scss */"./assets/scss/6-pages/_p-page.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-projects.scss */"./assets/scss/6-pages/_p-projects.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-search.scss */"./assets/scss/6-pages/_p-search.scss");
__webpack_require__(/*! /app/assets/scss/6-pages/_p-single.scss */"./assets/scss/6-pages/_p-single.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-cover.scss */"./assets/scss/5-blocks/_b-cover.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-deforestation-info.scss */"./assets/scss/5-blocks/_b-deforestation-info.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-embed-template.scss */"./assets/scss/5-blocks/_b-embed-template.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-estimatives-area.scss */"./assets/scss/5-blocks/_b-estimatives-area.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-featured-slider.scss */"./assets/scss/5-blocks/_b-featured-slider.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-image.scss */"./assets/scss/5-blocks/_b-image.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-tags.scss */"./assets/scss/5-blocks/_b-tags.scss");
__webpack_require__(/*! /app/assets/scss/5-blocks/_b-timeline.scss */"./assets/scss/5-blocks/_b-timeline.scss");
module.exports = __webpack_require__(/*! /app/assets/scss/5-blocks/_b-video-gallery.scss */"./assets/scss/5-blocks/_b-video-gallery.scss");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2FuY2hvci1iZWhhdmlvci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy81LWJsb2Nrcy9fYi1jb3Zlci5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzLzUtYmxvY2tzL19iLWRlZm9yZXN0YXRpb24taW5mby5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzLzUtYmxvY2tzL19iLWVtYmVkLXRlbXBsYXRlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvNS1ibG9ja3MvX2ItZXN0aW1hdGl2ZXMtYXJlYS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzLzUtYmxvY2tzL19iLWZlYXR1cmVkLXNsaWRlci5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzLzUtYmxvY2tzL19iLWltYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvNS1ibG9ja3MvX2ItdGFncy5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzLzUtYmxvY2tzL19iLXRpbWVsaW5lLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvNS1ibG9ja3MvX2ItdmlkZW8tZ2FsbGVyeS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzLzYtcGFnZXMvX3AtNDA0LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvNi1wYWdlcy9fcC1hcmNoaXZlLWVkaXRhaXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy82LXBhZ2VzL19wLWFyY2hpdmUtcGVyZ3VudGFzLWZyZXF1ZW50ZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy82LXBhZ2VzL19wLWFyY2hpdmUuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy82LXBhZ2VzL19wLWhvbWUuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy82LXBhZ2VzL19wLXBhZ2Uuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy82LXBhZ2VzL19wLXByb2plY3RzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvNi1wYWdlcy9fcC1zZWFyY2guc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy82LXBhZ2VzL19wLXNpbmdsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2NyaXRpY2FsLWFwcC5zY3NzIl0sIm5hbWVzIjpbIkhJU1RPUllfU1VQUE9SVCIsImhpc3RvcnkiLCJhbmNob3JTY3JvbGxzIiwiQU5DSE9SX1JFR0VYIiwiT0ZGU0VUX0hFSUdIVF9QWCIsImluaXQiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImdldEZpeGVkT2Zmc2V0Iiwic2Nyb2xsSWZBbmNob3IiLCJtYXRjaCIsImhyZWYiLCJyZWN0IiwiYW5jaG9yT2Zmc2V0IiwibG9jYXRpb24iLCJzY3JvbGxUb0N1cnJlbnQiLCJkZWxlZ2F0ZUFuY2hvcnMiLCJlbGVtIiwiZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDakZBLENBQUMsdUNBQXNDO0FBQ25DLE1BQUlBLGVBQWUsR0FBRyxDQUFDLEVBQUVDLE9BQU8sSUFBSUEsT0FBTyxDQUEzQyxTQUF1QixDQUF2QjtBQUVBLE1BQUlDLGFBQWEsR0FBRztBQUNsQkMsZ0JBQVksRUFETTtBQUVsQkMsb0JBQWdCLEVBRkU7O0FBSWxCO0FBQ047QUFDQTtBQUNNQyxRQUFJLEVBQUUsZ0JBQVc7QUFDZjtBQUNBQyxZQUFNLENBQU5BLCtCQUFzQywwQkFBdENBLElBQXNDLENBQXRDQTtBQUNBQyxjQUFRLENBQVJBLCtCQUF3QywwQkFBeENBLElBQXdDLENBQXhDQTtBQVZnQjs7QUFhbEI7QUFDTjtBQUNBO0FBQ0E7QUFDTUMsa0JBQWMsRUFBRSwwQkFBVztBQUN6QixhQUFPLEtBQVA7QUFsQmdCOztBQXFCbEI7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ01DLGtCQUFjLEVBQUUsNkNBQThCO0FBQzVDOztBQUVBLFVBQUcsQ0FBQyx1QkFBSixJQUFJLENBQUosRUFBa0M7QUFDaEM7QUFDRDs7QUFFREMsV0FBSyxHQUFHSCxRQUFRLENBQVJBLGVBQXdCSSxJQUFJLENBQUpBLE1BQWhDRCxDQUFnQ0MsQ0FBeEJKLENBQVJHOztBQUVBLGlCQUFVO0FBQ1JFLFlBQUksR0FBR0YsS0FBSyxDQUFaRSxxQkFBT0YsRUFBUEU7QUFDQUMsb0JBQVksR0FBR1AsTUFBTSxDQUFOQSxjQUFxQk0sSUFBSSxDQUF6Qk4sTUFBZ0MsS0FBL0NPLGNBQStDLEVBQS9DQTtBQUNBUCxjQUFNLENBQU5BLFNBQWdCQSxNQUFNLENBQXRCQSxhQUhRLFlBR1JBLEVBSFEsQ0FLUjs7QUFDQSxZQUFHTixlQUFlLElBQWxCLGVBQXFDO0FBQ25DQyxpQkFBTyxDQUFQQSxjQUFzQk0sUUFBUSxDQUE5Qk4sT0FBc0NhLFFBQVEsQ0FBUkEsV0FBdENiO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPLENBQUMsQ0FBUjtBQS9DZ0I7O0FBa0RsQjtBQUNOO0FBQ0E7QUFDTWMsbUJBQWUsRUFBRSwyQkFBVztBQUMxQiwwQkFBb0JULE1BQU0sQ0FBTkEsU0FBcEI7QUF0RGdCOztBQXlEbEI7QUFDTjtBQUNBO0FBQ01VLG1CQUFlLEVBQUUsNEJBQVk7QUFDM0IsVUFBSUMsSUFBSSxHQUFHQyxDQUFDLENBQVo7O0FBRUEsVUFDRUQsSUFBSSxDQUFKQSxvQkFDQSxvQkFBb0JBLElBQUksQ0FBSkEsYUFBcEIsTUFBb0JBLENBQXBCLEVBRkYsSUFFRSxDQUZGLEVBR0U7QUFDQUMsU0FBQyxDQUFEQTtBQUNEO0FBQ0Y7QUFyRWlCLEdBQXBCO0FBd0VBWixRQUFNLENBQU5BLHFDQUNzQkosYUFBYSxDQUFiQSxVQUR0QkksYUFDc0JKLENBRHRCSTtBQTNFSixHQThFS0EsTUFBTSxDQTlFWCxVQThFc0JBLE1BQU0sQ0E5RTVCLFNBOEVzQ0EsTUFBTSxDQTlFNUMsVTs7Ozs7Ozs7Ozs7QUNEQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx5QyIsImZpbGUiOiIvanMvZnVuY3Rpb25hbGl0aWVzL2FuY2hvci1iZWhhdmlvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi8vZGlzdFwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJcbihmdW5jdGlvbihkb2N1bWVudCwgaGlzdG9yeSwgbG9jYXRpb24pIHtcbiAgICB2YXIgSElTVE9SWV9TVVBQT1JUID0gISEoaGlzdG9yeSAmJiBoaXN0b3J5LnB1c2hTdGF0ZSk7XG4gICBcbiAgICB2YXIgYW5jaG9yU2Nyb2xscyA9IHtcbiAgICAgIEFOQ0hPUl9SRUdFWDogL14jW14gXSskLyxcbiAgICAgIE9GRlNFVF9IRUlHSFRfUFg6IDE1MCxcbiAgIFxuICAgICAgLyoqXG4gICAgICAgKiBFc3RhYmxpc2ggZXZlbnRzLCBhbmQgZml4IGluaXRpYWwgc2Nyb2xsIHBvc2l0aW9uIGlmIGEgaGFzaCBpcyBwcm92aWRlZC5cbiAgICAgICAqL1xuICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9DdXJyZW50KCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5zY3JvbGxUb0N1cnJlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRlbGVnYXRlQW5jaG9ycy5iaW5kKHRoaXMpKTtcbiAgICAgIH0sXG4gICBcbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJuIHRoZSBvZmZzZXQgYW1vdW50IHRvIGRlZHVjdCBmcm9tIHRoZSBub3JtYWwgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgICogTW9kaWZ5IGFzIGFwcHJvcHJpYXRlIHRvIGFsbG93IGZvciBkeW5hbWljIGNhbGN1bGF0aW9uc1xuICAgICAgICovXG4gICAgICBnZXRGaXhlZE9mZnNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLk9GRlNFVF9IRUlHSFRfUFg7XG4gICAgICB9LFxuICAgXG4gICAgICAvKipcbiAgICAgICAqIElmIHRoZSBwcm92aWRlZCBocmVmIGlzIGFuIGFuY2hvciB3aGljaCByZXNvbHZlcyB0byBhbiBlbGVtZW50IG9uIHRoZVxuICAgICAgICogcGFnZSwgc2Nyb2xsIHRvIGl0LlxuICAgICAgICogQHBhcmFtICB7U3RyaW5nfSBocmVmXG4gICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAtIFdhcyB0aGUgaHJlZiBhbiBhbmNob3IuXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbElmQW5jaG9yOiBmdW5jdGlvbihocmVmLCBwdXNoVG9IaXN0b3J5KSB7XG4gICAgICAgIHZhciBtYXRjaCwgcmVjdCwgYW5jaG9yT2Zmc2V0O1xuICAgXG4gICAgICAgIGlmKCF0aGlzLkFOQ0hPUl9SRUdFWC50ZXN0KGhyZWYpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICBcbiAgICAgICAgbWF0Y2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChocmVmLnNsaWNlKDEpKTtcbiAgIFxuICAgICAgICBpZihtYXRjaCkge1xuICAgICAgICAgIHJlY3QgPSBtYXRjaC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBhbmNob3JPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyByZWN0LnRvcCAtIHRoaXMuZ2V0Rml4ZWRPZmZzZXQoKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0LCBhbmNob3JPZmZzZXQpO1xuICAgXG4gICAgICAgICAgLy8gQWRkIHRoZSBzdGF0ZSB0byBoaXN0b3J5IGFzLXBlciBub3JtYWwgYW5jaG9yIGxpbmtzXG4gICAgICAgICAgaWYoSElTVE9SWV9TVVBQT1JUICYmIHB1c2hUb0hpc3RvcnkpIHtcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgbG9jYXRpb24ucGF0aG5hbWUgKyBocmVmKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgIFxuICAgICAgICByZXR1cm4gISFtYXRjaDtcbiAgICAgIH0sXG4gICBcbiAgICAgIC8qKlxuICAgICAgICogQXR0ZW1wdCB0byBzY3JvbGwgdG8gdGhlIGN1cnJlbnQgbG9jYXRpb24ncyBoYXNoLlxuICAgICAgICovXG4gICAgICBzY3JvbGxUb0N1cnJlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNjcm9sbElmQW5jaG9yKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgIH0sXG4gICBcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhlIGNsaWNrIGV2ZW50J3MgdGFyZ2V0IHdhcyBhbiBhbmNob3IsIGZpeCB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgICovXG4gICAgICBkZWxlZ2F0ZUFuY2hvcnM6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBlLnRhcmdldDtcbiAgIFxuICAgICAgICBpZihcbiAgICAgICAgICBlbGVtLm5vZGVOYW1lID09PSAnQScgJiZcbiAgICAgICAgICB0aGlzLnNjcm9sbElmQW5jaG9yKGVsZW0uZ2V0QXR0cmlidXRlKCdocmVmJyksIHRydWUpXG4gICAgICAgICkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICBcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdET01Db250ZW50TG9hZGVkJywgYW5jaG9yU2Nyb2xscy5pbml0LmJpbmQoYW5jaG9yU2Nyb2xscylcbiAgICApO1xuICB9KSh3aW5kb3cuZG9jdW1lbnQsIHdpbmRvdy5oaXN0b3J5LCB3aW5kb3cubG9jYXRpb24pOyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==