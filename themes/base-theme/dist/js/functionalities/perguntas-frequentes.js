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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/functionalities/perguntas-frequentes.js":
/*!*******************************************************************!*\
  !*** ./assets/javascript/functionalities/perguntas-frequentes.js ***!
  \*******************************************************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Filter = /*#__PURE__*/function () {
  function Filter() {
    _classCallCheck(this, Filter);

    this.init();
  }

  _createClass(Filter, [{
    key: "init",
    value: function init() {
      var _this = this;

      var filter = document.getElementById('filter-perguntas-frequentes');
      var items = document.querySelectorAll('.each-subject li');
      var filterClear = document.querySelector('.filter-clear'); // Filter by search input on load

      if (filter.value.length >= 1) {
        this.fadeIn(filterClear);
        var term = filter.value.toLowerCase();
        Array.from(items).forEach(function (item) {
          var title = item.firstElementChild.textContent;
          var content = item.querySelector('.content');
          item.classList.remove('active');

          if (title.toLowerCase().indexOf(term) != -1) {
            _this.fadeIn(content);

            item.classList.add('active');
          } else {
            _this.fadeOut(content);
          }
        });
      } // Filter by the characters typed in the field


      filter.addEventListener('keyup', this.delay(function (e) {
        if (filter.value.length >= 1) {
          _this.fadeIn(filterClear);
        } else {
          _this.fadeOut(filterClear);
        }

        var term = e.target.value.toLowerCase();
        Array.from(items).forEach(function (item) {
          var title = item.firstElementChild.textContent;
          var content = item.querySelector('.content');
          item.classList.remove('active');

          if (title.toLowerCase().indexOf(term) != -1) {
            _this.fadeIn(content);

            item.classList.add('active');
          } else {
            _this.fadeOut(content);
          }
        });
      }, 500)); // Open and close items by click

      items.forEach(function (item) {
        item.addEventListener('click', function (e) {
          var content = item.querySelector('.content');

          if (item.classList.contains('active')) {
            _this.fadeOut(content);

            item.classList.remove('active');
          } else {
            _this.fadeIn(content);

            item.classList.add('active');
          }
        });
      }); // Clear filter by click

      filterClear.addEventListener('click', function (e) {
        filter.value = '';

        _this.fadeOut(filterClear);

        Array.from(items).forEach(function (item) {
          var content = item.querySelector('.content');

          _this.fadeIn(content);

          item.classList.add('active');
        });
      });
    }
  }, {
    key: "delay",
    value: function delay(callback, ms) {
      var timer = 0;
      return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, ms || 0);
      };
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(el) {
      el.style.opacity = 1;

      (function fade() {
        if ((el.style.opacity -= .1) < 0) {
          el.style.display = "none";
        } else {
          requestAnimationFrame(fade);
        }
      })();
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(el, display) {
      el.style.opacity = 0;
      el.style.display = display || "block";

      (function fade() {
        var val = parseFloat(el.style.opacity);

        if (!((val += .1) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
        }
      })();
    }
  }]);

  return Filter;
}();
document.defaultView.document.addEventListener('DOMContentLoaded', function () {
  new Filter();
});

/***/ }),

