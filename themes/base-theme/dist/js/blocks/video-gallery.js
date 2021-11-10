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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/blocks/videoGallery/index.js":
/*!********************************************************!*\
  !*** ./assets/javascript/blocks/videoGallery/index.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



wp.blocks.registerBlockType("jaci/video-gallery", {
  title: "Video Gallery",
  icon: "format-video",
  category: "common",
  supports: {
    align: true
  },
  attributes: {
    title: {
      type: "string"
    }
  },
  edit: function edit(props) {
    var className = props.className,
        isSelected = props.isSelected,
        title = props.attributes.title,
        setAttributes = props.setAttributes;
    var TEMPLATE = [['jaci/embed-template']];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "video-gallery-wrapper",
      key: "container"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
      tagName: "h2",
      className: "gallery-title",
      value: title,
      onChange: function onChange(title) {
        setAttributes({
          title: title
        });
      },
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Type a title', 'jeo')
    }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"], {
      allowedBlocks: ['jaci/embed-template'],
      template: TEMPLATE
    }))));
  },
  save: function save(props) {
    var className = props.className,
        isSelected = props.isSelected,
        title = props.attributes.title,
        setAttributes = props.setAttributes;
    return /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("div", {
      className: "video-gallery-block"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"].Content, {
      tagName: "h2",
      value: title
    }), /*#__PURE__*/React.createElement("div", {
      className: "video-gallery-wrapper",
      key: "container"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"].Content, null))));
  }
});

/***/ }),

