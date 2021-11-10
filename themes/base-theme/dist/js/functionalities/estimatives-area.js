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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/functionalities/estimatives-area.js":
/*!***************************************************************!*\
  !*** ./assets/javascript/functionalities/estimatives-area.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _masks_number_masker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../masks/number-masker */ "./assets/javascript/masks/number-masker.js");

var estimativeBlocks = document.querySelectorAll('.estimatives-area');

function calculateTreeEstimative(baseTrees, tressPerDay, baseDate) {
  var serverTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : estimativesArea.utc;
  var startDate = new Date(baseDate);
  var currentDate = new Date(serverTime * 1000);
  var secondsBetween = Math.abs((startDate.getTime() - currentDate.getTime()) / 1000);
  var treesDestroiedInAsec = parseInt(tressPerDay) / 86400;
  return Math.floor(parseInt(baseTrees) + treesDestroiedInAsec * secondsBetween);
}

var initialTime = parseInt(estimativesArea.utc);
estimativeBlocks.forEach(function (block) {
  var estimativeNumberEl = block.querySelector('#trees-estimative');
  var baseTress = parseInt(estimativeNumberEl.getAttribute('data-base-trees'));
  var tressPerDay = parseInt(estimativeNumberEl.getAttribute('data-trees-per-day'));
  var dataDate = estimativeNumberEl.getAttribute('data-date');
  var maskableItens = document.querySelectorAll('span[data-mask=true]');
  maskableItens.forEach(function (item) {
    if (estimativesArea.getLangCode === 'pt-br') {
      item.innerHTML = Object(_masks_number_masker__WEBPACK_IMPORTED_MODULE_0__["default"])(item.innerHTML);
    } else {
      item.innerHTML = Object(_masks_number_masker__WEBPACK_IMPORTED_MODULE_0__["default"])(item.innerHTML, ',');
    }
  });
  setInterval(function () {
    var estimative = calculateTreeEstimative(baseTress, tressPerDay, dataDate, initialTime);

    if (estimativesArea.getLangCode === 'pt-br') {
      estimativeNumberEl.innerHTML = Object(_masks_number_masker__WEBPACK_IMPORTED_MODULE_0__["default"])(estimative);
    } else {
      estimativeNumberEl.innerHTML = Object(_masks_number_masker__WEBPACK_IMPORTED_MODULE_0__["default"])(estimative, ',');
    }

    initialTime += 1;
  }, 1000);
});

/***/ }),

/***/ "./assets/javascript/masks/number-masker.js":
/*!**************************************************!*\
  !*** ./assets/javascript/masks/number-masker.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return numberMask; });
function numberMask(x) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/***/ }),