/***/ 7:
/*!*************************************************************************!*\
  !*** multi ./assets/javascript/functionalities/perguntas-frequentes.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /app/assets/javascript/functionalities/perguntas-frequentes.js */"./assets/javascript/functionalities/perguntas-frequentes.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL3Blcmd1bnRhcy1mcmVxdWVudGVzLmpzIl0sIm5hbWVzIjpbIkZpbHRlciIsImZpbHRlciIsImRvY3VtZW50IiwiaXRlbXMiLCJmaWx0ZXJDbGVhciIsInRlcm0iLCJBcnJheSIsInRpdGxlIiwiaXRlbSIsImNvbnRlbnQiLCJlIiwidGltZXIiLCJjb250ZXh0IiwiYXJncyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJjYWxsYmFjayIsIm1zIiwiZWwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkaXNwbGF5IiwidmFsIiwicGFyc2VGbG9hdCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFhQSxN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RSxDQUFGQTs7QUFDQSxPQUFDLGdCQUFnQjtBQUNiLFlBQUksQ0FBQ0EsRUFBRSxDQUFGQSxpQkFBRCxNQUFKLEdBQWtDO0FBQzlCQSxZQUFFLENBQUZBO0FBREosZUFFTztBQUNIQywrQkFBcUIsQ0FBckJBLElBQXFCLENBQXJCQTtBQUNIO0FBTEw7QUFPSDtBQXJHTDtBQUFBO0FBQUEsV0F1R0ksNkJBQW9CO0FBQ2hCRCxRQUFFLENBQUZBO0FBQ0FBLFFBQUUsQ0FBRkEsZ0JBQW1CRSxPQUFPLElBQTFCRjs7QUFDQSxPQUFDLGdCQUFnQjtBQUNiLFlBQUlHLEdBQUcsR0FBR0MsVUFBVSxDQUFDSixFQUFFLENBQUZBLE1BQXJCLE9BQW9CLENBQXBCOztBQUNBLFlBQUksRUFBRSxDQUFDRyxHQUFHLElBQUosTUFBTixDQUFJLENBQUosRUFBd0I7QUFDcEJILFlBQUUsQ0FBRkE7QUFDQUMsK0JBQXFCLENBQXJCQSxJQUFxQixDQUFyQkE7QUFDSDtBQUxMO0FBT0g7QUFqSEw7O0FBQUE7QUFBQTtBQXFIQWpCLFFBQVEsQ0FBUkEsMERBQW1FLFlBQU07QUFDeEU7QUFEREEsRyIsImZpbGUiOiIvanMvZnVuY3Rpb25hbGl0aWVzL3Blcmd1bnRhcy1mcmVxdWVudGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLy9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcbiIsImV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlciAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1wZXJndW50YXMtZnJlcXVlbnRlcycpO1xuICAgICAgICBjb25zdCBpdGVtcyAgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lYWNoLXN1YmplY3QgbGknKTtcbiAgICAgICAgY29uc3QgZmlsdGVyQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyLWNsZWFyJyk7XG5cbiAgICAgICAgLy8gRmlsdGVyIGJ5IHNlYXJjaCBpbnB1dCBvbiBsb2FkXG4gICAgICAgIGlmIChmaWx0ZXIudmFsdWUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZmFkZUluKGZpbHRlckNsZWFyKTtcbiAgICAgICAgICAgIGNvbnN0IHRlcm0gPSBmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgQXJyYXkuZnJvbShpdGVtcykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVJbihjb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQoY29udGVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsdGVyIGJ5IHRoZSBjaGFyYWN0ZXJzIHR5cGVkIGluIHRoZSBmaWVsZFxuICAgICAgICBmaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmRlbGF5KChlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChmaWx0ZXIudmFsdWUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGVJbihmaWx0ZXJDbGVhcilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWRlT3V0KGZpbHRlckNsZWFyKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0ZXJtID0gZS50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgQXJyYXkuZnJvbShpdGVtcykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVJbihjb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQoY29udGVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCA1MDApKTtcblxuICAgICAgICAvLyBPcGVuIGFuZCBjbG9zZSBpdGVtcyBieSBjbGlja1xuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhZGVPdXQoY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWRlSW4oY29udGVudClcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbGVhciBmaWx0ZXIgYnkgY2xpY2tcbiAgICAgICAgZmlsdGVyQ2xlYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gJyc7XG4gICAgICAgICAgICB0aGlzLmZhZGVPdXQoZmlsdGVyQ2xlYXIpO1xuXG4gICAgICAgICAgICBBcnJheS5mcm9tKGl0ZW1zKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhZGVJbihjb250ZW50KVxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxheShjYWxsYmFjaywgbXMpIHtcbiAgICAgICAgbGV0IHRpbWVyID0gMDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH0sIG1zIHx8IDApO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZhZGVPdXQoZWwpIHtcbiAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIChmdW5jdGlvbiBmYWRlKCkge1xuICAgICAgICAgICAgaWYgKChlbC5zdHlsZS5vcGFjaXR5IC09IC4xKSA8IDApIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmYWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICB9O1xuXG4gICAgZmFkZUluKGVsLCBkaXNwbGF5KSB7XG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheSB8fCBcImJsb2NrXCI7XG4gICAgICAgIChmdW5jdGlvbiBmYWRlKCkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHBhcnNlRmxvYXQoZWwuc3R5bGUub3BhY2l0eSk7XG4gICAgICAgICAgICBpZiAoISgodmFsICs9IC4xKSA+IDEpKSB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IHZhbDtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmFkZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgfTtcblxufVxuXG5kb2N1bWVudC5kZWZhdWx0Vmlldy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuXHRuZXcgRmlsdGVyKCk7XG59KTsiXSwic291cmNlUm9vdCI6IiJ9