/***/ 15:
/*!**************************************************************!*\
  !*** multi ./assets/javascript/blocks/videoGallery/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /app/assets/javascript/blocks/videoGallery/index.js */"./assets/javascript/blocks/videoGallery/index.js");


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvYmxvY2tzL3ZpZGVvR2FsbGVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgW1wid3BcIixcImJsb2NrRWRpdG9yXCJdIiwid2VicGFjazovLy9leHRlcm5hbCBbXCJ3cFwiLFwiY29tcG9uZW50c1wiXSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgW1wid3BcIixcImkxOG5cIl0iXSwibmFtZXMiOlsid3AiLCJ0aXRsZSIsImljb24iLCJjYXRlZ29yeSIsInN1cHBvcnRzIiwiYWxpZ24iLCJhdHRyaWJ1dGVzIiwidHlwZSIsImVkaXQiLCJjbGFzc05hbWUiLCJwcm9wcyIsImlzU2VsZWN0ZWQiLCJzZXRBdHRyaWJ1dGVzIiwiVEVNUExBVEUiLCJfXyIsInNhdmUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFFQUEsRUFBRSxDQUFGQSwrQ0FBa0Q7QUFDakRDLE9BQUssRUFENEM7QUFFakRDLE1BQUksRUFGNkM7QUFHakRDLFVBQVEsRUFIeUM7QUFJakRDLFVBQVEsRUFBRTtBQUNUQyxTQUFLLEVBQUU7QUFERSxHQUp1QztBQU9qREMsWUFBVSxFQUFFO0FBQ1hMLFNBQUssRUFBRTtBQUNOTSxVQUFJLEVBQUU7QUFEQTtBQURJLEdBUHFDO0FBYWpEQyxNQUFJLEVBQUUscUJBQVc7QUFDaEIsUUFDQ0MsU0FERCxHQU9JQyxLQVBKO0FBQUEsUUFFQ0MsVUFGRCxHQU9JRCxLQVBKO0FBQUEsUUFJR1QsS0FKSCxHQU9JUyxLQVBKLFdBT0lBLENBUEo7QUFBQSxRQU1DRSxhQU5ELEdBT0lGLEtBUEo7QUFTQSxRQUFNRyxRQUFRLEdBQUcsQ0FBQyxDQUFsQixxQkFBa0IsQ0FBRCxDQUFqQjtBQUNBLHdCQUNDLHVEQUNDO0FBQUssZUFBUyxFQUFkO0FBQXVDLFNBQUcsRUFBQztBQUEzQyxvQkFDQyw4Q0FDQztBQUNDLGFBQU8sRUFEUjtBQUVDLGVBQVMsRUFGVjtBQUdDLFdBQUssRUFITjtBQUlDLGNBQVEsRUFBRyx5QkFBYTtBQUN2QkQscUJBQWEsQ0FBRTtBQUFFWCxlQUFLLEVBQUxBO0FBQUYsU0FBRixDQUFiVztBQUxGO0FBT0MsaUJBQVcsRUFBR0UsMERBQUU7QUFQakIsTUFERCxlQVVDO0FBQ0MsbUJBQWEsRUFBRSxDQURoQixxQkFDZ0IsQ0FEaEI7QUFFQyxjQUFRLEVBQUVEO0FBRlgsTUFWRCxDQURELENBREQsQ0FERDtBQXhCZ0Q7QUErQ2pERSxNQUFJLEVBQUUscUJBQVc7QUFDaEIsUUFDQ04sU0FERCxHQU9NQyxLQVBOO0FBQUEsUUFFQ0MsVUFGRCxHQU9NRCxLQVBOO0FBQUEsUUFJR1QsS0FKSCxHQU9NUyxLQVBOLFdBT01BLENBUE47QUFBQSxRQU1DRSxhQU5ELEdBT01GLEtBUE47QUFTQSx3QkFDQyw0REFBRztBQUFLLGVBQVMsRUFBQztBQUFmLG9CQUNELG9CQUFDLGdFQUFEO0FBQWtCLGFBQU8sRUFBekI7QUFBK0IsV0FBSyxFQUFHVDtBQUF2QyxNQURDLGVBRUQ7QUFBSyxlQUFTLEVBQWQ7QUFBdUMsU0FBRyxFQUFDO0FBQTNDLG9CQUNDLG9CQUFDLG1FQUFELFVBSkosSUFJSSxDQURELENBRkMsQ0FBSCxDQUREO0FBU0E7QUFsRWdELENBQWxERCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBLGFBQWEsOENBQThDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBN0QsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLHVDQUF1QyxFQUFFLEkiLCJmaWxlIjoiL2pzL2Jsb2Nrcy92aWRlby1nYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLy9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG4iLCJpbXBvcnQgeyBSaWNoVGV4dCwgSW5uZXJCbG9ja3MgfSBmcm9tIFwiQHdvcmRwcmVzcy9ibG9jay1lZGl0b3JcIjtcblxuaW1wb3J0IHsgX18gfSBmcm9tIFwiQHdvcmRwcmVzcy9pMThuXCI7XG5pbXBvcnQgeyBCdXR0b24sIFNlbGVjdENvbnRyb2wsIFRleHRDb250cm9sIH0gZnJvbSBcIkB3b3JkcHJlc3MvY29tcG9uZW50c1wiO1xuXG53cC5ibG9ja3MucmVnaXN0ZXJCbG9ja1R5cGUoXCJqYWNpL3ZpZGVvLWdhbGxlcnlcIiwge1xuXHR0aXRsZTogXCJWaWRlbyBHYWxsZXJ5XCIsXG5cdGljb246IFwiZm9ybWF0LXZpZGVvXCIsXG5cdGNhdGVnb3J5OiBcImNvbW1vblwiLFxuXHRzdXBwb3J0czoge1xuXHRcdGFsaWduOiB0cnVlLFxuXHR9LFxuXHRhdHRyaWJ1dGVzOiB7XG5cdFx0dGl0bGU6IHtcblx0XHRcdHR5cGU6IFwic3RyaW5nXCIsXG5cdFx0fSxcblx0fSxcblxuXHRlZGl0OiAocHJvcHMpID0+IHtcblx0XHRjb25zdCB7XG5cdFx0XHRjbGFzc05hbWUsXG5cdFx0XHRpc1NlbGVjdGVkLFxuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0ICB0aXRsZSxcblx0XHRcdH0sXG5cdFx0XHRzZXRBdHRyaWJ1dGVzLFxuXHRcdH0gPSBwcm9wcztcblx0XHRcblx0XHRjb25zdCBURU1QTEFURSA9IFtbJ2phY2kvZW1iZWQtdGVtcGxhdGUnXV07XG5cdFx0cmV0dXJuIChcblx0XHRcdDw+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tZ2FsbGVyeS13cmFwcGVyXCIga2V5PVwiY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdDxSaWNoVGV4dFxuXHRcdFx0XHRcdFx0XHR0YWdOYW1lPVwiaDJcIlxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJnYWxsZXJ5LXRpdGxlXCJcblx0XHRcdFx0XHRcdFx0dmFsdWU9eyB0aXRsZSB9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsgKCB0aXRsZSApID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzZXRBdHRyaWJ1dGVzKCB7IHRpdGxlIH0gKVxuXHRcdFx0XHRcdFx0XHR9IH1cblx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9eyBfXyggJ1R5cGUgYSB0aXRsZScsICdqZW8nICkgfSBcblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8SW5uZXJCbG9ja3Ncblx0XHRcdFx0XHRcdFx0YWxsb3dlZEJsb2Nrcz17WyAnamFjaS9lbWJlZC10ZW1wbGF0ZScgXX1cblx0XHRcdFx0XHRcdFx0dGVtcGxhdGU9e1RFTVBMQVRFfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8Lz5cblx0XHQpO1xuXHR9LFxuXG5cdHNhdmU6IChwcm9wcykgPT4ge1xuXHRcdGNvbnN0IHtcblx0XHRcdGNsYXNzTmFtZSxcblx0XHRcdGlzU2VsZWN0ZWQsXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHQgIHRpdGxlLFxuXHRcdFx0fSxcblx0XHRcdHNldEF0dHJpYnV0ZXMsXG5cdFx0ICB9ID0gcHJvcHM7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PD5cdDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tZ2FsbGVyeS1ibG9ja1wiPlxuXHRcdFx0XHRcdDxSaWNoVGV4dC5Db250ZW50IHRhZ05hbWU9XCJoMlwiIHZhbHVlPXsgdGl0bGUgfSAvPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tZ2FsbGVyeS13cmFwcGVyXCIga2V5PVwiY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8SW5uZXJCbG9ja3MuQ29udGVudC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC8+XG5cdFx0KTtcblx0fSxcbn0pO1xuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiYmxvY2tFZGl0b3JcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiY29tcG9uZW50c1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJpMThuXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=