/***/ 3:
/*!*********************************************************************!*\
  !*** multi ./assets/javascript/functionalities/estimatives-area.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /app/assets/javascript/functionalities/estimatives-area.js */"./assets/javascript/functionalities/estimatives-area.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2VzdGltYXRpdmVzLWFyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvbWFza3MvbnVtYmVyLW1hc2tlci5qcyJdLCJuYW1lcyI6WyJlc3RpbWF0aXZlQmxvY2tzIiwiZG9jdW1lbnQiLCJzZXJ2ZXJUaW1lIiwiZXN0aW1hdGl2ZXNBcmVhIiwidXRjIiwic3RhcnREYXRlIiwiY3VycmVudERhdGUiLCJzZWNvbmRzQmV0d2VlbiIsIk1hdGgiLCJ0cmVlc0Rlc3Ryb2llZEluQXNlYyIsInBhcnNlSW50IiwiaW5pdGlhbFRpbWUiLCJlc3RpbWF0aXZlTnVtYmVyRWwiLCJibG9jayIsImJhc2VUcmVzcyIsInRyZXNzUGVyRGF5IiwiZGF0YURhdGUiLCJtYXNrYWJsZUl0ZW5zIiwiaXRlbSIsIm51bWJlck1hc2siLCJzZXRJbnRlcnZhbCIsImVzdGltYXRpdmUiLCJjYWxjdWxhdGVUcmVlRXN0aW1hdGl2ZSIsInNlcGFyYXRvciIsIngiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBRUEsSUFBTUEsZ0JBQWdCLEdBQUdDLFFBQVEsQ0FBUkEsaUJBQXpCLG1CQUF5QkEsQ0FBekI7O0FBRUEsbUVBQXFHO0FBQUEsTUFBbENDLFVBQWtDLHVFQUFyQkMsZUFBZSxDQUFDQyxHQUFLO0FBQ2pHLE1BQU1DLFNBQVMsR0FBRyxTQUFsQixRQUFrQixDQUFsQjtBQUNBLE1BQU1DLFdBQVcsR0FBRyxTQUFTSixVQUFVLEdBQXZDLElBQW9CLENBQXBCO0FBQ0EsTUFBTUssY0FBYyxHQUFHQyxJQUFJLENBQUpBLElBQVMsQ0FBQ0gsU0FBUyxDQUFUQSxZQUFzQkMsV0FBVyxDQUFsQyxPQUF1QkEsRUFBdkIsSUFBaEMsSUFBdUJFLENBQXZCO0FBQ0EsTUFBTUMsb0JBQW9CLEdBQUdDLFFBQVEsQ0FBUkEsV0FBUSxDQUFSQSxHQUE3QjtBQUVBLFNBQU9GLElBQUksQ0FBSkEsTUFBV0UsUUFBUSxDQUFSQSxTQUFRLENBQVJBLEdBQXNCRCxvQkFBb0IsR0FBNUQsY0FBT0QsQ0FBUDtBQUNIOztBQUVELElBQUlHLFdBQVcsR0FBR0QsUUFBUSxDQUFDUCxlQUFlLENBQTFDLEdBQTBCLENBQTFCO0FBRUFILGdCQUFnQixDQUFoQkEsUUFBeUIsaUJBQVM7QUFDOUIsTUFBTVksa0JBQWtCLEdBQUdDLEtBQUssQ0FBTEEsY0FBM0IsbUJBQTJCQSxDQUEzQjtBQUNBLE1BQU1DLFNBQVMsR0FBR0osUUFBUSxDQUFDRSxrQkFBa0IsQ0FBbEJBLGFBQTNCLGlCQUEyQkEsQ0FBRCxDQUExQjtBQUNBLE1BQU1HLFdBQVcsR0FBR0wsUUFBUSxDQUFDRSxrQkFBa0IsQ0FBbEJBLGFBQTdCLG9CQUE2QkEsQ0FBRCxDQUE1QjtBQUNBLE1BQU1JLFFBQVEsR0FBR0osa0JBQWtCLENBQWxCQSxhQUFqQixXQUFpQkEsQ0FBakI7QUFDQSxNQUFNSyxhQUFhLEdBQUdoQixRQUFRLENBQVJBLGlCQUF0QixzQkFBc0JBLENBQXRCO0FBRUFnQixlQUFhLENBQWJBLFFBQXNCLGdCQUFRO0FBQzFCLFFBQUlkLGVBQWUsQ0FBZkEsZ0JBQUosU0FBNkM7QUFDekNlLFVBQUksQ0FBSkEsWUFBaUJDLG9FQUFVLENBQUNELElBQUksQ0FBaENBLFNBQTJCLENBQTNCQTtBQURKLFdBRU87QUFDSEEsVUFBSSxDQUFKQSxZQUFpQkMsb0VBQVUsQ0FBQ0QsSUFBSSxDQUFMLFdBQTNCQSxHQUEyQixDQUEzQkE7QUFDSDtBQUxMRDtBQVFBRyxhQUFXLENBQUMsWUFBVztBQUNuQixRQUFNQyxVQUFVLEdBQUdDLHVCQUF1QixtQ0FBMUMsV0FBMEMsQ0FBMUM7O0FBQ0EsUUFBSW5CLGVBQWUsQ0FBZkEsZ0JBQUosU0FBNkM7QUFDekNTLHdCQUFrQixDQUFsQkEsWUFBK0JPLG9FQUFVLENBQXpDUCxVQUF5QyxDQUF6Q0E7QUFESixXQUVPO0FBQ0hBLHdCQUFrQixDQUFsQkEsWUFBK0JPLG9FQUFVLGFBQXpDUCxHQUF5QyxDQUF6Q0E7QUFDSDs7QUFFREQsZUFBVyxJQUFYQTtBQVJPLEtBQVhTLElBQVcsQ0FBWEE7QUFmSnBCLEc7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBZSx1QkFBd0M7QUFBQSxNQUFqQnVCLFNBQWlCLHVFQUFMLEdBQUs7QUFDbkQsU0FBT0MsQ0FBQyxDQUFEQSw0Q0FBUCxTQUFPQSxDQUFQO0FBQ0gsQyIsImZpbGUiOiIvanMvZnVuY3Rpb25hbGl0aWVzL2VzdGltYXRpdmVzLWFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuIiwiaW1wb3J0IG51bWJlck1hc2sgZnJvbSAnLi8uLi9tYXNrcy9udW1iZXItbWFza2VyJztcblxuY29uc3QgZXN0aW1hdGl2ZUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lc3RpbWF0aXZlcy1hcmVhJyk7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVRyZWVFc3RpbWF0aXZlKGJhc2VUcmVlcywgdHJlc3NQZXJEYXksIGJhc2VEYXRlLCBzZXJ2ZXJUaW1lID0gZXN0aW1hdGl2ZXNBcmVhLnV0Yykge1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGJhc2VEYXRlKTtcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHNlcnZlclRpbWUgKiAxMDAwKTtcbiAgICBjb25zdCBzZWNvbmRzQmV0d2VlbiA9IE1hdGguYWJzKChzdGFydERhdGUuZ2V0VGltZSgpIC0gY3VycmVudERhdGUuZ2V0VGltZSgpKSAvIDEwMDApO1xuICAgIGNvbnN0IHRyZWVzRGVzdHJvaWVkSW5Bc2VjID0gcGFyc2VJbnQodHJlc3NQZXJEYXkpIC8gODY0MDA7XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihwYXJzZUludChiYXNlVHJlZXMpICsgdHJlZXNEZXN0cm9pZWRJbkFzZWMgKiBzZWNvbmRzQmV0d2Vlbilcbn1cblxubGV0IGluaXRpYWxUaW1lID0gcGFyc2VJbnQoZXN0aW1hdGl2ZXNBcmVhLnV0Yyk7XG5cbmVzdGltYXRpdmVCbG9ja3MuZm9yRWFjaChibG9jayA9PiB7XG4gICAgY29uc3QgZXN0aW1hdGl2ZU51bWJlckVsID0gYmxvY2sucXVlcnlTZWxlY3RvcignI3RyZWVzLWVzdGltYXRpdmUnKTtcbiAgICBjb25zdCBiYXNlVHJlc3MgPSBwYXJzZUludChlc3RpbWF0aXZlTnVtYmVyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWJhc2UtdHJlZXMnKSk7XG4gICAgY29uc3QgdHJlc3NQZXJEYXkgPSBwYXJzZUludChlc3RpbWF0aXZlTnVtYmVyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRyZWVzLXBlci1kYXknKSk7XG4gICAgY29uc3QgZGF0YURhdGUgPSBlc3RpbWF0aXZlTnVtYmVyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRhdGUnKTtcbiAgICBjb25zdCBtYXNrYWJsZUl0ZW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbltkYXRhLW1hc2s9dHJ1ZV0nKTtcblxuICAgIG1hc2thYmxlSXRlbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKGVzdGltYXRpdmVzQXJlYS5nZXRMYW5nQ29kZSA9PT0gJ3B0LWJyJykge1xuICAgICAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBudW1iZXJNYXNrKGl0ZW0uaW5uZXJIVE1MKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uaW5uZXJIVE1MID0gbnVtYmVyTWFzayhpdGVtLmlubmVySFRNTCwgJywnKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZXN0aW1hdGl2ZSA9IGNhbGN1bGF0ZVRyZWVFc3RpbWF0aXZlKGJhc2VUcmVzcywgdHJlc3NQZXJEYXksIGRhdGFEYXRlLCBpbml0aWFsVGltZSk7XG4gICAgICAgIGlmIChlc3RpbWF0aXZlc0FyZWEuZ2V0TGFuZ0NvZGUgPT09ICdwdC1icicpIHtcbiAgICAgICAgICAgIGVzdGltYXRpdmVOdW1iZXJFbC5pbm5lckhUTUwgPSBudW1iZXJNYXNrKGVzdGltYXRpdmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXN0aW1hdGl2ZU51bWJlckVsLmlubmVySFRNTCA9IG51bWJlck1hc2soZXN0aW1hdGl2ZSwgJywnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxUaW1lICs9IDFcbiAgICB9LCAxMDAwKTtcblxufSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVtYmVyTWFzayh4LCBzZXBhcmF0b3IgPSAnLicpIHtcbiAgICByZXR1cm4geC50b1N0cmluZygpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIHNlcGFyYXRvcik7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==