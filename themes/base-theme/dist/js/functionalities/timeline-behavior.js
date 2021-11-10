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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/functionalities/timeline-behavior.js":
/*!****************************************************************!*\
  !*** ./assets/javascript/functionalities/timeline-behavior.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tiny_slider_src_tiny_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/tiny-slider/src/tiny-slider */ "./node_modules/tiny-slider/src/tiny-slider.js");

window.addEventListener("load", function (event) {
  document.querySelectorAll('.item-slider').forEach(function (slider) {
    Object(_node_modules_tiny_slider_src_tiny_slider__WEBPACK_IMPORTED_MODULE_0__["tns"])({
      container: slider,
      items: 1,
      gutter: 0,
      autoplay: false,
      controlsText: ["", ""],
      responsive: {
        640: {
          items: 2
        },
        768: {
          items: 3
        }
      }
    });
  });
  var dates = document.getElementsByClassName("date");
  var items = document.getElementsByClassName("tns-outer");
  items[0].classList.add("active");

  function test(date, items) {
    var index = date.dataset.index;
    var itemActive = document.getElementsByClassName("active")[0];
    itemActive.classList.remove("active");
    items[index].classList.add("active");
  }

  for (var i = 0; i < dates.length; i++) {
    dates[i].addEventListener("click", function () {
      test(this, items);
    }, false);
  }
});

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/addCSSRule.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/addCSSRule.js ***!
  \************************************************************/
/*! exports provided: addCSSRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCSSRule", function() { return addCSSRule; });
/* harmony import */ var _raf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raf.js */ "./node_modules/tiny-slider/src/helpers/raf.js");
// cross browsers addRule method

function addCSSRule(sheet, selector, rules, index) {
  // return raf(function() {
    'insertRule' in sheet ?
      sheet.insertRule(selector + '{' + rules + '}', index) :
      sheet.addRule(selector, rules, index);
  // });
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/addClass.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/addClass.js ***!
  \**********************************************************/
/*! exports provided: addClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony import */ var _hasClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasClass.js */ "./node_modules/tiny-slider/src/helpers/hasClass.js");

var addClass = _hasClass_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"] ?
    function (el, str) {
      if (!Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el,  str)) { el.classList.add(str); }
    } :
    function (el, str) {
      if (!Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el,  str)) { el.className += ' ' + str; }
    };



/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/addEvents.js":
/*!***********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/addEvents.js ***!
  \***********************************************************/
/*! exports provided: addEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEvents", function() { return addEvents; });
/* harmony import */ var _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./passiveOption.js */ "./node_modules/tiny-slider/src/helpers/passiveOption.js");


function addEvents(el, obj, preventScrolling) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__["passiveOption"] : false;
    el.addEventListener(prop, obj[prop], option);
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/arrayFromNodeList.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/arrayFromNodeList.js ***!
  \*******************************************************************/
/*! exports provided: arrayFromNodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayFromNodeList", function() { return arrayFromNodeList; });
function arrayFromNodeList (nl) {
  var arr = [];
  for (var i = 0, l = nl.length; i < l; i++) {
    arr.push(nl[i]);
  }
  return arr;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/caf.js":
/*!*****************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/caf.js ***!
  \*****************************************************/
/*! exports provided: caf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caf", function() { return caf; });
var win = window;

var caf = win.cancelAnimationFrame
  || win.mozCancelAnimationFrame
  || function(id){ clearTimeout(id); };


/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/calc.js":
/*!******************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/calc.js ***!
  \******************************************************/
/*! exports provided: calc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calc", function() { return calc; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");
// get css-calc 
// @return - false | calc | -webkit-calc | -moz-calc
// @usage - var calc = getCalc(); 




function calc() {
  var doc = document, 
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      div = doc.createElement('div'), 
      result = false;

  body.appendChild(div);
  try {
    var str = '(10px * 10)',
        vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
        val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 100) { 
        result = val.replace(str, ''); 
        break;
      }
    }
  } catch (e) {}
  
  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : div.remove();

  return result;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/checkStorageValue.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/checkStorageValue.js ***!
  \*******************************************************************/
/*! exports provided: checkStorageValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkStorageValue", function() { return checkStorageValue; });
function checkStorageValue (value) {
  return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/classListSupport.js":
/*!******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/classListSupport.js ***!
  \******************************************************************/
/*! exports provided: classListSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classListSupport", function() { return classListSupport; });
var classListSupport = 'classList' in document.createElement('_');

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/createStyleSheet.js":
/*!******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/createStyleSheet.js ***!
  \******************************************************************/
/*! exports provided: createStyleSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStyleSheet", function() { return createStyleSheet; });
// create and append style sheet
function createStyleSheet (media, nonce) {
  // Create the <style> tag
  var style = document.createElement("style");
  // style.setAttribute("type", "text/css");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")
  if (media) { style.setAttribute("media", media); }

  // Add nonce attribute for Content Security Policy
  if (nonce) { style.setAttribute("nonce", nonce); }

  // WebKit hack :(
  // style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.querySelector('head').appendChild(style);

  return style.sheet ? style.sheet : style.styleSheet;
};

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/docElement.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/docElement.js ***!
  \************************************************************/
/*! exports provided: docElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "docElement", function() { return docElement; });
var docElement = document.documentElement;

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/events.js":
/*!********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/events.js ***!
  \********************************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
function Events() {
  return {
    topics: {},
    on: function (eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function (eventName, data) {
      data.type = eventName;
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function(fn) {
          fn(data, eventName);
        });
      }
    }
  };
};

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/extend.js":
/*!********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/extend.js ***!
  \********************************************************/
/*! exports provided: extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
function extend() {
  var obj, name, copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/forEach.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/forEach.js ***!
  \*********************************************************/
/*! exports provided: forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
// https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
function forEach (arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getAttr.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getAttr.js ***!
  \*********************************************************/
/*! exports provided: getAttr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttr", function() { return getAttr; });
function getAttr(el, attr) {
  return el.getAttribute(attr);
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getBody.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getBody.js ***!
  \*********************************************************/
/*! exports provided: getBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBody", function() { return getBody; });
function getBody () {
  var doc = document,
      body = doc.body;

  if (!body) {
    body = doc.createElement('body');
    body.fake = true;
  }

  return body;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getCssRulesLength.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getCssRulesLength.js ***!
  \*******************************************************************/
/*! exports provided: getCssRulesLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCssRulesLength", function() { return getCssRulesLength; });
function getCssRulesLength(sheet) {
  var rule = ('insertRule' in sheet) ? sheet.cssRules : sheet.rules;
  return rule.length;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getEndProperty.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getEndProperty.js ***!
  \****************************************************************/
/*! exports provided: getEndProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEndProperty", function() { return getEndProperty; });
// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }
  return endProp;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getSlideId.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getSlideId.js ***!
  \************************************************************/
/*! exports provided: getSlideId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSlideId", function() { return getSlideId; });
function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;
  
  return 'tns' + window.tnsId;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getTouchDirection.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getTouchDirection.js ***!
  \*******************************************************************/
/*! exports provided: getTouchDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTouchDirection", function() { return getTouchDirection; });
function getTouchDirection(angle, range) {
  var direction = false,
      gap = Math.abs(90 - Math.abs(angle));
      
  if (gap >= 90 - range) {
    direction = 'horizontal';
  } else if (gap <= range) {
    direction = 'vertical';
  }

  return direction;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/has3DTransforms.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/has3DTransforms.js ***!
  \*****************************************************************/
/*! exports provided: has3DTransforms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has3DTransforms", function() { return has3DTransforms; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");




function has3DTransforms(tf){
  if (!tf) { return false; }
  if (!window.getComputedStyle) { return false; }
  
  var doc = document,
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      el = doc.createElement('p'),
      has3d,
      cssTF = tf.length > 9 ? '-' + tf.slice(0, -9).toLowerCase() + '-' : '';

  cssTF += 'transform';

  // Add it to the body to get the computed style
  body.insertBefore(el, null);

  el.style[tf] = 'translate3d(1px,1px,1px)';
  has3d = window.getComputedStyle(el).getPropertyValue(cssTF);

  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : el.remove();

  return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}


/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/hasAttr.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/hasAttr.js ***!
  \*********************************************************/
/*! exports provided: hasAttr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasAttr", function() { return hasAttr; });
function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/hasClass.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/hasClass.js ***!
  \**********************************************************/
/*! exports provided: classListSupport, hasClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony import */ var _classListSupport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classListSupport.js */ "./node_modules/tiny-slider/src/helpers/classListSupport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classListSupport", function() { return _classListSupport_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"]; });



var hasClass = _classListSupport_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"] ?
    function (el, str) { return el.classList.contains(str); } :
    function (el, str) { return el.className.indexOf(str) >= 0; };



/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/hideElement.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/hideElement.js ***!
  \*************************************************************/
/*! exports provided: hideElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideElement", function() { return hideElement; });
function hideElement(el, forceHide) {
  if (el.style.display !== 'none') { el.style.display = 'none'; }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/isNodeList.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/isNodeList.js ***!
  \************************************************************/
/*! exports provided: isNodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNodeList", function() { return isNodeList; });
function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined"; 
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/isVisible.js":
/*!***********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/isVisible.js ***!
  \***********************************************************/
/*! exports provided: isVisible */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVisible", function() { return isVisible; });
function isVisible(el) {
  return window.getComputedStyle(el).display !== 'none';
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/jsTransform.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/jsTransform.js ***!
  \*************************************************************/
/*! exports provided: jsTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsTransform", function() { return jsTransform; });
function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
      unit = (to.indexOf('%') >= 0) ? '%' : 'px',
      to = to.replace(unit, ''),
      from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
      positionTick = (to - from) / duration * tick,
      running;

  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) { 
      setTimeout(moveElement, tick); 
    } else {
      callback();
    }
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/mediaquerySupport.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/mediaquerySupport.js ***!
  \*******************************************************************/
/*! exports provided: mediaquerySupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediaquerySupport", function() { return mediaquerySupport; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");




function mediaquerySupport () {
  if (window.matchMedia || window.msMatchMedia) {
    return true;
  }
  
  var doc = document,
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      div = doc.createElement('div'),
      style = doc.createElement('style'),
      rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
      position;

  style.type = 'text/css';
  div.className = 'tns-mq-test';

  body.appendChild(style);
  body.appendChild(div);

  if (style.styleSheet) {
    style.styleSheet.cssText = rule;
  } else {
    style.appendChild(doc.createTextNode(rule));
  }

  position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];

  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : div.remove();

  return position === "absolute";
}


/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/passiveOption.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/passiveOption.js ***!
  \***************************************************************/
/*! exports provided: passiveOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passiveOption", function() { return passiveOption; });
// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
var passiveOption = supportsPassive ? { passive: true } : false;

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/percentageLayout.js":
/*!******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/percentageLayout.js ***!
  \******************************************************************/
/*! exports provided: percentageLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "percentageLayout", function() { return percentageLayout; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");
// get subpixel support value
// @return - boolean




function percentageLayout() {
  // check subpixel layout supporting
  var doc = document,
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      wrapper = doc.createElement('div'),
      outer = doc.createElement('div'),
      str = '',
      count = 70,
      perPage = 3,
      supported = false;

  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";

  for (var i = 0; i < count; i++) {
    str += '<div></div>';
  }

  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);

  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;

  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : wrapper.remove();

  return supported;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/raf.js":
/*!*****************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/raf.js ***!
  \*****************************************************/
/*! exports provided: raf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return raf; });
var win = window;

var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };


/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeAttrs.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeAttrs.js ***!
  \*************************************************************/
/*! exports provided: removeAttrs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttrs", function() { return removeAttrs; });
/* harmony import */ var _isNodeList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNodeList.js */ "./node_modules/tiny-slider/src/helpers/isNodeList.js");


function removeAttrs(els, attrs) {
  els = (Object(_isNodeList_js__WEBPACK_IMPORTED_MODULE_0__["isNodeList"])(els) || els instanceof Array) ? els : [els];
  attrs = (attrs instanceof Array) ? attrs : [attrs];

  var attrLength = attrs.length;
  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeCSSRule.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeCSSRule.js ***!
  \***************************************************************/
/*! exports provided: removeCSSRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCSSRule", function() { return removeCSSRule; });
/* harmony import */ var _raf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raf.js */ "./node_modules/tiny-slider/src/helpers/raf.js");
// cross browsers addRule method

function removeCSSRule(sheet, index) {
  // return raf(function() {
    'deleteRule' in sheet ?
      sheet.deleteRule(index) :
      sheet.removeRule(index);
  // });
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeClass.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeClass.js ***!
  \*************************************************************/
/*! exports provided: removeClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony import */ var _hasClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasClass.js */ "./node_modules/tiny-slider/src/helpers/hasClass.js");

var removeClass = _hasClass_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"] ?
    function (el, str) {
      if (Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el,  str)) { el.classList.remove(str); }
    } :
    function (el, str) {
      if (Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el, str)) { el.className = el.className.replace(str, ''); }
    };



/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeEvents.js":
/*!**************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeEvents.js ***!
  \**************************************************************/
/*! exports provided: removeEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEvents", function() { return removeEvents; });
/* harmony import */ var _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./passiveOption.js */ "./node_modules/tiny-slider/src/helpers/passiveOption.js");


function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__["passiveOption"] : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/resetFakeBody.js ***!
  \***************************************************************/
/*! exports provided: resetFakeBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFakeBody", function() { return resetFakeBody; });
/* harmony import */ var _docElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./docElement.js */ "./node_modules/tiny-slider/src/helpers/docElement.js");


function resetFakeBody (body, docOverflow) {
  if (body.fake) {
    body.remove();
    _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].style.overflow = docOverflow;
    // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    // eslint-disable-next-line
    _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].offsetHeight;
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/setAttrs.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/setAttrs.js ***!
  \**********************************************************/
/*! exports provided: setAttrs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttrs", function() { return setAttrs; });
/* harmony import */ var _isNodeList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNodeList.js */ "./node_modules/tiny-slider/src/helpers/isNodeList.js");


function setAttrs(els, attrs) {
  els = (Object(_isNodeList_js__WEBPACK_IMPORTED_MODULE_0__["isNodeList"])(els) || els instanceof Array) ? els : [els];
  if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }

  for (var i = els.length; i--;) {
    for(var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/setFakeBody.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/setFakeBody.js ***!
  \*************************************************************/
/*! exports provided: setFakeBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFakeBody", function() { return setFakeBody; });
/* harmony import */ var _docElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./docElement.js */ "./node_modules/tiny-slider/src/helpers/docElement.js");


function setFakeBody (body) {
  var docOverflow = '';
  if (body.fake) {
    docOverflow = _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].style.overflow;
    //avoid crashing IE8, if background image is used
    body.style.background = '';
    //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
    body.style.overflow = _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].style.overflow = 'hidden';
    _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].appendChild(body);
  }

  return docOverflow;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/setLocalStorage.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/setLocalStorage.js ***!
  \*****************************************************************/
/*! exports provided: setLocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocalStorage", function() { return setLocalStorage; });
function setLocalStorage(storage, key, value, access) {
  if (access) {
    try { storage.setItem(key, value); } catch (e) {}
  }
  return value;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/showElement.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/showElement.js ***!
  \*************************************************************/
/*! exports provided: showElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showElement", function() { return showElement; });
function showElement(el, forceHide) {
  if (el.style.display === 'none') { el.style.display = ''; }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/toDegree.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/toDegree.js ***!
  \**********************************************************/
/*! exports provided: toDegree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDegree", function() { return toDegree; });
function toDegree (y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/whichProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/whichProperty.js ***!
  \***************************************************************/
/*! exports provided: whichProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whichProperty", function() { return whichProperty; });
function whichProperty(props){
  if (typeof props === 'string') {
    var arr = [props],
        Props = props.charAt(0).toUpperCase() + props.substr(1),
        prefixes = ['Webkit', 'Moz', 'ms', 'O'];
        
    prefixes.forEach(function(prefix) {
      if (prefix !== 'ms' || props === 'transform') {
        arr.push(prefix + Props);
      }
    });

    props = arr;
  }

  var el = document.createElement('fakeelement'),
      len = props.length;
  for(var i = 0; i < props.length; i++){
    var prop = props[i];
    if( el.style[prop] !== undefined ){ return prop; }
  }

  return false; // explicit for ie9-
}


/***/ }),

/***/ "./node_modules/tiny-slider/src/tiny-slider.js":
/*!*****************************************************!*\
  !*** ./node_modules/tiny-slider/src/tiny-slider.js ***!
  \*****************************************************/
/*! exports provided: tns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tns", function() { return tns; });
/* harmony import */ var _helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/raf.js */ "./node_modules/tiny-slider/src/helpers/raf.js");
/* harmony import */ var _helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/caf.js */ "./node_modules/tiny-slider/src/helpers/caf.js");
/* harmony import */ var _helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/extend.js */ "./node_modules/tiny-slider/src/helpers/extend.js");
/* harmony import */ var _helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/checkStorageValue.js */ "./node_modules/tiny-slider/src/helpers/checkStorageValue.js");
/* harmony import */ var _helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/setLocalStorage.js */ "./node_modules/tiny-slider/src/helpers/setLocalStorage.js");
/* harmony import */ var _helpers_getSlideId_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/getSlideId.js */ "./node_modules/tiny-slider/src/helpers/getSlideId.js");
/* harmony import */ var _helpers_calc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/calc.js */ "./node_modules/tiny-slider/src/helpers/calc.js");
/* harmony import */ var _helpers_percentageLayout_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/percentageLayout.js */ "./node_modules/tiny-slider/src/helpers/percentageLayout.js");
/* harmony import */ var _helpers_mediaquerySupport_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/mediaquerySupport.js */ "./node_modules/tiny-slider/src/helpers/mediaquerySupport.js");
/* harmony import */ var _helpers_createStyleSheet_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/createStyleSheet.js */ "./node_modules/tiny-slider/src/helpers/createStyleSheet.js");
/* harmony import */ var _helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/addCSSRule.js */ "./node_modules/tiny-slider/src/helpers/addCSSRule.js");
/* harmony import */ var _helpers_removeCSSRule_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/removeCSSRule.js */ "./node_modules/tiny-slider/src/helpers/removeCSSRule.js");
/* harmony import */ var _helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/getCssRulesLength.js */ "./node_modules/tiny-slider/src/helpers/getCssRulesLength.js");
/* harmony import */ var _helpers_toDegree_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./helpers/toDegree.js */ "./node_modules/tiny-slider/src/helpers/toDegree.js");
/* harmony import */ var _helpers_getTouchDirection_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/getTouchDirection.js */ "./node_modules/tiny-slider/src/helpers/getTouchDirection.js");
/* harmony import */ var _helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers/forEach.js */ "./node_modules/tiny-slider/src/helpers/forEach.js");
/* harmony import */ var _helpers_hasClass_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/hasClass.js */ "./node_modules/tiny-slider/src/helpers/hasClass.js");
/* harmony import */ var _helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./helpers/addClass.js */ "./node_modules/tiny-slider/src/helpers/addClass.js");
/* harmony import */ var _helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./helpers/removeClass.js */ "./node_modules/tiny-slider/src/helpers/removeClass.js");
/* harmony import */ var _helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./helpers/hasAttr.js */ "./node_modules/tiny-slider/src/helpers/hasAttr.js");
/* harmony import */ var _helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./helpers/getAttr.js */ "./node_modules/tiny-slider/src/helpers/getAttr.js");
/* harmony import */ var _helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./helpers/setAttrs.js */ "./node_modules/tiny-slider/src/helpers/setAttrs.js");
/* harmony import */ var _helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./helpers/removeAttrs.js */ "./node_modules/tiny-slider/src/helpers/removeAttrs.js");
/* harmony import */ var _helpers_arrayFromNodeList_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./helpers/arrayFromNodeList.js */ "./node_modules/tiny-slider/src/helpers/arrayFromNodeList.js");
/* harmony import */ var _helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./helpers/hideElement.js */ "./node_modules/tiny-slider/src/helpers/hideElement.js");
/* harmony import */ var _helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./helpers/showElement.js */ "./node_modules/tiny-slider/src/helpers/showElement.js");
/* harmony import */ var _helpers_isVisible_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./helpers/isVisible.js */ "./node_modules/tiny-slider/src/helpers/isVisible.js");
/* harmony import */ var _helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./helpers/whichProperty.js */ "./node_modules/tiny-slider/src/helpers/whichProperty.js");
/* harmony import */ var _helpers_has3DTransforms_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./helpers/has3DTransforms.js */ "./node_modules/tiny-slider/src/helpers/has3DTransforms.js");
/* harmony import */ var _helpers_getEndProperty_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./helpers/getEndProperty.js */ "./node_modules/tiny-slider/src/helpers/getEndProperty.js");
/* harmony import */ var _helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./helpers/addEvents.js */ "./node_modules/tiny-slider/src/helpers/addEvents.js");
/* harmony import */ var _helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./helpers/removeEvents.js */ "./node_modules/tiny-slider/src/helpers/removeEvents.js");
/* harmony import */ var _helpers_events_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./helpers/events.js */ "./node_modules/tiny-slider/src/helpers/events.js");
/* harmony import */ var _helpers_jsTransform_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./helpers/jsTransform.js */ "./node_modules/tiny-slider/src/helpers/jsTransform.js");
// Object.keys
if (!Object.keys) {
  Object.keys = function(object) {
    var keys = [];
    for (var name in object) {
      if (Object.prototype.hasOwnProperty.call(object, name)) {
        keys.push(name);
      }
    }
    return keys;
  };
}

// ChildNode.remove
if(!("remove" in Element.prototype)){
  Element.prototype.remove = function(){
    if(this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}




































var tns = function(options) {
  options = Object(_helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__["extend"])({
    container: '.slider',
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    autoWidth: false,
    viewportMax: false,
    slideBy: 1,
    center: false,
    controls: true,
    controlsPosition: 'top',
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navPosition: 'top',
    navContainer: false,
    navAsThumbnails: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayPosition: 'top',
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'stop'],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayResetOnVisibility: true,
    animateIn: 'tns-fadeIn',
    animateOut: 'tns-fadeOut',
    animateNormal: 'tns-normal',
    animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    lazyloadSelector: '.tns-lazy-img',
    touch: true,
    mouseDrag: false,
    swipeAngle: 15,
    nested: false,
    preventActionWhenRunning: false,
    preventScrollOnTouch: false,
    freezable: true,
    onInit: false,
    useLocalStorage: true,
    nonce: false
  }, options || {});

  var doc = document,
      win = window,
      KEYS = {
        ENTER: 13,
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39
      },
      tnsStorage = {},
      localStorageAccess = options.useLocalStorage;

  if (localStorageAccess) {
    // check browser version and local storage access
    var browserInfo = navigator.userAgent;
    var uid = new Date;

    try {
      tnsStorage = win.localStorage;
      if (tnsStorage) {
        tnsStorage.setItem(uid, uid);
        localStorageAccess = tnsStorage.getItem(uid) == uid;
        tnsStorage.removeItem(uid);
      } else {
        localStorageAccess = false;
      }
      if (!localStorageAccess) { tnsStorage = {}; }
    } catch(e) {
      localStorageAccess = false;
    }

    if (localStorageAccess) {
      // remove storage when browser version changes
      if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
        ['tC', 'tPL', 'tMQ', 'tTf', 't3D', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function(item) { tnsStorage.removeItem(item); });
      }
      // update browserInfo
      localStorage['tnsApp'] = browserInfo;
    }
  }

  var CALC = tnsStorage['tC'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tC']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tC', Object(_helpers_calc_js__WEBPACK_IMPORTED_MODULE_6__["calc"])(), localStorageAccess),
      PERCENTAGELAYOUT = tnsStorage['tPL'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tPL']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tPL', Object(_helpers_percentageLayout_js__WEBPACK_IMPORTED_MODULE_7__["percentageLayout"])(), localStorageAccess),
      CSSMQ = tnsStorage['tMQ'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tMQ']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tMQ', Object(_helpers_mediaquerySupport_js__WEBPACK_IMPORTED_MODULE_8__["mediaquerySupport"])(), localStorageAccess),
      TRANSFORM = tnsStorage['tTf'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTf']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTf', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('transform'), localStorageAccess),
      HAS3DTRANSFORMS = tnsStorage['t3D'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['t3D']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 't3D', Object(_helpers_has3DTransforms_js__WEBPACK_IMPORTED_MODULE_28__["has3DTransforms"])(TRANSFORM), localStorageAccess),
      TRANSITIONDURATION = tnsStorage['tTDu'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTDu']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTDu', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('transitionDuration'), localStorageAccess),
      TRANSITIONDELAY = tnsStorage['tTDe'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTDe']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTDe', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('transitionDelay'), localStorageAccess),
      ANIMATIONDURATION = tnsStorage['tADu'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tADu']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tADu', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('animationDuration'), localStorageAccess),
      ANIMATIONDELAY = tnsStorage['tADe'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tADe']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tADe', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('animationDelay'), localStorageAccess),
      TRANSITIONEND = tnsStorage['tTE'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTE']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTE', Object(_helpers_getEndProperty_js__WEBPACK_IMPORTED_MODULE_29__["getEndProperty"])(TRANSITIONDURATION, 'Transition'), localStorageAccess),
      ANIMATIONEND = tnsStorage['tAE'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tAE']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tAE', Object(_helpers_getEndProperty_js__WEBPACK_IMPORTED_MODULE_29__["getEndProperty"])(ANIMATIONDURATION, 'Animation'), localStorageAccess);

  // get element nodes from selectors
  var supportConsoleWarn = win.console && typeof win.console.warn === "function",
      tnsList = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'],
      optionsElements = {};

  tnsList.forEach(function(item) {
    if (typeof options[item] === 'string') {
      var str = options[item],
          el = doc.querySelector(str);
      optionsElements[item] = str;

      if (el && el.nodeName) {
        options[item] = el;
      } else {
        if (supportConsoleWarn) { console.warn('Can\'t find', options[item]); }
        return;
      }
    }
  });

  // make sure at least 1 slide
  if (options.container.children.length < 1) {
    if (supportConsoleWarn) { console.warn('No slides found in', options.container); }
    return;
   }

  // update options
  var responsive = options.responsive,
      nested = options.nested,
      carousel = options.mode === 'carousel' ? true : false;

  if (responsive) {
    // apply responsive[0] to options and remove it
    if (0 in responsive) {
      options = Object(_helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__["extend"])(options, responsive[0]);
      delete responsive[0];
    }

    var responsiveTem = {};
    for (var key in responsive) {
      var val = responsive[key];
      // update responsive
      // from: 300: 2
      // to:
      //   300: {
      //     items: 2
      //   }
      val = typeof val === 'number' ? {items: val} : val;
      responsiveTem[key] = val;
    }
    responsive = responsiveTem;
    responsiveTem = null;
  }

  // update options
  function updateOptions (obj) {
    for (var key in obj) {
      if (!carousel) {
        if (key === 'slideBy') { obj[key] = 'page'; }
        if (key === 'edgePadding') { obj[key] = false; }
        if (key === 'autoHeight') { obj[key] = false; }
      }

      // update responsive options
      if (key === 'responsive') { updateOptions(obj[key]); }
    }
  }
  if (!carousel) { updateOptions(options); }


  // === define and set variables ===
  if (!carousel) {
    options.axis = 'horizontal';
    options.slideBy = 'page';
    options.edgePadding = false;

    var animateIn = options.animateIn,
        animateOut = options.animateOut,
        animateDelay = options.animateDelay,
        animateNormal = options.animateNormal;
  }

  var horizontal = options.axis === 'horizontal' ? true : false,
      outerWrapper = doc.createElement('div'),
      innerWrapper = doc.createElement('div'),
      middleWrapper,
      container = options.container,
      containerParent = container.parentNode,
      containerHTML = container.outerHTML,
      slideItems = container.children,
      slideCount = slideItems.length,
      breakpointZone,
      windowWidth = getWindowWidth(),
      isOn = false;
  if (responsive) { setBreakpointZone(); }
  if (carousel) { container.className += ' tns-vpfix'; }

  // fixedWidth: viewport > rightBoundary > indexMax
  var autoWidth = options.autoWidth,
      fixedWidth = getOption('fixedWidth'),
      edgePadding = getOption('edgePadding'),
      gutter = getOption('gutter'),
      viewport = getViewportWidth(),
      center = getOption('center'),
      items = !autoWidth ? Math.floor(getOption('items')) : 1,
      slideBy = getOption('slideBy'),
      viewportMax = options.viewportMax || options.fixedWidthViewportWidth,
      arrowKeys = getOption('arrowKeys'),
      speed = getOption('speed'),
      rewind = options.rewind,
      loop = rewind ? false : options.loop,
      autoHeight = getOption('autoHeight'),
      controls = getOption('controls'),
      controlsText = getOption('controlsText'),
      nav = getOption('nav'),
      touch = getOption('touch'),
      mouseDrag = getOption('mouseDrag'),
      autoplay = getOption('autoplay'),
      autoplayTimeout = getOption('autoplayTimeout'),
      autoplayText = getOption('autoplayText'),
      autoplayHoverPause = getOption('autoplayHoverPause'),
      autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
      sheet = Object(_helpers_createStyleSheet_js__WEBPACK_IMPORTED_MODULE_9__["createStyleSheet"])(null, getOption('nonce')),
      lazyload = options.lazyload,
      lazyloadSelector = options.lazyloadSelector,
      slidePositions, // collection of slide positions
      slideItemsOut = [],
      cloneCount = loop ? getCloneCountForLoop() : 0,
      slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
      hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false,
      rightBoundary = fixedWidth ? getRightBoundary() : null,
      updateIndexBeforeTransform = (!carousel || !loop) ? true : false,
      // transform
      transformAttr = horizontal ? 'left' : 'top',
      transformPrefix = '',
      transformPostfix = '',
      // index
      getIndexMax = (function () {
        if (fixedWidth) {
          return function() { return center && !loop ? slideCount - 1 : Math.ceil(- rightBoundary / (fixedWidth + gutter)); };
        } else if (autoWidth) {
          return function() {
            for (var i = 0; i < slideCountNew; i++) {
              if (slidePositions[i] >= - rightBoundary) { return i; }
            }
          };
        } else {
          return function() {
            if (center && carousel && !loop) {
              return slideCount - 1;
            } else {
              return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
            }
          };
        }
      })(),
      index = getStartIndex(getOption('startIndex')),
      indexCached = index,
      displayIndex = getCurrentSlide(),
      indexMin = 0,
      indexMax = !autoWidth ? getIndexMax() : null,
      // resize
      resizeTimer,
      preventActionWhenRunning = options.preventActionWhenRunning,
      swipeAngle = options.swipeAngle,
      moveDirectionExpected = swipeAngle ? '?' : true,
      running = false,
      onInit = options.onInit,
      events = new _helpers_events_js__WEBPACK_IMPORTED_MODULE_32__["Events"](),
      // id, class
      newContainerClasses = ' tns-slider tns-' + options.mode,
      slideId = container.id || Object(_helpers_getSlideId_js__WEBPACK_IMPORTED_MODULE_5__["getSlideId"])(),
      disable = getOption('disable'),
      disabled = false,
      freezable = options.freezable,
      freeze = freezable && !autoWidth ? getFreeze() : false,
      frozen = false,
      controlsEvents = {
        'click': onControlsClick,
        'keydown': onControlsKeydown
      },
      navEvents = {
        'click': onNavClick,
        'keydown': onNavKeydown
      },
      hoverEvents = {
        'mouseover': mouseoverPause,
        'mouseout': mouseoutRestart
      },
      visibilityEvent = {'visibilitychange': onVisibilityChange},
      docmentKeydownEvent = {'keydown': onDocumentKeydown},
      touchEvents = {
        'touchstart': onPanStart,
        'touchmove': onPanMove,
        'touchend': onPanEnd,
        'touchcancel': onPanEnd
      }, dragEvents = {
        'mousedown': onPanStart,
        'mousemove': onPanMove,
        'mouseup': onPanEnd,
        'mouseleave': onPanEnd
      },
      hasControls = hasOption('controls'),
      hasNav = hasOption('nav'),
      navAsThumbnails = autoWidth ? true : options.navAsThumbnails,
      hasAutoplay = hasOption('autoplay'),
      hasTouch = hasOption('touch'),
      hasMouseDrag = hasOption('mouseDrag'),
      slideActiveClass = 'tns-slide-active',
      slideClonedClass = 'tns-slide-cloned',
      imgCompleteClass = 'tns-complete',
      imgEvents = {
        'load': onImgLoaded,
        'error': onImgFailed
      },
      imgsComplete,
      liveregionCurrent,
      preventScroll = options.preventScrollOnTouch === 'force' ? true : false;

  // controls
  if (hasControls) {
    var controlsContainer = options.controlsContainer,
        controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : '',
        prevButton = options.prevButton,
        nextButton = options.nextButton,
        prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : '',
        nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : '',
        prevIsButton,
        nextIsButton;
  }

  // nav
  if (hasNav) {
    var navContainer = options.navContainer,
        navContainerHTML = options.navContainer ? options.navContainer.outerHTML : '',
        navItems,
        pages = autoWidth ? slideCount : getPages(),
        pagesCached = 0,
        navClicked = -1,
        navCurrentIndex = getCurrentNavIndex(),
        navCurrentIndexCached = navCurrentIndex,
        navActiveClass = 'tns-nav-active',
        navStr = 'Carousel Page ',
        navStrCurrent = ' (Current Slide)';
  }

  // autoplay
  if (hasAutoplay) {
    var autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
        autoplayButton = options.autoplayButton,
        autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : '',
        autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
        autoplayTimer,
        animating,
        autoplayHoverPaused,
        autoplayUserPaused,
        autoplayVisibilityPaused;
  }

  if (hasTouch || hasMouseDrag) {
    var initPosition = {},
        lastPosition = {},
        translateInit,
        disX,
        disY,
        panStart = false,
        rafIndex,
        getDist = horizontal ?
          function(a, b) { return a.x - b.x; } :
          function(a, b) { return a.y - b.y; };
  }

  // disable slider when slidecount <= items
  if (!autoWidth) { resetVariblesWhenDisable(disable || freeze); }

  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';

    if (HAS3DTRANSFORMS) {
      transformPrefix += horizontal ? '3d(' : '3d(0px, ';
      transformPostfix = horizontal ? ', 0px, 0px)' : ', 0px)';
    } else {
      transformPrefix += horizontal ? 'X(' : 'Y(';
      transformPostfix = ')';
    }

  }

  if (carousel) { container.className = container.className.replace('tns-vpfix', ''); }
  initStructure();
  initSheet();
  initSliderTransform();

  // === COMMON FUNCTIONS === //
  function resetVariblesWhenDisable (condition) {
    if (condition) {
      controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
    }
  }

  function getCurrentSlide () {
    var tem = carousel ? index - cloneCount : index;
    while (tem < 0) { tem += slideCount; }
    return tem%slideCount + 1;
  }

  function getStartIndex (ind) {
    ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
    return carousel ? ind + cloneCount : ind;
  }

  function getAbsIndex (i) {
    if (i == null) { i = index; }

    if (carousel) { i -= cloneCount; }
    while (i < 0) { i += slideCount; }

    return Math.floor(i%slideCount);
  }

  function getCurrentNavIndex () {
    var absIndex = getAbsIndex(),
        result;

    result = navAsThumbnails ? absIndex :
      fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) :
          Math.floor(absIndex / items);

    // set active nav to the last one when reaches the right edge
    if (!loop && carousel && index === indexMax) { result = pages - 1; }

    return result;
  }

  function getItemsMax () {
    // fixedWidth or autoWidth while viewportMax is not available
    if (autoWidth || (fixedWidth && !viewportMax)) {
      return slideCount - 1;
    // most cases
    } else {
      var str = fixedWidth ? 'fixedWidth' : 'items',
          arr = [];

      if (fixedWidth || options[str] < slideCount) { arr.push(options[str]); }

      if (responsive) {
        for (var bp in responsive) {
          var tem = responsive[bp][str];
          if (tem && (fixedWidth || tem < slideCount)) { arr.push(tem); }
        }
      }

      if (!arr.length) { arr.push(0); }

      return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
    }
  }

  function getCloneCountForLoop () {
    var itemsMax = getItemsMax(),
        result = carousel ? Math.ceil((itemsMax * 5 - slideCount)/2) : (itemsMax * 4 - slideCount);
    result = Math.max(itemsMax, result);

    return hasOption('edgePadding') ? result + 1 : result;
  }

  function getWindowWidth () {
    return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }

  function getInsertPosition (pos) {
    return pos === 'top' ? 'afterbegin' : 'beforeend';
  }

  function getClientWidth (el) {
    if (el == null) { return; }
    var div = doc.createElement('div'), rect, width;
    el.appendChild(div);
    rect = div.getBoundingClientRect();
    width = rect.right - rect.left;
    div.remove();
    return width || getClientWidth(el.parentNode);
  }

  function getViewportWidth () {
    var gap = edgePadding ? edgePadding * 2 - gutter : 0;
    return getClientWidth(containerParent) - gap;
  }

  function hasOption (item) {
    if (options[item]) {
      return true;
    } else {
      if (responsive) {
        for (var bp in responsive) {
          if (responsive[bp][item]) { return true; }
        }
      }
      return false;
    }
  }

  // get option:
  // fixed width: viewport, fixedWidth, gutter => items
  // others: window width => all variables
  // all: items => slideBy
  function getOption (item, ww) {
    if (ww == null) { ww = windowWidth; }

    if (item === 'items' && fixedWidth) {
      return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;

    } else {
      var result = options[item];

      if (responsive) {
        for (var bp in responsive) {
          // bp: convert string to number
          if (ww >= parseInt(bp)) {
            if (item in responsive[bp]) { result = responsive[bp][item]; }
          }
        }
      }

      if (item === 'slideBy' && result === 'page') { result = getOption('items'); }
      if (!carousel && (item === 'slideBy' || item === 'items')) { result = Math.floor(result); }

      return result;
    }
  }

  function getSlideMarginLeft (i) {
    return CALC ?
      CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' :
      i * 100 / slideCountNew + '%';
  }

  function getInnerWrapperStyles (edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
    var str = '';

    if (edgePaddingTem !== undefined) {
      var gap = edgePaddingTem;
      if (gutterTem) { gap -= gutterTem; }
      str = horizontal ?
        'margin: 0 ' + gap + 'px 0 ' + edgePaddingTem + 'px;' :
        'margin: ' + edgePaddingTem + 'px 0 ' + gap + 'px 0;';
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = '-' + gutterTem + 'px',
          dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
      str = 'margin: 0 ' + dir + ';'
    }

    if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) { str += getTransitionDurationStyle(speedTem); }
    return str;
  }

  function getContainerWidth (fixedWidthTem, gutterTem, itemsTem) {
    if (fixedWidthTem) {
      return (fixedWidthTem + gutterTem) * slideCountNew + 'px';
    } else {
      return CALC ?
        CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' :
        slideCountNew * 100 / itemsTem + '%';
    }
  }

  function getSlideWidthStyle (fixedWidthTem, gutterTem, itemsTem) {
    var width;

    if (fixedWidthTem) {
      width = (fixedWidthTem + gutterTem) + 'px';
    } else {
      if (!carousel) { itemsTem = Math.floor(itemsTem); }
      var dividend = carousel ? slideCountNew : itemsTem;
      width = CALC ?
        CALC + '(100% / ' + dividend + ')' :
        100 / dividend + '%';
    }

    width = 'width:' + width;

    // inner slider: overwrite outer slider styles
    return nested !== 'inner' ? width + ';' : width + ' !important;';
  }

  function getSlideGutterStyle (gutterTem) {
    var str = '';

    // gutter maybe interger || 0
    // so can't use 'if (gutter)'
    if (gutterTem !== false) {
      var prop = horizontal ? 'padding-' : 'margin-',
          dir = horizontal ? 'right' : 'bottom';
      str = prop +  dir + ': ' + gutterTem + 'px;';
    }

    return str;
  }

  function getCSSPrefix (name, num) {
    var prefix = name.substring(0, name.length - num).toLowerCase();
    if (prefix) { prefix = '-' + prefix + '-'; }

    return prefix;
  }

  function getTransitionDurationStyle (speed) {
    return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
  }

  function getAnimationDurationStyle (speed) {
    return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
  }

  function initStructure () {
    var classOuter = 'tns-outer',
        classInner = 'tns-inner',
        hasGutter = hasOption('gutter');

    outerWrapper.className = classOuter;
    innerWrapper.className = classInner;
    outerWrapper.id = slideId + '-ow';
    innerWrapper.id = slideId + '-iw';

    // set container properties
    if (container.id === '') { container.id = slideId; }
    newContainerClasses += PERCENTAGELAYOUT || autoWidth ? ' tns-subpixel' : ' tns-no-subpixel';
    newContainerClasses += CALC ? ' tns-calc' : ' tns-no-calc';
    if (autoWidth) { newContainerClasses += ' tns-autowidth'; }
    newContainerClasses += ' tns-' + options.axis;
    container.className += newContainerClasses;

    // add constrain layer for carousel
    if (carousel) {
      middleWrapper = doc.createElement('div');
      middleWrapper.id = slideId + '-mw';
      middleWrapper.className = 'tns-ovh';

      outerWrapper.appendChild(middleWrapper);
      middleWrapper.appendChild(innerWrapper);
    } else {
      outerWrapper.appendChild(innerWrapper);
    }

    if (autoHeight) {
      var wp = middleWrapper ? middleWrapper : innerWrapper;
      wp.className += ' tns-ah';
    }

    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container);

    // add id, class, aria attributes
    // before clone slides
    Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function(item, i) {
      Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, 'tns-item');
      if (!item.id) { item.id = slideId + '-item' + i; }
      if (!carousel && animateNormal) { Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateNormal); }
      Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(item, {
        'aria-hidden': 'true',
        'tabindex': '-1'
      });
    });

    // ## clone slides
    // carousel: n + slides + n
    // gallery:      slides + n
    if (cloneCount) {
      var fragmentBefore = doc.createDocumentFragment(),
          fragmentAfter = doc.createDocumentFragment();

      for (var j = cloneCount; j--;) {
        var num = j%slideCount,
            cloneFirst = slideItems[num].cloneNode(true);
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(cloneFirst, slideClonedClass);
        Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(cloneLast, slideClonedClass);
          Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }

      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }

  }

  function initSliderTransform () {
    // ## images loaded/failed
    if (hasOption('autoHeight') || autoWidth || !horizontal) {
      var imgs = container.querySelectorAll('img');

      // add img load event listener
      Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(imgs, function(img) {
        var src = img.src;

        if (!lazyload) {
          // not data img
          if (src && src.indexOf('data:image') < 0) {
            img.src = '';
            Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(img, imgEvents);
            Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'loading');

            img.src = src;
          // data img
          } else {
            imgLoaded(img);
          }
        }
      });

      // set imgsComplete
      Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function(){ imgsLoadedCheck(Object(_helpers_arrayFromNodeList_js__WEBPACK_IMPORTED_MODULE_23__["arrayFromNodeList"])(imgs), function() { imgsComplete = true; }); });

      // reset imgs for auto height: check visible imgs only
      if (hasOption('autoHeight')) { imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1)); }

      lazyload ? initSliderTransformStyleCheck() : Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function(){ imgsLoadedCheck(Object(_helpers_arrayFromNodeList_js__WEBPACK_IMPORTED_MODULE_23__["arrayFromNodeList"])(imgs), initSliderTransformStyleCheck); });

    } else {
      // set container transform property
      if (carousel) { doContainerTransformSilent(); }

      // update slider tools and events
      initTools();
      initEvents();
    }
  }

  function initSliderTransformStyleCheck () {
    if (autoWidth && slideCount > 1) {
      // check styles application
      var num = loop ? index : slideCount - 1;

      (function stylesApplicationCheck() {
        var left = slideItems[num].getBoundingClientRect().left;
        var right = slideItems[num - 1].getBoundingClientRect().right;

        (Math.abs(left - right) <= 1) ?
          initSliderTransformCore() :
          setTimeout(function(){ stylesApplicationCheck() }, 16);
      })();

    } else {
      initSliderTransformCore();
    }
  }


  function initSliderTransformCore () {
    // run Fn()s which are rely on image loading
    if (!horizontal || autoWidth) {
      setSlidePositions();

      if (autoWidth) {
        rightBoundary = getRightBoundary();
        if (freezable) { freeze = getFreeze(); }
        indexMax = getIndexMax(); // <= slidePositions, rightBoundary <=
        resetVariblesWhenDisable(disable || freeze);
      } else {
        updateContentWrapperHeight();
      }
    }

    // set container transform property
    if (carousel) { doContainerTransformSilent(); }

    // update slider tools and events
    initTools();
    initEvents();
  }

  function initSheet () {
    // gallery:
    // set animation classes and left value for gallery slider
    if (!carousel) {
      for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
        var item = slideItems[i];
        item.style.left = (i - index) * 100 / items + '%';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateIn);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateNormal);
      }
    }

    // #### LAYOUT

    // ## INLINE-BLOCK VS FLOAT

    // ## PercentageLayout:
    // slides: inline-block
    // remove blank space between slides by set font-size: 0

    // ## Non PercentageLayout:
    // slides: float
    //         margin-right: -100%
    //         margin-left: ~

    // Resource: https://docs.google.com/spreadsheets/d/147up245wwTXeQYve3BRSAD4oVcvQmuGsFteJOeA5xNQ/edit?usp=sharing
    if (horizontal) {
      if (PERCENTAGELAYOUT || autoWidth) {
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId, 'font-size:0;', Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      } else if (carousel) {
        Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function (slide, i) {
          slide.style.marginLeft = getSlideMarginLeft(i);
        });
      }
    }


    // ## BASIC STYLES
    if (CSSMQ) {
      // middle wrapper style
      if (TRANSITIONDURATION) {
        var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : '';
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + '-mw', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      }

      // inner wrapper styles
      str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
      Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + '-iw', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));

      // container styles
      if (carousel) {
        str = horizontal && !autoWidth ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';
        if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId, str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      }

      // slide styles
      str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : '';
      if (options.gutter) { str += getSlideGutterStyle(options.gutter); }
      // set gallery items transition-duration
      if (!carousel) {
        if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
        if (ANIMATIONDURATION) { str += getAnimationDurationStyle(speed); }
      }
      if (str) { Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet)); }

    // non CSS mediaqueries: IE8
    // ## update inner wrapper, container, slides if needed
    // set inline styles for inner wrapper & container
    // insert stylesheet (one line) for slides only (since slides are many)
    } else {
      // middle wrapper styles
      update_carousel_transition_duration();

      // inner wrapper styles
      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight);

      // container styles
      if (carousel && horizontal && !autoWidth) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      }

      // slide styles
      var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : '';
      if (gutter) { str += getSlideGutterStyle(gutter); }

      // append to the last line
      if (str) { Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet)); }
    }

    // ## MEDIAQUERIES
    if (responsive && CSSMQ) {
      for (var bp in responsive) {
        // bp: convert string to number
        bp = parseInt(bp);

        var opts = responsive[bp],
            str = '',
            middleWrapperStr = '',
            innerWrapperStr = '',
            containerStr = '',
            slideStr = '',
            itemsBP = !autoWidth ? getOption('items', bp) : null,
            fixedWidthBP = getOption('fixedWidth', bp),
            speedBP = getOption('speed', bp),
            edgePaddingBP = getOption('edgePadding', bp),
            autoHeightBP = getOption('autoHeight', bp),
            gutterBP = getOption('gutter', bp);

        // middle wrapper string
        if (TRANSITIONDURATION && middleWrapper && getOption('autoHeight', bp) && 'speed' in opts) {
          middleWrapperStr = '#' + slideId + '-mw{' + getTransitionDurationStyle(speedBP) + '}';
        }

        // inner wrapper string
        if ('edgePadding' in opts || 'gutter' in opts) {
          innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + '}';
        }

        // container string
        if (carousel && horizontal && !autoWidth && ('fixedWidth' in opts || 'items' in opts || (fixedWidth && 'gutter' in opts))) {
          containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
        }
        if (TRANSITIONDURATION && 'speed' in opts) {
          containerStr += getTransitionDurationStyle(speedBP);
        }
        if (containerStr) {
          containerStr = '#' + slideId + '{' + containerStr + '}';
        }

        // slide string
        if ('fixedWidth' in opts || (fixedWidth && 'gutter' in opts) || !carousel && 'items' in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }
        if ('gutter' in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        }
        // set gallery items transition-duration
        if (!carousel && 'speed' in opts) {
          if (TRANSITIONDURATION) { slideStr += getTransitionDurationStyle(speedBP); }
          if (ANIMATIONDURATION) { slideStr += getAnimationDurationStyle(speedBP); }
        }
        if (slideStr) { slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}'; }

        // add up
        str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;

        if (str) {
          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
        }
      }
    }
  }

  function initTools () {
    // == slides ==
    updateSlideStatus();

    // == live region ==
    outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + '</span>  of ' + slideCount + '</div>');
    liveregionCurrent = outerWrapper.querySelector('.tns-liveregion .current');

    // == autoplayInit ==
    if (hasAutoplay) {
      var txt = autoplay ? 'stop' : 'start';
      if (autoplayButton) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(autoplayButton, {'data-action': txt});
      } else if (options.autoplayButtonOutput) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button type="button" data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
        autoplayButton = outerWrapper.querySelector('[data-action]');
      }

      // add event
      if (autoplayButton) {
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(autoplayButton, {'click': toggleAutoplay});
      }

      if (autoplay) {
        startAutoplay();
        if (autoplayHoverPause) { Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, hoverEvents); }
        if (autoplayResetOnVisibility) { Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, visibilityEvent); }
      }
    }

    // == navInit ==
    if (hasNav) {
      var initIndex = !carousel ? 0 : cloneCount;
      // customized nav
      // will not hide the navs in case they're thumbnails
      if (navContainer) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navContainer, {'aria-label': 'Carousel Pagination'});
        navItems = navContainer.children;
        Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(navItems, function(item, i) {
          Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(item, {
            'data-nav': i,
            'tabindex': '-1',
            'aria-label': navStr + (i + 1),
            'aria-controls': slideId,
          });
        });

      // generated nav
      } else {
        var navHtml = '',
            hiddenStr = navAsThumbnails ? '' : 'style="display:none"';
        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          navHtml += '<button type="button" data-nav="' + i +'" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) +'"></button>';
        }
        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);

        navContainer = outerWrapper.querySelector('.tns-nav');
        navItems = navContainer.children;
      }

      updateNavVisibility();

      // add transition
      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
            str = 'transition: all ' + speed / 1000 + 's';

        if (prefix) {
          str = '-' + prefix + '-' + str;
        }

        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '[aria-controls^=' + slideId + '-item]', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      }

      Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navItems[navCurrentIndex], {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
      Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(navItems[navCurrentIndex], 'tabindex');
      Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(navItems[navCurrentIndex], navActiveClass);

      // add events
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(navContainer, navEvents);
    }



    // == controlsInit ==
    if (hasControls) {
      if (!controlsContainer && (!prevButton || !nextButton)) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + slideId +'">' + controlsText[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + slideId +'">' + controlsText[1] + '</button></div>');

        controlsContainer = outerWrapper.querySelector('.tns-controls');
      }

      if (!prevButton || !nextButton) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }

      if (options.controlsContainer) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(controlsContainer, {
          'aria-label': 'Carousel Navigation',
          'tabindex': '0'
        });
      }

      if (options.controlsContainer || (options.prevButton && options.nextButton)) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])([prevButton, nextButton], {
          'aria-controls': slideId,
          'tabindex': '-1',
        });
      }

      if (options.controlsContainer || (options.prevButton && options.nextButton)) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(prevButton, {'data-controls' : 'prev'});
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(nextButton, {'data-controls' : 'next'});
      }

      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);

      updateControlsStatus();

      // add events
      if (controlsContainer) {
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(controlsContainer, controlsEvents);
      } else {
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(prevButton, controlsEvents);
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(nextButton, controlsEvents);
      }
    }

    // hide tools if needed
    disableUI();
  }

  function initEvents () {
    // add events
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, eve);
    }

    if (touch) { Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, touchEvents, options.preventScrollOnTouch); }
    if (mouseDrag) { Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, dragEvents); }
    if (arrowKeys) { Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(doc, docmentKeydownEvent); }

    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(win, {'resize': onResize});
    }

    if (autoHeight) {
      if (nested === 'outer') {
        events.on('innerLoaded', doAutoHeight);
      } else if (!disable) { doAutoHeight(); }
    }

    doLazyLoad();
    if (disable) { disableSlider(); } else if (freeze) { freezeSlider(); }

    events.on('indexChanged', additionalUpdates);
    if (nested === 'inner') { events.emit('innerLoaded', info()); }
    if (typeof onInit === 'function') { onInit(info()); }
    isOn = true;
  }

  function destroy () {
    // sheet
    sheet.disabled = true;
    if (sheet.ownerNode) { sheet.ownerNode.remove(); }

    // remove win event listeners
    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(win, {'resize': onResize});

    // arrowKeys, controls, nav
    if (arrowKeys) { Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(doc, docmentKeydownEvent); }
    if (controlsContainer) { Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(controlsContainer, controlsEvents); }
    if (navContainer) { Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(navContainer, navEvents); }

    // autoplay
    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, hoverEvents);
    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, visibilityEvent);
    if (autoplayButton) { Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(autoplayButton, {'click': toggleAutoplay}); }
    if (autoplay) { clearInterval(autoplayTimer); }

    // container
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, eve);
    }
    if (touch) { Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, touchEvents); }
    if (mouseDrag) { Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, dragEvents); }

    // cache Object values in options && reset HTML
    var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];

    tnsList.forEach(function(item, i) {
      var el = item === 'container' ? outerWrapper : options[item];

      if (typeof el === 'object' && el) {
        var prevEl = el.previousElementSibling ? el.previousElementSibling : false,
            parentEl = el.parentNode;
        el.outerHTML = htmlList[i];
        options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
      }
    });


    // reset variables
    tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = resizeTimer = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = disX = disY = panStart = rafIndex = getDist = touch = mouseDrag = null;
    // check variables
    // [animateIn, animateOut, animateDelay, animateNormal, horizontal, outerWrapper, innerWrapper, container, containerParent, containerHTML, slideItems, slideCount, breakpointZone, windowWidth, autoWidth, fixedWidth, edgePadding, gutter, viewport, items, slideBy, viewportMax, arrowKeys, speed, rewind, loop, autoHeight, sheet, lazyload, slidePositions, slideItemsOut, cloneCount, slideCountNew, hasRightDeadZone, rightBoundary, updateIndexBeforeTransform, transformAttr, transformPrefix, transformPostfix, getIndexMax, index, indexCached, indexMin, indexMax, resizeTimer, swipeAngle, moveDirectionExpected, running, onInit, events, newContainerClasses, slideId, disable, disabled, freezable, freeze, frozen, controlsEvents, navEvents, hoverEvents, visibilityEvent, docmentKeydownEvent, touchEvents, dragEvents, hasControls, hasNav, navAsThumbnails, hasAutoplay, hasTouch, hasMouseDrag, slideActiveClass, imgCompleteClass, imgEvents, imgsComplete, controls, controlsText, controlsContainer, controlsContainerHTML, prevButton, nextButton, prevIsButton, nextIsButton, nav, navContainer, navContainerHTML, navItems, pages, pagesCached, navClicked, navCurrentIndex, navCurrentIndexCached, navActiveClass, navStr, navStrCurrent, autoplay, autoplayTimeout, autoplayDirection, autoplayText, autoplayHoverPause, autoplayButton, autoplayButtonHTML, autoplayResetOnVisibility, autoplayHtmlStrings, autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused, initPosition, lastPosition, translateInit, disX, disY, panStart, rafIndex, getDist, touch, mouseDrag ].forEach(function(item) { if (item !== null) { console.log(item); } });

    for (var a in this) {
      if (a !== 'rebuild') { this[a] = null; }
    }
    isOn = false;
  }

// === ON RESIZE ===
  // responsive || fixedWidth || autoWidth || !horizontal
  function onResize (e) {
    Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function(){ resizeTasks(getEvent(e)); });
  }

  function resizeTasks (e) {
    if (!isOn) { return; }
    if (nested === 'outer') { events.emit('outerResized', info(e)); }
    windowWidth = getWindowWidth();
    var bpChanged,
        breakpointZoneTem = breakpointZone,
        needContainerTransform = false;

    if (responsive) {
      setBreakpointZone();
      bpChanged = breakpointZoneTem !== breakpointZone;
      // if (hasRightDeadZone) { needContainerTransform = true; } // *?
      if (bpChanged) { events.emit('newBreakpointStart', info(e)); }
    }

    var indChanged,
        itemsChanged,
        itemsTem = items,
        disableTem = disable,
        freezeTem = freeze,
        arrowKeysTem = arrowKeys,
        controlsTem = controls,
        navTem = nav,
        touchTem = touch,
        mouseDragTem = mouseDrag,
        autoplayTem = autoplay,
        autoplayHoverPauseTem = autoplayHoverPause,
        autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
        indexTem = index;

    if (bpChanged) {
      var fixedWidthTem = fixedWidth,
          autoHeightTem = autoHeight,
          controlsTextTem = controlsText,
          centerTem = center,
          autoplayTextTem = autoplayText;

      if (!CSSMQ) {
        var gutterTem = gutter,
            edgePaddingTem = edgePadding;
      }
    }

    // get option:
    // fixed width: viewport, fixedWidth, gutter => items
    // others: window width => all variables
    // all: items => slideBy
    arrowKeys = getOption('arrowKeys');
    controls = getOption('controls');
    nav = getOption('nav');
    touch = getOption('touch');
    center = getOption('center');
    mouseDrag = getOption('mouseDrag');
    autoplay = getOption('autoplay');
    autoplayHoverPause = getOption('autoplayHoverPause');
    autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');

    if (bpChanged) {
      disable = getOption('disable');
      fixedWidth = getOption('fixedWidth');
      speed = getOption('speed');
      autoHeight = getOption('autoHeight');
      controlsText = getOption('controlsText');
      autoplayText = getOption('autoplayText');
      autoplayTimeout = getOption('autoplayTimeout');

      if (!CSSMQ) {
        edgePadding = getOption('edgePadding');
        gutter = getOption('gutter');
      }
    }
    // update options
    resetVariblesWhenDisable(disable);

    viewport = getViewportWidth(); // <= edgePadding, gutter
    if ((!horizontal || autoWidth) && !disable) {
      setSlidePositions();
      if (!horizontal) {
        updateContentWrapperHeight(); // <= setSlidePositions
        needContainerTransform = true;
      }
    }
    if (fixedWidth || autoWidth) {
      rightBoundary = getRightBoundary(); // autoWidth: <= viewport, slidePositions, gutter
                                          // fixedWidth: <= viewport, fixedWidth, gutter
      indexMax = getIndexMax(); // autoWidth: <= rightBoundary, slidePositions
                                // fixedWidth: <= rightBoundary, fixedWidth, gutter
    }

    if (bpChanged || fixedWidth) {
      items = getOption('items');
      slideBy = getOption('slideBy');
      itemsChanged = items !== itemsTem;

      if (itemsChanged) {
        if (!fixedWidth && !autoWidth) { indexMax = getIndexMax(); } // <= items
        // check index before transform in case
        // slider reach the right edge then items become bigger
        updateIndex();
      }
    }

    if (bpChanged) {
      if (disable !== disableTem) {
        if (disable) {
          disableSlider();
        } else {
          enableSlider(); // <= slidePositions, rightBoundary, indexMax
        }
      }
    }

    if (freezable && (bpChanged || fixedWidth || autoWidth)) {
      freeze = getFreeze(); // <= autoWidth: slidePositions, gutter, viewport, rightBoundary
                            // <= fixedWidth: fixedWidth, gutter, rightBoundary
                            // <= others: items

      if (freeze !== freezeTem) {
        if (freeze) {
          doContainerTransform(getContainerTransformValue(getStartIndex(0)));
          freezeSlider();
        } else {
          unfreezeSlider();
          needContainerTransform = true;
        }
      }
    }

    resetVariblesWhenDisable(disable || freeze); // controls, nav, touch, mouseDrag, arrowKeys, autoplay, autoplayHoverPause, autoplayResetOnVisibility
    if (!autoplay) { autoplayHoverPause = autoplayResetOnVisibility = false; }

    if (arrowKeys !== arrowKeysTem) {
      arrowKeys ?
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(doc, docmentKeydownEvent) :
        Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(doc, docmentKeydownEvent);
    }
    if (controls !== controlsTem) {
      if (controls) {
        if (controlsContainer) {
          Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(controlsContainer);
        } else {
          if (prevButton) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(prevButton); }
          if (nextButton) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(nextButton); }
        }
      } else {
        if (controlsContainer) {
          Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(controlsContainer);
        } else {
          if (prevButton) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(prevButton); }
          if (nextButton) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(nextButton); }
        }
      }
    }
    if (nav !== navTem) {
      if (nav) {
        Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(navContainer);
        updateNavVisibility();
      } else {
        Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(navContainer)
      }
    }
    if (touch !== touchTem) {
      touch ?
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, touchEvents, options.preventScrollOnTouch) :
        Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, touchEvents);
    }
    if (mouseDrag !== mouseDragTem) {
      mouseDrag ?
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, dragEvents) :
        Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, dragEvents);
    }
    if (autoplay !== autoplayTem) {
      if (autoplay) {
        if (autoplayButton) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(autoplayButton); }
        if (!animating && !autoplayUserPaused) { startAutoplay(); }
      } else {
        if (autoplayButton) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(autoplayButton); }
        if (animating) { stopAutoplay(); }
      }
    }
    if (autoplayHoverPause !== autoplayHoverPauseTem) {
      autoplayHoverPause ?
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, hoverEvents) :
        Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, hoverEvents);
    }
    if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
      autoplayResetOnVisibility ?
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(doc, visibilityEvent) :
        Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(doc, visibilityEvent);
    }

    if (bpChanged) {
      if (fixedWidth !== fixedWidthTem || center !== centerTem) { needContainerTransform = true; }

      if (autoHeight !== autoHeightTem) {
        if (!autoHeight) { innerWrapper.style.height = ''; }
      }

      if (controls && controlsText !== controlsTextTem) {
        prevButton.innerHTML = controlsText[0];
        nextButton.innerHTML = controlsText[1];
      }

      if (autoplayButton && autoplayText !== autoplayTextTem) {
        var i = autoplay ? 1 : 0,
            html = autoplayButton.innerHTML,
            len = html.length - autoplayTextTem[i].length;
        if (html.substring(len) === autoplayTextTem[i]) {
          autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
        }
      }
    } else {
      if (center && (fixedWidth || autoWidth)) { needContainerTransform = true; }
    }

    if (itemsChanged || fixedWidth && !autoWidth) {
      pages = getPages();
      updateNavVisibility();
    }

    indChanged = index !== indexTem;
    if (indChanged) {
      events.emit('indexChanged', info());
      needContainerTransform = true;
    } else if (itemsChanged) {
      if (!indChanged) { additionalUpdates(); }
    } else if (fixedWidth || autoWidth) {
      doLazyLoad();
      updateSlideStatus();
      updateLiveRegion();
    }

    if (itemsChanged && !carousel) { updateGallerySlidePositions(); }

    if (!disable && !freeze) {
      // non-mediaqueries: IE8
      if (bpChanged && !CSSMQ) {
        // middle wrapper styles

        // inner wrapper styles
        if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
        }

        if (horizontal) {
          // container styles
          if (carousel) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          }

          // slide styles
          var str = getSlideWidthStyle(fixedWidth, gutter, items) +
                    getSlideGutterStyle(gutter);

          // remove the last line and
          // add new styles
          Object(_helpers_removeCSSRule_js__WEBPACK_IMPORTED_MODULE_11__["removeCSSRule"])(sheet, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet) - 1);
          Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
        }
      }

      // auto height
      if (autoHeight) { doAutoHeight(); }

      if (needContainerTransform) {
        doContainerTransformSilent();
        indexCached = index;
      }
    }

    if (bpChanged) { events.emit('newBreakpointEnd', info(e)); }
  }





  // === INITIALIZATION FUNCTIONS === //
  function getFreeze () {
    if (!fixedWidth && !autoWidth) {
      var a = center ? items - (items - 1) / 2 : items;
      return  slideCount <= a;
    }

    var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount],
        vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;

    if (center) {
      vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
    }

    return width <= vp;
  }

  function setBreakpointZone () {
    breakpointZone = 0;
    for (var bp in responsive) {
      bp = parseInt(bp); // convert string to number
      if (windowWidth >= bp) { breakpointZone = bp; }
    }
  }

  // (slideBy, indexMin, indexMax) => index
  var updateIndex = (function () {
    return loop ?
      carousel ?
        // loop + carousel
        function () {
          var leftEdge = indexMin,
              rightEdge = indexMax;

          leftEdge += slideBy;
          rightEdge -= slideBy;

          // adjust edges when has edge paddings
          // or fixed-width slider with extra space on the right side
          if (edgePadding) {
            leftEdge += 1;
            rightEdge -= 1;
          } else if (fixedWidth) {
            if ((viewport + gutter)%(fixedWidth + gutter)) { rightEdge -= 1; }
          }

          if (cloneCount) {
            if (index > rightEdge) {
              index -= slideCount;
            } else if (index < leftEdge) {
              index += slideCount;
            }
          }
        } :
        // loop + gallery
        function() {
          if (index > indexMax) {
            while (index >= indexMin + slideCount) { index -= slideCount; }
          } else if (index < indexMin) {
            while (index <= indexMax - slideCount) { index += slideCount; }
          }
        } :
      // non-loop
      function() {
        index = Math.max(indexMin, Math.min(indexMax, index));
      };
  })();

  function disableUI () {
    if (!autoplay && autoplayButton) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(autoplayButton); }
    if (!nav && navContainer) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(navContainer); }
    if (!controls) {
      if (controlsContainer) {
        Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(controlsContainer);
      } else {
        if (prevButton) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(prevButton); }
        if (nextButton) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(nextButton); }
      }
    }
  }

  function enableUI () {
    if (autoplay && autoplayButton) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(autoplayButton); }
    if (nav && navContainer) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(navContainer); }
    if (controls) {
      if (controlsContainer) {
        Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(controlsContainer);
      } else {
        if (prevButton) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(prevButton); }
        if (nextButton) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(nextButton); }
      }
    }
  }

  function freezeSlider () {
    if (frozen) { return; }

    // remove edge padding from inner wrapper
    if (edgePadding) { innerWrapper.style.margin = '0px'; }

    // add class tns-transparent to cloned slides
    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) { Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(slideItems[i], str); }
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(slideItems[slideCountNew - i - 1], str);
      }
    }

    // update tools
    disableUI();

    frozen = true;
  }

  function unfreezeSlider () {
    if (!frozen) { return; }

    // restore edge padding for inner wrapper
    // for mordern browsers
    if (edgePadding && CSSMQ) { innerWrapper.style.margin = ''; }

    // remove class tns-transparent to cloned slides
    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) { Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(slideItems[i], str); }
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(slideItems[slideCountNew - i - 1], str);
      }
    }

    // update tools
    enableUI();

    frozen = false;
  }

  function disableSlider () {
    if (disabled) { return; }

    sheet.disabled = true;
    container.className = container.className.replace(newContainerClasses.substring(1), '');
    Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(container, ['style']);
    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) { Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(slideItems[j]); }
        Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(slideItems[slideCountNew - j - 1]);
      }
    }

    // vertical slider
    if (!horizontal || !carousel) { Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(innerWrapper, ['style']); }

    // gallery
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i];
        Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(item, ['style']);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateIn);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateNormal);
      }
    }

    // update tools
    disableUI();

    disabled = true;
  }

  function enableSlider () {
    if (!disabled) { return; }

    sheet.disabled = false;
    container.className += newContainerClasses;
    doContainerTransformSilent();

    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) { Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(slideItems[j]); }
        Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(slideItems[slideCountNew - j - 1]);
      }
    }

    // gallery
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i],
            classN = i < index + items ? animateIn : animateNormal;
        item.style.left = (i - index) * 100 / items + '%';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, classN);
      }
    }

    // update tools
    enableUI();

    disabled = false;
  }

  function updateLiveRegion () {
    var str = getLiveRegionStr();
    if (liveregionCurrent.innerHTML !== str) { liveregionCurrent.innerHTML = str; }
  }

  function getLiveRegionStr () {
    var arr = getVisibleSlideRange(),
        start = arr[0] + 1,
        end = arr[1] + 1;
    return start === end ? start + '' : start + ' to ' + end;
  }

  function getVisibleSlideRange (val) {
    if (val == null) { val = getContainerTransformValue(); }
    var start = index, end, rangestart, rangeend;

    // get range start, range end for autoWidth and fixedWidth
    if (center || edgePadding) {
      if (autoWidth || fixedWidth) {
        rangestart = - (parseFloat(val) + edgePadding);
        rangeend = rangestart + viewport + edgePadding * 2;
      }
    } else {
      if (autoWidth) {
        rangestart = slidePositions[index];
        rangeend = rangestart + viewport;
      }
    }

    // get start, end
    // - check auto width
    if (autoWidth) {
      slidePositions.forEach(function(point, i) {
        if (i < slideCountNew) {
          if ((center || edgePadding) && point <= rangestart + 0.5) { start = i; }
          if (rangeend - point >= 0.5) { end = i; }
        }
      });

    // - check percentage width, fixed width
    } else {

      if (fixedWidth) {
        var cell = fixedWidth + gutter;
        if (center || edgePadding) {
          start = Math.floor(rangestart/cell);
          end = Math.ceil(rangeend/cell - 1);
        } else {
          end = start + Math.ceil(viewport/cell) - 1;
        }

      } else {
        if (center || edgePadding) {
          var a = items - 1;
          if (center) {
            start -= a / 2;
            end = index + a / 2;
          } else {
            end = index + a;
          }

          if (edgePadding) {
            var b = edgePadding * items / viewport;
            start -= b;
            end += b;
          }

          start = Math.floor(start);
          end = Math.ceil(end);
        } else {
          end = start + items - 1;
        }
      }

      start = Math.max(start, 0);
      end = Math.min(end, slideCountNew - 1);
    }

    return [start, end];
  }

  function doLazyLoad () {
    if (lazyload && !disable) {
      var arg = getVisibleSlideRange();
      arg.push(lazyloadSelector);

      getImageArray.apply(null, arg).forEach(function (img) {
        if (!Object(_helpers_hasClass_js__WEBPACK_IMPORTED_MODULE_16__["hasClass"])(img, imgCompleteClass)) {
          // stop propagation transitionend event to container
          var eve = {};
          eve[TRANSITIONEND] = function (e) { e.stopPropagation(); };
          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(img, eve);

          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(img, imgEvents);

          // update src
          img.src = Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(img, 'data-src');

          // update srcset
          var srcset = Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(img, 'data-srcset');
          if (srcset) { img.srcset = srcset; }

          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'loading');
        }
      });
    }
  }

  function onImgLoaded (e) {
    imgLoaded(getTarget(e));
  }

  function onImgFailed (e) {
    imgFailed(getTarget(e));
  }

  function imgLoaded (img) {
    Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'loaded');
    imgCompleted(img);
  }

  function imgFailed (img) {
    Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'failed');
    imgCompleted(img);
  }

  function imgCompleted (img) {
    Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, imgCompleteClass);
    Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(img, 'loading');
    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(img, imgEvents);
  }

  function getImageArray (start, end, imgSelector) {
    var imgs = [];
    if (!imgSelector) { imgSelector = 'img'; }

    while (start <= end) {
      Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems[start].querySelectorAll(imgSelector), function (img) { imgs.push(img); });
      start++;
    }

    return imgs;
  }

  // check if all visible images are loaded
  // and update container height if it's done
  function doAutoHeight () {
    var imgs = getImageArray.apply(null, getVisibleSlideRange());
    Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function(){ imgsLoadedCheck(imgs, updateInnerWrapperHeight); });
  }

  function imgsLoadedCheck (imgs, cb) {
    // execute callback function if all images are complete
    if (imgsComplete) { return cb(); }

    // check image classes
    imgs.forEach(function (img, index) {
      if (!lazyload && img.complete) { imgCompleted(img); } // Check image.complete
      if (Object(_helpers_hasClass_js__WEBPACK_IMPORTED_MODULE_16__["hasClass"])(img, imgCompleteClass)) { imgs.splice(index, 1); }
    });

    // execute callback function if selected images are all complete
    if (!imgs.length) { return cb(); }

    // otherwise execute this functiona again
    Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function(){ imgsLoadedCheck(imgs, cb); });
  }

  function additionalUpdates () {
    doLazyLoad();
    updateSlideStatus();
    updateLiveRegion();
    updateControlsStatus();
    updateNavStatus();
  }


  function update_carousel_transition_duration () {
    if (carousel && autoHeight) {
      middleWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }
  }

  function getMaxSlideHeight (slideStart, slideRange) {
    var heights = [];
    for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
      heights.push(slideItems[i].offsetHeight);
    }

    return Math.max.apply(null, heights);
  }

  // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done
  function updateInnerWrapperHeight () {
    var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount),
        wp = middleWrapper ? middleWrapper : innerWrapper;

    if (wp.style.height !== maxHeight) { wp.style.height = maxHeight + 'px'; }
  }

  // get the distance from the top edge of the first slide to each slide
  // (init) => slidePositions
  function setSlidePositions () {
    slidePositions = [0];
    var attr = horizontal ? 'left' : 'top',
        attr2 = horizontal ? 'right' : 'bottom',
        base = slideItems[0].getBoundingClientRect()[attr];

    Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function(item, i) {
      // skip the first slide
      if (i) { slidePositions.push(item.getBoundingClientRect()[attr] - base); }
      // add the end edge
      if (i === slideCountNew - 1) { slidePositions.push(item.getBoundingClientRect()[attr2] - base); }
    });
  }

  // update slide
  function updateSlideStatus () {
    var range = getVisibleSlideRange(),
        start = range[0],
        end = range[1];

    Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function(item, i) {
      // show slides
      if (i >= start && i <= end) {
        if (Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(item, 'aria-hidden')) {
          Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(item, ['aria-hidden', 'tabindex']);
          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, slideActiveClass);
        }
      // hide slides
      } else {
        if (!Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(item, 'aria-hidden')) {
          Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
          Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, slideActiveClass);
        }
      }
    });
  }

  // gallery: update slide position
  function updateGallerySlidePositions () {
    var l = index + Math.min(slideCount, items);
    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];

      if (i >= index && i < l) {
        // add transitions to visible slides when adjusting their positions
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, 'tns-moving');

        item.style.left = (i - index) * 100 / items + '%';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateIn);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateNormal);
      } else if (item.style.left) {
        item.style.left = '';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateNormal);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateIn);
      }

      // remove outlet animation
      Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateOut);
    }

    // removing '.tns-moving'
    setTimeout(function() {
      Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function(el) {
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(el, 'tns-moving');
      });
    }, 300);
  }

  // set tabindex on Nav
  function updateNavStatus () {
    // get current nav
    if (nav) {
      navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
      navClicked = -1;

      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached],
            navCurrent = navItems[navCurrentIndex];

        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navPrev, {
          'tabindex': '-1',
          'aria-label': navStr + (navCurrentIndexCached + 1)
        });
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(navPrev, navActiveClass);

        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navCurrent, {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
        Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(navCurrent, 'tabindex');
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(navCurrent, navActiveClass);

        navCurrentIndexCached = navCurrentIndex;
      }
    }
  }

  function getLowerCaseNodeName (el) {
    return el.nodeName.toLowerCase();
  }

  function isButton (el) {
    return getLowerCaseNodeName(el) === 'button';
  }

  function isAriaDisabled (el) {
    return el.getAttribute('aria-disabled') === 'true';
  }

  function disEnableElement (isButton, el, val) {
    if (isButton) {
      el.disabled = val;
    } else {
      el.setAttribute('aria-disabled', val.toString());
    }
  }

  // set 'disabled' to true on controls when reach the edges
  function updateControlsStatus () {
    if (!controls || rewind || loop) { return; }

    var prevDisabled = (prevIsButton) ? prevButton.disabled : isAriaDisabled(prevButton),
        nextDisabled = (nextIsButton) ? nextButton.disabled : isAriaDisabled(nextButton),
        disablePrev = (index <= indexMin) ? true : false,
        disableNext = (!rewind && index >= indexMax) ? true : false;

    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }
    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }
    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }
    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  }

  // set duration
  function resetDuration (el, str) {
    if (TRANSITIONDURATION) { el.style[TRANSITIONDURATION] = str; }
  }

  function getSliderWidth () {
    return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
  }

  function getCenterGap (num) {
    if (num == null) { num = index; }

    var gap = edgePadding ? gutter : 0;
    return autoWidth ? ((viewport - gap) - (slidePositions[num + 1] - slidePositions[num] - gutter))/2 :
      fixedWidth ? (viewport - fixedWidth) / 2 :
        (items - 1) / 2;
  }

  function getRightBoundary () {
    var gap = edgePadding ? gutter : 0,
        result = (viewport + gap) - getSliderWidth();

    if (center && !loop) {
      result = fixedWidth ? - (fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() :
        getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
    }
    if (result > 0) { result = 0; }

    return result;
  }

  function getContainerTransformValue (num) {
    if (num == null) { num = index; }

    var val;
    if (horizontal && !autoWidth) {
      if (fixedWidth) {
        val = - (fixedWidth + gutter) * num;
        if (center) { val += getCenterGap(); }
      } else {
        var denominator = TRANSFORM ? slideCountNew : items;
        if (center) { num -= getCenterGap(); }
        val = - num * 100 / denominator;
      }
    } else {
      val = - slidePositions[num];
      if (center && autoWidth) {
        val += getCenterGap();
      }
    }

    if (hasRightDeadZone) { val = Math.max(val, rightBoundary); }

    val += (horizontal && !autoWidth && !fixedWidth) ? '%' : 'px';

    return val;
  }

  function doContainerTransformSilent (val) {
    resetDuration(container, '0s');
    doContainerTransform(val);
  }

  function doContainerTransform (val) {
    if (val == null) { val = getContainerTransformValue(); }
    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }

  function animateSlide (number, classOut, classIn, isOut) {
    var l = number + items;
    if (!loop) { l = Math.min(l, slideCountNew); }

    for (var i = number; i < l; i++) {
        var item = slideItems[i];

      // set item positions
      if (!isOut) { item.style.left = (i - index) * 100 / items + '%'; }

      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }
      Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, classOut);
      Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, classIn);

      if (isOut) { slideItemsOut.push(item); }
    }
  }

  // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers
  var transformCore = (function () {
    return carousel ?
      function () {
        resetDuration(container, '');
        if (TRANSITIONDURATION || !speed) {
          // for morden browsers with non-zero duration or
          // zero duration for all browsers
          doContainerTransform();
          // run fallback function manually
          // when duration is 0 / container is hidden
          if (!speed || !Object(_helpers_isVisible_js__WEBPACK_IMPORTED_MODULE_26__["isVisible"])(container)) { onTransitionEnd(); }

        } else {
          // for old browser with non-zero duration
          Object(_helpers_jsTransform_js__WEBPACK_IMPORTED_MODULE_33__["jsTransform"])(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
        }

        if (!horizontal) { updateContentWrapperHeight(); }
      } :
      function () {
        slideItemsOut = [];

        var eve = {};
        eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
        Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(slideItems[indexCached], eve);
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(slideItems[index], eve);

        animateSlide(indexCached, animateIn, animateOut, true);
        animateSlide(index, animateNormal, animateIn);

        // run fallback function manually
        // when transition or animation not supported / duration is 0
        if (!TRANSITIONEND || !ANIMATIONEND || !speed || !Object(_helpers_isVisible_js__WEBPACK_IMPORTED_MODULE_26__["isVisible"])(container)) { onTransitionEnd(); }
      };
  })();

  function render (e, sliderMoved) {
    if (updateIndexBeforeTransform) { updateIndex(); }

    // render when slider was moved (touch or drag) even though index may not change
    if (index !== indexCached || sliderMoved) {
      // events
      events.emit('indexChanged', info());
      events.emit('transitionStart', info());
      if (autoHeight) { doAutoHeight(); }

      // pause autoplay when click or keydown from user
      if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) { stopAutoplay(); }

      running = true;
      transformCore();
    }
  }

  /*
   * Transfer prefixed properties to the same format
   * CSS: -Webkit-Transform => webkittransform
   * JS: WebkitTransform => webkittransform
   * @param {string} str - property
   *
   */
  function strTrans (str) {
    return str.toLowerCase().replace(/-/g, '');
  }

  // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height
  function onTransitionEnd (event) {
    // check running on gallery mode
    // make sure trantionend/animationend events run only once
    if (carousel || running) {
      events.emit('transitionEnd', info(event));

      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < slideItemsOut.length; i++) {
          var item = slideItemsOut[i];
          // set item positions
          item.style.left = '';

          if (ANIMATIONDELAY && TRANSITIONDELAY) {
            item.style[ANIMATIONDELAY] = '';
            item.style[TRANSITIONDELAY] = '';
          }
          Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateOut);
          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateNormal);
        }
      }

      /* update slides, nav, controls after checking ...
       * => legacy browsers who don't support 'event'
       *    have to check event first, otherwise event.target will cause an error
       * => or 'gallery' mode:
       *   + event target is slide item
       * => or 'carousel' mode:
       *   + event target is container,
       *   + event.property is the same with transform attribute
       */
      if (!event ||
          !carousel && event.target.parentNode === container ||
          event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {

        if (!updateIndexBeforeTransform) {
          var indexTem = index;
          updateIndex();
          if (index !== indexTem) {
            events.emit('indexChanged', info());

            doContainerTransformSilent();
          }
        }

        if (nested === 'inner') { events.emit('innerLoaded', info()); }
        running = false;
        indexCached = index;
      }
    }

  }

  // # ACTIONS
  function goTo (targetIndex, e) {
    if (freeze) { return; }

    // prev slideBy
    if (targetIndex === 'prev') {
      onControlsClick(e, -1);

    // next slideBy
    } else if (targetIndex === 'next') {
      onControlsClick(e, 1);

    // go to exact slide
    } else {
      if (running) {
        if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
      }

      var absIndex = getAbsIndex(),
          indexGap = 0;

      if (targetIndex === 'first') {
        indexGap = - absIndex;
      } else if (targetIndex === 'last') {
        indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
      } else {
        if (typeof targetIndex !== 'number') { targetIndex = parseInt(targetIndex); }

        if (!isNaN(targetIndex)) {
          // from directly called goTo function
          if (!e) { targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex)); }

          indexGap = targetIndex - absIndex;
        }
      }

      // gallery: make sure new page won't overlap with current page
      if (!carousel && indexGap && Math.abs(indexGap) < items) {
        var factor = indexGap > 0 ? 1 : -1;
        indexGap += (index + indexGap - slideCount) >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
      }

      index += indexGap;

      // make sure index is in range
      if (carousel && loop) {
        if (index < indexMin) { index += slideCount; }
        if (index > indexMax) { index -= slideCount; }
      }

      // if index is changed, start rendering
      if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
        render(e);
      }

    }
  }

  // on controls click
  function onControlsClick (e, dir) {
    if (running) {
      if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
    }
    var passEventObject;

    if (!dir) {
      e = getEvent(e);
      var target = getTarget(e);

      while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) { target = target.parentNode; }

      var targetIn = [prevButton, nextButton].indexOf(target);
      if (targetIn >= 0) {
        passEventObject = true;
        dir = targetIn === 0 ? -1 : 1;
      }
    }

    if (rewind) {
      if (index === indexMin && dir === -1) {
        goTo('last', e);
        return;
      } else if (index === indexMax && dir === 1) {
        goTo('first', e);
        return;
      }
    }

    if (dir) {
      index += slideBy * dir;
      if (autoWidth) { index = Math.floor(index); }
      // pass e when click control buttons or keydown
      render((passEventObject || (e && e.type === 'keydown')) ? e : null);
    }
  }

  // on nav click
  function onNavClick (e) {
    if (running) {
      if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
    }

    e = getEvent(e);
    var target = getTarget(e), navIndex;

    // find the clicked nav item
    while (target !== navContainer && !Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(target, 'data-nav')) { target = target.parentNode; }
    if (Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(target, 'data-nav')) {
      var navIndex = navClicked = Number(Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(target, 'data-nav')),
          targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items,
          targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
      goTo(targetIndex, e);

      if (navCurrentIndex === navIndex) {
        if (animating) { stopAutoplay(); }
        navClicked = -1; // reset navClicked
      }
    }
  }

  // autoplay functions
  function setAutoplayTimer () {
    autoplayTimer = setInterval(function () {
      onControlsClick(null, autoplayDirection);
    }, autoplayTimeout);

    animating = true;
  }

  function stopAutoplayTimer () {
    clearInterval(autoplayTimer);
    animating = false;
  }

  function updateAutoplayButton (action, txt) {
    Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(autoplayButton, {'data-action': action});
    autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
  }

  function startAutoplay () {
    setAutoplayTimer();
    if (autoplayButton) { updateAutoplayButton('stop', autoplayText[1]); }
  }

  function stopAutoplay () {
    stopAutoplayTimer();
    if (autoplayButton) { updateAutoplayButton('start', autoplayText[0]); }
  }

  // programaitcally play/pause the slider
  function play () {
    if (autoplay && !animating) {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function pause () {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    }
  }

  function toggleAutoplay () {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    } else {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }

  function onVisibilityChange () {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    } else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }

  function mouseoverPause () {
    if (animating) {
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
  }

  function mouseoutRestart () {
    if (autoplayHoverPaused) {
      setAutoplayTimer();
      autoplayHoverPaused = false;
    }
  }

  // keydown events on document
  function onDocumentKeydown (e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

    if (keyIndex >= 0) {
      onControlsClick(e, keyIndex === 0 ? -1 : 1);
    }
  }

  // on key control
  function onControlsKeydown (e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (!prevButton.disabled) { onControlsClick(e, -1); }
      } else if (!nextButton.disabled) {
        onControlsClick(e, 1);
      }
    }
  }

  // set focus
  function setFocus (el) {
    el.focus();
  }

  // on key nav
  function onNavKeydown (e) {
    e = getEvent(e);
    var curElement = doc.activeElement;
    if (!Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(curElement, 'data-nav')) { return; }

    // var code = e.keyCode,
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode),
        navIndex = Number(Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(curElement, 'data-nav'));

    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (navIndex > 0) { setFocus(navItems[navIndex - 1]); }
      } else if (keyIndex === 1) {
        if (navIndex < pages - 1) { setFocus(navItems[navIndex + 1]); }
      } else {
        navClicked = navIndex;
        goTo(navIndex, e);
      }
    }
  }

  function getEvent (e) {
    e = e || win.event;
    return isTouchEvent(e) ? e.changedTouches[0] : e;
  }
  function getTarget (e) {
    return e.target || win.event.srcElement;
  }

  function isTouchEvent (e) {
    return e.type.indexOf('touch') >= 0;
  }

  function preventDefaultBehavior (e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }

  function getMoveDirectionExpected () {
    return Object(_helpers_getTouchDirection_js__WEBPACK_IMPORTED_MODULE_14__["getTouchDirection"])(Object(_helpers_toDegree_js__WEBPACK_IMPORTED_MODULE_13__["toDegree"])(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
  }

  function onPanStart (e) {
    if (running) {
      if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
    }

    if (autoplay && animating) { stopAutoplayTimer(); }

    panStart = true;
    if (rafIndex) {
      Object(_helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__["caf"])(rafIndex);
      rafIndex = null;
    }

    var $ = getEvent(e);
    events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));

    if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
      preventDefaultBehavior(e);
    }

    lastPosition.x = initPosition.x = $.clientX;
    lastPosition.y = initPosition.y = $.clientY;
    if (carousel) {
      translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ''));
      resetDuration(container, '0s');
    }
  }

  function onPanMove (e) {
    if (panStart) {
      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;

      if (carousel) {
        if (!rafIndex) { rafIndex = Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function(){ panUpdate(e); }); }
      } else {
        if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
        if (moveDirectionExpected) { preventScroll = true; }
      }

      if ((typeof e.cancelable !== 'boolean' || e.cancelable) && preventScroll) {
        e.preventDefault();
      }
    }
  }

  function panUpdate (e) {
    if (!moveDirectionExpected) {
      panStart = false;
      return;
    }
    Object(_helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__["caf"])(rafIndex);
    if (panStart) { rafIndex = Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function(){ panUpdate(e); }); }

    if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
    if (moveDirectionExpected) {
      if (!preventScroll && isTouchEvent(e)) { preventScroll = true; }

      try {
        if (e.type) { events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e)); }
      } catch(err) {}

      var x = translateInit,
          dist = getDist(lastPosition, initPosition);
      if (!horizontal || fixedWidth || autoWidth) {
        x += dist;
        x += 'px';
      } else {
        var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew): dist * 100 / (viewport + gutter);
        x += percentageX;
        x += '%';
      }

      container.style[transformAttr] = transformPrefix + x + transformPostfix;
    }
  }

  function onPanEnd (e) {
    if (panStart) {
      if (rafIndex) {
        Object(_helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__["caf"])(rafIndex);
        rafIndex = null;
      }
      if (carousel) { resetDuration(container, ''); }
      panStart = false;

      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;
      var dist = getDist(lastPosition, initPosition);

      if (Math.abs(dist)) {
        // drag vs click
        if (!isTouchEvent(e)) {
          // prevent "click"
          var target = getTarget(e);
          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(target, {'click': function preventClick (e) {
            preventDefaultBehavior(e);
            Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(target, {'click': preventClick});
          }});
        }

        if (carousel) {
          rafIndex = Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function() {
            if (horizontal && !autoWidth) {
              var indexMoved = - dist * items / (viewport + gutter);
              indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
              index += indexMoved;
            } else {
              var moved = - (translateInit + dist);
              if (moved <= 0) {
                index = indexMin;
              } else if (moved >= slidePositions[slideCountNew - 1]) {
                index = indexMax;
              } else {
                var i = 0;
                while (i < slideCountNew && moved >= slidePositions[i]) {
                  index = i;
                  if (moved > slidePositions[i] && dist < 0) { index += 1; }
                  i++;
                }
              }
            }

            render(e, dist);
            events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));
          });
        } else {
          if (moveDirectionExpected) {
            onControlsClick(e, dist > 0 ? -1 : 1);
          }
        }
      }
    }

    // reset
    if (options.preventScrollOnTouch === 'auto') { preventScroll = false; }
    if (swipeAngle) { moveDirectionExpected = '?'; }
    if (autoplay && !animating) { setAutoplayTimer(); }
  }

  // === RESIZE FUNCTIONS === //
  // (slidePositions, index, items) => vertical_conentWrapper.height
  function updateContentWrapperHeight () {
    var wp = middleWrapper ? middleWrapper : innerWrapper;
    wp.style.height = slidePositions[index + items] - slidePositions[index] + 'px';
  }

  function getPages () {
    var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
    return Math.min(Math.ceil(rough), slideCount);
  }

  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */
  function updateNavVisibility () {
    if (!nav || navAsThumbnails) { return; }

    if (pages !== pagesCached) {
      var min = pagesCached,
          max = pages,
          fn = _helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"];

      if (pagesCached > pages) {
        min = pages;
        max = pagesCached;
        fn = _helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"];
      }

      while (min < max) {
        fn(navItems[min]);
        min++;
      }

      // cache pages
      pagesCached = pages;
    }
  }

  function info (e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      hasControls: hasControls,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      displayIndex: getCurrentSlide(),
      navCurrentIndex: navCurrentIndex,
      navCurrentIndexCached: navCurrentIndexCached,
      pages: pages,
      pagesCached: pagesCached,
      sheet: sheet,
      isOn: isOn,
      event: e || {},
    };
  }

  return {
    version: '2.9.4',
    getInfo: info,
    events: events,
    goTo: goTo,
    play: play,
    pause: pause,
    isOn: isOn,
    updateSliderHeight: updateInnerWrapperHeight,
    refresh: initSliderTransform,
    destroy: destroy,
    rebuild: function() {
      return tns(Object(_helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__["extend"])(options, optionsElements));
    }
  };
};


/***/ }),

/***/ 9:
/*!**********************************************************************!*\
  !*** multi ./assets/javascript/functionalities/timeline-behavior.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /app/assets/javascript/functionalities/timeline-behavior.js */"./assets/javascript/functionalities/timeline-behavior.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL3RpbWVsaW5lLWJlaGF2aW9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9hZGRDU1NSdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9hZGRDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvYWRkRXZlbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9hcnJheUZyb21Ob2RlTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvY2FmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9jYWxjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9jaGVja1N0b3JhZ2VWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvY2xhc3NMaXN0U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvY3JlYXRlU3R5bGVTaGVldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZG9jRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2ZvckVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2dldEF0dHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2dldEJvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2dldENzc1J1bGVzTGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9nZXRFbmRQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZ2V0U2xpZGVJZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZ2V0VG91Y2hEaXJlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hhczNEVHJhbnNmb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvaGFzQXR0ci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvaGFzQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hpZGVFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9pc05vZGVMaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9pc1Zpc2libGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2pzVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9tZWRpYXF1ZXJ5U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcGFzc2l2ZU9wdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcGVyY2VudGFnZUxheW91dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcmFmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9yZW1vdmVBdHRycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcmVtb3ZlQ1NTUnVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcmVtb3ZlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3JlbW92ZUV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcmVzZXRGYWtlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvc2V0QXR0cnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3NldEZha2VCb2R5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9zZXRMb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3Nob3dFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy90b0RlZ3JlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvd2hpY2hQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL3Rpbnktc2xpZGVyLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImRvY3VtZW50IiwidG5zIiwiY29udGFpbmVyIiwiaXRlbXMiLCJndXR0ZXIiLCJhdXRvcGxheSIsImNvbnRyb2xzVGV4dCIsInJlc3BvbnNpdmUiLCJkYXRlcyIsImluZGV4IiwiZGF0ZSIsIml0ZW1BY3RpdmUiLCJpIiwidGVzdCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFF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QUNBO0FBQ0EsOERBQThELFlBQVk7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtELHVCQUF1QjtBQUN6RSxxQkFBcUIsNkJBQTZCO0FBQ2xELGlDQUFpQyxvQkFBb0I7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxRQUFROztBQUUxQztBQUNBO0FBQ0E7QUFDQSxlQUFlLG9FQUFXOztBQUUxQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLG9FQUFXO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpRUFBTTtBQUN2QjtBQUNBO0FBQ0EiLCJmaWxlIjoiL2pzL2Z1bmN0aW9uYWxpdGllcy90aW1lbGluZS1iZWhhdmlvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi8vZGlzdFwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG4iLCJpbXBvcnQgeyB0bnMgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy90aW55LXNsaWRlclwiXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdCAgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pdGVtLXNsaWRlcicpLmZvckVhY2goc2xpZGVyID0+IHtcbiAgICAgICAgICAgIHRucyh7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBzbGlkZXIsXG4gICAgICAgICAgICAgICAgaXRlbXM6IDEsXG4gICAgICAgICAgICAgICAgZ3V0dGVyOiAwLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb250cm9sc1RleHQ6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlOiB7XG4gICAgICAgICAgICAgICAgICAgIDY0MDoge1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAyXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgZGF0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGF0ZVwiKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRucy1vdXRlclwiKTtcbiAgICAgICAgXG4gICAgICAgIGl0ZW1zWzBdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiB0ZXN0KGRhdGUsIGl0ZW1zKXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGRhdGUuZGF0YXNldC5pbmRleDtcbiAgICAgICAgICAgIGxldCBpdGVtQWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImFjdGl2ZVwiKVswXTtcblxuICAgICAgICAgICAgaXRlbUFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkYXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGRhdGVzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB0ZXN0KHRoaXMsIGl0ZW1zKTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbn0pO1xuIiwiLy8gY3Jvc3MgYnJvd3NlcnMgYWRkUnVsZSBtZXRob2RcbmltcG9ydCB7IHJhZiB9IGZyb20gJy4vcmFmLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBhZGRDU1NSdWxlKHNoZWV0LCBzZWxlY3RvciwgcnVsZXMsIGluZGV4KSB7XG4gIC8vIHJldHVybiByYWYoZnVuY3Rpb24oKSB7XG4gICAgJ2luc2VydFJ1bGUnIGluIHNoZWV0ID9cbiAgICAgIHNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3IgKyAneycgKyBydWxlcyArICd9JywgaW5kZXgpIDpcbiAgICAgIHNoZWV0LmFkZFJ1bGUoc2VsZWN0b3IsIHJ1bGVzLCBpbmRleCk7XG4gIC8vIH0pO1xufSIsImltcG9ydCB7IGNsYXNzTGlzdFN1cHBvcnQsIGhhc0NsYXNzIH0gZnJvbSAnLi9oYXNDbGFzcy5qcyc7XG52YXIgYWRkQ2xhc3MgPSBjbGFzc0xpc3RTdXBwb3J0ID9cbiAgICBmdW5jdGlvbiAoZWwsIHN0cikge1xuICAgICAgaWYgKCFoYXNDbGFzcyhlbCwgIHN0cikpIHsgZWwuY2xhc3NMaXN0LmFkZChzdHIpOyB9XG4gICAgfSA6XG4gICAgZnVuY3Rpb24gKGVsLCBzdHIpIHtcbiAgICAgIGlmICghaGFzQ2xhc3MoZWwsICBzdHIpKSB7IGVsLmNsYXNzTmFtZSArPSAnICcgKyBzdHI7IH1cbiAgICB9O1xuXG5leHBvcnQgeyBhZGRDbGFzcyB9OyIsImltcG9ydCB7IHBhc3NpdmVPcHRpb24gfSBmcm9tICcuL3Bhc3NpdmVPcHRpb24uanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRzKGVsLCBvYmosIHByZXZlbnRTY3JvbGxpbmcpIHtcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICB2YXIgb3B0aW9uID0gWyd0b3VjaHN0YXJ0JywgJ3RvdWNobW92ZSddLmluZGV4T2YocHJvcCkgPj0gMCAmJiAhcHJldmVudFNjcm9sbGluZyA/IHBhc3NpdmVPcHRpb24gOiBmYWxzZTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKHByb3AsIG9ialtwcm9wXSwgb3B0aW9uKTtcbiAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBhcnJheUZyb21Ob2RlTGlzdCAobmwpIHtcbiAgdmFyIGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IG5sLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyci5wdXNoKG5sW2ldKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufSIsInZhciB3aW4gPSB3aW5kb3c7XG5cbmV4cG9ydCB2YXIgY2FmID0gd2luLmNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbi5tb3pDYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCBmdW5jdGlvbihpZCl7IGNsZWFyVGltZW91dChpZCk7IH07XG4iLCIvLyBnZXQgY3NzLWNhbGMgXG4vLyBAcmV0dXJuIC0gZmFsc2UgfCBjYWxjIHwgLXdlYmtpdC1jYWxjIHwgLW1vei1jYWxjXG4vLyBAdXNhZ2UgLSB2YXIgY2FsYyA9IGdldENhbGMoKTsgXG5pbXBvcnQgeyBnZXRCb2R5IH0gZnJvbSAnLi9nZXRCb2R5LmpzJztcbmltcG9ydCB7IHNldEZha2VCb2R5IH0gZnJvbSAnLi9zZXRGYWtlQm9keS5qcyc7XG5pbXBvcnQgeyByZXNldEZha2VCb2R5IH0gZnJvbSAnLi9yZXNldEZha2VCb2R5LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGMoKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCwgXG4gICAgICBib2R5ID0gZ2V0Qm9keSgpLFxuICAgICAgZG9jT3ZlcmZsb3cgPSBzZXRGYWtlQm9keShib2R5KSxcbiAgICAgIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSwgXG4gICAgICByZXN1bHQgPSBmYWxzZTtcblxuICBib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gIHRyeSB7XG4gICAgdmFyIHN0ciA9ICcoMTBweCAqIDEwKScsXG4gICAgICAgIHZhbHMgPSBbJ2NhbGMnICsgc3RyLCAnLW1vei1jYWxjJyArIHN0ciwgJy13ZWJraXQtY2FsYycgKyBzdHJdLFxuICAgICAgICB2YWw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIHZhbCA9IHZhbHNbaV07XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSB2YWw7XG4gICAgICBpZiAoZGl2Lm9mZnNldFdpZHRoID09PSAxMDApIHsgXG4gICAgICAgIHJlc3VsdCA9IHZhbC5yZXBsYWNlKHN0ciwgJycpOyBcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuICBcbiAgYm9keS5mYWtlID8gcmVzZXRGYWtlQm9keShib2R5LCBkb2NPdmVyZmxvdykgOiBkaXYucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCJleHBvcnQgZnVuY3Rpb24gY2hlY2tTdG9yYWdlVmFsdWUgKHZhbHVlKSB7XG4gIHJldHVybiBbJ3RydWUnLCAnZmFsc2UnXS5pbmRleE9mKHZhbHVlKSA+PSAwID8gSlNPTi5wYXJzZSh2YWx1ZSkgOiB2YWx1ZTtcbn0iLCJleHBvcnQgdmFyIGNsYXNzTGlzdFN1cHBvcnQgPSAnY2xhc3NMaXN0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdfJyk7IiwiLy8gY3JlYXRlIGFuZCBhcHBlbmQgc3R5bGUgc2hlZXRcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHlsZVNoZWV0IChtZWRpYSwgbm9uY2UpIHtcbiAgLy8gQ3JlYXRlIHRoZSA8c3R5bGU+IHRhZ1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIC8vIHN0eWxlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2Nzc1wiKTtcblxuICAvLyBBZGQgYSBtZWRpYSAoYW5kL29yIG1lZGlhIHF1ZXJ5KSBoZXJlIGlmIHlvdSdkIGxpa2UhXG4gIC8vIHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIFwic2NyZWVuXCIpXG4gIC8vIHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOiAxMDI0cHgpXCIpXG4gIGlmIChtZWRpYSkgeyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSk7IH1cblxuICAvLyBBZGQgbm9uY2UgYXR0cmlidXRlIGZvciBDb250ZW50IFNlY3VyaXR5IFBvbGljeVxuICBpZiAobm9uY2UpIHsgc3R5bGUuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpOyB9XG5cbiAgLy8gV2ViS2l0IGhhY2sgOihcbiAgLy8gc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIikpO1xuXG4gIC8vIEFkZCB0aGUgPHN0eWxlPiBlbGVtZW50IHRvIHRoZSBwYWdlXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5hcHBlbmRDaGlsZChzdHlsZSk7XG5cbiAgcmV0dXJuIHN0eWxlLnNoZWV0ID8gc3R5bGUuc2hlZXQgOiBzdHlsZS5zdHlsZVNoZWV0O1xufTsiLCJleHBvcnQgdmFyIGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwiZXhwb3J0IGZ1bmN0aW9uIEV2ZW50cygpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3BpY3M6IHt9LFxuICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuICAgICAgdGhpcy50b3BpY3NbZXZlbnROYW1lXSA9IHRoaXMudG9waWNzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICB0aGlzLnRvcGljc1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgIH0sXG4gICAgb2ZmOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICBpZiAodGhpcy50b3BpY3NbZXZlbnROYW1lXSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudG9waWNzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy50b3BpY3NbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgIHRoaXMudG9waWNzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBlbWl0OiBmdW5jdGlvbiAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICBkYXRhLnR5cGUgPSBldmVudE5hbWU7XG4gICAgICBpZiAodGhpcy50b3BpY3NbZXZlbnROYW1lXSkge1xuICAgICAgICB0aGlzLnRvcGljc1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICBmbihkYXRhLCBldmVudE5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59OyIsImV4cG9ydCBmdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBvYmosIG5hbWUsIGNvcHksXG4gICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG4gICAgICBpID0gMSxcbiAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgob2JqID0gYXJndW1lbnRzW2ldKSAhPT0gbnVsbCkge1xuICAgICAgZm9yIChuYW1lIGluIG9iaikge1xuICAgICAgICBjb3B5ID0gb2JqW25hbWVdO1xuXG4gICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjb3B5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBjb3B5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59IiwiLy8gaHR0cHM6Ly90b2RkbW90dG8uY29tL2RpdGNoLXRoZS1hcnJheS1mb3JlYWNoLWNhbGwtbm9kZWxpc3QtaGFjay9cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoIChhcnIsIGNhbGxiYWNrLCBzY29wZSkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHNjb3BlLCBhcnJbaV0sIGkpO1xuICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHIoZWwsIGF0dHIpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShhdHRyKTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0Qm9keSAoKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICAgIGJvZHkgPSBkb2MuYm9keTtcblxuICBpZiAoIWJvZHkpIHtcbiAgICBib2R5ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcbiAgICBib2R5LmZha2UgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGJvZHk7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSB7XG4gIHZhciBydWxlID0gKCdpbnNlcnRSdWxlJyBpbiBzaGVldCkgPyBzaGVldC5jc3NSdWxlcyA6IHNoZWV0LnJ1bGVzO1xuICByZXR1cm4gcnVsZS5sZW5ndGg7XG59IiwiLy8gZ2V0IHRyYW5zaXRpb25lbmQsIGFuaW1hdGlvbmVuZCBiYXNlZCBvbiB0cmFuc2l0aW9uRHVyYXRpb25cbi8vIEBwcm9waW46IHN0cmluZ1xuLy8gQHByb3BPdXQ6IHN0cmluZywgZmlyc3QtbGV0dGVyIHVwcGVyY2FzZVxuLy8gVXNhZ2U6IGdldEVuZFByb3BlcnR5KCdXZWJraXRUcmFuc2l0aW9uRHVyYXRpb24nLCAnVHJhbnNpdGlvbicpID0+IHdlYmtpdFRyYW5zaXRpb25FbmRcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmRQcm9wZXJ0eShwcm9wSW4sIHByb3BPdXQpIHtcbiAgdmFyIGVuZFByb3AgPSBmYWxzZTtcbiAgaWYgKC9eV2Via2l0Ly50ZXN0KHByb3BJbikpIHtcbiAgICBlbmRQcm9wID0gJ3dlYmtpdCcgKyBwcm9wT3V0ICsgJ0VuZCc7XG4gIH0gZWxzZSBpZiAoL15PLy50ZXN0KHByb3BJbikpIHtcbiAgICBlbmRQcm9wID0gJ28nICsgcHJvcE91dCArICdFbmQnO1xuICB9IGVsc2UgaWYgKHByb3BJbikge1xuICAgIGVuZFByb3AgPSBwcm9wT3V0LnRvTG93ZXJDYXNlKCkgKyAnZW5kJztcbiAgfVxuICByZXR1cm4gZW5kUHJvcDtcbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U2xpZGVJZCgpIHtcbiAgdmFyIGlkID0gd2luZG93LnRuc0lkO1xuICB3aW5kb3cudG5zSWQgPSAhaWQgPyAxIDogaWQgKyAxO1xuICBcbiAgcmV0dXJuICd0bnMnICsgd2luZG93LnRuc0lkO1xufSIsImV4cG9ydCBmdW5jdGlvbiBnZXRUb3VjaERpcmVjdGlvbihhbmdsZSwgcmFuZ2UpIHtcbiAgdmFyIGRpcmVjdGlvbiA9IGZhbHNlLFxuICAgICAgZ2FwID0gTWF0aC5hYnMoOTAgLSBNYXRoLmFicyhhbmdsZSkpO1xuICAgICAgXG4gIGlmIChnYXAgPj0gOTAgLSByYW5nZSkge1xuICAgIGRpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcbiAgfSBlbHNlIGlmIChnYXAgPD0gcmFuZ2UpIHtcbiAgICBkaXJlY3Rpb24gPSAndmVydGljYWwnO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbjtcbn0iLCJpbXBvcnQgeyBnZXRCb2R5IH0gZnJvbSAnLi9nZXRCb2R5LmpzJztcbmltcG9ydCB7IHNldEZha2VCb2R5IH0gZnJvbSAnLi9zZXRGYWtlQm9keS5qcyc7XG5pbXBvcnQgeyByZXNldEZha2VCb2R5IH0gZnJvbSAnLi9yZXNldEZha2VCb2R5LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhczNEVHJhbnNmb3Jtcyh0Zil7XG4gIGlmICghdGYpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIFxuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgICBib2R5ID0gZ2V0Qm9keSgpLFxuICAgICAgZG9jT3ZlcmZsb3cgPSBzZXRGYWtlQm9keShib2R5KSxcbiAgICAgIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3AnKSxcbiAgICAgIGhhczNkLFxuICAgICAgY3NzVEYgPSB0Zi5sZW5ndGggPiA5ID8gJy0nICsgdGYuc2xpY2UoMCwgLTkpLnRvTG93ZXJDYXNlKCkgKyAnLScgOiAnJztcblxuICBjc3NURiArPSAndHJhbnNmb3JtJztcblxuICAvLyBBZGQgaXQgdG8gdGhlIGJvZHkgdG8gZ2V0IHRoZSBjb21wdXRlZCBzdHlsZVxuICBib2R5Lmluc2VydEJlZm9yZShlbCwgbnVsbCk7XG5cbiAgZWwuc3R5bGVbdGZdID0gJ3RyYW5zbGF0ZTNkKDFweCwxcHgsMXB4KSc7XG4gIGhhczNkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUoY3NzVEYpO1xuXG4gIGJvZHkuZmFrZSA/IHJlc2V0RmFrZUJvZHkoYm9keSwgZG9jT3ZlcmZsb3cpIDogZWwucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIChoYXMzZCAhPT0gdW5kZWZpbmVkICYmIGhhczNkLmxlbmd0aCA+IDAgJiYgaGFzM2QgIT09IFwibm9uZVwiKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNBdHRyKGVsLCBhdHRyKSB7XG4gIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUoYXR0cik7XG59IiwiaW1wb3J0IHsgY2xhc3NMaXN0U3VwcG9ydCB9IGZyb20gJy4vY2xhc3NMaXN0U3VwcG9ydC5qcyc7XG5cbnZhciBoYXNDbGFzcyA9IGNsYXNzTGlzdFN1cHBvcnQgP1xuICAgIGZ1bmN0aW9uIChlbCwgc3RyKSB7IHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoc3RyKTsgfSA6XG4gICAgZnVuY3Rpb24gKGVsLCBzdHIpIHsgcmV0dXJuIGVsLmNsYXNzTmFtZS5pbmRleE9mKHN0cikgPj0gMDsgfTtcblxuZXhwb3J0IHsgY2xhc3NMaXN0U3VwcG9ydCwgaGFzQ2xhc3MgfTsiLCJleHBvcnQgZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWwsIGZvcmNlSGlkZSkge1xuICBpZiAoZWwuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7IGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gaXNOb2RlTGlzdChlbCkge1xuICAvLyBPbmx5IE5vZGVMaXN0IGhhcyB0aGUgXCJpdGVtKClcIiBmdW5jdGlvblxuICByZXR1cm4gdHlwZW9mIGVsLml0ZW0gIT09IFwidW5kZWZpbmVkXCI7IFxufSIsImV4cG9ydCBmdW5jdGlvbiBpc1Zpc2libGUoZWwpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5kaXNwbGF5ICE9PSAnbm9uZSc7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGpzVHJhbnNmb3JtKGVsZW1lbnQsIGF0dHIsIHByZWZpeCwgcG9zdGZpeCwgdG8sIGR1cmF0aW9uLCBjYWxsYmFjaykge1xuICB2YXIgdGljayA9IE1hdGgubWluKGR1cmF0aW9uLCAxMCksXG4gICAgICB1bml0ID0gKHRvLmluZGV4T2YoJyUnKSA+PSAwKSA/ICclJyA6ICdweCcsXG4gICAgICB0byA9IHRvLnJlcGxhY2UodW5pdCwgJycpLFxuICAgICAgZnJvbSA9IE51bWJlcihlbGVtZW50LnN0eWxlW2F0dHJdLnJlcGxhY2UocHJlZml4LCAnJykucmVwbGFjZShwb3N0Zml4LCAnJykucmVwbGFjZSh1bml0LCAnJykpLFxuICAgICAgcG9zaXRpb25UaWNrID0gKHRvIC0gZnJvbSkgLyBkdXJhdGlvbiAqIHRpY2ssXG4gICAgICBydW5uaW5nO1xuXG4gIHNldFRpbWVvdXQobW92ZUVsZW1lbnQsIHRpY2spO1xuICBmdW5jdGlvbiBtb3ZlRWxlbWVudCgpIHtcbiAgICBkdXJhdGlvbiAtPSB0aWNrO1xuICAgIGZyb20gKz0gcG9zaXRpb25UaWNrO1xuICAgIGVsZW1lbnQuc3R5bGVbYXR0cl0gPSBwcmVmaXggKyBmcm9tICsgdW5pdCArIHBvc3RmaXg7XG4gICAgaWYgKGR1cmF0aW9uID4gMCkgeyBcbiAgICAgIHNldFRpbWVvdXQobW92ZUVsZW1lbnQsIHRpY2spOyBcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBnZXRCb2R5IH0gZnJvbSAnLi9nZXRCb2R5LmpzJztcbmltcG9ydCB7IHNldEZha2VCb2R5IH0gZnJvbSAnLi9zZXRGYWtlQm9keS5qcyc7XG5pbXBvcnQgeyByZXNldEZha2VCb2R5IH0gZnJvbSAnLi9yZXNldEZha2VCb2R5LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1lZGlhcXVlcnlTdXBwb3J0ICgpIHtcbiAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhIHx8IHdpbmRvdy5tc01hdGNoTWVkaWEpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBcbiAgdmFyIGRvYyA9IGRvY3VtZW50LFxuICAgICAgYm9keSA9IGdldEJvZHkoKSxcbiAgICAgIGRvY092ZXJmbG93ID0gc2V0RmFrZUJvZHkoYm9keSksXG4gICAgICBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBzdHlsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgcnVsZSA9ICdAbWVkaWEgYWxsIGFuZCAobWluLXdpZHRoOjFweCl7LnRucy1tcS10ZXN0e3Bvc2l0aW9uOmFic29sdXRlfX0nLFxuICAgICAgcG9zaXRpb247XG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gIGRpdi5jbGFzc05hbWUgPSAndG5zLW1xLXRlc3QnO1xuXG4gIGJvZHkuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICBib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBydWxlO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShydWxlKSk7XG4gIH1cblxuICBwb3NpdGlvbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZGl2KS5wb3NpdGlvbiA6IGRpdi5jdXJyZW50U3R5bGVbJ3Bvc2l0aW9uJ107XG5cbiAgYm9keS5mYWtlID8gcmVzZXRGYWtlQm9keShib2R5LCBkb2NPdmVyZmxvdykgOiBkaXYucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIHBvc2l0aW9uID09PSBcImFic29sdXRlXCI7XG59XG4iLCIvLyBUZXN0IHZpYSBhIGdldHRlciBpbiB0aGUgb3B0aW9ucyBvYmplY3QgdG8gc2VlIGlmIHRoZSBwYXNzaXZlIHByb3BlcnR5IGlzIGFjY2Vzc2VkXG52YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG50cnkge1xuICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG51bGwsIG9wdHMpO1xufSBjYXRjaCAoZSkge31cbmV4cG9ydCB2YXIgcGFzc2l2ZU9wdGlvbiA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2U7IiwiLy8gZ2V0IHN1YnBpeGVsIHN1cHBvcnQgdmFsdWVcbi8vIEByZXR1cm4gLSBib29sZWFuXG5pbXBvcnQgeyBnZXRCb2R5IH0gZnJvbSAnLi9nZXRCb2R5LmpzJztcbmltcG9ydCB7IHNldEZha2VCb2R5IH0gZnJvbSAnLi9zZXRGYWtlQm9keS5qcyc7XG5pbXBvcnQgeyByZXNldEZha2VCb2R5IH0gZnJvbSAnLi9yZXNldEZha2VCb2R5LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBlcmNlbnRhZ2VMYXlvdXQoKSB7XG4gIC8vIGNoZWNrIHN1YnBpeGVsIGxheW91dCBzdXBwb3J0aW5nXG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICAgIGJvZHkgPSBnZXRCb2R5KCksXG4gICAgICBkb2NPdmVyZmxvdyA9IHNldEZha2VCb2R5KGJvZHkpLFxuICAgICAgd3JhcHBlciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIG91dGVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgc3RyID0gJycsXG4gICAgICBjb3VudCA9IDcwLFxuICAgICAgcGVyUGFnZSA9IDMsXG4gICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcblxuICB3cmFwcGVyLmNsYXNzTmFtZSA9IFwidG5zLXQtc3VicDJcIjtcbiAgb3V0ZXIuY2xhc3NOYW1lID0gXCJ0bnMtdC1jdFwiO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIHN0ciArPSAnPGRpdj48L2Rpdj4nO1xuICB9XG5cbiAgb3V0ZXIuaW5uZXJIVE1MID0gc3RyO1xuICB3cmFwcGVyLmFwcGVuZENoaWxkKG91dGVyKTtcbiAgYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuICBzdXBwb3J0ZWQgPSBNYXRoLmFicyh3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBvdXRlci5jaGlsZHJlbltjb3VudCAtIHBlclBhZ2VdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpIDwgMjtcblxuICBib2R5LmZha2UgPyByZXNldEZha2VCb2R5KGJvZHksIGRvY092ZXJmbG93KSA6IHdyYXBwZXIucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIHN1cHBvcnRlZDtcbn0iLCJ2YXIgd2luID0gd2luZG93O1xuXG5leHBvcnQgdmFyIHJhZiA9IHdpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW4ubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbi5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCBmdW5jdGlvbihjYikgeyByZXR1cm4gc2V0VGltZW91dChjYiwgMTYpOyB9O1xuIiwiaW1wb3J0IHsgaXNOb2RlTGlzdCB9IGZyb20gXCIuL2lzTm9kZUxpc3QuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHJzKGVscywgYXR0cnMpIHtcbiAgZWxzID0gKGlzTm9kZUxpc3QoZWxzKSB8fCBlbHMgaW5zdGFuY2VvZiBBcnJheSkgPyBlbHMgOiBbZWxzXTtcbiAgYXR0cnMgPSAoYXR0cnMgaW5zdGFuY2VvZiBBcnJheSkgPyBhdHRycyA6IFthdHRyc107XG5cbiAgdmFyIGF0dHJMZW5ndGggPSBhdHRycy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSBlbHMubGVuZ3RoOyBpLS07KSB7XG4gICAgZm9yICh2YXIgaiA9IGF0dHJMZW5ndGg7IGotLTspIHtcbiAgICAgIGVsc1tpXS5yZW1vdmVBdHRyaWJ1dGUoYXR0cnNbal0pO1xuICAgIH1cbiAgfVxufSIsIi8vIGNyb3NzIGJyb3dzZXJzIGFkZFJ1bGUgbWV0aG9kXG5pbXBvcnQgeyByYWYgfSBmcm9tICcuL3JhZi5qcyc7XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ1NTUnVsZShzaGVldCwgaW5kZXgpIHtcbiAgLy8gcmV0dXJuIHJhZihmdW5jdGlvbigpIHtcbiAgICAnZGVsZXRlUnVsZScgaW4gc2hlZXQgP1xuICAgICAgc2hlZXQuZGVsZXRlUnVsZShpbmRleCkgOlxuICAgICAgc2hlZXQucmVtb3ZlUnVsZShpbmRleCk7XG4gIC8vIH0pO1xufSIsImltcG9ydCB7IGNsYXNzTGlzdFN1cHBvcnQsIGhhc0NsYXNzIH0gZnJvbSAnLi9oYXNDbGFzcy5qcyc7XG52YXIgcmVtb3ZlQ2xhc3MgPSBjbGFzc0xpc3RTdXBwb3J0ID9cbiAgICBmdW5jdGlvbiAoZWwsIHN0cikge1xuICAgICAgaWYgKGhhc0NsYXNzKGVsLCAgc3RyKSkgeyBlbC5jbGFzc0xpc3QucmVtb3ZlKHN0cik7IH1cbiAgICB9IDpcbiAgICBmdW5jdGlvbiAoZWwsIHN0cikge1xuICAgICAgaWYgKGhhc0NsYXNzKGVsLCBzdHIpKSB7IGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKHN0ciwgJycpOyB9XG4gICAgfTtcblxuZXhwb3J0IHsgcmVtb3ZlQ2xhc3MgfTsiLCJpbXBvcnQgeyBwYXNzaXZlT3B0aW9uIH0gZnJvbSAnLi9wYXNzaXZlT3B0aW9uLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50cyhlbCwgb2JqKSB7XG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgdmFyIG9wdGlvbiA9IFsndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnXS5pbmRleE9mKHByb3ApID49IDAgPyBwYXNzaXZlT3B0aW9uIDogZmFsc2U7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihwcm9wLCBvYmpbcHJvcF0sIG9wdGlvbik7XG4gIH1cbn0iLCJpbXBvcnQgeyBkb2NFbGVtZW50IH0gZnJvbSAnLi9kb2NFbGVtZW50LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0RmFrZUJvZHkgKGJvZHksIGRvY092ZXJmbG93KSB7XG4gIGlmIChib2R5LmZha2UpIHtcbiAgICBib2R5LnJlbW92ZSgpO1xuICAgIGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2NPdmVyZmxvdztcbiAgICAvLyBUcmlnZ2VyIGxheW91dCBzbyBraW5ldGljIHNjcm9sbGluZyBpc24ndCBkaXNhYmxlZCBpbiBpT1M2K1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIGRvY0VsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG59IiwiaW1wb3J0IHsgaXNOb2RlTGlzdCB9IGZyb20gXCIuL2lzTm9kZUxpc3QuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJzKGVscywgYXR0cnMpIHtcbiAgZWxzID0gKGlzTm9kZUxpc3QoZWxzKSB8fCBlbHMgaW5zdGFuY2VvZiBBcnJheSkgPyBlbHMgOiBbZWxzXTtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhdHRycykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7IHJldHVybjsgfVxuXG4gIGZvciAodmFyIGkgPSBlbHMubGVuZ3RoOyBpLS07KSB7XG4gICAgZm9yKHZhciBrZXkgaW4gYXR0cnMpIHtcbiAgICAgIGVsc1tpXS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBkb2NFbGVtZW50IH0gZnJvbSAnLi9kb2NFbGVtZW50LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEZha2VCb2R5IChib2R5KSB7XG4gIHZhciBkb2NPdmVyZmxvdyA9ICcnO1xuICBpZiAoYm9keS5mYWtlKSB7XG4gICAgZG9jT3ZlcmZsb3cgPSBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93O1xuICAgIC8vYXZvaWQgY3Jhc2hpbmcgSUU4LCBpZiBiYWNrZ3JvdW5kIGltYWdlIGlzIHVzZWRcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAvL1NhZmFyaSA1LjEzLzUuMS40IE9TWCBzdG9wcyBsb2FkaW5nIGlmIDo6LXdlYmtpdC1zY3JvbGxiYXIgaXMgdXNlZCBhbmQgc2Nyb2xsYmFycyBhcmUgdmlzaWJsZVxuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgZG9jRWxlbWVudC5hcHBlbmRDaGlsZChib2R5KTtcbiAgfVxuXG4gIHJldHVybiBkb2NPdmVyZmxvdztcbn0iLCJleHBvcnQgZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKHN0b3JhZ2UsIGtleSwgdmFsdWUsIGFjY2Vzcykge1xuICBpZiAoYWNjZXNzKSB7XG4gICAgdHJ5IHsgc3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpOyB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWwsIGZvcmNlSGlkZSkge1xuICBpZiAoZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7IGVsLnN0eWxlLmRpc3BsYXkgPSAnJzsgfVxufSIsImV4cG9ydCBmdW5jdGlvbiB0b0RlZ3JlZSAoeSwgeCkge1xuICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KSAqICgxODAgLyBNYXRoLlBJKTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gd2hpY2hQcm9wZXJ0eShwcm9wcyl7XG4gIGlmICh0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIGFyciA9IFtwcm9wc10sXG4gICAgICAgIFByb3BzID0gcHJvcHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wcy5zdWJzdHIoMSksXG4gICAgICAgIHByZWZpeGVzID0gWydXZWJraXQnLCAnTW96JywgJ21zJywgJ08nXTtcbiAgICAgICAgXG4gICAgcHJlZml4ZXMuZm9yRWFjaChmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgIGlmIChwcmVmaXggIT09ICdtcycgfHwgcHJvcHMgPT09ICd0cmFuc2Zvcm0nKSB7XG4gICAgICAgIGFyci5wdXNoKHByZWZpeCArIFByb3BzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHByb3BzID0gYXJyO1xuICB9XG5cbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKSxcbiAgICAgIGxlbiA9IHByb3BzLmxlbmd0aDtcbiAgZm9yKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKXtcbiAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xuICAgIGlmKCBlbC5zdHlsZVtwcm9wXSAhPT0gdW5kZWZpbmVkICl7IHJldHVybiBwcm9wOyB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7IC8vIGV4cGxpY2l0IGZvciBpZTktXG59XG4iLCIvLyBPYmplY3Qua2V5c1xuaWYgKCFPYmplY3Qua2V5cykge1xuICBPYmplY3Qua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBuYW1lKSkge1xuICAgICAgICBrZXlzLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xuICB9O1xufVxuXG4vLyBDaGlsZE5vZGUucmVtb3ZlXG5pZighKFwicmVtb3ZlXCIgaW4gRWxlbWVudC5wcm90b3R5cGUpKXtcbiAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKXtcbiAgICBpZih0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICB9XG4gIH07XG59XG5cbmltcG9ydCB7IHJhZiB9IGZyb20gJy4vaGVscGVycy9yYWYuanMnO1xuaW1wb3J0IHsgY2FmIH0gZnJvbSAnLi9oZWxwZXJzL2NhZi5qcyc7XG5pbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuL2hlbHBlcnMvZXh0ZW5kLmpzJztcbmltcG9ydCB7IGNoZWNrU3RvcmFnZVZhbHVlIH0gZnJvbSAnLi9oZWxwZXJzL2NoZWNrU3RvcmFnZVZhbHVlLmpzJztcbmltcG9ydCB7IHNldExvY2FsU3RvcmFnZSB9IGZyb20gJy4vaGVscGVycy9zZXRMb2NhbFN0b3JhZ2UuanMnO1xuaW1wb3J0IHsgZ2V0U2xpZGVJZCB9IGZyb20gJy4vaGVscGVycy9nZXRTbGlkZUlkLmpzJztcbmltcG9ydCB7IGNhbGMgfSBmcm9tICcuL2hlbHBlcnMvY2FsYy5qcyc7XG5pbXBvcnQgeyBwZXJjZW50YWdlTGF5b3V0IH0gZnJvbSAnLi9oZWxwZXJzL3BlcmNlbnRhZ2VMYXlvdXQuanMnO1xuaW1wb3J0IHsgbWVkaWFxdWVyeVN1cHBvcnQgfSBmcm9tICcuL2hlbHBlcnMvbWVkaWFxdWVyeVN1cHBvcnQuanMnO1xuaW1wb3J0IHsgY3JlYXRlU3R5bGVTaGVldCB9IGZyb20gJy4vaGVscGVycy9jcmVhdGVTdHlsZVNoZWV0LmpzJztcbmltcG9ydCB7IGFkZENTU1J1bGUgfSBmcm9tICcuL2hlbHBlcnMvYWRkQ1NTUnVsZS5qcyc7XG5pbXBvcnQgeyByZW1vdmVDU1NSdWxlIH0gZnJvbSAnLi9oZWxwZXJzL3JlbW92ZUNTU1J1bGUuanMnO1xuaW1wb3J0IHsgZ2V0Q3NzUnVsZXNMZW5ndGggfSBmcm9tICcuL2hlbHBlcnMvZ2V0Q3NzUnVsZXNMZW5ndGguanMnO1xuaW1wb3J0IHsgdG9EZWdyZWUgfSBmcm9tICcuL2hlbHBlcnMvdG9EZWdyZWUuanMnO1xuaW1wb3J0IHsgZ2V0VG91Y2hEaXJlY3Rpb24gfSBmcm9tICcuL2hlbHBlcnMvZ2V0VG91Y2hEaXJlY3Rpb24uanMnO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gJy4vaGVscGVycy9mb3JFYWNoLmpzJztcbmltcG9ydCB7IGhhc0NsYXNzIH0gZnJvbSAnLi9oZWxwZXJzL2hhc0NsYXNzLmpzJztcbmltcG9ydCB7IGFkZENsYXNzIH0gZnJvbSAnLi9oZWxwZXJzL2FkZENsYXNzLmpzJztcbmltcG9ydCB7IHJlbW92ZUNsYXNzIH0gZnJvbSAnLi9oZWxwZXJzL3JlbW92ZUNsYXNzLmpzJztcbmltcG9ydCB7IGhhc0F0dHIgfSBmcm9tICcuL2hlbHBlcnMvaGFzQXR0ci5qcyc7XG5pbXBvcnQgeyBnZXRBdHRyIH0gZnJvbSAnLi9oZWxwZXJzL2dldEF0dHIuanMnO1xuaW1wb3J0IHsgc2V0QXR0cnMgfSBmcm9tICcuL2hlbHBlcnMvc2V0QXR0cnMuanMnO1xuaW1wb3J0IHsgcmVtb3ZlQXR0cnMgfSBmcm9tICcuL2hlbHBlcnMvcmVtb3ZlQXR0cnMuanMnO1xuaW1wb3J0IHsgYXJyYXlGcm9tTm9kZUxpc3QgfSBmcm9tICcuL2hlbHBlcnMvYXJyYXlGcm9tTm9kZUxpc3QuanMnO1xuaW1wb3J0IHsgaGlkZUVsZW1lbnQgfSBmcm9tICcuL2hlbHBlcnMvaGlkZUVsZW1lbnQuanMnO1xuaW1wb3J0IHsgc2hvd0VsZW1lbnQgfSBmcm9tICcuL2hlbHBlcnMvc2hvd0VsZW1lbnQuanMnO1xuaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSAnLi9oZWxwZXJzL2lzVmlzaWJsZS5qcyc7XG5pbXBvcnQgeyB3aGljaFByb3BlcnR5IH0gZnJvbSAnLi9oZWxwZXJzL3doaWNoUHJvcGVydHkuanMnO1xuaW1wb3J0IHsgaGFzM0RUcmFuc2Zvcm1zIH0gZnJvbSAnLi9oZWxwZXJzL2hhczNEVHJhbnNmb3Jtcy5qcyc7XG5pbXBvcnQgeyBnZXRFbmRQcm9wZXJ0eSB9IGZyb20gJy4vaGVscGVycy9nZXRFbmRQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgeyBhZGRFdmVudHMgfSBmcm9tICcuL2hlbHBlcnMvYWRkRXZlbnRzLmpzJztcbmltcG9ydCB7IHJlbW92ZUV2ZW50cyB9IGZyb20gJy4vaGVscGVycy9yZW1vdmVFdmVudHMuanMnO1xuaW1wb3J0IHsgRXZlbnRzIH0gZnJvbSAnLi9oZWxwZXJzL2V2ZW50cy5qcyc7XG5pbXBvcnQgeyBqc1RyYW5zZm9ybSB9IGZyb20gJy4vaGVscGVycy9qc1RyYW5zZm9ybS5qcyc7XG5cbmV4cG9ydCB2YXIgdG5zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICBjb250YWluZXI6ICcuc2xpZGVyJyxcbiAgICBtb2RlOiAnY2Fyb3VzZWwnLFxuICAgIGF4aXM6ICdob3Jpem9udGFsJyxcbiAgICBpdGVtczogMSxcbiAgICBndXR0ZXI6IDAsXG4gICAgZWRnZVBhZGRpbmc6IDAsXG4gICAgZml4ZWRXaWR0aDogZmFsc2UsXG4gICAgYXV0b1dpZHRoOiBmYWxzZSxcbiAgICB2aWV3cG9ydE1heDogZmFsc2UsXG4gICAgc2xpZGVCeTogMSxcbiAgICBjZW50ZXI6IGZhbHNlLFxuICAgIGNvbnRyb2xzOiB0cnVlLFxuICAgIGNvbnRyb2xzUG9zaXRpb246ICd0b3AnLFxuICAgIGNvbnRyb2xzVGV4dDogWydwcmV2JywgJ25leHQnXSxcbiAgICBjb250cm9sc0NvbnRhaW5lcjogZmFsc2UsXG4gICAgcHJldkJ1dHRvbjogZmFsc2UsXG4gICAgbmV4dEJ1dHRvbjogZmFsc2UsXG4gICAgbmF2OiB0cnVlLFxuICAgIG5hdlBvc2l0aW9uOiAndG9wJyxcbiAgICBuYXZDb250YWluZXI6IGZhbHNlLFxuICAgIG5hdkFzVGh1bWJuYWlsczogZmFsc2UsXG4gICAgYXJyb3dLZXlzOiBmYWxzZSxcbiAgICBzcGVlZDogMzAwLFxuICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICBhdXRvcGxheVBvc2l0aW9uOiAndG9wJyxcbiAgICBhdXRvcGxheVRpbWVvdXQ6IDUwMDAsXG4gICAgYXV0b3BsYXlEaXJlY3Rpb246ICdmb3J3YXJkJyxcbiAgICBhdXRvcGxheVRleHQ6IFsnc3RhcnQnLCAnc3RvcCddLFxuICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogZmFsc2UsXG4gICAgYXV0b3BsYXlCdXR0b246IGZhbHNlLFxuICAgIGF1dG9wbGF5QnV0dG9uT3V0cHV0OiB0cnVlLFxuICAgIGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHk6IHRydWUsXG4gICAgYW5pbWF0ZUluOiAndG5zLWZhZGVJbicsXG4gICAgYW5pbWF0ZU91dDogJ3Rucy1mYWRlT3V0JyxcbiAgICBhbmltYXRlTm9ybWFsOiAndG5zLW5vcm1hbCcsXG4gICAgYW5pbWF0ZURlbGF5OiBmYWxzZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIHJld2luZDogZmFsc2UsXG4gICAgYXV0b0hlaWdodDogZmFsc2UsXG4gICAgcmVzcG9uc2l2ZTogZmFsc2UsXG4gICAgbGF6eWxvYWQ6IGZhbHNlLFxuICAgIGxhenlsb2FkU2VsZWN0b3I6ICcudG5zLWxhenktaW1nJyxcbiAgICB0b3VjaDogdHJ1ZSxcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxuICAgIHN3aXBlQW5nbGU6IDE1LFxuICAgIG5lc3RlZDogZmFsc2UsXG4gICAgcHJldmVudEFjdGlvbldoZW5SdW5uaW5nOiBmYWxzZSxcbiAgICBwcmV2ZW50U2Nyb2xsT25Ub3VjaDogZmFsc2UsXG4gICAgZnJlZXphYmxlOiB0cnVlLFxuICAgIG9uSW5pdDogZmFsc2UsXG4gICAgdXNlTG9jYWxTdG9yYWdlOiB0cnVlLFxuICAgIG5vbmNlOiBmYWxzZVxuICB9LCBvcHRpb25zIHx8IHt9KTtcblxuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgICB3aW4gPSB3aW5kb3csXG4gICAgICBLRVlTID0ge1xuICAgICAgICBFTlRFUjogMTMsXG4gICAgICAgIFNQQUNFOiAzMixcbiAgICAgICAgTEVGVDogMzcsXG4gICAgICAgIFJJR0hUOiAzOVxuICAgICAgfSxcbiAgICAgIHRuc1N0b3JhZ2UgPSB7fSxcbiAgICAgIGxvY2FsU3RvcmFnZUFjY2VzcyA9IG9wdGlvbnMudXNlTG9jYWxTdG9yYWdlO1xuXG4gIGlmIChsb2NhbFN0b3JhZ2VBY2Nlc3MpIHtcbiAgICAvLyBjaGVjayBicm93c2VyIHZlcnNpb24gYW5kIGxvY2FsIHN0b3JhZ2UgYWNjZXNzXG4gICAgdmFyIGJyb3dzZXJJbmZvID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICB2YXIgdWlkID0gbmV3IERhdGU7XG5cbiAgICB0cnkge1xuICAgICAgdG5zU3RvcmFnZSA9IHdpbi5sb2NhbFN0b3JhZ2U7XG4gICAgICBpZiAodG5zU3RvcmFnZSkge1xuICAgICAgICB0bnNTdG9yYWdlLnNldEl0ZW0odWlkLCB1aWQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2VBY2Nlc3MgPSB0bnNTdG9yYWdlLmdldEl0ZW0odWlkKSA9PSB1aWQ7XG4gICAgICAgIHRuc1N0b3JhZ2UucmVtb3ZlSXRlbSh1aWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlQWNjZXNzID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIWxvY2FsU3RvcmFnZUFjY2VzcykgeyB0bnNTdG9yYWdlID0ge307IH1cbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZUFjY2VzcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChsb2NhbFN0b3JhZ2VBY2Nlc3MpIHtcbiAgICAgIC8vIHJlbW92ZSBzdG9yYWdlIHdoZW4gYnJvd3NlciB2ZXJzaW9uIGNoYW5nZXNcbiAgICAgIGlmICh0bnNTdG9yYWdlWyd0bnNBcHAnXSAmJiB0bnNTdG9yYWdlWyd0bnNBcHAnXSAhPT0gYnJvd3NlckluZm8pIHtcbiAgICAgICAgWyd0QycsICd0UEwnLCAndE1RJywgJ3RUZicsICd0M0QnLCAndFREdScsICd0VERlJywgJ3RBRHUnLCAndEFEZScsICd0VEUnLCAndEFFJ10uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IHRuc1N0b3JhZ2UucmVtb3ZlSXRlbShpdGVtKTsgfSk7XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGUgYnJvd3NlckluZm9cbiAgICAgIGxvY2FsU3RvcmFnZVsndG5zQXBwJ10gPSBicm93c2VySW5mbztcbiAgICB9XG4gIH1cblxuICB2YXIgQ0FMQyA9IHRuc1N0b3JhZ2VbJ3RDJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0QyddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndEMnLCBjYWxjKCksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBQRVJDRU5UQUdFTEFZT1VUID0gdG5zU3RvcmFnZVsndFBMJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0UEwnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RQTCcsIHBlcmNlbnRhZ2VMYXlvdXQoKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIENTU01RID0gdG5zU3RvcmFnZVsndE1RJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0TVEnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RNUScsIG1lZGlhcXVlcnlTdXBwb3J0KCksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBUUkFOU0ZPUk0gPSB0bnNTdG9yYWdlWyd0VGYnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RUZiddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndFRmJywgd2hpY2hQcm9wZXJ0eSgndHJhbnNmb3JtJyksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBIQVMzRFRSQU5TRk9STVMgPSB0bnNTdG9yYWdlWyd0M0QnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3QzRCddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndDNEJywgaGFzM0RUcmFuc2Zvcm1zKFRSQU5TRk9STSksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBUUkFOU0lUSU9ORFVSQVRJT04gPSB0bnNTdG9yYWdlWyd0VER1J10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0VER1J10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0VER1Jywgd2hpY2hQcm9wZXJ0eSgndHJhbnNpdGlvbkR1cmF0aW9uJyksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBUUkFOU0lUSU9OREVMQVkgPSB0bnNTdG9yYWdlWyd0VERlJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0VERlJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0VERlJywgd2hpY2hQcm9wZXJ0eSgndHJhbnNpdGlvbkRlbGF5JyksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBBTklNQVRJT05EVVJBVElPTiA9IHRuc1N0b3JhZ2VbJ3RBRHUnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RBRHUnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RBRHUnLCB3aGljaFByb3BlcnR5KCdhbmltYXRpb25EdXJhdGlvbicpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgQU5JTUFUSU9OREVMQVkgPSB0bnNTdG9yYWdlWyd0QURlJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0QURlJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0QURlJywgd2hpY2hQcm9wZXJ0eSgnYW5pbWF0aW9uRGVsYXknKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIFRSQU5TSVRJT05FTkQgPSB0bnNTdG9yYWdlWyd0VEUnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RURSddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndFRFJywgZ2V0RW5kUHJvcGVydHkoVFJBTlNJVElPTkRVUkFUSU9OLCAnVHJhbnNpdGlvbicpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgQU5JTUFUSU9ORU5EID0gdG5zU3RvcmFnZVsndEFFJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0QUUnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RBRScsIGdldEVuZFByb3BlcnR5KEFOSU1BVElPTkRVUkFUSU9OLCAnQW5pbWF0aW9uJyksIGxvY2FsU3RvcmFnZUFjY2Vzcyk7XG5cbiAgLy8gZ2V0IGVsZW1lbnQgbm9kZXMgZnJvbSBzZWxlY3RvcnNcbiAgdmFyIHN1cHBvcnRDb25zb2xlV2FybiA9IHdpbi5jb25zb2xlICYmIHR5cGVvZiB3aW4uY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIsXG4gICAgICB0bnNMaXN0ID0gWydjb250YWluZXInLCAnY29udHJvbHNDb250YWluZXInLCAncHJldkJ1dHRvbicsICduZXh0QnV0dG9uJywgJ25hdkNvbnRhaW5lcicsICdhdXRvcGxheUJ1dHRvbiddLFxuICAgICAgb3B0aW9uc0VsZW1lbnRzID0ge307XG5cbiAgdG5zTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNbaXRlbV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgc3RyID0gb3B0aW9uc1tpdGVtXSxcbiAgICAgICAgICBlbCA9IGRvYy5xdWVyeVNlbGVjdG9yKHN0cik7XG4gICAgICBvcHRpb25zRWxlbWVudHNbaXRlbV0gPSBzdHI7XG5cbiAgICAgIGlmIChlbCAmJiBlbC5ub2RlTmFtZSkge1xuICAgICAgICBvcHRpb25zW2l0ZW1dID0gZWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3VwcG9ydENvbnNvbGVXYXJuKSB7IGNvbnNvbGUud2FybignQ2FuXFwndCBmaW5kJywgb3B0aW9uc1tpdGVtXSk7IH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gbWFrZSBzdXJlIGF0IGxlYXN0IDEgc2xpZGVcbiAgaWYgKG9wdGlvbnMuY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCA8IDEpIHtcbiAgICBpZiAoc3VwcG9ydENvbnNvbGVXYXJuKSB7IGNvbnNvbGUud2FybignTm8gc2xpZGVzIGZvdW5kIGluJywgb3B0aW9ucy5jb250YWluZXIpOyB9XG4gICAgcmV0dXJuO1xuICAgfVxuXG4gIC8vIHVwZGF0ZSBvcHRpb25zXG4gIHZhciByZXNwb25zaXZlID0gb3B0aW9ucy5yZXNwb25zaXZlLFxuICAgICAgbmVzdGVkID0gb3B0aW9ucy5uZXN0ZWQsXG4gICAgICBjYXJvdXNlbCA9IG9wdGlvbnMubW9kZSA9PT0gJ2Nhcm91c2VsJyA/IHRydWUgOiBmYWxzZTtcblxuICBpZiAocmVzcG9uc2l2ZSkge1xuICAgIC8vIGFwcGx5IHJlc3BvbnNpdmVbMF0gdG8gb3B0aW9ucyBhbmQgcmVtb3ZlIGl0XG4gICAgaWYgKDAgaW4gcmVzcG9uc2l2ZSkge1xuICAgICAgb3B0aW9ucyA9IGV4dGVuZChvcHRpb25zLCByZXNwb25zaXZlWzBdKTtcbiAgICAgIGRlbGV0ZSByZXNwb25zaXZlWzBdO1xuICAgIH1cblxuICAgIHZhciByZXNwb25zaXZlVGVtID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIHJlc3BvbnNpdmUpIHtcbiAgICAgIHZhciB2YWwgPSByZXNwb25zaXZlW2tleV07XG4gICAgICAvLyB1cGRhdGUgcmVzcG9uc2l2ZVxuICAgICAgLy8gZnJvbTogMzAwOiAyXG4gICAgICAvLyB0bzpcbiAgICAgIC8vICAgMzAwOiB7XG4gICAgICAvLyAgICAgaXRlbXM6IDJcbiAgICAgIC8vICAgfVxuICAgICAgdmFsID0gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyB7aXRlbXM6IHZhbH0gOiB2YWw7XG4gICAgICByZXNwb25zaXZlVGVtW2tleV0gPSB2YWw7XG4gICAgfVxuICAgIHJlc3BvbnNpdmUgPSByZXNwb25zaXZlVGVtO1xuICAgIHJlc3BvbnNpdmVUZW0gPSBudWxsO1xuICB9XG5cbiAgLy8gdXBkYXRlIG9wdGlvbnNcbiAgZnVuY3Rpb24gdXBkYXRlT3B0aW9ucyAob2JqKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKCFjYXJvdXNlbCkge1xuICAgICAgICBpZiAoa2V5ID09PSAnc2xpZGVCeScpIHsgb2JqW2tleV0gPSAncGFnZSc7IH1cbiAgICAgICAgaWYgKGtleSA9PT0gJ2VkZ2VQYWRkaW5nJykgeyBvYmpba2V5XSA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChrZXkgPT09ICdhdXRvSGVpZ2h0JykgeyBvYmpba2V5XSA9IGZhbHNlOyB9XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSByZXNwb25zaXZlIG9wdGlvbnNcbiAgICAgIGlmIChrZXkgPT09ICdyZXNwb25zaXZlJykgeyB1cGRhdGVPcHRpb25zKG9ialtrZXldKTsgfVxuICAgIH1cbiAgfVxuICBpZiAoIWNhcm91c2VsKSB7IHVwZGF0ZU9wdGlvbnMob3B0aW9ucyk7IH1cblxuXG4gIC8vID09PSBkZWZpbmUgYW5kIHNldCB2YXJpYWJsZXMgPT09XG4gIGlmICghY2Fyb3VzZWwpIHtcbiAgICBvcHRpb25zLmF4aXMgPSAnaG9yaXpvbnRhbCc7XG4gICAgb3B0aW9ucy5zbGlkZUJ5ID0gJ3BhZ2UnO1xuICAgIG9wdGlvbnMuZWRnZVBhZGRpbmcgPSBmYWxzZTtcblxuICAgIHZhciBhbmltYXRlSW4gPSBvcHRpb25zLmFuaW1hdGVJbixcbiAgICAgICAgYW5pbWF0ZU91dCA9IG9wdGlvbnMuYW5pbWF0ZU91dCxcbiAgICAgICAgYW5pbWF0ZURlbGF5ID0gb3B0aW9ucy5hbmltYXRlRGVsYXksXG4gICAgICAgIGFuaW1hdGVOb3JtYWwgPSBvcHRpb25zLmFuaW1hdGVOb3JtYWw7XG4gIH1cblxuICB2YXIgaG9yaXpvbnRhbCA9IG9wdGlvbnMuYXhpcyA9PT0gJ2hvcml6b250YWwnID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgb3V0ZXJXcmFwcGVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgaW5uZXJXcmFwcGVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgbWlkZGxlV3JhcHBlcixcbiAgICAgIGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyLFxuICAgICAgY29udGFpbmVyUGFyZW50ID0gY29udGFpbmVyLnBhcmVudE5vZGUsXG4gICAgICBjb250YWluZXJIVE1MID0gY29udGFpbmVyLm91dGVySFRNTCxcbiAgICAgIHNsaWRlSXRlbXMgPSBjb250YWluZXIuY2hpbGRyZW4sXG4gICAgICBzbGlkZUNvdW50ID0gc2xpZGVJdGVtcy5sZW5ndGgsXG4gICAgICBicmVha3BvaW50Wm9uZSxcbiAgICAgIHdpbmRvd1dpZHRoID0gZ2V0V2luZG93V2lkdGgoKSxcbiAgICAgIGlzT24gPSBmYWxzZTtcbiAgaWYgKHJlc3BvbnNpdmUpIHsgc2V0QnJlYWtwb2ludFpvbmUoKTsgfVxuICBpZiAoY2Fyb3VzZWwpIHsgY29udGFpbmVyLmNsYXNzTmFtZSArPSAnIHRucy12cGZpeCc7IH1cblxuICAvLyBmaXhlZFdpZHRoOiB2aWV3cG9ydCA+IHJpZ2h0Qm91bmRhcnkgPiBpbmRleE1heFxuICB2YXIgYXV0b1dpZHRoID0gb3B0aW9ucy5hdXRvV2lkdGgsXG4gICAgICBmaXhlZFdpZHRoID0gZ2V0T3B0aW9uKCdmaXhlZFdpZHRoJyksXG4gICAgICBlZGdlUGFkZGluZyA9IGdldE9wdGlvbignZWRnZVBhZGRpbmcnKSxcbiAgICAgIGd1dHRlciA9IGdldE9wdGlvbignZ3V0dGVyJyksXG4gICAgICB2aWV3cG9ydCA9IGdldFZpZXdwb3J0V2lkdGgoKSxcbiAgICAgIGNlbnRlciA9IGdldE9wdGlvbignY2VudGVyJyksXG4gICAgICBpdGVtcyA9ICFhdXRvV2lkdGggPyBNYXRoLmZsb29yKGdldE9wdGlvbignaXRlbXMnKSkgOiAxLFxuICAgICAgc2xpZGVCeSA9IGdldE9wdGlvbignc2xpZGVCeScpLFxuICAgICAgdmlld3BvcnRNYXggPSBvcHRpb25zLnZpZXdwb3J0TWF4IHx8IG9wdGlvbnMuZml4ZWRXaWR0aFZpZXdwb3J0V2lkdGgsXG4gICAgICBhcnJvd0tleXMgPSBnZXRPcHRpb24oJ2Fycm93S2V5cycpLFxuICAgICAgc3BlZWQgPSBnZXRPcHRpb24oJ3NwZWVkJyksXG4gICAgICByZXdpbmQgPSBvcHRpb25zLnJld2luZCxcbiAgICAgIGxvb3AgPSByZXdpbmQgPyBmYWxzZSA6IG9wdGlvbnMubG9vcCxcbiAgICAgIGF1dG9IZWlnaHQgPSBnZXRPcHRpb24oJ2F1dG9IZWlnaHQnKSxcbiAgICAgIGNvbnRyb2xzID0gZ2V0T3B0aW9uKCdjb250cm9scycpLFxuICAgICAgY29udHJvbHNUZXh0ID0gZ2V0T3B0aW9uKCdjb250cm9sc1RleHQnKSxcbiAgICAgIG5hdiA9IGdldE9wdGlvbignbmF2JyksXG4gICAgICB0b3VjaCA9IGdldE9wdGlvbigndG91Y2gnKSxcbiAgICAgIG1vdXNlRHJhZyA9IGdldE9wdGlvbignbW91c2VEcmFnJyksXG4gICAgICBhdXRvcGxheSA9IGdldE9wdGlvbignYXV0b3BsYXknKSxcbiAgICAgIGF1dG9wbGF5VGltZW91dCA9IGdldE9wdGlvbignYXV0b3BsYXlUaW1lb3V0JyksXG4gICAgICBhdXRvcGxheVRleHQgPSBnZXRPcHRpb24oJ2F1dG9wbGF5VGV4dCcpLFxuICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlID0gZ2V0T3B0aW9uKCdhdXRvcGxheUhvdmVyUGF1c2UnKSxcbiAgICAgIGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkgPSBnZXRPcHRpb24oJ2F1dG9wbGF5UmVzZXRPblZpc2liaWxpdHknKSxcbiAgICAgIHNoZWV0ID0gY3JlYXRlU3R5bGVTaGVldChudWxsLCBnZXRPcHRpb24oJ25vbmNlJykpLFxuICAgICAgbGF6eWxvYWQgPSBvcHRpb25zLmxhenlsb2FkLFxuICAgICAgbGF6eWxvYWRTZWxlY3RvciA9IG9wdGlvbnMubGF6eWxvYWRTZWxlY3RvcixcbiAgICAgIHNsaWRlUG9zaXRpb25zLCAvLyBjb2xsZWN0aW9uIG9mIHNsaWRlIHBvc2l0aW9uc1xuICAgICAgc2xpZGVJdGVtc091dCA9IFtdLFxuICAgICAgY2xvbmVDb3VudCA9IGxvb3AgPyBnZXRDbG9uZUNvdW50Rm9yTG9vcCgpIDogMCxcbiAgICAgIHNsaWRlQ291bnROZXcgPSAhY2Fyb3VzZWwgPyBzbGlkZUNvdW50ICsgY2xvbmVDb3VudCA6IHNsaWRlQ291bnQgKyBjbG9uZUNvdW50ICogMixcbiAgICAgIGhhc1JpZ2h0RGVhZFpvbmUgPSAoZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGgpICYmICFsb29wID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgcmlnaHRCb3VuZGFyeSA9IGZpeGVkV2lkdGggPyBnZXRSaWdodEJvdW5kYXJ5KCkgOiBudWxsLFxuICAgICAgdXBkYXRlSW5kZXhCZWZvcmVUcmFuc2Zvcm0gPSAoIWNhcm91c2VsIHx8ICFsb29wKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgIC8vIHRyYW5zZm9ybVxuICAgICAgdHJhbnNmb3JtQXR0ciA9IGhvcml6b250YWwgPyAnbGVmdCcgOiAndG9wJyxcbiAgICAgIHRyYW5zZm9ybVByZWZpeCA9ICcnLFxuICAgICAgdHJhbnNmb3JtUG9zdGZpeCA9ICcnLFxuICAgICAgLy8gaW5kZXhcbiAgICAgIGdldEluZGV4TWF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGZpeGVkV2lkdGgpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBjZW50ZXIgJiYgIWxvb3AgPyBzbGlkZUNvdW50IC0gMSA6IE1hdGguY2VpbCgtIHJpZ2h0Qm91bmRhcnkgLyAoZml4ZWRXaWR0aCArIGd1dHRlcikpOyB9O1xuICAgICAgICB9IGVsc2UgaWYgKGF1dG9XaWR0aCkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVDb3VudE5ldzsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmIChzbGlkZVBvc2l0aW9uc1tpXSA+PSAtIHJpZ2h0Qm91bmRhcnkpIHsgcmV0dXJuIGk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjZW50ZXIgJiYgY2Fyb3VzZWwgJiYgIWxvb3ApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNsaWRlQ291bnQgLSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxvb3AgfHwgY2Fyb3VzZWwgPyBNYXRoLm1heCgwLCBzbGlkZUNvdW50TmV3IC0gTWF0aC5jZWlsKGl0ZW1zKSkgOiBzbGlkZUNvdW50TmV3IC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgICAgaW5kZXggPSBnZXRTdGFydEluZGV4KGdldE9wdGlvbignc3RhcnRJbmRleCcpKSxcbiAgICAgIGluZGV4Q2FjaGVkID0gaW5kZXgsXG4gICAgICBkaXNwbGF5SW5kZXggPSBnZXRDdXJyZW50U2xpZGUoKSxcbiAgICAgIGluZGV4TWluID0gMCxcbiAgICAgIGluZGV4TWF4ID0gIWF1dG9XaWR0aCA/IGdldEluZGV4TWF4KCkgOiBudWxsLFxuICAgICAgLy8gcmVzaXplXG4gICAgICByZXNpemVUaW1lcixcbiAgICAgIHByZXZlbnRBY3Rpb25XaGVuUnVubmluZyA9IG9wdGlvbnMucHJldmVudEFjdGlvbldoZW5SdW5uaW5nLFxuICAgICAgc3dpcGVBbmdsZSA9IG9wdGlvbnMuc3dpcGVBbmdsZSxcbiAgICAgIG1vdmVEaXJlY3Rpb25FeHBlY3RlZCA9IHN3aXBlQW5nbGUgPyAnPycgOiB0cnVlLFxuICAgICAgcnVubmluZyA9IGZhbHNlLFxuICAgICAgb25Jbml0ID0gb3B0aW9ucy5vbkluaXQsXG4gICAgICBldmVudHMgPSBuZXcgRXZlbnRzKCksXG4gICAgICAvLyBpZCwgY2xhc3NcbiAgICAgIG5ld0NvbnRhaW5lckNsYXNzZXMgPSAnIHRucy1zbGlkZXIgdG5zLScgKyBvcHRpb25zLm1vZGUsXG4gICAgICBzbGlkZUlkID0gY29udGFpbmVyLmlkIHx8IGdldFNsaWRlSWQoKSxcbiAgICAgIGRpc2FibGUgPSBnZXRPcHRpb24oJ2Rpc2FibGUnKSxcbiAgICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgICBmcmVlemFibGUgPSBvcHRpb25zLmZyZWV6YWJsZSxcbiAgICAgIGZyZWV6ZSA9IGZyZWV6YWJsZSAmJiAhYXV0b1dpZHRoID8gZ2V0RnJlZXplKCkgOiBmYWxzZSxcbiAgICAgIGZyb3plbiA9IGZhbHNlLFxuICAgICAgY29udHJvbHNFdmVudHMgPSB7XG4gICAgICAgICdjbGljayc6IG9uQ29udHJvbHNDbGljayxcbiAgICAgICAgJ2tleWRvd24nOiBvbkNvbnRyb2xzS2V5ZG93blxuICAgICAgfSxcbiAgICAgIG5hdkV2ZW50cyA9IHtcbiAgICAgICAgJ2NsaWNrJzogb25OYXZDbGljayxcbiAgICAgICAgJ2tleWRvd24nOiBvbk5hdktleWRvd25cbiAgICAgIH0sXG4gICAgICBob3ZlckV2ZW50cyA9IHtcbiAgICAgICAgJ21vdXNlb3Zlcic6IG1vdXNlb3ZlclBhdXNlLFxuICAgICAgICAnbW91c2VvdXQnOiBtb3VzZW91dFJlc3RhcnRcbiAgICAgIH0sXG4gICAgICB2aXNpYmlsaXR5RXZlbnQgPSB7J3Zpc2liaWxpdHljaGFuZ2UnOiBvblZpc2liaWxpdHlDaGFuZ2V9LFxuICAgICAgZG9jbWVudEtleWRvd25FdmVudCA9IHsna2V5ZG93bic6IG9uRG9jdW1lbnRLZXlkb3dufSxcbiAgICAgIHRvdWNoRXZlbnRzID0ge1xuICAgICAgICAndG91Y2hzdGFydCc6IG9uUGFuU3RhcnQsXG4gICAgICAgICd0b3VjaG1vdmUnOiBvblBhbk1vdmUsXG4gICAgICAgICd0b3VjaGVuZCc6IG9uUGFuRW5kLFxuICAgICAgICAndG91Y2hjYW5jZWwnOiBvblBhbkVuZFxuICAgICAgfSwgZHJhZ0V2ZW50cyA9IHtcbiAgICAgICAgJ21vdXNlZG93bic6IG9uUGFuU3RhcnQsXG4gICAgICAgICdtb3VzZW1vdmUnOiBvblBhbk1vdmUsXG4gICAgICAgICdtb3VzZXVwJzogb25QYW5FbmQsXG4gICAgICAgICdtb3VzZWxlYXZlJzogb25QYW5FbmRcbiAgICAgIH0sXG4gICAgICBoYXNDb250cm9scyA9IGhhc09wdGlvbignY29udHJvbHMnKSxcbiAgICAgIGhhc05hdiA9IGhhc09wdGlvbignbmF2JyksXG4gICAgICBuYXZBc1RodW1ibmFpbHMgPSBhdXRvV2lkdGggPyB0cnVlIDogb3B0aW9ucy5uYXZBc1RodW1ibmFpbHMsXG4gICAgICBoYXNBdXRvcGxheSA9IGhhc09wdGlvbignYXV0b3BsYXknKSxcbiAgICAgIGhhc1RvdWNoID0gaGFzT3B0aW9uKCd0b3VjaCcpLFxuICAgICAgaGFzTW91c2VEcmFnID0gaGFzT3B0aW9uKCdtb3VzZURyYWcnKSxcbiAgICAgIHNsaWRlQWN0aXZlQ2xhc3MgPSAndG5zLXNsaWRlLWFjdGl2ZScsXG4gICAgICBzbGlkZUNsb25lZENsYXNzID0gJ3Rucy1zbGlkZS1jbG9uZWQnLFxuICAgICAgaW1nQ29tcGxldGVDbGFzcyA9ICd0bnMtY29tcGxldGUnLFxuICAgICAgaW1nRXZlbnRzID0ge1xuICAgICAgICAnbG9hZCc6IG9uSW1nTG9hZGVkLFxuICAgICAgICAnZXJyb3InOiBvbkltZ0ZhaWxlZFxuICAgICAgfSxcbiAgICAgIGltZ3NDb21wbGV0ZSxcbiAgICAgIGxpdmVyZWdpb25DdXJyZW50LFxuICAgICAgcHJldmVudFNjcm9sbCA9IG9wdGlvbnMucHJldmVudFNjcm9sbE9uVG91Y2ggPT09ICdmb3JjZScgPyB0cnVlIDogZmFsc2U7XG5cbiAgLy8gY29udHJvbHNcbiAgaWYgKGhhc0NvbnRyb2xzKSB7XG4gICAgdmFyIGNvbnRyb2xzQ29udGFpbmVyID0gb3B0aW9ucy5jb250cm9sc0NvbnRhaW5lcixcbiAgICAgICAgY29udHJvbHNDb250YWluZXJIVE1MID0gb3B0aW9ucy5jb250cm9sc0NvbnRhaW5lciA/IG9wdGlvbnMuY29udHJvbHNDb250YWluZXIub3V0ZXJIVE1MIDogJycsXG4gICAgICAgIHByZXZCdXR0b24gPSBvcHRpb25zLnByZXZCdXR0b24sXG4gICAgICAgIG5leHRCdXR0b24gPSBvcHRpb25zLm5leHRCdXR0b24sXG4gICAgICAgIHByZXZCdXR0b25IVE1MID0gb3B0aW9ucy5wcmV2QnV0dG9uID8gb3B0aW9ucy5wcmV2QnV0dG9uLm91dGVySFRNTCA6ICcnLFxuICAgICAgICBuZXh0QnV0dG9uSFRNTCA9IG9wdGlvbnMubmV4dEJ1dHRvbiA/IG9wdGlvbnMubmV4dEJ1dHRvbi5vdXRlckhUTUwgOiAnJyxcbiAgICAgICAgcHJldklzQnV0dG9uLFxuICAgICAgICBuZXh0SXNCdXR0b247XG4gIH1cblxuICAvLyBuYXZcbiAgaWYgKGhhc05hdikge1xuICAgIHZhciBuYXZDb250YWluZXIgPSBvcHRpb25zLm5hdkNvbnRhaW5lcixcbiAgICAgICAgbmF2Q29udGFpbmVySFRNTCA9IG9wdGlvbnMubmF2Q29udGFpbmVyID8gb3B0aW9ucy5uYXZDb250YWluZXIub3V0ZXJIVE1MIDogJycsXG4gICAgICAgIG5hdkl0ZW1zLFxuICAgICAgICBwYWdlcyA9IGF1dG9XaWR0aCA/IHNsaWRlQ291bnQgOiBnZXRQYWdlcygpLFxuICAgICAgICBwYWdlc0NhY2hlZCA9IDAsXG4gICAgICAgIG5hdkNsaWNrZWQgPSAtMSxcbiAgICAgICAgbmF2Q3VycmVudEluZGV4ID0gZ2V0Q3VycmVudE5hdkluZGV4KCksXG4gICAgICAgIG5hdkN1cnJlbnRJbmRleENhY2hlZCA9IG5hdkN1cnJlbnRJbmRleCxcbiAgICAgICAgbmF2QWN0aXZlQ2xhc3MgPSAndG5zLW5hdi1hY3RpdmUnLFxuICAgICAgICBuYXZTdHIgPSAnQ2Fyb3VzZWwgUGFnZSAnLFxuICAgICAgICBuYXZTdHJDdXJyZW50ID0gJyAoQ3VycmVudCBTbGlkZSknO1xuICB9XG5cbiAgLy8gYXV0b3BsYXlcbiAgaWYgKGhhc0F1dG9wbGF5KSB7XG4gICAgdmFyIGF1dG9wbGF5RGlyZWN0aW9uID0gb3B0aW9ucy5hdXRvcGxheURpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gMSA6IC0xLFxuICAgICAgICBhdXRvcGxheUJ1dHRvbiA9IG9wdGlvbnMuYXV0b3BsYXlCdXR0b24sXG4gICAgICAgIGF1dG9wbGF5QnV0dG9uSFRNTCA9IG9wdGlvbnMuYXV0b3BsYXlCdXR0b24gPyBvcHRpb25zLmF1dG9wbGF5QnV0dG9uLm91dGVySFRNTCA6ICcnLFxuICAgICAgICBhdXRvcGxheUh0bWxTdHJpbmdzID0gWyc8c3BhbiBjbGFzcz1cXCd0bnMtdmlzdWFsbHktaGlkZGVuXFwnPicsICcgYW5pbWF0aW9uPC9zcGFuPiddLFxuICAgICAgICBhdXRvcGxheVRpbWVyLFxuICAgICAgICBhbmltYXRpbmcsXG4gICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZWQsXG4gICAgICAgIGF1dG9wbGF5VXNlclBhdXNlZCxcbiAgICAgICAgYXV0b3BsYXlWaXNpYmlsaXR5UGF1c2VkO1xuICB9XG5cbiAgaWYgKGhhc1RvdWNoIHx8IGhhc01vdXNlRHJhZykge1xuICAgIHZhciBpbml0UG9zaXRpb24gPSB7fSxcbiAgICAgICAgbGFzdFBvc2l0aW9uID0ge30sXG4gICAgICAgIHRyYW5zbGF0ZUluaXQsXG4gICAgICAgIGRpc1gsXG4gICAgICAgIGRpc1ksXG4gICAgICAgIHBhblN0YXJ0ID0gZmFsc2UsXG4gICAgICAgIHJhZkluZGV4LFxuICAgICAgICBnZXREaXN0ID0gaG9yaXpvbnRhbCA/XG4gICAgICAgICAgZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS54IC0gYi54OyB9IDpcbiAgICAgICAgICBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLnkgLSBiLnk7IH07XG4gIH1cblxuICAvLyBkaXNhYmxlIHNsaWRlciB3aGVuIHNsaWRlY291bnQgPD0gaXRlbXNcbiAgaWYgKCFhdXRvV2lkdGgpIHsgcmVzZXRWYXJpYmxlc1doZW5EaXNhYmxlKGRpc2FibGUgfHwgZnJlZXplKTsgfVxuXG4gIGlmIChUUkFOU0ZPUk0pIHtcbiAgICB0cmFuc2Zvcm1BdHRyID0gVFJBTlNGT1JNO1xuICAgIHRyYW5zZm9ybVByZWZpeCA9ICd0cmFuc2xhdGUnO1xuXG4gICAgaWYgKEhBUzNEVFJBTlNGT1JNUykge1xuICAgICAgdHJhbnNmb3JtUHJlZml4ICs9IGhvcml6b250YWwgPyAnM2QoJyA6ICczZCgwcHgsICc7XG4gICAgICB0cmFuc2Zvcm1Qb3N0Zml4ID0gaG9yaXpvbnRhbCA/ICcsIDBweCwgMHB4KScgOiAnLCAwcHgpJztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNmb3JtUHJlZml4ICs9IGhvcml6b250YWwgPyAnWCgnIDogJ1koJztcbiAgICAgIHRyYW5zZm9ybVBvc3RmaXggPSAnKSc7XG4gICAgfVxuXG4gIH1cblxuICBpZiAoY2Fyb3VzZWwpIHsgY29udGFpbmVyLmNsYXNzTmFtZSA9IGNvbnRhaW5lci5jbGFzc05hbWUucmVwbGFjZSgndG5zLXZwZml4JywgJycpOyB9XG4gIGluaXRTdHJ1Y3R1cmUoKTtcbiAgaW5pdFNoZWV0KCk7XG4gIGluaXRTbGlkZXJUcmFuc2Zvcm0oKTtcblxuICAvLyA9PT0gQ09NTU9OIEZVTkNUSU9OUyA9PT0gLy9cbiAgZnVuY3Rpb24gcmVzZXRWYXJpYmxlc1doZW5EaXNhYmxlIChjb25kaXRpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICBjb250cm9scyA9IG5hdiA9IHRvdWNoID0gbW91c2VEcmFnID0gYXJyb3dLZXlzID0gYXV0b3BsYXkgPSBhdXRvcGxheUhvdmVyUGF1c2UgPSBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFNsaWRlICgpIHtcbiAgICB2YXIgdGVtID0gY2Fyb3VzZWwgPyBpbmRleCAtIGNsb25lQ291bnQgOiBpbmRleDtcbiAgICB3aGlsZSAodGVtIDwgMCkgeyB0ZW0gKz0gc2xpZGVDb3VudDsgfVxuICAgIHJldHVybiB0ZW0lc2xpZGVDb3VudCArIDE7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTdGFydEluZGV4IChpbmQpIHtcbiAgICBpbmQgPSBpbmQgPyBNYXRoLm1heCgwLCBNYXRoLm1pbihsb29wID8gc2xpZGVDb3VudCAtIDEgOiBzbGlkZUNvdW50IC0gaXRlbXMsIGluZCkpIDogMDtcbiAgICByZXR1cm4gY2Fyb3VzZWwgPyBpbmQgKyBjbG9uZUNvdW50IDogaW5kO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QWJzSW5kZXggKGkpIHtcbiAgICBpZiAoaSA9PSBudWxsKSB7IGkgPSBpbmRleDsgfVxuXG4gICAgaWYgKGNhcm91c2VsKSB7IGkgLT0gY2xvbmVDb3VudDsgfVxuICAgIHdoaWxlIChpIDwgMCkgeyBpICs9IHNsaWRlQ291bnQ7IH1cblxuICAgIHJldHVybiBNYXRoLmZsb29yKGklc2xpZGVDb3VudCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TmF2SW5kZXggKCkge1xuICAgIHZhciBhYnNJbmRleCA9IGdldEFic0luZGV4KCksXG4gICAgICAgIHJlc3VsdDtcblxuICAgIHJlc3VsdCA9IG5hdkFzVGh1bWJuYWlscyA/IGFic0luZGV4IDpcbiAgICAgIGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoID8gTWF0aC5jZWlsKChhYnNJbmRleCArIDEpICogcGFnZXMgLyBzbGlkZUNvdW50IC0gMSkgOlxuICAgICAgICAgIE1hdGguZmxvb3IoYWJzSW5kZXggLyBpdGVtcyk7XG5cbiAgICAvLyBzZXQgYWN0aXZlIG5hdiB0byB0aGUgbGFzdCBvbmUgd2hlbiByZWFjaGVzIHRoZSByaWdodCBlZGdlXG4gICAgaWYgKCFsb29wICYmIGNhcm91c2VsICYmIGluZGV4ID09PSBpbmRleE1heCkgeyByZXN1bHQgPSBwYWdlcyAtIDE7IH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVtc01heCAoKSB7XG4gICAgLy8gZml4ZWRXaWR0aCBvciBhdXRvV2lkdGggd2hpbGUgdmlld3BvcnRNYXggaXMgbm90IGF2YWlsYWJsZVxuICAgIGlmIChhdXRvV2lkdGggfHwgKGZpeGVkV2lkdGggJiYgIXZpZXdwb3J0TWF4KSkge1xuICAgICAgcmV0dXJuIHNsaWRlQ291bnQgLSAxO1xuICAgIC8vIG1vc3QgY2FzZXNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0ciA9IGZpeGVkV2lkdGggPyAnZml4ZWRXaWR0aCcgOiAnaXRlbXMnLFxuICAgICAgICAgIGFyciA9IFtdO1xuXG4gICAgICBpZiAoZml4ZWRXaWR0aCB8fCBvcHRpb25zW3N0cl0gPCBzbGlkZUNvdW50KSB7IGFyci5wdXNoKG9wdGlvbnNbc3RyXSk7IH1cblxuICAgICAgaWYgKHJlc3BvbnNpdmUpIHtcbiAgICAgICAgZm9yICh2YXIgYnAgaW4gcmVzcG9uc2l2ZSkge1xuICAgICAgICAgIHZhciB0ZW0gPSByZXNwb25zaXZlW2JwXVtzdHJdO1xuICAgICAgICAgIGlmICh0ZW0gJiYgKGZpeGVkV2lkdGggfHwgdGVtIDwgc2xpZGVDb3VudCkpIHsgYXJyLnB1c2godGVtKTsgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYXJyLmxlbmd0aCkgeyBhcnIucHVzaCgwKTsgfVxuXG4gICAgICByZXR1cm4gTWF0aC5jZWlsKGZpeGVkV2lkdGggPyB2aWV3cG9ydE1heCAvIE1hdGgubWluLmFwcGx5KG51bGwsIGFycikgOiBNYXRoLm1heC5hcHBseShudWxsLCBhcnIpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDbG9uZUNvdW50Rm9yTG9vcCAoKSB7XG4gICAgdmFyIGl0ZW1zTWF4ID0gZ2V0SXRlbXNNYXgoKSxcbiAgICAgICAgcmVzdWx0ID0gY2Fyb3VzZWwgPyBNYXRoLmNlaWwoKGl0ZW1zTWF4ICogNSAtIHNsaWRlQ291bnQpLzIpIDogKGl0ZW1zTWF4ICogNCAtIHNsaWRlQ291bnQpO1xuICAgIHJlc3VsdCA9IE1hdGgubWF4KGl0ZW1zTWF4LCByZXN1bHQpO1xuXG4gICAgcmV0dXJuIGhhc09wdGlvbignZWRnZVBhZGRpbmcnKSA/IHJlc3VsdCArIDEgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXaW5kb3dXaWR0aCAoKSB7XG4gICAgcmV0dXJuIHdpbi5pbm5lcldpZHRoIHx8IGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jLmJvZHkuY2xpZW50V2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbnNlcnRQb3NpdGlvbiAocG9zKSB7XG4gICAgcmV0dXJuIHBvcyA9PT0gJ3RvcCcgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENsaWVudFdpZHRoIChlbCkge1xuICAgIGlmIChlbCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIHZhciBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksIHJlY3QsIHdpZHRoO1xuICAgIGVsLmFwcGVuZENoaWxkKGRpdik7XG4gICAgcmVjdCA9IGRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB3aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnQ7XG4gICAgZGl2LnJlbW92ZSgpO1xuICAgIHJldHVybiB3aWR0aCB8fCBnZXRDbGllbnRXaWR0aChlbC5wYXJlbnROb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFZpZXdwb3J0V2lkdGggKCkge1xuICAgIHZhciBnYXAgPSBlZGdlUGFkZGluZyA/IGVkZ2VQYWRkaW5nICogMiAtIGd1dHRlciA6IDA7XG4gICAgcmV0dXJuIGdldENsaWVudFdpZHRoKGNvbnRhaW5lclBhcmVudCkgLSBnYXA7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNPcHRpb24gKGl0ZW0pIHtcbiAgICBpZiAob3B0aW9uc1tpdGVtXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXNwb25zaXZlKSB7XG4gICAgICAgIGZvciAodmFyIGJwIGluIHJlc3BvbnNpdmUpIHtcbiAgICAgICAgICBpZiAocmVzcG9uc2l2ZVticF1baXRlbV0pIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdldCBvcHRpb246XG4gIC8vIGZpeGVkIHdpZHRoOiB2aWV3cG9ydCwgZml4ZWRXaWR0aCwgZ3V0dGVyID0+IGl0ZW1zXG4gIC8vIG90aGVyczogd2luZG93IHdpZHRoID0+IGFsbCB2YXJpYWJsZXNcbiAgLy8gYWxsOiBpdGVtcyA9PiBzbGlkZUJ5XG4gIGZ1bmN0aW9uIGdldE9wdGlvbiAoaXRlbSwgd3cpIHtcbiAgICBpZiAod3cgPT0gbnVsbCkgeyB3dyA9IHdpbmRvd1dpZHRoOyB9XG5cbiAgICBpZiAoaXRlbSA9PT0gJ2l0ZW1zJyAmJiBmaXhlZFdpZHRoKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigodmlld3BvcnQgKyBndXR0ZXIpIC8gKGZpeGVkV2lkdGggKyBndXR0ZXIpKSB8fCAxO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQgPSBvcHRpb25zW2l0ZW1dO1xuXG4gICAgICBpZiAocmVzcG9uc2l2ZSkge1xuICAgICAgICBmb3IgKHZhciBicCBpbiByZXNwb25zaXZlKSB7XG4gICAgICAgICAgLy8gYnA6IGNvbnZlcnQgc3RyaW5nIHRvIG51bWJlclxuICAgICAgICAgIGlmICh3dyA+PSBwYXJzZUludChicCkpIHtcbiAgICAgICAgICAgIGlmIChpdGVtIGluIHJlc3BvbnNpdmVbYnBdKSB7IHJlc3VsdCA9IHJlc3BvbnNpdmVbYnBdW2l0ZW1dOyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtID09PSAnc2xpZGVCeScgJiYgcmVzdWx0ID09PSAncGFnZScpIHsgcmVzdWx0ID0gZ2V0T3B0aW9uKCdpdGVtcycpOyB9XG4gICAgICBpZiAoIWNhcm91c2VsICYmIChpdGVtID09PSAnc2xpZGVCeScgfHwgaXRlbSA9PT0gJ2l0ZW1zJykpIHsgcmVzdWx0ID0gTWF0aC5mbG9vcihyZXN1bHQpOyB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2xpZGVNYXJnaW5MZWZ0IChpKSB7XG4gICAgcmV0dXJuIENBTEMgP1xuICAgICAgQ0FMQyArICcoJyArIGkgKiAxMDAgKyAnJSAvICcgKyBzbGlkZUNvdW50TmV3ICsgJyknIDpcbiAgICAgIGkgKiAxMDAgLyBzbGlkZUNvdW50TmV3ICsgJyUnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5uZXJXcmFwcGVyU3R5bGVzIChlZGdlUGFkZGluZ1RlbSwgZ3V0dGVyVGVtLCBmaXhlZFdpZHRoVGVtLCBzcGVlZFRlbSwgYXV0b0hlaWdodEJQKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgaWYgKGVkZ2VQYWRkaW5nVGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBnYXAgPSBlZGdlUGFkZGluZ1RlbTtcbiAgICAgIGlmIChndXR0ZXJUZW0pIHsgZ2FwIC09IGd1dHRlclRlbTsgfVxuICAgICAgc3RyID0gaG9yaXpvbnRhbCA/XG4gICAgICAgICdtYXJnaW46IDAgJyArIGdhcCArICdweCAwICcgKyBlZGdlUGFkZGluZ1RlbSArICdweDsnIDpcbiAgICAgICAgJ21hcmdpbjogJyArIGVkZ2VQYWRkaW5nVGVtICsgJ3B4IDAgJyArIGdhcCArICdweCAwOyc7XG4gICAgfSBlbHNlIGlmIChndXR0ZXJUZW0gJiYgIWZpeGVkV2lkdGhUZW0pIHtcbiAgICAgIHZhciBndXR0ZXJUZW1Vbml0ID0gJy0nICsgZ3V0dGVyVGVtICsgJ3B4JyxcbiAgICAgICAgICBkaXIgPSBob3Jpem9udGFsID8gZ3V0dGVyVGVtVW5pdCArICcgMCAwJyA6ICcwICcgKyBndXR0ZXJUZW1Vbml0ICsgJyAwJztcbiAgICAgIHN0ciA9ICdtYXJnaW46IDAgJyArIGRpciArICc7J1xuICAgIH1cblxuICAgIGlmICghY2Fyb3VzZWwgJiYgYXV0b0hlaWdodEJQICYmIFRSQU5TSVRJT05EVVJBVElPTiAmJiBzcGVlZFRlbSkgeyBzdHIgKz0gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWRUZW0pOyB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRhaW5lcldpZHRoIChmaXhlZFdpZHRoVGVtLCBndXR0ZXJUZW0sIGl0ZW1zVGVtKSB7XG4gICAgaWYgKGZpeGVkV2lkdGhUZW0pIHtcbiAgICAgIHJldHVybiAoZml4ZWRXaWR0aFRlbSArIGd1dHRlclRlbSkgKiBzbGlkZUNvdW50TmV3ICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENBTEMgP1xuICAgICAgICBDQUxDICsgJygnICsgc2xpZGVDb3VudE5ldyAqIDEwMCArICclIC8gJyArIGl0ZW1zVGVtICsgJyknIDpcbiAgICAgICAgc2xpZGVDb3VudE5ldyAqIDEwMCAvIGl0ZW1zVGVtICsgJyUnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNsaWRlV2lkdGhTdHlsZSAoZml4ZWRXaWR0aFRlbSwgZ3V0dGVyVGVtLCBpdGVtc1RlbSkge1xuICAgIHZhciB3aWR0aDtcblxuICAgIGlmIChmaXhlZFdpZHRoVGVtKSB7XG4gICAgICB3aWR0aCA9IChmaXhlZFdpZHRoVGVtICsgZ3V0dGVyVGVtKSArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2Fyb3VzZWwpIHsgaXRlbXNUZW0gPSBNYXRoLmZsb29yKGl0ZW1zVGVtKTsgfVxuICAgICAgdmFyIGRpdmlkZW5kID0gY2Fyb3VzZWwgPyBzbGlkZUNvdW50TmV3IDogaXRlbXNUZW07XG4gICAgICB3aWR0aCA9IENBTEMgP1xuICAgICAgICBDQUxDICsgJygxMDAlIC8gJyArIGRpdmlkZW5kICsgJyknIDpcbiAgICAgICAgMTAwIC8gZGl2aWRlbmQgKyAnJSc7XG4gICAgfVxuXG4gICAgd2lkdGggPSAnd2lkdGg6JyArIHdpZHRoO1xuXG4gICAgLy8gaW5uZXIgc2xpZGVyOiBvdmVyd3JpdGUgb3V0ZXIgc2xpZGVyIHN0eWxlc1xuICAgIHJldHVybiBuZXN0ZWQgIT09ICdpbm5lcicgPyB3aWR0aCArICc7JyA6IHdpZHRoICsgJyAhaW1wb3J0YW50Oyc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTbGlkZUd1dHRlclN0eWxlIChndXR0ZXJUZW0pIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICAvLyBndXR0ZXIgbWF5YmUgaW50ZXJnZXIgfHwgMFxuICAgIC8vIHNvIGNhbid0IHVzZSAnaWYgKGd1dHRlciknXG4gICAgaWYgKGd1dHRlclRlbSAhPT0gZmFsc2UpIHtcbiAgICAgIHZhciBwcm9wID0gaG9yaXpvbnRhbCA/ICdwYWRkaW5nLScgOiAnbWFyZ2luLScsXG4gICAgICAgICAgZGlyID0gaG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgICAgIHN0ciA9IHByb3AgKyAgZGlyICsgJzogJyArIGd1dHRlclRlbSArICdweDsnO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDU1NQcmVmaXggKG5hbWUsIG51bSkge1xuICAgIHZhciBwcmVmaXggPSBuYW1lLnN1YnN0cmluZygwLCBuYW1lLmxlbmd0aCAtIG51bSkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAocHJlZml4KSB7IHByZWZpeCA9ICctJyArIHByZWZpeCArICctJzsgfVxuXG4gICAgcmV0dXJuIHByZWZpeDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlIChzcGVlZCkge1xuICAgIHJldHVybiBnZXRDU1NQcmVmaXgoVFJBTlNJVElPTkRVUkFUSU9OLCAxOCkgKyAndHJhbnNpdGlvbi1kdXJhdGlvbjonICsgc3BlZWQgLyAxMDAwICsgJ3M7JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFuaW1hdGlvbkR1cmF0aW9uU3R5bGUgKHNwZWVkKSB7XG4gICAgcmV0dXJuIGdldENTU1ByZWZpeChBTklNQVRJT05EVVJBVElPTiwgMTcpICsgJ2FuaW1hdGlvbi1kdXJhdGlvbjonICsgc3BlZWQgLyAxMDAwICsgJ3M7JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTdHJ1Y3R1cmUgKCkge1xuICAgIHZhciBjbGFzc091dGVyID0gJ3Rucy1vdXRlcicsXG4gICAgICAgIGNsYXNzSW5uZXIgPSAndG5zLWlubmVyJyxcbiAgICAgICAgaGFzR3V0dGVyID0gaGFzT3B0aW9uKCdndXR0ZXInKTtcblxuICAgIG91dGVyV3JhcHBlci5jbGFzc05hbWUgPSBjbGFzc091dGVyO1xuICAgIGlubmVyV3JhcHBlci5jbGFzc05hbWUgPSBjbGFzc0lubmVyO1xuICAgIG91dGVyV3JhcHBlci5pZCA9IHNsaWRlSWQgKyAnLW93JztcbiAgICBpbm5lcldyYXBwZXIuaWQgPSBzbGlkZUlkICsgJy1pdyc7XG5cbiAgICAvLyBzZXQgY29udGFpbmVyIHByb3BlcnRpZXNcbiAgICBpZiAoY29udGFpbmVyLmlkID09PSAnJykgeyBjb250YWluZXIuaWQgPSBzbGlkZUlkOyB9XG4gICAgbmV3Q29udGFpbmVyQ2xhc3NlcyArPSBQRVJDRU5UQUdFTEFZT1VUIHx8IGF1dG9XaWR0aCA/ICcgdG5zLXN1YnBpeGVsJyA6ICcgdG5zLW5vLXN1YnBpeGVsJztcbiAgICBuZXdDb250YWluZXJDbGFzc2VzICs9IENBTEMgPyAnIHRucy1jYWxjJyA6ICcgdG5zLW5vLWNhbGMnO1xuICAgIGlmIChhdXRvV2lkdGgpIHsgbmV3Q29udGFpbmVyQ2xhc3NlcyArPSAnIHRucy1hdXRvd2lkdGgnOyB9XG4gICAgbmV3Q29udGFpbmVyQ2xhc3NlcyArPSAnIHRucy0nICsgb3B0aW9ucy5heGlzO1xuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgKz0gbmV3Q29udGFpbmVyQ2xhc3NlcztcblxuICAgIC8vIGFkZCBjb25zdHJhaW4gbGF5ZXIgZm9yIGNhcm91c2VsXG4gICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICBtaWRkbGVXcmFwcGVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbWlkZGxlV3JhcHBlci5pZCA9IHNsaWRlSWQgKyAnLW13JztcbiAgICAgIG1pZGRsZVdyYXBwZXIuY2xhc3NOYW1lID0gJ3Rucy1vdmgnO1xuXG4gICAgICBvdXRlcldyYXBwZXIuYXBwZW5kQ2hpbGQobWlkZGxlV3JhcHBlcik7XG4gICAgICBtaWRkbGVXcmFwcGVyLmFwcGVuZENoaWxkKGlubmVyV3JhcHBlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dGVyV3JhcHBlci5hcHBlbmRDaGlsZChpbm5lcldyYXBwZXIpO1xuICAgIH1cblxuICAgIGlmIChhdXRvSGVpZ2h0KSB7XG4gICAgICB2YXIgd3AgPSBtaWRkbGVXcmFwcGVyID8gbWlkZGxlV3JhcHBlciA6IGlubmVyV3JhcHBlcjtcbiAgICAgIHdwLmNsYXNzTmFtZSArPSAnIHRucy1haCc7XG4gICAgfVxuXG4gICAgY29udGFpbmVyUGFyZW50Lmluc2VydEJlZm9yZShvdXRlcldyYXBwZXIsIGNvbnRhaW5lcik7XG4gICAgaW5uZXJXcmFwcGVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICAvLyBhZGQgaWQsIGNsYXNzLCBhcmlhIGF0dHJpYnV0ZXNcbiAgICAvLyBiZWZvcmUgY2xvbmUgc2xpZGVzXG4gICAgZm9yRWFjaChzbGlkZUl0ZW1zLCBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICBhZGRDbGFzcyhpdGVtLCAndG5zLWl0ZW0nKTtcbiAgICAgIGlmICghaXRlbS5pZCkgeyBpdGVtLmlkID0gc2xpZGVJZCArICctaXRlbScgKyBpOyB9XG4gICAgICBpZiAoIWNhcm91c2VsICYmIGFuaW1hdGVOb3JtYWwpIHsgYWRkQ2xhc3MoaXRlbSwgYW5pbWF0ZU5vcm1hbCk7IH1cbiAgICAgIHNldEF0dHJzKGl0ZW0sIHtcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vICMjIGNsb25lIHNsaWRlc1xuICAgIC8vIGNhcm91c2VsOiBuICsgc2xpZGVzICsgblxuICAgIC8vIGdhbGxlcnk6ICAgICAgc2xpZGVzICsgblxuICAgIGlmIChjbG9uZUNvdW50KSB7XG4gICAgICB2YXIgZnJhZ21lbnRCZWZvcmUgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgICAgIGZyYWdtZW50QWZ0ZXIgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICBmb3IgKHZhciBqID0gY2xvbmVDb3VudDsgai0tOykge1xuICAgICAgICB2YXIgbnVtID0gaiVzbGlkZUNvdW50LFxuICAgICAgICAgICAgY2xvbmVGaXJzdCA9IHNsaWRlSXRlbXNbbnVtXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGFkZENsYXNzKGNsb25lRmlyc3QsIHNsaWRlQ2xvbmVkQ2xhc3MpO1xuICAgICAgICByZW1vdmVBdHRycyhjbG9uZUZpcnN0LCAnaWQnKTtcbiAgICAgICAgZnJhZ21lbnRBZnRlci5pbnNlcnRCZWZvcmUoY2xvbmVGaXJzdCwgZnJhZ21lbnRBZnRlci5maXJzdENoaWxkKTtcblxuICAgICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgICB2YXIgY2xvbmVMYXN0ID0gc2xpZGVJdGVtc1tzbGlkZUNvdW50IC0gMSAtIG51bV0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgIGFkZENsYXNzKGNsb25lTGFzdCwgc2xpZGVDbG9uZWRDbGFzcyk7XG4gICAgICAgICAgcmVtb3ZlQXR0cnMoY2xvbmVMYXN0LCAnaWQnKTtcbiAgICAgICAgICBmcmFnbWVudEJlZm9yZS5hcHBlbmRDaGlsZChjbG9uZUxhc3QpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZnJhZ21lbnRCZWZvcmUsIGNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudEFmdGVyKTtcbiAgICAgIHNsaWRlSXRlbXMgPSBjb250YWluZXIuY2hpbGRyZW47XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2xpZGVyVHJhbnNmb3JtICgpIHtcbiAgICAvLyAjIyBpbWFnZXMgbG9hZGVkL2ZhaWxlZFxuICAgIGlmIChoYXNPcHRpb24oJ2F1dG9IZWlnaHQnKSB8fCBhdXRvV2lkdGggfHwgIWhvcml6b250YWwpIHtcbiAgICAgIHZhciBpbWdzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpO1xuXG4gICAgICAvLyBhZGQgaW1nIGxvYWQgZXZlbnQgbGlzdGVuZXJcbiAgICAgIGZvckVhY2goaW1ncywgZnVuY3Rpb24oaW1nKSB7XG4gICAgICAgIHZhciBzcmMgPSBpbWcuc3JjO1xuXG4gICAgICAgIGlmICghbGF6eWxvYWQpIHtcbiAgICAgICAgICAvLyBub3QgZGF0YSBpbWdcbiAgICAgICAgICBpZiAoc3JjICYmIHNyYy5pbmRleE9mKCdkYXRhOmltYWdlJykgPCAwKSB7XG4gICAgICAgICAgICBpbWcuc3JjID0gJyc7XG4gICAgICAgICAgICBhZGRFdmVudHMoaW1nLCBpbWdFdmVudHMpO1xuICAgICAgICAgICAgYWRkQ2xhc3MoaW1nLCAnbG9hZGluZycpO1xuXG4gICAgICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICAgIC8vIGRhdGEgaW1nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGltZ0xvYWRlZChpbWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldCBpbWdzQ29tcGxldGVcbiAgICAgIHJhZihmdW5jdGlvbigpeyBpbWdzTG9hZGVkQ2hlY2soYXJyYXlGcm9tTm9kZUxpc3QoaW1ncyksIGZ1bmN0aW9uKCkgeyBpbWdzQ29tcGxldGUgPSB0cnVlOyB9KTsgfSk7XG5cbiAgICAgIC8vIHJlc2V0IGltZ3MgZm9yIGF1dG8gaGVpZ2h0OiBjaGVjayB2aXNpYmxlIGltZ3Mgb25seVxuICAgICAgaWYgKGhhc09wdGlvbignYXV0b0hlaWdodCcpKSB7IGltZ3MgPSBnZXRJbWFnZUFycmF5KGluZGV4LCBNYXRoLm1pbihpbmRleCArIGl0ZW1zIC0gMSwgc2xpZGVDb3VudE5ldyAtIDEpKTsgfVxuXG4gICAgICBsYXp5bG9hZCA/IGluaXRTbGlkZXJUcmFuc2Zvcm1TdHlsZUNoZWNrKCkgOiByYWYoZnVuY3Rpb24oKXsgaW1nc0xvYWRlZENoZWNrKGFycmF5RnJvbU5vZGVMaXN0KGltZ3MpLCBpbml0U2xpZGVyVHJhbnNmb3JtU3R5bGVDaGVjayk7IH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNldCBjb250YWluZXIgdHJhbnNmb3JtIHByb3BlcnR5XG4gICAgICBpZiAoY2Fyb3VzZWwpIHsgZG9Db250YWluZXJUcmFuc2Zvcm1TaWxlbnQoKTsgfVxuXG4gICAgICAvLyB1cGRhdGUgc2xpZGVyIHRvb2xzIGFuZCBldmVudHNcbiAgICAgIGluaXRUb29scygpO1xuICAgICAgaW5pdEV2ZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTbGlkZXJUcmFuc2Zvcm1TdHlsZUNoZWNrICgpIHtcbiAgICBpZiAoYXV0b1dpZHRoICYmIHNsaWRlQ291bnQgPiAxKSB7XG4gICAgICAvLyBjaGVjayBzdHlsZXMgYXBwbGljYXRpb25cbiAgICAgIHZhciBudW0gPSBsb29wID8gaW5kZXggOiBzbGlkZUNvdW50IC0gMTtcblxuICAgICAgKGZ1bmN0aW9uIHN0eWxlc0FwcGxpY2F0aW9uQ2hlY2soKSB7XG4gICAgICAgIHZhciBsZWZ0ID0gc2xpZGVJdGVtc1tudW1dLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHZhciByaWdodCA9IHNsaWRlSXRlbXNbbnVtIC0gMV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG5cbiAgICAgICAgKE1hdGguYWJzKGxlZnQgLSByaWdodCkgPD0gMSkgP1xuICAgICAgICAgIGluaXRTbGlkZXJUcmFuc2Zvcm1Db3JlKCkgOlxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgc3R5bGVzQXBwbGljYXRpb25DaGVjaygpIH0sIDE2KTtcbiAgICAgIH0pKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdFNsaWRlclRyYW5zZm9ybUNvcmUoKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGluaXRTbGlkZXJUcmFuc2Zvcm1Db3JlICgpIHtcbiAgICAvLyBydW4gRm4oKXMgd2hpY2ggYXJlIHJlbHkgb24gaW1hZ2UgbG9hZGluZ1xuICAgIGlmICghaG9yaXpvbnRhbCB8fCBhdXRvV2lkdGgpIHtcbiAgICAgIHNldFNsaWRlUG9zaXRpb25zKCk7XG5cbiAgICAgIGlmIChhdXRvV2lkdGgpIHtcbiAgICAgICAgcmlnaHRCb3VuZGFyeSA9IGdldFJpZ2h0Qm91bmRhcnkoKTtcbiAgICAgICAgaWYgKGZyZWV6YWJsZSkgeyBmcmVlemUgPSBnZXRGcmVlemUoKTsgfVxuICAgICAgICBpbmRleE1heCA9IGdldEluZGV4TWF4KCk7IC8vIDw9IHNsaWRlUG9zaXRpb25zLCByaWdodEJvdW5kYXJ5IDw9XG4gICAgICAgIHJlc2V0VmFyaWJsZXNXaGVuRGlzYWJsZShkaXNhYmxlIHx8IGZyZWV6ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVDb250ZW50V3JhcHBlckhlaWdodCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCBjb250YWluZXIgdHJhbnNmb3JtIHByb3BlcnR5XG4gICAgaWYgKGNhcm91c2VsKSB7IGRvQ29udGFpbmVyVHJhbnNmb3JtU2lsZW50KCk7IH1cblxuICAgIC8vIHVwZGF0ZSBzbGlkZXIgdG9vbHMgYW5kIGV2ZW50c1xuICAgIGluaXRUb29scygpO1xuICAgIGluaXRFdmVudHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTaGVldCAoKSB7XG4gICAgLy8gZ2FsbGVyeTpcbiAgICAvLyBzZXQgYW5pbWF0aW9uIGNsYXNzZXMgYW5kIGxlZnQgdmFsdWUgZm9yIGdhbGxlcnkgc2xpZGVyXG4gICAgaWYgKCFjYXJvdXNlbCkge1xuICAgICAgZm9yICh2YXIgaSA9IGluZGV4LCBsID0gaW5kZXggKyBNYXRoLm1pbihzbGlkZUNvdW50LCBpdGVtcyk7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBzbGlkZUl0ZW1zW2ldO1xuICAgICAgICBpdGVtLnN0eWxlLmxlZnQgPSAoaSAtIGluZGV4KSAqIDEwMCAvIGl0ZW1zICsgJyUnO1xuICAgICAgICBhZGRDbGFzcyhpdGVtLCBhbmltYXRlSW4pO1xuICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBhbmltYXRlTm9ybWFsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAjIyMjIExBWU9VVFxuXG4gICAgLy8gIyMgSU5MSU5FLUJMT0NLIFZTIEZMT0FUXG5cbiAgICAvLyAjIyBQZXJjZW50YWdlTGF5b3V0OlxuICAgIC8vIHNsaWRlczogaW5saW5lLWJsb2NrXG4gICAgLy8gcmVtb3ZlIGJsYW5rIHNwYWNlIGJldHdlZW4gc2xpZGVzIGJ5IHNldCBmb250LXNpemU6IDBcblxuICAgIC8vICMjIE5vbiBQZXJjZW50YWdlTGF5b3V0OlxuICAgIC8vIHNsaWRlczogZmxvYXRcbiAgICAvLyAgICAgICAgIG1hcmdpbi1yaWdodDogLTEwMCVcbiAgICAvLyAgICAgICAgIG1hcmdpbi1sZWZ0OiB+XG5cbiAgICAvLyBSZXNvdXJjZTogaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMTQ3dXAyNDV3d1RYZVFZdmUzQlJTQUQ0b1ZjdlFtdUdzRnRlSk9lQTV4TlEvZWRpdD91c3A9c2hhcmluZ1xuICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICBpZiAoUEVSQ0VOVEFHRUxBWU9VVCB8fCBhdXRvV2lkdGgpIHtcbiAgICAgICAgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCArICcgPiAudG5zLWl0ZW0nLCAnZm9udC1zaXplOicgKyB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZUl0ZW1zWzBdKS5mb250U2l6ZSArICc7JywgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTtcbiAgICAgICAgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCwgJ2ZvbnQtc2l6ZTowOycsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7XG4gICAgICB9IGVsc2UgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgIGZvckVhY2goc2xpZGVJdGVtcywgZnVuY3Rpb24gKHNsaWRlLCBpKSB7XG4gICAgICAgICAgc2xpZGUuc3R5bGUubWFyZ2luTGVmdCA9IGdldFNsaWRlTWFyZ2luTGVmdChpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyAjIyBCQVNJQyBTVFlMRVNcbiAgICBpZiAoQ1NTTVEpIHtcbiAgICAgIC8vIG1pZGRsZSB3cmFwcGVyIHN0eWxlXG4gICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OKSB7XG4gICAgICAgIHZhciBzdHIgPSBtaWRkbGVXcmFwcGVyICYmIG9wdGlvbnMuYXV0b0hlaWdodCA/IGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlKG9wdGlvbnMuc3BlZWQpIDogJyc7XG4gICAgICAgIGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQgKyAnLW13Jywgc3RyLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpO1xuICAgICAgfVxuXG4gICAgICAvLyBpbm5lciB3cmFwcGVyIHN0eWxlc1xuICAgICAgc3RyID0gZ2V0SW5uZXJXcmFwcGVyU3R5bGVzKG9wdGlvbnMuZWRnZVBhZGRpbmcsIG9wdGlvbnMuZ3V0dGVyLCBvcHRpb25zLmZpeGVkV2lkdGgsIG9wdGlvbnMuc3BlZWQsIG9wdGlvbnMuYXV0b0hlaWdodCk7XG4gICAgICBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkICsgJy1pdycsIHN0ciwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTtcblxuICAgICAgLy8gY29udGFpbmVyIHN0eWxlc1xuICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgIHN0ciA9IGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCA/ICd3aWR0aDonICsgZ2V0Q29udGFpbmVyV2lkdGgob3B0aW9ucy5maXhlZFdpZHRoLCBvcHRpb25zLmd1dHRlciwgb3B0aW9ucy5pdGVtcykgKyAnOycgOiAnJztcbiAgICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTikgeyBzdHIgKz0gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWQpOyB9XG4gICAgICAgIGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQsIHN0ciwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2xpZGUgc3R5bGVzXG4gICAgICBzdHIgPSBob3Jpem9udGFsICYmICFhdXRvV2lkdGggPyBnZXRTbGlkZVdpZHRoU3R5bGUob3B0aW9ucy5maXhlZFdpZHRoLCBvcHRpb25zLmd1dHRlciwgb3B0aW9ucy5pdGVtcykgOiAnJztcbiAgICAgIGlmIChvcHRpb25zLmd1dHRlcikgeyBzdHIgKz0gZ2V0U2xpZGVHdXR0ZXJTdHlsZShvcHRpb25zLmd1dHRlcik7IH1cbiAgICAgIC8vIHNldCBnYWxsZXJ5IGl0ZW1zIHRyYW5zaXRpb24tZHVyYXRpb25cbiAgICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTikgeyBzdHIgKz0gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWQpOyB9XG4gICAgICAgIGlmIChBTklNQVRJT05EVVJBVElPTikgeyBzdHIgKz0gZ2V0QW5pbWF0aW9uRHVyYXRpb25TdHlsZShzcGVlZCk7IH1cbiAgICAgIH1cbiAgICAgIGlmIChzdHIpIHsgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCArICcgPiAudG5zLWl0ZW0nLCBzdHIsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7IH1cblxuICAgIC8vIG5vbiBDU1MgbWVkaWFxdWVyaWVzOiBJRThcbiAgICAvLyAjIyB1cGRhdGUgaW5uZXIgd3JhcHBlciwgY29udGFpbmVyLCBzbGlkZXMgaWYgbmVlZGVkXG4gICAgLy8gc2V0IGlubGluZSBzdHlsZXMgZm9yIGlubmVyIHdyYXBwZXIgJiBjb250YWluZXJcbiAgICAvLyBpbnNlcnQgc3R5bGVzaGVldCAob25lIGxpbmUpIGZvciBzbGlkZXMgb25seSAoc2luY2Ugc2xpZGVzIGFyZSBtYW55KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtaWRkbGUgd3JhcHBlciBzdHlsZXNcbiAgICAgIHVwZGF0ZV9jYXJvdXNlbF90cmFuc2l0aW9uX2R1cmF0aW9uKCk7XG5cbiAgICAgIC8vIGlubmVyIHdyYXBwZXIgc3R5bGVzXG4gICAgICBpbm5lcldyYXBwZXIuc3R5bGUuY3NzVGV4dCA9IGdldElubmVyV3JhcHBlclN0eWxlcyhlZGdlUGFkZGluZywgZ3V0dGVyLCBmaXhlZFdpZHRoLCBhdXRvSGVpZ2h0KTtcblxuICAgICAgLy8gY29udGFpbmVyIHN0eWxlc1xuICAgICAgaWYgKGNhcm91c2VsICYmIGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCkge1xuICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBnZXRDb250YWluZXJXaWR0aChmaXhlZFdpZHRoLCBndXR0ZXIsIGl0ZW1zKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2xpZGUgc3R5bGVzXG4gICAgICB2YXIgc3RyID0gaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoID8gZ2V0U2xpZGVXaWR0aFN0eWxlKGZpeGVkV2lkdGgsIGd1dHRlciwgaXRlbXMpIDogJyc7XG4gICAgICBpZiAoZ3V0dGVyKSB7IHN0ciArPSBnZXRTbGlkZUd1dHRlclN0eWxlKGd1dHRlcik7IH1cblxuICAgICAgLy8gYXBwZW5kIHRvIHRoZSBsYXN0IGxpbmVcbiAgICAgIGlmIChzdHIpIHsgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCArICcgPiAudG5zLWl0ZW0nLCBzdHIsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7IH1cbiAgICB9XG5cbiAgICAvLyAjIyBNRURJQVFVRVJJRVNcbiAgICBpZiAocmVzcG9uc2l2ZSAmJiBDU1NNUSkge1xuICAgICAgZm9yICh2YXIgYnAgaW4gcmVzcG9uc2l2ZSkge1xuICAgICAgICAvLyBicDogY29udmVydCBzdHJpbmcgdG8gbnVtYmVyXG4gICAgICAgIGJwID0gcGFyc2VJbnQoYnApO1xuXG4gICAgICAgIHZhciBvcHRzID0gcmVzcG9uc2l2ZVticF0sXG4gICAgICAgICAgICBzdHIgPSAnJyxcbiAgICAgICAgICAgIG1pZGRsZVdyYXBwZXJTdHIgPSAnJyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclN0ciA9ICcnLFxuICAgICAgICAgICAgY29udGFpbmVyU3RyID0gJycsXG4gICAgICAgICAgICBzbGlkZVN0ciA9ICcnLFxuICAgICAgICAgICAgaXRlbXNCUCA9ICFhdXRvV2lkdGggPyBnZXRPcHRpb24oJ2l0ZW1zJywgYnApIDogbnVsbCxcbiAgICAgICAgICAgIGZpeGVkV2lkdGhCUCA9IGdldE9wdGlvbignZml4ZWRXaWR0aCcsIGJwKSxcbiAgICAgICAgICAgIHNwZWVkQlAgPSBnZXRPcHRpb24oJ3NwZWVkJywgYnApLFxuICAgICAgICAgICAgZWRnZVBhZGRpbmdCUCA9IGdldE9wdGlvbignZWRnZVBhZGRpbmcnLCBicCksXG4gICAgICAgICAgICBhdXRvSGVpZ2h0QlAgPSBnZXRPcHRpb24oJ2F1dG9IZWlnaHQnLCBicCksXG4gICAgICAgICAgICBndXR0ZXJCUCA9IGdldE9wdGlvbignZ3V0dGVyJywgYnApO1xuXG4gICAgICAgIC8vIG1pZGRsZSB3cmFwcGVyIHN0cmluZ1xuICAgICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OICYmIG1pZGRsZVdyYXBwZXIgJiYgZ2V0T3B0aW9uKCdhdXRvSGVpZ2h0JywgYnApICYmICdzcGVlZCcgaW4gb3B0cykge1xuICAgICAgICAgIG1pZGRsZVdyYXBwZXJTdHIgPSAnIycgKyBzbGlkZUlkICsgJy1td3snICsgZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWRCUCkgKyAnfSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbm5lciB3cmFwcGVyIHN0cmluZ1xuICAgICAgICBpZiAoJ2VkZ2VQYWRkaW5nJyBpbiBvcHRzIHx8ICdndXR0ZXInIGluIG9wdHMpIHtcbiAgICAgICAgICBpbm5lcldyYXBwZXJTdHIgPSAnIycgKyBzbGlkZUlkICsgJy1pd3snICsgZ2V0SW5uZXJXcmFwcGVyU3R5bGVzKGVkZ2VQYWRkaW5nQlAsIGd1dHRlckJQLCBmaXhlZFdpZHRoQlAsIHNwZWVkQlAsIGF1dG9IZWlnaHRCUCkgKyAnfSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb250YWluZXIgc3RyaW5nXG4gICAgICAgIGlmIChjYXJvdXNlbCAmJiBob3Jpem9udGFsICYmICFhdXRvV2lkdGggJiYgKCdmaXhlZFdpZHRoJyBpbiBvcHRzIHx8ICdpdGVtcycgaW4gb3B0cyB8fCAoZml4ZWRXaWR0aCAmJiAnZ3V0dGVyJyBpbiBvcHRzKSkpIHtcbiAgICAgICAgICBjb250YWluZXJTdHIgPSAnd2lkdGg6JyArIGdldENvbnRhaW5lcldpZHRoKGZpeGVkV2lkdGhCUCwgZ3V0dGVyQlAsIGl0ZW1zQlApICsgJzsnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04gJiYgJ3NwZWVkJyBpbiBvcHRzKSB7XG4gICAgICAgICAgY29udGFpbmVyU3RyICs9IGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlKHNwZWVkQlApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250YWluZXJTdHIpIHtcbiAgICAgICAgICBjb250YWluZXJTdHIgPSAnIycgKyBzbGlkZUlkICsgJ3snICsgY29udGFpbmVyU3RyICsgJ30nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2xpZGUgc3RyaW5nXG4gICAgICAgIGlmICgnZml4ZWRXaWR0aCcgaW4gb3B0cyB8fCAoZml4ZWRXaWR0aCAmJiAnZ3V0dGVyJyBpbiBvcHRzKSB8fCAhY2Fyb3VzZWwgJiYgJ2l0ZW1zJyBpbiBvcHRzKSB7XG4gICAgICAgICAgc2xpZGVTdHIgKz0gZ2V0U2xpZGVXaWR0aFN0eWxlKGZpeGVkV2lkdGhCUCwgZ3V0dGVyQlAsIGl0ZW1zQlApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgnZ3V0dGVyJyBpbiBvcHRzKSB7XG4gICAgICAgICAgc2xpZGVTdHIgKz0gZ2V0U2xpZGVHdXR0ZXJTdHlsZShndXR0ZXJCUCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IGdhbGxlcnkgaXRlbXMgdHJhbnNpdGlvbi1kdXJhdGlvblxuICAgICAgICBpZiAoIWNhcm91c2VsICYmICdzcGVlZCcgaW4gb3B0cykge1xuICAgICAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04pIHsgc2xpZGVTdHIgKz0gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWRCUCk7IH1cbiAgICAgICAgICBpZiAoQU5JTUFUSU9ORFVSQVRJT04pIHsgc2xpZGVTdHIgKz0gZ2V0QW5pbWF0aW9uRHVyYXRpb25TdHlsZShzcGVlZEJQKTsgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzbGlkZVN0cikgeyBzbGlkZVN0ciA9ICcjJyArIHNsaWRlSWQgKyAnID4gLnRucy1pdGVteycgKyBzbGlkZVN0ciArICd9JzsgfVxuXG4gICAgICAgIC8vIGFkZCB1cFxuICAgICAgICBzdHIgPSBtaWRkbGVXcmFwcGVyU3RyICsgaW5uZXJXcmFwcGVyU3RyICsgY29udGFpbmVyU3RyICsgc2xpZGVTdHI7XG5cbiAgICAgICAgaWYgKHN0cikge1xuICAgICAgICAgIHNoZWV0Lmluc2VydFJ1bGUoJ0BtZWRpYSAobWluLXdpZHRoOiAnICsgYnAgLyAxNiArICdlbSkgeycgKyBzdHIgKyAnfScsIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0VG9vbHMgKCkge1xuICAgIC8vID09IHNsaWRlcyA9PVxuICAgIHVwZGF0ZVNsaWRlU3RhdHVzKCk7XG5cbiAgICAvLyA9PSBsaXZlIHJlZ2lvbiA9PVxuICAgIG91dGVyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGRpdiBjbGFzcz1cInRucy1saXZlcmVnaW9uIHRucy12aXN1YWxseS1oaWRkZW5cIiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBhcmlhLWF0b21pYz1cInRydWVcIj5zbGlkZSA8c3BhbiBjbGFzcz1cImN1cnJlbnRcIj4nICsgZ2V0TGl2ZVJlZ2lvblN0cigpICsgJzwvc3Bhbj4gIG9mICcgKyBzbGlkZUNvdW50ICsgJzwvZGl2PicpO1xuICAgIGxpdmVyZWdpb25DdXJyZW50ID0gb3V0ZXJXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy50bnMtbGl2ZXJlZ2lvbiAuY3VycmVudCcpO1xuXG4gICAgLy8gPT0gYXV0b3BsYXlJbml0ID09XG4gICAgaWYgKGhhc0F1dG9wbGF5KSB7XG4gICAgICB2YXIgdHh0ID0gYXV0b3BsYXkgPyAnc3RvcCcgOiAnc3RhcnQnO1xuICAgICAgaWYgKGF1dG9wbGF5QnV0dG9uKSB7XG4gICAgICAgIHNldEF0dHJzKGF1dG9wbGF5QnV0dG9uLCB7J2RhdGEtYWN0aW9uJzogdHh0fSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuYXV0b3BsYXlCdXR0b25PdXRwdXQpIHtcbiAgICAgICAgb3V0ZXJXcmFwcGVyLmluc2VydEFkamFjZW50SFRNTChnZXRJbnNlcnRQb3NpdGlvbihvcHRpb25zLmF1dG9wbGF5UG9zaXRpb24pLCAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCInICsgdHh0ICsgJ1wiPicgKyBhdXRvcGxheUh0bWxTdHJpbmdzWzBdICsgdHh0ICsgYXV0b3BsYXlIdG1sU3RyaW5nc1sxXSArIGF1dG9wbGF5VGV4dFswXSArICc8L2J1dHRvbj4nKTtcbiAgICAgICAgYXV0b3BsYXlCdXR0b24gPSBvdXRlcldyYXBwZXIucXVlcnlTZWxlY3RvcignW2RhdGEtYWN0aW9uXScpO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQgZXZlbnRcbiAgICAgIGlmIChhdXRvcGxheUJ1dHRvbikge1xuICAgICAgICBhZGRFdmVudHMoYXV0b3BsYXlCdXR0b24sIHsnY2xpY2snOiB0b2dnbGVBdXRvcGxheX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgICAgc3RhcnRBdXRvcGxheSgpO1xuICAgICAgICBpZiAoYXV0b3BsYXlIb3ZlclBhdXNlKSB7IGFkZEV2ZW50cyhjb250YWluZXIsIGhvdmVyRXZlbnRzKTsgfVxuICAgICAgICBpZiAoYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSkgeyBhZGRFdmVudHMoY29udGFpbmVyLCB2aXNpYmlsaXR5RXZlbnQpOyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT0gbmF2SW5pdCA9PVxuICAgIGlmIChoYXNOYXYpIHtcbiAgICAgIHZhciBpbml0SW5kZXggPSAhY2Fyb3VzZWwgPyAwIDogY2xvbmVDb3VudDtcbiAgICAgIC8vIGN1c3RvbWl6ZWQgbmF2XG4gICAgICAvLyB3aWxsIG5vdCBoaWRlIHRoZSBuYXZzIGluIGNhc2UgdGhleSdyZSB0aHVtYm5haWxzXG4gICAgICBpZiAobmF2Q29udGFpbmVyKSB7XG4gICAgICAgIHNldEF0dHJzKG5hdkNvbnRhaW5lciwgeydhcmlhLWxhYmVsJzogJ0Nhcm91c2VsIFBhZ2luYXRpb24nfSk7XG4gICAgICAgIG5hdkl0ZW1zID0gbmF2Q29udGFpbmVyLmNoaWxkcmVuO1xuICAgICAgICBmb3JFYWNoKG5hdkl0ZW1zLCBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgc2V0QXR0cnMoaXRlbSwge1xuICAgICAgICAgICAgJ2RhdGEtbmF2JzogaSxcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6IG5hdlN0ciArIChpICsgMSksXG4gICAgICAgICAgICAnYXJpYS1jb250cm9scyc6IHNsaWRlSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBnZW5lcmF0ZWQgbmF2XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmF2SHRtbCA9ICcnLFxuICAgICAgICAgICAgaGlkZGVuU3RyID0gbmF2QXNUaHVtYm5haWxzID8gJycgOiAnc3R5bGU9XCJkaXNwbGF5Om5vbmVcIic7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgLy8gaGlkZSBuYXYgaXRlbXMgYnkgZGVmYXVsdFxuICAgICAgICAgIG5hdkh0bWwgKz0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtbmF2PVwiJyArIGkgKydcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1jb250cm9scz1cIicgKyBzbGlkZUlkICsgJ1wiICcgKyBoaWRkZW5TdHIgKyAnIGFyaWEtbGFiZWw9XCInICsgbmF2U3RyICsgKGkgKyAxKSArJ1wiPjwvYnV0dG9uPic7XG4gICAgICAgIH1cbiAgICAgICAgbmF2SHRtbCA9ICc8ZGl2IGNsYXNzPVwidG5zLW5hdlwiIGFyaWEtbGFiZWw9XCJDYXJvdXNlbCBQYWdpbmF0aW9uXCI+JyArIG5hdkh0bWwgKyAnPC9kaXY+JztcbiAgICAgICAgb3V0ZXJXcmFwcGVyLmluc2VydEFkamFjZW50SFRNTChnZXRJbnNlcnRQb3NpdGlvbihvcHRpb25zLm5hdlBvc2l0aW9uKSwgbmF2SHRtbCk7XG5cbiAgICAgICAgbmF2Q29udGFpbmVyID0gb3V0ZXJXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy50bnMtbmF2Jyk7XG4gICAgICAgIG5hdkl0ZW1zID0gbmF2Q29udGFpbmVyLmNoaWxkcmVuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVOYXZWaXNpYmlsaXR5KCk7XG5cbiAgICAgIC8vIGFkZCB0cmFuc2l0aW9uXG4gICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBUUkFOU0lUSU9ORFVSQVRJT04uc3Vic3RyaW5nKDAsIFRSQU5TSVRJT05EVVJBVElPTi5sZW5ndGggLSAxOCkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIHN0ciA9ICd0cmFuc2l0aW9uOiBhbGwgJyArIHNwZWVkIC8gMTAwMCArICdzJztcblxuICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgc3RyID0gJy0nICsgcHJlZml4ICsgJy0nICsgc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ1NTUnVsZShzaGVldCwgJ1thcmlhLWNvbnRyb2xzXj0nICsgc2xpZGVJZCArICctaXRlbV0nLCBzdHIsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7XG4gICAgICB9XG5cbiAgICAgIHNldEF0dHJzKG5hdkl0ZW1zW25hdkN1cnJlbnRJbmRleF0sIHsnYXJpYS1sYWJlbCc6IG5hdlN0ciArIChuYXZDdXJyZW50SW5kZXggKyAxKSArIG5hdlN0ckN1cnJlbnR9KTtcbiAgICAgIHJlbW92ZUF0dHJzKG5hdkl0ZW1zW25hdkN1cnJlbnRJbmRleF0sICd0YWJpbmRleCcpO1xuICAgICAgYWRkQ2xhc3MobmF2SXRlbXNbbmF2Q3VycmVudEluZGV4XSwgbmF2QWN0aXZlQ2xhc3MpO1xuXG4gICAgICAvLyBhZGQgZXZlbnRzXG4gICAgICBhZGRFdmVudHMobmF2Q29udGFpbmVyLCBuYXZFdmVudHMpO1xuICAgIH1cblxuXG5cbiAgICAvLyA9PSBjb250cm9sc0luaXQgPT1cbiAgICBpZiAoaGFzQ29udHJvbHMpIHtcbiAgICAgIGlmICghY29udHJvbHNDb250YWluZXIgJiYgKCFwcmV2QnV0dG9uIHx8ICFuZXh0QnV0dG9uKSkge1xuICAgICAgICBvdXRlcldyYXBwZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKGdldEluc2VydFBvc2l0aW9uKG9wdGlvbnMuY29udHJvbHNQb3NpdGlvbiksICc8ZGl2IGNsYXNzPVwidG5zLWNvbnRyb2xzXCIgYXJpYS1sYWJlbD1cIkNhcm91c2VsIE5hdmlnYXRpb25cIiB0YWJpbmRleD1cIjBcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWNvbnRyb2xzPVwicHJldlwiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWNvbnRyb2xzPVwiJyArIHNsaWRlSWQgKydcIj4nICsgY29udHJvbHNUZXh0WzBdICsgJzwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtY29udHJvbHM9XCJuZXh0XCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtY29udHJvbHM9XCInICsgc2xpZGVJZCArJ1wiPicgKyBjb250cm9sc1RleHRbMV0gKyAnPC9idXR0b24+PC9kaXY+Jyk7XG5cbiAgICAgICAgY29udHJvbHNDb250YWluZXIgPSBvdXRlcldyYXBwZXIucXVlcnlTZWxlY3RvcignLnRucy1jb250cm9scycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXByZXZCdXR0b24gfHwgIW5leHRCdXR0b24pIHtcbiAgICAgICAgcHJldkJ1dHRvbiA9IGNvbnRyb2xzQ29udGFpbmVyLmNoaWxkcmVuWzBdO1xuICAgICAgICBuZXh0QnV0dG9uID0gY29udHJvbHNDb250YWluZXIuY2hpbGRyZW5bMV07XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgICAgIHNldEF0dHJzKGNvbnRyb2xzQ29udGFpbmVyLCB7XG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiAnQ2Fyb3VzZWwgTmF2aWdhdGlvbicsXG4gICAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5jb250cm9sc0NvbnRhaW5lciB8fCAob3B0aW9ucy5wcmV2QnV0dG9uICYmIG9wdGlvbnMubmV4dEJ1dHRvbikpIHtcbiAgICAgICAgc2V0QXR0cnMoW3ByZXZCdXR0b24sIG5leHRCdXR0b25dLCB7XG4gICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBzbGlkZUlkLFxuICAgICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5jb250cm9sc0NvbnRhaW5lciB8fCAob3B0aW9ucy5wcmV2QnV0dG9uICYmIG9wdGlvbnMubmV4dEJ1dHRvbikpIHtcbiAgICAgICAgc2V0QXR0cnMocHJldkJ1dHRvbiwgeydkYXRhLWNvbnRyb2xzJyA6ICdwcmV2J30pO1xuICAgICAgICBzZXRBdHRycyhuZXh0QnV0dG9uLCB7J2RhdGEtY29udHJvbHMnIDogJ25leHQnfSk7XG4gICAgICB9XG5cbiAgICAgIHByZXZJc0J1dHRvbiA9IGlzQnV0dG9uKHByZXZCdXR0b24pO1xuICAgICAgbmV4dElzQnV0dG9uID0gaXNCdXR0b24obmV4dEJ1dHRvbik7XG5cbiAgICAgIHVwZGF0ZUNvbnRyb2xzU3RhdHVzKCk7XG5cbiAgICAgIC8vIGFkZCBldmVudHNcbiAgICAgIGlmIChjb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICBhZGRFdmVudHMoY29udHJvbHNDb250YWluZXIsIGNvbnRyb2xzRXZlbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZEV2ZW50cyhwcmV2QnV0dG9uLCBjb250cm9sc0V2ZW50cyk7XG4gICAgICAgIGFkZEV2ZW50cyhuZXh0QnV0dG9uLCBjb250cm9sc0V2ZW50cyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaGlkZSB0b29scyBpZiBuZWVkZWRcbiAgICBkaXNhYmxlVUkoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRFdmVudHMgKCkge1xuICAgIC8vIGFkZCBldmVudHNcbiAgICBpZiAoY2Fyb3VzZWwgJiYgVFJBTlNJVElPTkVORCkge1xuICAgICAgdmFyIGV2ZSA9IHt9O1xuICAgICAgZXZlW1RSQU5TSVRJT05FTkRdID0gb25UcmFuc2l0aW9uRW5kO1xuICAgICAgYWRkRXZlbnRzKGNvbnRhaW5lciwgZXZlKTtcbiAgICB9XG5cbiAgICBpZiAodG91Y2gpIHsgYWRkRXZlbnRzKGNvbnRhaW5lciwgdG91Y2hFdmVudHMsIG9wdGlvbnMucHJldmVudFNjcm9sbE9uVG91Y2gpOyB9XG4gICAgaWYgKG1vdXNlRHJhZykgeyBhZGRFdmVudHMoY29udGFpbmVyLCBkcmFnRXZlbnRzKTsgfVxuICAgIGlmIChhcnJvd0tleXMpIHsgYWRkRXZlbnRzKGRvYywgZG9jbWVudEtleWRvd25FdmVudCk7IH1cblxuICAgIGlmIChuZXN0ZWQgPT09ICdpbm5lcicpIHtcbiAgICAgIGV2ZW50cy5vbignb3V0ZXJSZXNpemVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNpemVUYXNrcygpO1xuICAgICAgICBldmVudHMuZW1pdCgnaW5uZXJMb2FkZWQnLCBpbmZvKCkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zaXZlIHx8IGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoIHx8IGF1dG9IZWlnaHQgfHwgIWhvcml6b250YWwpIHtcbiAgICAgIGFkZEV2ZW50cyh3aW4sIHsncmVzaXplJzogb25SZXNpemV9KTtcbiAgICB9XG5cbiAgICBpZiAoYXV0b0hlaWdodCkge1xuICAgICAgaWYgKG5lc3RlZCA9PT0gJ291dGVyJykge1xuICAgICAgICBldmVudHMub24oJ2lubmVyTG9hZGVkJywgZG9BdXRvSGVpZ2h0KTtcbiAgICAgIH0gZWxzZSBpZiAoIWRpc2FibGUpIHsgZG9BdXRvSGVpZ2h0KCk7IH1cbiAgICB9XG5cbiAgICBkb0xhenlMb2FkKCk7XG4gICAgaWYgKGRpc2FibGUpIHsgZGlzYWJsZVNsaWRlcigpOyB9IGVsc2UgaWYgKGZyZWV6ZSkgeyBmcmVlemVTbGlkZXIoKTsgfVxuXG4gICAgZXZlbnRzLm9uKCdpbmRleENoYW5nZWQnLCBhZGRpdGlvbmFsVXBkYXRlcyk7XG4gICAgaWYgKG5lc3RlZCA9PT0gJ2lubmVyJykgeyBldmVudHMuZW1pdCgnaW5uZXJMb2FkZWQnLCBpbmZvKCkpOyB9XG4gICAgaWYgKHR5cGVvZiBvbkluaXQgPT09ICdmdW5jdGlvbicpIHsgb25Jbml0KGluZm8oKSk7IH1cbiAgICBpc09uID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIC8vIHNoZWV0XG4gICAgc2hlZXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGlmIChzaGVldC5vd25lck5vZGUpIHsgc2hlZXQub3duZXJOb2RlLnJlbW92ZSgpOyB9XG5cbiAgICAvLyByZW1vdmUgd2luIGV2ZW50IGxpc3RlbmVyc1xuICAgIHJlbW92ZUV2ZW50cyh3aW4sIHsncmVzaXplJzogb25SZXNpemV9KTtcblxuICAgIC8vIGFycm93S2V5cywgY29udHJvbHMsIG5hdlxuICAgIGlmIChhcnJvd0tleXMpIHsgcmVtb3ZlRXZlbnRzKGRvYywgZG9jbWVudEtleWRvd25FdmVudCk7IH1cbiAgICBpZiAoY29udHJvbHNDb250YWluZXIpIHsgcmVtb3ZlRXZlbnRzKGNvbnRyb2xzQ29udGFpbmVyLCBjb250cm9sc0V2ZW50cyk7IH1cbiAgICBpZiAobmF2Q29udGFpbmVyKSB7IHJlbW92ZUV2ZW50cyhuYXZDb250YWluZXIsIG5hdkV2ZW50cyk7IH1cblxuICAgIC8vIGF1dG9wbGF5XG4gICAgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgaG92ZXJFdmVudHMpO1xuICAgIHJlbW92ZUV2ZW50cyhjb250YWluZXIsIHZpc2liaWxpdHlFdmVudCk7XG4gICAgaWYgKGF1dG9wbGF5QnV0dG9uKSB7IHJlbW92ZUV2ZW50cyhhdXRvcGxheUJ1dHRvbiwgeydjbGljayc6IHRvZ2dsZUF1dG9wbGF5fSk7IH1cbiAgICBpZiAoYXV0b3BsYXkpIHsgY2xlYXJJbnRlcnZhbChhdXRvcGxheVRpbWVyKTsgfVxuXG4gICAgLy8gY29udGFpbmVyXG4gICAgaWYgKGNhcm91c2VsICYmIFRSQU5TSVRJT05FTkQpIHtcbiAgICAgIHZhciBldmUgPSB7fTtcbiAgICAgIGV2ZVtUUkFOU0lUSU9ORU5EXSA9IG9uVHJhbnNpdGlvbkVuZDtcbiAgICAgIHJlbW92ZUV2ZW50cyhjb250YWluZXIsIGV2ZSk7XG4gICAgfVxuICAgIGlmICh0b3VjaCkgeyByZW1vdmVFdmVudHMoY29udGFpbmVyLCB0b3VjaEV2ZW50cyk7IH1cbiAgICBpZiAobW91c2VEcmFnKSB7IHJlbW92ZUV2ZW50cyhjb250YWluZXIsIGRyYWdFdmVudHMpOyB9XG5cbiAgICAvLyBjYWNoZSBPYmplY3QgdmFsdWVzIGluIG9wdGlvbnMgJiYgcmVzZXQgSFRNTFxuICAgIHZhciBodG1sTGlzdCA9IFtjb250YWluZXJIVE1MLCBjb250cm9sc0NvbnRhaW5lckhUTUwsIHByZXZCdXR0b25IVE1MLCBuZXh0QnV0dG9uSFRNTCwgbmF2Q29udGFpbmVySFRNTCwgYXV0b3BsYXlCdXR0b25IVE1MXTtcblxuICAgIHRuc0xpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICB2YXIgZWwgPSBpdGVtID09PSAnY29udGFpbmVyJyA/IG91dGVyV3JhcHBlciA6IG9wdGlvbnNbaXRlbV07XG5cbiAgICAgIGlmICh0eXBlb2YgZWwgPT09ICdvYmplY3QnICYmIGVsKSB7XG4gICAgICAgIHZhciBwcmV2RWwgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID8gZWwucHJldmlvdXNFbGVtZW50U2libGluZyA6IGZhbHNlLFxuICAgICAgICAgICAgcGFyZW50RWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICBlbC5vdXRlckhUTUwgPSBodG1sTGlzdFtpXTtcbiAgICAgICAgb3B0aW9uc1tpdGVtXSA9IHByZXZFbCA/IHByZXZFbC5uZXh0RWxlbWVudFNpYmxpbmcgOiBwYXJlbnRFbC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gcmVzZXQgdmFyaWFibGVzXG4gICAgdG5zTGlzdCA9IGFuaW1hdGVJbiA9IGFuaW1hdGVPdXQgPSBhbmltYXRlRGVsYXkgPSBhbmltYXRlTm9ybWFsID0gaG9yaXpvbnRhbCA9IG91dGVyV3JhcHBlciA9IGlubmVyV3JhcHBlciA9IGNvbnRhaW5lciA9IGNvbnRhaW5lclBhcmVudCA9IGNvbnRhaW5lckhUTUwgPSBzbGlkZUl0ZW1zID0gc2xpZGVDb3VudCA9IGJyZWFrcG9pbnRab25lID0gd2luZG93V2lkdGggPSBhdXRvV2lkdGggPSBmaXhlZFdpZHRoID0gZWRnZVBhZGRpbmcgPSBndXR0ZXIgPSB2aWV3cG9ydCA9IGl0ZW1zID0gc2xpZGVCeSA9IHZpZXdwb3J0TWF4ID0gYXJyb3dLZXlzID0gc3BlZWQgPSByZXdpbmQgPSBsb29wID0gYXV0b0hlaWdodCA9IHNoZWV0ID0gbGF6eWxvYWQgPSBzbGlkZVBvc2l0aW9ucyA9IHNsaWRlSXRlbXNPdXQgPSBjbG9uZUNvdW50ID0gc2xpZGVDb3VudE5ldyA9IGhhc1JpZ2h0RGVhZFpvbmUgPSByaWdodEJvdW5kYXJ5ID0gdXBkYXRlSW5kZXhCZWZvcmVUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1BdHRyID0gdHJhbnNmb3JtUHJlZml4ID0gdHJhbnNmb3JtUG9zdGZpeCA9IGdldEluZGV4TWF4ID0gaW5kZXggPSBpbmRleENhY2hlZCA9IGluZGV4TWluID0gaW5kZXhNYXggPSByZXNpemVUaW1lciA9IHN3aXBlQW5nbGUgPSBtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgPSBydW5uaW5nID0gb25Jbml0ID0gZXZlbnRzID0gbmV3Q29udGFpbmVyQ2xhc3NlcyA9IHNsaWRlSWQgPSBkaXNhYmxlID0gZGlzYWJsZWQgPSBmcmVlemFibGUgPSBmcmVlemUgPSBmcm96ZW4gPSBjb250cm9sc0V2ZW50cyA9IG5hdkV2ZW50cyA9IGhvdmVyRXZlbnRzID0gdmlzaWJpbGl0eUV2ZW50ID0gZG9jbWVudEtleWRvd25FdmVudCA9IHRvdWNoRXZlbnRzID0gZHJhZ0V2ZW50cyA9IGhhc0NvbnRyb2xzID0gaGFzTmF2ID0gbmF2QXNUaHVtYm5haWxzID0gaGFzQXV0b3BsYXkgPSBoYXNUb3VjaCA9IGhhc01vdXNlRHJhZyA9IHNsaWRlQWN0aXZlQ2xhc3MgPSBpbWdDb21wbGV0ZUNsYXNzID0gaW1nRXZlbnRzID0gaW1nc0NvbXBsZXRlID0gY29udHJvbHMgPSBjb250cm9sc1RleHQgPSBjb250cm9sc0NvbnRhaW5lciA9IGNvbnRyb2xzQ29udGFpbmVySFRNTCA9IHByZXZCdXR0b24gPSBuZXh0QnV0dG9uID0gcHJldklzQnV0dG9uID0gbmV4dElzQnV0dG9uID0gbmF2ID0gbmF2Q29udGFpbmVyID0gbmF2Q29udGFpbmVySFRNTCA9IG5hdkl0ZW1zID0gcGFnZXMgPSBwYWdlc0NhY2hlZCA9IG5hdkNsaWNrZWQgPSBuYXZDdXJyZW50SW5kZXggPSBuYXZDdXJyZW50SW5kZXhDYWNoZWQgPSBuYXZBY3RpdmVDbGFzcyA9IG5hdlN0ciA9IG5hdlN0ckN1cnJlbnQgPSBhdXRvcGxheSA9IGF1dG9wbGF5VGltZW91dCA9IGF1dG9wbGF5RGlyZWN0aW9uID0gYXV0b3BsYXlUZXh0ID0gYXV0b3BsYXlIb3ZlclBhdXNlID0gYXV0b3BsYXlCdXR0b24gPSBhdXRvcGxheUJ1dHRvbkhUTUwgPSBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5ID0gYXV0b3BsYXlIdG1sU3RyaW5ncyA9IGF1dG9wbGF5VGltZXIgPSBhbmltYXRpbmcgPSBhdXRvcGxheUhvdmVyUGF1c2VkID0gYXV0b3BsYXlVc2VyUGF1c2VkID0gYXV0b3BsYXlWaXNpYmlsaXR5UGF1c2VkID0gaW5pdFBvc2l0aW9uID0gbGFzdFBvc2l0aW9uID0gdHJhbnNsYXRlSW5pdCA9IGRpc1ggPSBkaXNZID0gcGFuU3RhcnQgPSByYWZJbmRleCA9IGdldERpc3QgPSB0b3VjaCA9IG1vdXNlRHJhZyA9IG51bGw7XG4gICAgLy8gY2hlY2sgdmFyaWFibGVzXG4gICAgLy8gW2FuaW1hdGVJbiwgYW5pbWF0ZU91dCwgYW5pbWF0ZURlbGF5LCBhbmltYXRlTm9ybWFsLCBob3Jpem9udGFsLCBvdXRlcldyYXBwZXIsIGlubmVyV3JhcHBlciwgY29udGFpbmVyLCBjb250YWluZXJQYXJlbnQsIGNvbnRhaW5lckhUTUwsIHNsaWRlSXRlbXMsIHNsaWRlQ291bnQsIGJyZWFrcG9pbnRab25lLCB3aW5kb3dXaWR0aCwgYXV0b1dpZHRoLCBmaXhlZFdpZHRoLCBlZGdlUGFkZGluZywgZ3V0dGVyLCB2aWV3cG9ydCwgaXRlbXMsIHNsaWRlQnksIHZpZXdwb3J0TWF4LCBhcnJvd0tleXMsIHNwZWVkLCByZXdpbmQsIGxvb3AsIGF1dG9IZWlnaHQsIHNoZWV0LCBsYXp5bG9hZCwgc2xpZGVQb3NpdGlvbnMsIHNsaWRlSXRlbXNPdXQsIGNsb25lQ291bnQsIHNsaWRlQ291bnROZXcsIGhhc1JpZ2h0RGVhZFpvbmUsIHJpZ2h0Qm91bmRhcnksIHVwZGF0ZUluZGV4QmVmb3JlVHJhbnNmb3JtLCB0cmFuc2Zvcm1BdHRyLCB0cmFuc2Zvcm1QcmVmaXgsIHRyYW5zZm9ybVBvc3RmaXgsIGdldEluZGV4TWF4LCBpbmRleCwgaW5kZXhDYWNoZWQsIGluZGV4TWluLCBpbmRleE1heCwgcmVzaXplVGltZXIsIHN3aXBlQW5nbGUsIG1vdmVEaXJlY3Rpb25FeHBlY3RlZCwgcnVubmluZywgb25Jbml0LCBldmVudHMsIG5ld0NvbnRhaW5lckNsYXNzZXMsIHNsaWRlSWQsIGRpc2FibGUsIGRpc2FibGVkLCBmcmVlemFibGUsIGZyZWV6ZSwgZnJvemVuLCBjb250cm9sc0V2ZW50cywgbmF2RXZlbnRzLCBob3ZlckV2ZW50cywgdmlzaWJpbGl0eUV2ZW50LCBkb2NtZW50S2V5ZG93bkV2ZW50LCB0b3VjaEV2ZW50cywgZHJhZ0V2ZW50cywgaGFzQ29udHJvbHMsIGhhc05hdiwgbmF2QXNUaHVtYm5haWxzLCBoYXNBdXRvcGxheSwgaGFzVG91Y2gsIGhhc01vdXNlRHJhZywgc2xpZGVBY3RpdmVDbGFzcywgaW1nQ29tcGxldGVDbGFzcywgaW1nRXZlbnRzLCBpbWdzQ29tcGxldGUsIGNvbnRyb2xzLCBjb250cm9sc1RleHQsIGNvbnRyb2xzQ29udGFpbmVyLCBjb250cm9sc0NvbnRhaW5lckhUTUwsIHByZXZCdXR0b24sIG5leHRCdXR0b24sIHByZXZJc0J1dHRvbiwgbmV4dElzQnV0dG9uLCBuYXYsIG5hdkNvbnRhaW5lciwgbmF2Q29udGFpbmVySFRNTCwgbmF2SXRlbXMsIHBhZ2VzLCBwYWdlc0NhY2hlZCwgbmF2Q2xpY2tlZCwgbmF2Q3VycmVudEluZGV4LCBuYXZDdXJyZW50SW5kZXhDYWNoZWQsIG5hdkFjdGl2ZUNsYXNzLCBuYXZTdHIsIG5hdlN0ckN1cnJlbnQsIGF1dG9wbGF5LCBhdXRvcGxheVRpbWVvdXQsIGF1dG9wbGF5RGlyZWN0aW9uLCBhdXRvcGxheVRleHQsIGF1dG9wbGF5SG92ZXJQYXVzZSwgYXV0b3BsYXlCdXR0b24sIGF1dG9wbGF5QnV0dG9uSFRNTCwgYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSwgYXV0b3BsYXlIdG1sU3RyaW5ncywgYXV0b3BsYXlUaW1lciwgYW5pbWF0aW5nLCBhdXRvcGxheUhvdmVyUGF1c2VkLCBhdXRvcGxheVVzZXJQYXVzZWQsIGF1dG9wbGF5VmlzaWJpbGl0eVBhdXNlZCwgaW5pdFBvc2l0aW9uLCBsYXN0UG9zaXRpb24sIHRyYW5zbGF0ZUluaXQsIGRpc1gsIGRpc1ksIHBhblN0YXJ0LCByYWZJbmRleCwgZ2V0RGlzdCwgdG91Y2gsIG1vdXNlRHJhZyBdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyBpZiAoaXRlbSAhPT0gbnVsbCkgeyBjb25zb2xlLmxvZyhpdGVtKTsgfSB9KTtcblxuICAgIGZvciAodmFyIGEgaW4gdGhpcykge1xuICAgICAgaWYgKGEgIT09ICdyZWJ1aWxkJykgeyB0aGlzW2FdID0gbnVsbDsgfVxuICAgIH1cbiAgICBpc09uID0gZmFsc2U7XG4gIH1cblxuLy8gPT09IE9OIFJFU0laRSA9PT1cbiAgLy8gcmVzcG9uc2l2ZSB8fCBmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCB8fCAhaG9yaXpvbnRhbFxuICBmdW5jdGlvbiBvblJlc2l6ZSAoZSkge1xuICAgIHJhZihmdW5jdGlvbigpeyByZXNpemVUYXNrcyhnZXRFdmVudChlKSk7IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplVGFza3MgKGUpIHtcbiAgICBpZiAoIWlzT24pIHsgcmV0dXJuOyB9XG4gICAgaWYgKG5lc3RlZCA9PT0gJ291dGVyJykgeyBldmVudHMuZW1pdCgnb3V0ZXJSZXNpemVkJywgaW5mbyhlKSk7IH1cbiAgICB3aW5kb3dXaWR0aCA9IGdldFdpbmRvd1dpZHRoKCk7XG4gICAgdmFyIGJwQ2hhbmdlZCxcbiAgICAgICAgYnJlYWtwb2ludFpvbmVUZW0gPSBicmVha3BvaW50Wm9uZSxcbiAgICAgICAgbmVlZENvbnRhaW5lclRyYW5zZm9ybSA9IGZhbHNlO1xuXG4gICAgaWYgKHJlc3BvbnNpdmUpIHtcbiAgICAgIHNldEJyZWFrcG9pbnRab25lKCk7XG4gICAgICBicENoYW5nZWQgPSBicmVha3BvaW50Wm9uZVRlbSAhPT0gYnJlYWtwb2ludFpvbmU7XG4gICAgICAvLyBpZiAoaGFzUmlnaHREZWFkWm9uZSkgeyBuZWVkQ29udGFpbmVyVHJhbnNmb3JtID0gdHJ1ZTsgfSAvLyAqP1xuICAgICAgaWYgKGJwQ2hhbmdlZCkgeyBldmVudHMuZW1pdCgnbmV3QnJlYWtwb2ludFN0YXJ0JywgaW5mbyhlKSk7IH1cbiAgICB9XG5cbiAgICB2YXIgaW5kQ2hhbmdlZCxcbiAgICAgICAgaXRlbXNDaGFuZ2VkLFxuICAgICAgICBpdGVtc1RlbSA9IGl0ZW1zLFxuICAgICAgICBkaXNhYmxlVGVtID0gZGlzYWJsZSxcbiAgICAgICAgZnJlZXplVGVtID0gZnJlZXplLFxuICAgICAgICBhcnJvd0tleXNUZW0gPSBhcnJvd0tleXMsXG4gICAgICAgIGNvbnRyb2xzVGVtID0gY29udHJvbHMsXG4gICAgICAgIG5hdlRlbSA9IG5hdixcbiAgICAgICAgdG91Y2hUZW0gPSB0b3VjaCxcbiAgICAgICAgbW91c2VEcmFnVGVtID0gbW91c2VEcmFnLFxuICAgICAgICBhdXRvcGxheVRlbSA9IGF1dG9wbGF5LFxuICAgICAgICBhdXRvcGxheUhvdmVyUGF1c2VUZW0gPSBhdXRvcGxheUhvdmVyUGF1c2UsXG4gICAgICAgIGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHlUZW0gPSBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5LFxuICAgICAgICBpbmRleFRlbSA9IGluZGV4O1xuXG4gICAgaWYgKGJwQ2hhbmdlZCkge1xuICAgICAgdmFyIGZpeGVkV2lkdGhUZW0gPSBmaXhlZFdpZHRoLFxuICAgICAgICAgIGF1dG9IZWlnaHRUZW0gPSBhdXRvSGVpZ2h0LFxuICAgICAgICAgIGNvbnRyb2xzVGV4dFRlbSA9IGNvbnRyb2xzVGV4dCxcbiAgICAgICAgICBjZW50ZXJUZW0gPSBjZW50ZXIsXG4gICAgICAgICAgYXV0b3BsYXlUZXh0VGVtID0gYXV0b3BsYXlUZXh0O1xuXG4gICAgICBpZiAoIUNTU01RKSB7XG4gICAgICAgIHZhciBndXR0ZXJUZW0gPSBndXR0ZXIsXG4gICAgICAgICAgICBlZGdlUGFkZGluZ1RlbSA9IGVkZ2VQYWRkaW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldCBvcHRpb246XG4gICAgLy8gZml4ZWQgd2lkdGg6IHZpZXdwb3J0LCBmaXhlZFdpZHRoLCBndXR0ZXIgPT4gaXRlbXNcbiAgICAvLyBvdGhlcnM6IHdpbmRvdyB3aWR0aCA9PiBhbGwgdmFyaWFibGVzXG4gICAgLy8gYWxsOiBpdGVtcyA9PiBzbGlkZUJ5XG4gICAgYXJyb3dLZXlzID0gZ2V0T3B0aW9uKCdhcnJvd0tleXMnKTtcbiAgICBjb250cm9scyA9IGdldE9wdGlvbignY29udHJvbHMnKTtcbiAgICBuYXYgPSBnZXRPcHRpb24oJ25hdicpO1xuICAgIHRvdWNoID0gZ2V0T3B0aW9uKCd0b3VjaCcpO1xuICAgIGNlbnRlciA9IGdldE9wdGlvbignY2VudGVyJyk7XG4gICAgbW91c2VEcmFnID0gZ2V0T3B0aW9uKCdtb3VzZURyYWcnKTtcbiAgICBhdXRvcGxheSA9IGdldE9wdGlvbignYXV0b3BsYXknKTtcbiAgICBhdXRvcGxheUhvdmVyUGF1c2UgPSBnZXRPcHRpb24oJ2F1dG9wbGF5SG92ZXJQYXVzZScpO1xuICAgIGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkgPSBnZXRPcHRpb24oJ2F1dG9wbGF5UmVzZXRPblZpc2liaWxpdHknKTtcblxuICAgIGlmIChicENoYW5nZWQpIHtcbiAgICAgIGRpc2FibGUgPSBnZXRPcHRpb24oJ2Rpc2FibGUnKTtcbiAgICAgIGZpeGVkV2lkdGggPSBnZXRPcHRpb24oJ2ZpeGVkV2lkdGgnKTtcbiAgICAgIHNwZWVkID0gZ2V0T3B0aW9uKCdzcGVlZCcpO1xuICAgICAgYXV0b0hlaWdodCA9IGdldE9wdGlvbignYXV0b0hlaWdodCcpO1xuICAgICAgY29udHJvbHNUZXh0ID0gZ2V0T3B0aW9uKCdjb250cm9sc1RleHQnKTtcbiAgICAgIGF1dG9wbGF5VGV4dCA9IGdldE9wdGlvbignYXV0b3BsYXlUZXh0Jyk7XG4gICAgICBhdXRvcGxheVRpbWVvdXQgPSBnZXRPcHRpb24oJ2F1dG9wbGF5VGltZW91dCcpO1xuXG4gICAgICBpZiAoIUNTU01RKSB7XG4gICAgICAgIGVkZ2VQYWRkaW5nID0gZ2V0T3B0aW9uKCdlZGdlUGFkZGluZycpO1xuICAgICAgICBndXR0ZXIgPSBnZXRPcHRpb24oJ2d1dHRlcicpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB1cGRhdGUgb3B0aW9uc1xuICAgIHJlc2V0VmFyaWJsZXNXaGVuRGlzYWJsZShkaXNhYmxlKTtcblxuICAgIHZpZXdwb3J0ID0gZ2V0Vmlld3BvcnRXaWR0aCgpOyAvLyA8PSBlZGdlUGFkZGluZywgZ3V0dGVyXG4gICAgaWYgKCghaG9yaXpvbnRhbCB8fCBhdXRvV2lkdGgpICYmICFkaXNhYmxlKSB7XG4gICAgICBzZXRTbGlkZVBvc2l0aW9ucygpO1xuICAgICAgaWYgKCFob3Jpem9udGFsKSB7XG4gICAgICAgIHVwZGF0ZUNvbnRlbnRXcmFwcGVySGVpZ2h0KCk7IC8vIDw9IHNldFNsaWRlUG9zaXRpb25zXG4gICAgICAgIG5lZWRDb250YWluZXJUcmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGgpIHtcbiAgICAgIHJpZ2h0Qm91bmRhcnkgPSBnZXRSaWdodEJvdW5kYXJ5KCk7IC8vIGF1dG9XaWR0aDogPD0gdmlld3BvcnQsIHNsaWRlUG9zaXRpb25zLCBndXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpeGVkV2lkdGg6IDw9IHZpZXdwb3J0LCBmaXhlZFdpZHRoLCBndXR0ZXJcbiAgICAgIGluZGV4TWF4ID0gZ2V0SW5kZXhNYXgoKTsgLy8gYXV0b1dpZHRoOiA8PSByaWdodEJvdW5kYXJ5LCBzbGlkZVBvc2l0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaXhlZFdpZHRoOiA8PSByaWdodEJvdW5kYXJ5LCBmaXhlZFdpZHRoLCBndXR0ZXJcbiAgICB9XG5cbiAgICBpZiAoYnBDaGFuZ2VkIHx8IGZpeGVkV2lkdGgpIHtcbiAgICAgIGl0ZW1zID0gZ2V0T3B0aW9uKCdpdGVtcycpO1xuICAgICAgc2xpZGVCeSA9IGdldE9wdGlvbignc2xpZGVCeScpO1xuICAgICAgaXRlbXNDaGFuZ2VkID0gaXRlbXMgIT09IGl0ZW1zVGVtO1xuXG4gICAgICBpZiAoaXRlbXNDaGFuZ2VkKSB7XG4gICAgICAgIGlmICghZml4ZWRXaWR0aCAmJiAhYXV0b1dpZHRoKSB7IGluZGV4TWF4ID0gZ2V0SW5kZXhNYXgoKTsgfSAvLyA8PSBpdGVtc1xuICAgICAgICAvLyBjaGVjayBpbmRleCBiZWZvcmUgdHJhbnNmb3JtIGluIGNhc2VcbiAgICAgICAgLy8gc2xpZGVyIHJlYWNoIHRoZSByaWdodCBlZGdlIHRoZW4gaXRlbXMgYmVjb21lIGJpZ2dlclxuICAgICAgICB1cGRhdGVJbmRleCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChicENoYW5nZWQpIHtcbiAgICAgIGlmIChkaXNhYmxlICE9PSBkaXNhYmxlVGVtKSB7XG4gICAgICAgIGlmIChkaXNhYmxlKSB7XG4gICAgICAgICAgZGlzYWJsZVNsaWRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuYWJsZVNsaWRlcigpOyAvLyA8PSBzbGlkZVBvc2l0aW9ucywgcmlnaHRCb3VuZGFyeSwgaW5kZXhNYXhcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmcmVlemFibGUgJiYgKGJwQ2hhbmdlZCB8fCBmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCkpIHtcbiAgICAgIGZyZWV6ZSA9IGdldEZyZWV6ZSgpOyAvLyA8PSBhdXRvV2lkdGg6IHNsaWRlUG9zaXRpb25zLCBndXR0ZXIsIHZpZXdwb3J0LCByaWdodEJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPD0gZml4ZWRXaWR0aDogZml4ZWRXaWR0aCwgZ3V0dGVyLCByaWdodEJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPD0gb3RoZXJzOiBpdGVtc1xuXG4gICAgICBpZiAoZnJlZXplICE9PSBmcmVlemVUZW0pIHtcbiAgICAgICAgaWYgKGZyZWV6ZSkge1xuICAgICAgICAgIGRvQ29udGFpbmVyVHJhbnNmb3JtKGdldENvbnRhaW5lclRyYW5zZm9ybVZhbHVlKGdldFN0YXJ0SW5kZXgoMCkpKTtcbiAgICAgICAgICBmcmVlemVTbGlkZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1bmZyZWV6ZVNsaWRlcigpO1xuICAgICAgICAgIG5lZWRDb250YWluZXJUcmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRWYXJpYmxlc1doZW5EaXNhYmxlKGRpc2FibGUgfHwgZnJlZXplKTsgLy8gY29udHJvbHMsIG5hdiwgdG91Y2gsIG1vdXNlRHJhZywgYXJyb3dLZXlzLCBhdXRvcGxheSwgYXV0b3BsYXlIb3ZlclBhdXNlLCBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5XG4gICAgaWYgKCFhdXRvcGxheSkgeyBhdXRvcGxheUhvdmVyUGF1c2UgPSBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5ID0gZmFsc2U7IH1cblxuICAgIGlmIChhcnJvd0tleXMgIT09IGFycm93S2V5c1RlbSkge1xuICAgICAgYXJyb3dLZXlzID9cbiAgICAgICAgYWRkRXZlbnRzKGRvYywgZG9jbWVudEtleWRvd25FdmVudCkgOlxuICAgICAgICByZW1vdmVFdmVudHMoZG9jLCBkb2NtZW50S2V5ZG93bkV2ZW50KTtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xzICE9PSBjb250cm9sc1RlbSkge1xuICAgICAgaWYgKGNvbnRyb2xzKSB7XG4gICAgICAgIGlmIChjb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICAgIHNob3dFbGVtZW50KGNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocHJldkJ1dHRvbikgeyBzaG93RWxlbWVudChwcmV2QnV0dG9uKTsgfVxuICAgICAgICAgIGlmIChuZXh0QnV0dG9uKSB7IHNob3dFbGVtZW50KG5leHRCdXR0b24pOyB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICAgIGhpZGVFbGVtZW50KGNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocHJldkJ1dHRvbikgeyBoaWRlRWxlbWVudChwcmV2QnV0dG9uKTsgfVxuICAgICAgICAgIGlmIChuZXh0QnV0dG9uKSB7IGhpZGVFbGVtZW50KG5leHRCdXR0b24pOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5hdiAhPT0gbmF2VGVtKSB7XG4gICAgICBpZiAobmF2KSB7XG4gICAgICAgIHNob3dFbGVtZW50KG5hdkNvbnRhaW5lcik7XG4gICAgICAgIHVwZGF0ZU5hdlZpc2liaWxpdHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpZGVFbGVtZW50KG5hdkNvbnRhaW5lcilcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRvdWNoICE9PSB0b3VjaFRlbSkge1xuICAgICAgdG91Y2ggP1xuICAgICAgICBhZGRFdmVudHMoY29udGFpbmVyLCB0b3VjaEV2ZW50cywgb3B0aW9ucy5wcmV2ZW50U2Nyb2xsT25Ub3VjaCkgOlxuICAgICAgICByZW1vdmVFdmVudHMoY29udGFpbmVyLCB0b3VjaEV2ZW50cyk7XG4gICAgfVxuICAgIGlmIChtb3VzZURyYWcgIT09IG1vdXNlRHJhZ1RlbSkge1xuICAgICAgbW91c2VEcmFnID9cbiAgICAgICAgYWRkRXZlbnRzKGNvbnRhaW5lciwgZHJhZ0V2ZW50cykgOlxuICAgICAgICByZW1vdmVFdmVudHMoY29udGFpbmVyLCBkcmFnRXZlbnRzKTtcbiAgICB9XG4gICAgaWYgKGF1dG9wbGF5ICE9PSBhdXRvcGxheVRlbSkge1xuICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIGlmIChhdXRvcGxheUJ1dHRvbikgeyBzaG93RWxlbWVudChhdXRvcGxheUJ1dHRvbik7IH1cbiAgICAgICAgaWYgKCFhbmltYXRpbmcgJiYgIWF1dG9wbGF5VXNlclBhdXNlZCkgeyBzdGFydEF1dG9wbGF5KCk7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChhdXRvcGxheUJ1dHRvbikgeyBoaWRlRWxlbWVudChhdXRvcGxheUJ1dHRvbik7IH1cbiAgICAgICAgaWYgKGFuaW1hdGluZykgeyBzdG9wQXV0b3BsYXkoKTsgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYXV0b3BsYXlIb3ZlclBhdXNlICE9PSBhdXRvcGxheUhvdmVyUGF1c2VUZW0pIHtcbiAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZSA/XG4gICAgICAgIGFkZEV2ZW50cyhjb250YWluZXIsIGhvdmVyRXZlbnRzKSA6XG4gICAgICAgIHJlbW92ZUV2ZW50cyhjb250YWluZXIsIGhvdmVyRXZlbnRzKTtcbiAgICB9XG4gICAgaWYgKGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkgIT09IGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHlUZW0pIHtcbiAgICAgIGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkgP1xuICAgICAgICBhZGRFdmVudHMoZG9jLCB2aXNpYmlsaXR5RXZlbnQpIDpcbiAgICAgICAgcmVtb3ZlRXZlbnRzKGRvYywgdmlzaWJpbGl0eUV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoYnBDaGFuZ2VkKSB7XG4gICAgICBpZiAoZml4ZWRXaWR0aCAhPT0gZml4ZWRXaWR0aFRlbSB8fCBjZW50ZXIgIT09IGNlbnRlclRlbSkgeyBuZWVkQ29udGFpbmVyVHJhbnNmb3JtID0gdHJ1ZTsgfVxuXG4gICAgICBpZiAoYXV0b0hlaWdodCAhPT0gYXV0b0hlaWdodFRlbSkge1xuICAgICAgICBpZiAoIWF1dG9IZWlnaHQpIHsgaW5uZXJXcmFwcGVyLnN0eWxlLmhlaWdodCA9ICcnOyB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb250cm9scyAmJiBjb250cm9sc1RleHQgIT09IGNvbnRyb2xzVGV4dFRlbSkge1xuICAgICAgICBwcmV2QnV0dG9uLmlubmVySFRNTCA9IGNvbnRyb2xzVGV4dFswXTtcbiAgICAgICAgbmV4dEJ1dHRvbi5pbm5lckhUTUwgPSBjb250cm9sc1RleHRbMV07XG4gICAgICB9XG5cbiAgICAgIGlmIChhdXRvcGxheUJ1dHRvbiAmJiBhdXRvcGxheVRleHQgIT09IGF1dG9wbGF5VGV4dFRlbSkge1xuICAgICAgICB2YXIgaSA9IGF1dG9wbGF5ID8gMSA6IDAsXG4gICAgICAgICAgICBodG1sID0gYXV0b3BsYXlCdXR0b24uaW5uZXJIVE1MLFxuICAgICAgICAgICAgbGVuID0gaHRtbC5sZW5ndGggLSBhdXRvcGxheVRleHRUZW1baV0ubGVuZ3RoO1xuICAgICAgICBpZiAoaHRtbC5zdWJzdHJpbmcobGVuKSA9PT0gYXV0b3BsYXlUZXh0VGVtW2ldKSB7XG4gICAgICAgICAgYXV0b3BsYXlCdXR0b24uaW5uZXJIVE1MID0gaHRtbC5zdWJzdHJpbmcoMCwgbGVuKSArIGF1dG9wbGF5VGV4dFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2VudGVyICYmIChmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCkpIHsgbmVlZENvbnRhaW5lclRyYW5zZm9ybSA9IHRydWU7IH1cbiAgICB9XG5cbiAgICBpZiAoaXRlbXNDaGFuZ2VkIHx8IGZpeGVkV2lkdGggJiYgIWF1dG9XaWR0aCkge1xuICAgICAgcGFnZXMgPSBnZXRQYWdlcygpO1xuICAgICAgdXBkYXRlTmF2VmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIGluZENoYW5nZWQgPSBpbmRleCAhPT0gaW5kZXhUZW07XG4gICAgaWYgKGluZENoYW5nZWQpIHtcbiAgICAgIGV2ZW50cy5lbWl0KCdpbmRleENoYW5nZWQnLCBpbmZvKCkpO1xuICAgICAgbmVlZENvbnRhaW5lclRyYW5zZm9ybSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChpdGVtc0NoYW5nZWQpIHtcbiAgICAgIGlmICghaW5kQ2hhbmdlZCkgeyBhZGRpdGlvbmFsVXBkYXRlcygpOyB9XG4gICAgfSBlbHNlIGlmIChmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCkge1xuICAgICAgZG9MYXp5TG9hZCgpO1xuICAgICAgdXBkYXRlU2xpZGVTdGF0dXMoKTtcbiAgICAgIHVwZGF0ZUxpdmVSZWdpb24oKTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbXNDaGFuZ2VkICYmICFjYXJvdXNlbCkgeyB1cGRhdGVHYWxsZXJ5U2xpZGVQb3NpdGlvbnMoKTsgfVxuXG4gICAgaWYgKCFkaXNhYmxlICYmICFmcmVlemUpIHtcbiAgICAgIC8vIG5vbi1tZWRpYXF1ZXJpZXM6IElFOFxuICAgICAgaWYgKGJwQ2hhbmdlZCAmJiAhQ1NTTVEpIHtcbiAgICAgICAgLy8gbWlkZGxlIHdyYXBwZXIgc3R5bGVzXG5cbiAgICAgICAgLy8gaW5uZXIgd3JhcHBlciBzdHlsZXNcbiAgICAgICAgaWYgKGVkZ2VQYWRkaW5nICE9PSBlZGdlUGFkZGluZ1RlbSB8fCBndXR0ZXIgIT09IGd1dHRlclRlbSkge1xuICAgICAgICAgIGlubmVyV3JhcHBlci5zdHlsZS5jc3NUZXh0ID0gZ2V0SW5uZXJXcmFwcGVyU3R5bGVzKGVkZ2VQYWRkaW5nLCBndXR0ZXIsIGZpeGVkV2lkdGgsIHNwZWVkLCBhdXRvSGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgLy8gY29udGFpbmVyIHN0eWxlc1xuICAgICAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gZ2V0Q29udGFpbmVyV2lkdGgoZml4ZWRXaWR0aCwgZ3V0dGVyLCBpdGVtcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2xpZGUgc3R5bGVzXG4gICAgICAgICAgdmFyIHN0ciA9IGdldFNsaWRlV2lkdGhTdHlsZShmaXhlZFdpZHRoLCBndXR0ZXIsIGl0ZW1zKSArXG4gICAgICAgICAgICAgICAgICAgIGdldFNsaWRlR3V0dGVyU3R5bGUoZ3V0dGVyKTtcblxuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbGFzdCBsaW5lIGFuZFxuICAgICAgICAgIC8vIGFkZCBuZXcgc3R5bGVzXG4gICAgICAgICAgcmVtb3ZlQ1NTUnVsZShzaGVldCwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpIC0gMSk7XG4gICAgICAgICAgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCArICcgPiAudG5zLWl0ZW0nLCBzdHIsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYXV0byBoZWlnaHRcbiAgICAgIGlmIChhdXRvSGVpZ2h0KSB7IGRvQXV0b0hlaWdodCgpOyB9XG5cbiAgICAgIGlmIChuZWVkQ29udGFpbmVyVHJhbnNmb3JtKSB7XG4gICAgICAgIGRvQ29udGFpbmVyVHJhbnNmb3JtU2lsZW50KCk7XG4gICAgICAgIGluZGV4Q2FjaGVkID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGJwQ2hhbmdlZCkgeyBldmVudHMuZW1pdCgnbmV3QnJlYWtwb2ludEVuZCcsIGluZm8oZSkpOyB9XG4gIH1cblxuXG5cblxuXG4gIC8vID09PSBJTklUSUFMSVpBVElPTiBGVU5DVElPTlMgPT09IC8vXG4gIGZ1bmN0aW9uIGdldEZyZWV6ZSAoKSB7XG4gICAgaWYgKCFmaXhlZFdpZHRoICYmICFhdXRvV2lkdGgpIHtcbiAgICAgIHZhciBhID0gY2VudGVyID8gaXRlbXMgLSAoaXRlbXMgLSAxKSAvIDIgOiBpdGVtcztcbiAgICAgIHJldHVybiAgc2xpZGVDb3VudCA8PSBhO1xuICAgIH1cblxuICAgIHZhciB3aWR0aCA9IGZpeGVkV2lkdGggPyAoZml4ZWRXaWR0aCArIGd1dHRlcikgKiBzbGlkZUNvdW50IDogc2xpZGVQb3NpdGlvbnNbc2xpZGVDb3VudF0sXG4gICAgICAgIHZwID0gZWRnZVBhZGRpbmcgPyB2aWV3cG9ydCArIGVkZ2VQYWRkaW5nICogMiA6IHZpZXdwb3J0ICsgZ3V0dGVyO1xuXG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgdnAgLT0gZml4ZWRXaWR0aCA/ICh2aWV3cG9ydCAtIGZpeGVkV2lkdGgpIC8gMiA6ICh2aWV3cG9ydCAtIChzbGlkZVBvc2l0aW9uc1tpbmRleCArIDFdIC0gc2xpZGVQb3NpdGlvbnNbaW5kZXhdIC0gZ3V0dGVyKSkgLyAyO1xuICAgIH1cblxuICAgIHJldHVybiB3aWR0aCA8PSB2cDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEJyZWFrcG9pbnRab25lICgpIHtcbiAgICBicmVha3BvaW50Wm9uZSA9IDA7XG4gICAgZm9yICh2YXIgYnAgaW4gcmVzcG9uc2l2ZSkge1xuICAgICAgYnAgPSBwYXJzZUludChicCk7IC8vIGNvbnZlcnQgc3RyaW5nIHRvIG51bWJlclxuICAgICAgaWYgKHdpbmRvd1dpZHRoID49IGJwKSB7IGJyZWFrcG9pbnRab25lID0gYnA7IH1cbiAgICB9XG4gIH1cblxuICAvLyAoc2xpZGVCeSwgaW5kZXhNaW4sIGluZGV4TWF4KSA9PiBpbmRleFxuICB2YXIgdXBkYXRlSW5kZXggPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBsb29wID9cbiAgICAgIGNhcm91c2VsID9cbiAgICAgICAgLy8gbG9vcCArIGNhcm91c2VsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgbGVmdEVkZ2UgPSBpbmRleE1pbixcbiAgICAgICAgICAgICAgcmlnaHRFZGdlID0gaW5kZXhNYXg7XG5cbiAgICAgICAgICBsZWZ0RWRnZSArPSBzbGlkZUJ5O1xuICAgICAgICAgIHJpZ2h0RWRnZSAtPSBzbGlkZUJ5O1xuXG4gICAgICAgICAgLy8gYWRqdXN0IGVkZ2VzIHdoZW4gaGFzIGVkZ2UgcGFkZGluZ3NcbiAgICAgICAgICAvLyBvciBmaXhlZC13aWR0aCBzbGlkZXIgd2l0aCBleHRyYSBzcGFjZSBvbiB0aGUgcmlnaHQgc2lkZVxuICAgICAgICAgIGlmIChlZGdlUGFkZGluZykge1xuICAgICAgICAgICAgbGVmdEVkZ2UgKz0gMTtcbiAgICAgICAgICAgIHJpZ2h0RWRnZSAtPSAxO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZml4ZWRXaWR0aCkge1xuICAgICAgICAgICAgaWYgKCh2aWV3cG9ydCArIGd1dHRlciklKGZpeGVkV2lkdGggKyBndXR0ZXIpKSB7IHJpZ2h0RWRnZSAtPSAxOyB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNsb25lQ291bnQpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IHJpZ2h0RWRnZSkge1xuICAgICAgICAgICAgICBpbmRleCAtPSBzbGlkZUNvdW50O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGxlZnRFZGdlKSB7XG4gICAgICAgICAgICAgIGluZGV4ICs9IHNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IDpcbiAgICAgICAgLy8gbG9vcCArIGdhbGxlcnlcbiAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKGluZGV4ID4gaW5kZXhNYXgpIHtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA+PSBpbmRleE1pbiArIHNsaWRlQ291bnQpIHsgaW5kZXggLT0gc2xpZGVDb3VudDsgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCBpbmRleE1pbikge1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDw9IGluZGV4TWF4IC0gc2xpZGVDb3VudCkgeyBpbmRleCArPSBzbGlkZUNvdW50OyB9XG4gICAgICAgICAgfVxuICAgICAgICB9IDpcbiAgICAgIC8vIG5vbi1sb29wXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgaW5kZXggPSBNYXRoLm1heChpbmRleE1pbiwgTWF0aC5taW4oaW5kZXhNYXgsIGluZGV4KSk7XG4gICAgICB9O1xuICB9KSgpO1xuXG4gIGZ1bmN0aW9uIGRpc2FibGVVSSAoKSB7XG4gICAgaWYgKCFhdXRvcGxheSAmJiBhdXRvcGxheUJ1dHRvbikgeyBoaWRlRWxlbWVudChhdXRvcGxheUJ1dHRvbik7IH1cbiAgICBpZiAoIW5hdiAmJiBuYXZDb250YWluZXIpIHsgaGlkZUVsZW1lbnQobmF2Q29udGFpbmVyKTsgfVxuICAgIGlmICghY29udHJvbHMpIHtcbiAgICAgIGlmIChjb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICBoaWRlRWxlbWVudChjb250cm9sc0NvbnRhaW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJldkJ1dHRvbikgeyBoaWRlRWxlbWVudChwcmV2QnV0dG9uKTsgfVxuICAgICAgICBpZiAobmV4dEJ1dHRvbikgeyBoaWRlRWxlbWVudChuZXh0QnV0dG9uKTsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVuYWJsZVVJICgpIHtcbiAgICBpZiAoYXV0b3BsYXkgJiYgYXV0b3BsYXlCdXR0b24pIHsgc2hvd0VsZW1lbnQoYXV0b3BsYXlCdXR0b24pOyB9XG4gICAgaWYgKG5hdiAmJiBuYXZDb250YWluZXIpIHsgc2hvd0VsZW1lbnQobmF2Q29udGFpbmVyKTsgfVxuICAgIGlmIChjb250cm9scykge1xuICAgICAgaWYgKGNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgICAgIHNob3dFbGVtZW50KGNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcmV2QnV0dG9uKSB7IHNob3dFbGVtZW50KHByZXZCdXR0b24pOyB9XG4gICAgICAgIGlmIChuZXh0QnV0dG9uKSB7IHNob3dFbGVtZW50KG5leHRCdXR0b24pOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZnJlZXplU2xpZGVyICgpIHtcbiAgICBpZiAoZnJvemVuKSB7IHJldHVybjsgfVxuXG4gICAgLy8gcmVtb3ZlIGVkZ2UgcGFkZGluZyBmcm9tIGlubmVyIHdyYXBwZXJcbiAgICBpZiAoZWRnZVBhZGRpbmcpIHsgaW5uZXJXcmFwcGVyLnN0eWxlLm1hcmdpbiA9ICcwcHgnOyB9XG5cbiAgICAvLyBhZGQgY2xhc3MgdG5zLXRyYW5zcGFyZW50IHRvIGNsb25lZCBzbGlkZXNcbiAgICBpZiAoY2xvbmVDb3VudCkge1xuICAgICAgdmFyIHN0ciA9ICd0bnMtdHJhbnNwYXJlbnQnO1xuICAgICAgZm9yICh2YXIgaSA9IGNsb25lQ291bnQ7IGktLTspIHtcbiAgICAgICAgaWYgKGNhcm91c2VsKSB7IGFkZENsYXNzKHNsaWRlSXRlbXNbaV0sIHN0cik7IH1cbiAgICAgICAgYWRkQ2xhc3Moc2xpZGVJdGVtc1tzbGlkZUNvdW50TmV3IC0gaSAtIDFdLCBzdHIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0b29sc1xuICAgIGRpc2FibGVVSSgpO1xuXG4gICAgZnJvemVuID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZnJlZXplU2xpZGVyICgpIHtcbiAgICBpZiAoIWZyb3plbikgeyByZXR1cm47IH1cblxuICAgIC8vIHJlc3RvcmUgZWRnZSBwYWRkaW5nIGZvciBpbm5lciB3cmFwcGVyXG4gICAgLy8gZm9yIG1vcmRlcm4gYnJvd3NlcnNcbiAgICBpZiAoZWRnZVBhZGRpbmcgJiYgQ1NTTVEpIHsgaW5uZXJXcmFwcGVyLnN0eWxlLm1hcmdpbiA9ICcnOyB9XG5cbiAgICAvLyByZW1vdmUgY2xhc3MgdG5zLXRyYW5zcGFyZW50IHRvIGNsb25lZCBzbGlkZXNcbiAgICBpZiAoY2xvbmVDb3VudCkge1xuICAgICAgdmFyIHN0ciA9ICd0bnMtdHJhbnNwYXJlbnQnO1xuICAgICAgZm9yICh2YXIgaSA9IGNsb25lQ291bnQ7IGktLTspIHtcbiAgICAgICAgaWYgKGNhcm91c2VsKSB7IHJlbW92ZUNsYXNzKHNsaWRlSXRlbXNbaV0sIHN0cik7IH1cbiAgICAgICAgcmVtb3ZlQ2xhc3Moc2xpZGVJdGVtc1tzbGlkZUNvdW50TmV3IC0gaSAtIDFdLCBzdHIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0b29sc1xuICAgIGVuYWJsZVVJKCk7XG5cbiAgICBmcm96ZW4gPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGVTbGlkZXIgKCkge1xuICAgIGlmIChkaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgIHNoZWV0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gY29udGFpbmVyLmNsYXNzTmFtZS5yZXBsYWNlKG5ld0NvbnRhaW5lckNsYXNzZXMuc3Vic3RyaW5nKDEpLCAnJyk7XG4gICAgcmVtb3ZlQXR0cnMoY29udGFpbmVyLCBbJ3N0eWxlJ10pO1xuICAgIGlmIChsb29wKSB7XG4gICAgICBmb3IgKHZhciBqID0gY2xvbmVDb3VudDsgai0tOykge1xuICAgICAgICBpZiAoY2Fyb3VzZWwpIHsgaGlkZUVsZW1lbnQoc2xpZGVJdGVtc1tqXSk7IH1cbiAgICAgICAgaGlkZUVsZW1lbnQoc2xpZGVJdGVtc1tzbGlkZUNvdW50TmV3IC0gaiAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB2ZXJ0aWNhbCBzbGlkZXJcbiAgICBpZiAoIWhvcml6b250YWwgfHwgIWNhcm91c2VsKSB7IHJlbW92ZUF0dHJzKGlubmVyV3JhcHBlciwgWydzdHlsZSddKTsgfVxuXG4gICAgLy8gZ2FsbGVyeVxuICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgIGZvciAodmFyIGkgPSBpbmRleCwgbCA9IGluZGV4ICsgc2xpZGVDb3VudDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IHNsaWRlSXRlbXNbaV07XG4gICAgICAgIHJlbW92ZUF0dHJzKGl0ZW0sIFsnc3R5bGUnXSk7XG4gICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGFuaW1hdGVJbik7XG4gICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGFuaW1hdGVOb3JtYWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0b29sc1xuICAgIGRpc2FibGVVSSgpO1xuXG4gICAgZGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5hYmxlU2xpZGVyICgpIHtcbiAgICBpZiAoIWRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgc2hlZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBjb250YWluZXIuY2xhc3NOYW1lICs9IG5ld0NvbnRhaW5lckNsYXNzZXM7XG4gICAgZG9Db250YWluZXJUcmFuc2Zvcm1TaWxlbnQoKTtcblxuICAgIGlmIChsb29wKSB7XG4gICAgICBmb3IgKHZhciBqID0gY2xvbmVDb3VudDsgai0tOykge1xuICAgICAgICBpZiAoY2Fyb3VzZWwpIHsgc2hvd0VsZW1lbnQoc2xpZGVJdGVtc1tqXSk7IH1cbiAgICAgICAgc2hvd0VsZW1lbnQoc2xpZGVJdGVtc1tzbGlkZUNvdW50TmV3IC0gaiAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnYWxsZXJ5XG4gICAgaWYgKCFjYXJvdXNlbCkge1xuICAgICAgZm9yICh2YXIgaSA9IGluZGV4LCBsID0gaW5kZXggKyBzbGlkZUNvdW50OyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gc2xpZGVJdGVtc1tpXSxcbiAgICAgICAgICAgIGNsYXNzTiA9IGkgPCBpbmRleCArIGl0ZW1zID8gYW5pbWF0ZUluIDogYW5pbWF0ZU5vcm1hbDtcbiAgICAgICAgaXRlbS5zdHlsZS5sZWZ0ID0gKGkgLSBpbmRleCkgKiAxMDAgLyBpdGVtcyArICclJztcbiAgICAgICAgYWRkQ2xhc3MoaXRlbSwgY2xhc3NOKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdG9vbHNcbiAgICBlbmFibGVVSSgpO1xuXG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUxpdmVSZWdpb24gKCkge1xuICAgIHZhciBzdHIgPSBnZXRMaXZlUmVnaW9uU3RyKCk7XG4gICAgaWYgKGxpdmVyZWdpb25DdXJyZW50LmlubmVySFRNTCAhPT0gc3RyKSB7IGxpdmVyZWdpb25DdXJyZW50LmlubmVySFRNTCA9IHN0cjsgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGl2ZVJlZ2lvblN0ciAoKSB7XG4gICAgdmFyIGFyciA9IGdldFZpc2libGVTbGlkZVJhbmdlKCksXG4gICAgICAgIHN0YXJ0ID0gYXJyWzBdICsgMSxcbiAgICAgICAgZW5kID0gYXJyWzFdICsgMTtcbiAgICByZXR1cm4gc3RhcnQgPT09IGVuZCA/IHN0YXJ0ICsgJycgOiBzdGFydCArICcgdG8gJyArIGVuZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFZpc2libGVTbGlkZVJhbmdlICh2YWwpIHtcbiAgICBpZiAodmFsID09IG51bGwpIHsgdmFsID0gZ2V0Q29udGFpbmVyVHJhbnNmb3JtVmFsdWUoKTsgfVxuICAgIHZhciBzdGFydCA9IGluZGV4LCBlbmQsIHJhbmdlc3RhcnQsIHJhbmdlZW5kO1xuXG4gICAgLy8gZ2V0IHJhbmdlIHN0YXJ0LCByYW5nZSBlbmQgZm9yIGF1dG9XaWR0aCBhbmQgZml4ZWRXaWR0aFxuICAgIGlmIChjZW50ZXIgfHwgZWRnZVBhZGRpbmcpIHtcbiAgICAgIGlmIChhdXRvV2lkdGggfHwgZml4ZWRXaWR0aCkge1xuICAgICAgICByYW5nZXN0YXJ0ID0gLSAocGFyc2VGbG9hdCh2YWwpICsgZWRnZVBhZGRpbmcpO1xuICAgICAgICByYW5nZWVuZCA9IHJhbmdlc3RhcnQgKyB2aWV3cG9ydCArIGVkZ2VQYWRkaW5nICogMjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGF1dG9XaWR0aCkge1xuICAgICAgICByYW5nZXN0YXJ0ID0gc2xpZGVQb3NpdGlvbnNbaW5kZXhdO1xuICAgICAgICByYW5nZWVuZCA9IHJhbmdlc3RhcnQgKyB2aWV3cG9ydDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXQgc3RhcnQsIGVuZFxuICAgIC8vIC0gY2hlY2sgYXV0byB3aWR0aFxuICAgIGlmIChhdXRvV2lkdGgpIHtcbiAgICAgIHNsaWRlUG9zaXRpb25zLmZvckVhY2goZnVuY3Rpb24ocG9pbnQsIGkpIHtcbiAgICAgICAgaWYgKGkgPCBzbGlkZUNvdW50TmV3KSB7XG4gICAgICAgICAgaWYgKChjZW50ZXIgfHwgZWRnZVBhZGRpbmcpICYmIHBvaW50IDw9IHJhbmdlc3RhcnQgKyAwLjUpIHsgc3RhcnQgPSBpOyB9XG4gICAgICAgICAgaWYgKHJhbmdlZW5kIC0gcG9pbnQgPj0gMC41KSB7IGVuZCA9IGk7IH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAvLyAtIGNoZWNrIHBlcmNlbnRhZ2Ugd2lkdGgsIGZpeGVkIHdpZHRoXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKGZpeGVkV2lkdGgpIHtcbiAgICAgICAgdmFyIGNlbGwgPSBmaXhlZFdpZHRoICsgZ3V0dGVyO1xuICAgICAgICBpZiAoY2VudGVyIHx8IGVkZ2VQYWRkaW5nKSB7XG4gICAgICAgICAgc3RhcnQgPSBNYXRoLmZsb29yKHJhbmdlc3RhcnQvY2VsbCk7XG4gICAgICAgICAgZW5kID0gTWF0aC5jZWlsKHJhbmdlZW5kL2NlbGwgLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmQgPSBzdGFydCArIE1hdGguY2VpbCh2aWV3cG9ydC9jZWxsKSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNlbnRlciB8fCBlZGdlUGFkZGluZykge1xuICAgICAgICAgIHZhciBhID0gaXRlbXMgLSAxO1xuICAgICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIHN0YXJ0IC09IGEgLyAyO1xuICAgICAgICAgICAgZW5kID0gaW5kZXggKyBhIC8gMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kID0gaW5kZXggKyBhO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlZGdlUGFkZGluZykge1xuICAgICAgICAgICAgdmFyIGIgPSBlZGdlUGFkZGluZyAqIGl0ZW1zIC8gdmlld3BvcnQ7XG4gICAgICAgICAgICBzdGFydCAtPSBiO1xuICAgICAgICAgICAgZW5kICs9IGI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3RhcnQgPSBNYXRoLmZsb29yKHN0YXJ0KTtcbiAgICAgICAgICBlbmQgPSBNYXRoLmNlaWwoZW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmQgPSBzdGFydCArIGl0ZW1zIC0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdGFydCA9IE1hdGgubWF4KHN0YXJ0LCAwKTtcbiAgICAgIGVuZCA9IE1hdGgubWluKGVuZCwgc2xpZGVDb3VudE5ldyAtIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICBmdW5jdGlvbiBkb0xhenlMb2FkICgpIHtcbiAgICBpZiAobGF6eWxvYWQgJiYgIWRpc2FibGUpIHtcbiAgICAgIHZhciBhcmcgPSBnZXRWaXNpYmxlU2xpZGVSYW5nZSgpO1xuICAgICAgYXJnLnB1c2gobGF6eWxvYWRTZWxlY3Rvcik7XG5cbiAgICAgIGdldEltYWdlQXJyYXkuYXBwbHkobnVsbCwgYXJnKS5mb3JFYWNoKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgaWYgKCFoYXNDbGFzcyhpbWcsIGltZ0NvbXBsZXRlQ2xhc3MpKSB7XG4gICAgICAgICAgLy8gc3RvcCBwcm9wYWdhdGlvbiB0cmFuc2l0aW9uZW5kIGV2ZW50IHRvIGNvbnRhaW5lclxuICAgICAgICAgIHZhciBldmUgPSB7fTtcbiAgICAgICAgICBldmVbVFJBTlNJVElPTkVORF0gPSBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpOyB9O1xuICAgICAgICAgIGFkZEV2ZW50cyhpbWcsIGV2ZSk7XG5cbiAgICAgICAgICBhZGRFdmVudHMoaW1nLCBpbWdFdmVudHMpO1xuXG4gICAgICAgICAgLy8gdXBkYXRlIHNyY1xuICAgICAgICAgIGltZy5zcmMgPSBnZXRBdHRyKGltZywgJ2RhdGEtc3JjJyk7XG5cbiAgICAgICAgICAvLyB1cGRhdGUgc3Jjc2V0XG4gICAgICAgICAgdmFyIHNyY3NldCA9IGdldEF0dHIoaW1nLCAnZGF0YS1zcmNzZXQnKTtcbiAgICAgICAgICBpZiAoc3Jjc2V0KSB7IGltZy5zcmNzZXQgPSBzcmNzZXQ7IH1cblxuICAgICAgICAgIGFkZENsYXNzKGltZywgJ2xvYWRpbmcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25JbWdMb2FkZWQgKGUpIHtcbiAgICBpbWdMb2FkZWQoZ2V0VGFyZ2V0KGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uSW1nRmFpbGVkIChlKSB7XG4gICAgaW1nRmFpbGVkKGdldFRhcmdldChlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbWdMb2FkZWQgKGltZykge1xuICAgIGFkZENsYXNzKGltZywgJ2xvYWRlZCcpO1xuICAgIGltZ0NvbXBsZXRlZChpbWcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW1nRmFpbGVkIChpbWcpIHtcbiAgICBhZGRDbGFzcyhpbWcsICdmYWlsZWQnKTtcbiAgICBpbWdDb21wbGV0ZWQoaW1nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGltZ0NvbXBsZXRlZCAoaW1nKSB7XG4gICAgYWRkQ2xhc3MoaW1nLCBpbWdDb21wbGV0ZUNsYXNzKTtcbiAgICByZW1vdmVDbGFzcyhpbWcsICdsb2FkaW5nJyk7XG4gICAgcmVtb3ZlRXZlbnRzKGltZywgaW1nRXZlbnRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEltYWdlQXJyYXkgKHN0YXJ0LCBlbmQsIGltZ1NlbGVjdG9yKSB7XG4gICAgdmFyIGltZ3MgPSBbXTtcbiAgICBpZiAoIWltZ1NlbGVjdG9yKSB7IGltZ1NlbGVjdG9yID0gJ2ltZyc7IH1cblxuICAgIHdoaWxlIChzdGFydCA8PSBlbmQpIHtcbiAgICAgIGZvckVhY2goc2xpZGVJdGVtc1tzdGFydF0ucXVlcnlTZWxlY3RvckFsbChpbWdTZWxlY3RvciksIGZ1bmN0aW9uIChpbWcpIHsgaW1ncy5wdXNoKGltZyk7IH0pO1xuICAgICAgc3RhcnQrKztcbiAgICB9XG5cbiAgICByZXR1cm4gaW1ncztcbiAgfVxuXG4gIC8vIGNoZWNrIGlmIGFsbCB2aXNpYmxlIGltYWdlcyBhcmUgbG9hZGVkXG4gIC8vIGFuZCB1cGRhdGUgY29udGFpbmVyIGhlaWdodCBpZiBpdCdzIGRvbmVcbiAgZnVuY3Rpb24gZG9BdXRvSGVpZ2h0ICgpIHtcbiAgICB2YXIgaW1ncyA9IGdldEltYWdlQXJyYXkuYXBwbHkobnVsbCwgZ2V0VmlzaWJsZVNsaWRlUmFuZ2UoKSk7XG4gICAgcmFmKGZ1bmN0aW9uKCl7IGltZ3NMb2FkZWRDaGVjayhpbWdzLCB1cGRhdGVJbm5lcldyYXBwZXJIZWlnaHQpOyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGltZ3NMb2FkZWRDaGVjayAoaW1ncywgY2IpIHtcbiAgICAvLyBleGVjdXRlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIGFsbCBpbWFnZXMgYXJlIGNvbXBsZXRlXG4gICAgaWYgKGltZ3NDb21wbGV0ZSkgeyByZXR1cm4gY2IoKTsgfVxuXG4gICAgLy8gY2hlY2sgaW1hZ2UgY2xhc3Nlc1xuICAgIGltZ3MuZm9yRWFjaChmdW5jdGlvbiAoaW1nLCBpbmRleCkge1xuICAgICAgaWYgKCFsYXp5bG9hZCAmJiBpbWcuY29tcGxldGUpIHsgaW1nQ29tcGxldGVkKGltZyk7IH0gLy8gQ2hlY2sgaW1hZ2UuY29tcGxldGVcbiAgICAgIGlmIChoYXNDbGFzcyhpbWcsIGltZ0NvbXBsZXRlQ2xhc3MpKSB7IGltZ3Muc3BsaWNlKGluZGV4LCAxKTsgfVxuICAgIH0pO1xuXG4gICAgLy8gZXhlY3V0ZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBzZWxlY3RlZCBpbWFnZXMgYXJlIGFsbCBjb21wbGV0ZVxuICAgIGlmICghaW1ncy5sZW5ndGgpIHsgcmV0dXJuIGNiKCk7IH1cblxuICAgIC8vIG90aGVyd2lzZSBleGVjdXRlIHRoaXMgZnVuY3Rpb25hIGFnYWluXG4gICAgcmFmKGZ1bmN0aW9uKCl7IGltZ3NMb2FkZWRDaGVjayhpbWdzLCBjYik7IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkaXRpb25hbFVwZGF0ZXMgKCkge1xuICAgIGRvTGF6eUxvYWQoKTtcbiAgICB1cGRhdGVTbGlkZVN0YXR1cygpO1xuICAgIHVwZGF0ZUxpdmVSZWdpb24oKTtcbiAgICB1cGRhdGVDb250cm9sc1N0YXR1cygpO1xuICAgIHVwZGF0ZU5hdlN0YXR1cygpO1xuICB9XG5cblxuICBmdW5jdGlvbiB1cGRhdGVfY2Fyb3VzZWxfdHJhbnNpdGlvbl9kdXJhdGlvbiAoKSB7XG4gICAgaWYgKGNhcm91c2VsICYmIGF1dG9IZWlnaHQpIHtcbiAgICAgIG1pZGRsZVdyYXBwZXIuc3R5bGVbVFJBTlNJVElPTkRVUkFUSU9OXSA9IHNwZWVkIC8gMTAwMCArICdzJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXhTbGlkZUhlaWdodCAoc2xpZGVTdGFydCwgc2xpZGVSYW5nZSkge1xuICAgIHZhciBoZWlnaHRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IHNsaWRlU3RhcnQsIGwgPSBNYXRoLm1pbihzbGlkZVN0YXJ0ICsgc2xpZGVSYW5nZSwgc2xpZGVDb3VudE5ldyk7IGkgPCBsOyBpKyspIHtcbiAgICAgIGhlaWdodHMucHVzaChzbGlkZUl0ZW1zW2ldLm9mZnNldEhlaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICB9XG5cbiAgLy8gdXBkYXRlIGlubmVyIHdyYXBwZXIgaGVpZ2h0XG4gIC8vIDEuIGdldCB0aGUgbWF4LWhlaWdodCBvZiB0aGUgdmlzaWJsZSBzbGlkZXNcbiAgLy8gMi4gc2V0IHRyYW5zaXRpb25EdXJhdGlvbiB0byBzcGVlZFxuICAvLyAzLiB1cGRhdGUgaW5uZXIgd3JhcHBlciBoZWlnaHQgdG8gbWF4LWhlaWdodFxuICAvLyA0LiBzZXQgdHJhbnNpdGlvbkR1cmF0aW9uIHRvIDBzIGFmdGVyIHRyYW5zaXRpb24gZG9uZVxuICBmdW5jdGlvbiB1cGRhdGVJbm5lcldyYXBwZXJIZWlnaHQgKCkge1xuICAgIHZhciBtYXhIZWlnaHQgPSBhdXRvSGVpZ2h0ID8gZ2V0TWF4U2xpZGVIZWlnaHQoaW5kZXgsIGl0ZW1zKSA6IGdldE1heFNsaWRlSGVpZ2h0KGNsb25lQ291bnQsIHNsaWRlQ291bnQpLFxuICAgICAgICB3cCA9IG1pZGRsZVdyYXBwZXIgPyBtaWRkbGVXcmFwcGVyIDogaW5uZXJXcmFwcGVyO1xuXG4gICAgaWYgKHdwLnN0eWxlLmhlaWdodCAhPT0gbWF4SGVpZ2h0KSB7IHdwLnN0eWxlLmhlaWdodCA9IG1heEhlaWdodCArICdweCc7IH1cbiAgfVxuXG4gIC8vIGdldCB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGZpcnN0IHNsaWRlIHRvIGVhY2ggc2xpZGVcbiAgLy8gKGluaXQpID0+IHNsaWRlUG9zaXRpb25zXG4gIGZ1bmN0aW9uIHNldFNsaWRlUG9zaXRpb25zICgpIHtcbiAgICBzbGlkZVBvc2l0aW9ucyA9IFswXTtcbiAgICB2YXIgYXR0ciA9IGhvcml6b250YWwgPyAnbGVmdCcgOiAndG9wJyxcbiAgICAgICAgYXR0cjIgPSBob3Jpem9udGFsID8gJ3JpZ2h0JyA6ICdib3R0b20nLFxuICAgICAgICBiYXNlID0gc2xpZGVJdGVtc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVthdHRyXTtcblxuICAgIGZvckVhY2goc2xpZGVJdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgLy8gc2tpcCB0aGUgZmlyc3Qgc2xpZGVcbiAgICAgIGlmIChpKSB7IHNsaWRlUG9zaXRpb25zLnB1c2goaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVthdHRyXSAtIGJhc2UpOyB9XG4gICAgICAvLyBhZGQgdGhlIGVuZCBlZGdlXG4gICAgICBpZiAoaSA9PT0gc2xpZGVDb3VudE5ldyAtIDEpIHsgc2xpZGVQb3NpdGlvbnMucHVzaChpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2F0dHIyXSAtIGJhc2UpOyB9XG4gICAgfSk7XG4gIH1cblxuICAvLyB1cGRhdGUgc2xpZGVcbiAgZnVuY3Rpb24gdXBkYXRlU2xpZGVTdGF0dXMgKCkge1xuICAgIHZhciByYW5nZSA9IGdldFZpc2libGVTbGlkZVJhbmdlKCksXG4gICAgICAgIHN0YXJ0ID0gcmFuZ2VbMF0sXG4gICAgICAgIGVuZCA9IHJhbmdlWzFdO1xuXG4gICAgZm9yRWFjaChzbGlkZUl0ZW1zLCBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAvLyBzaG93IHNsaWRlc1xuICAgICAgaWYgKGkgPj0gc3RhcnQgJiYgaSA8PSBlbmQpIHtcbiAgICAgICAgaWYgKGhhc0F0dHIoaXRlbSwgJ2FyaWEtaGlkZGVuJykpIHtcbiAgICAgICAgICByZW1vdmVBdHRycyhpdGVtLCBbJ2FyaWEtaGlkZGVuJywgJ3RhYmluZGV4J10pO1xuICAgICAgICAgIGFkZENsYXNzKGl0ZW0sIHNsaWRlQWN0aXZlQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAvLyBoaWRlIHNsaWRlc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFoYXNBdHRyKGl0ZW0sICdhcmlhLWhpZGRlbicpKSB7XG4gICAgICAgICAgc2V0QXR0cnMoaXRlbSwge1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIHNsaWRlQWN0aXZlQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBnYWxsZXJ5OiB1cGRhdGUgc2xpZGUgcG9zaXRpb25cbiAgZnVuY3Rpb24gdXBkYXRlR2FsbGVyeVNsaWRlUG9zaXRpb25zICgpIHtcbiAgICB2YXIgbCA9IGluZGV4ICsgTWF0aC5taW4oc2xpZGVDb3VudCwgaXRlbXMpO1xuICAgIGZvciAodmFyIGkgPSBzbGlkZUNvdW50TmV3OyBpLS07KSB7XG4gICAgICB2YXIgaXRlbSA9IHNsaWRlSXRlbXNbaV07XG5cbiAgICAgIGlmIChpID49IGluZGV4ICYmIGkgPCBsKSB7XG4gICAgICAgIC8vIGFkZCB0cmFuc2l0aW9ucyB0byB2aXNpYmxlIHNsaWRlcyB3aGVuIGFkanVzdGluZyB0aGVpciBwb3NpdGlvbnNcbiAgICAgICAgYWRkQ2xhc3MoaXRlbSwgJ3Rucy1tb3ZpbmcnKTtcblxuICAgICAgICBpdGVtLnN0eWxlLmxlZnQgPSAoaSAtIGluZGV4KSAqIDEwMCAvIGl0ZW1zICsgJyUnO1xuICAgICAgICBhZGRDbGFzcyhpdGVtLCBhbmltYXRlSW4pO1xuICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBhbmltYXRlTm9ybWFsKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5zdHlsZS5sZWZ0KSB7XG4gICAgICAgIGl0ZW0uc3R5bGUubGVmdCA9ICcnO1xuICAgICAgICBhZGRDbGFzcyhpdGVtLCBhbmltYXRlTm9ybWFsKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgYW5pbWF0ZUluKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIG91dGxldCBhbmltYXRpb25cbiAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGFuaW1hdGVPdXQpO1xuICAgIH1cblxuICAgIC8vIHJlbW92aW5nICcudG5zLW1vdmluZydcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZm9yRWFjaChzbGlkZUl0ZW1zLCBmdW5jdGlvbihlbCkge1xuICAgICAgICByZW1vdmVDbGFzcyhlbCwgJ3Rucy1tb3ZpbmcnKTtcbiAgICAgIH0pO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICAvLyBzZXQgdGFiaW5kZXggb24gTmF2XG4gIGZ1bmN0aW9uIHVwZGF0ZU5hdlN0YXR1cyAoKSB7XG4gICAgLy8gZ2V0IGN1cnJlbnQgbmF2XG4gICAgaWYgKG5hdikge1xuICAgICAgbmF2Q3VycmVudEluZGV4ID0gbmF2Q2xpY2tlZCA+PSAwID8gbmF2Q2xpY2tlZCA6IGdldEN1cnJlbnROYXZJbmRleCgpO1xuICAgICAgbmF2Q2xpY2tlZCA9IC0xO1xuXG4gICAgICBpZiAobmF2Q3VycmVudEluZGV4ICE9PSBuYXZDdXJyZW50SW5kZXhDYWNoZWQpIHtcbiAgICAgICAgdmFyIG5hdlByZXYgPSBuYXZJdGVtc1tuYXZDdXJyZW50SW5kZXhDYWNoZWRdLFxuICAgICAgICAgICAgbmF2Q3VycmVudCA9IG5hdkl0ZW1zW25hdkN1cnJlbnRJbmRleF07XG5cbiAgICAgICAgc2V0QXR0cnMobmF2UHJldiwge1xuICAgICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiBuYXZTdHIgKyAobmF2Q3VycmVudEluZGV4Q2FjaGVkICsgMSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJlbW92ZUNsYXNzKG5hdlByZXYsIG5hdkFjdGl2ZUNsYXNzKTtcblxuICAgICAgICBzZXRBdHRycyhuYXZDdXJyZW50LCB7J2FyaWEtbGFiZWwnOiBuYXZTdHIgKyAobmF2Q3VycmVudEluZGV4ICsgMSkgKyBuYXZTdHJDdXJyZW50fSk7XG4gICAgICAgIHJlbW92ZUF0dHJzKG5hdkN1cnJlbnQsICd0YWJpbmRleCcpO1xuICAgICAgICBhZGRDbGFzcyhuYXZDdXJyZW50LCBuYXZBY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgbmF2Q3VycmVudEluZGV4Q2FjaGVkID0gbmF2Q3VycmVudEluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvd2VyQ2FzZU5vZGVOYW1lIChlbCkge1xuICAgIHJldHVybiBlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCdXR0b24gKGVsKSB7XG4gICAgcmV0dXJuIGdldExvd2VyQ2FzZU5vZGVOYW1lKGVsKSA9PT0gJ2J1dHRvbic7XG4gIH1cblxuICBmdW5jdGlvbiBpc0FyaWFEaXNhYmxlZCAoZWwpIHtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykgPT09ICd0cnVlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc0VuYWJsZUVsZW1lbnQgKGlzQnV0dG9uLCBlbCwgdmFsKSB7XG4gICAgaWYgKGlzQnV0dG9uKSB7XG4gICAgICBlbC5kaXNhYmxlZCA9IHZhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgdmFsLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCAnZGlzYWJsZWQnIHRvIHRydWUgb24gY29udHJvbHMgd2hlbiByZWFjaCB0aGUgZWRnZXNcbiAgZnVuY3Rpb24gdXBkYXRlQ29udHJvbHNTdGF0dXMgKCkge1xuICAgIGlmICghY29udHJvbHMgfHwgcmV3aW5kIHx8IGxvb3ApIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgcHJldkRpc2FibGVkID0gKHByZXZJc0J1dHRvbikgPyBwcmV2QnV0dG9uLmRpc2FibGVkIDogaXNBcmlhRGlzYWJsZWQocHJldkJ1dHRvbiksXG4gICAgICAgIG5leHREaXNhYmxlZCA9IChuZXh0SXNCdXR0b24pID8gbmV4dEJ1dHRvbi5kaXNhYmxlZCA6IGlzQXJpYURpc2FibGVkKG5leHRCdXR0b24pLFxuICAgICAgICBkaXNhYmxlUHJldiA9IChpbmRleCA8PSBpbmRleE1pbikgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGRpc2FibGVOZXh0ID0gKCFyZXdpbmQgJiYgaW5kZXggPj0gaW5kZXhNYXgpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgaWYgKGRpc2FibGVQcmV2ICYmICFwcmV2RGlzYWJsZWQpIHtcbiAgICAgIGRpc0VuYWJsZUVsZW1lbnQocHJldklzQnV0dG9uLCBwcmV2QnV0dG9uLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKCFkaXNhYmxlUHJldiAmJiBwcmV2RGlzYWJsZWQpIHtcbiAgICAgIGRpc0VuYWJsZUVsZW1lbnQocHJldklzQnV0dG9uLCBwcmV2QnV0dG9uLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmIChkaXNhYmxlTmV4dCAmJiAhbmV4dERpc2FibGVkKSB7XG4gICAgICBkaXNFbmFibGVFbGVtZW50KG5leHRJc0J1dHRvbiwgbmV4dEJ1dHRvbiwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmICghZGlzYWJsZU5leHQgJiYgbmV4dERpc2FibGVkKSB7XG4gICAgICBkaXNFbmFibGVFbGVtZW50KG5leHRJc0J1dHRvbiwgbmV4dEJ1dHRvbiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBkdXJhdGlvblxuICBmdW5jdGlvbiByZXNldER1cmF0aW9uIChlbCwgc3RyKSB7XG4gICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTikgeyBlbC5zdHlsZVtUUkFOU0lUSU9ORFVSQVRJT05dID0gc3RyOyB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTbGlkZXJXaWR0aCAoKSB7XG4gICAgcmV0dXJuIGZpeGVkV2lkdGggPyAoZml4ZWRXaWR0aCArIGd1dHRlcikgKiBzbGlkZUNvdW50TmV3IDogc2xpZGVQb3NpdGlvbnNbc2xpZGVDb3VudE5ld107XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDZW50ZXJHYXAgKG51bSkge1xuICAgIGlmIChudW0gPT0gbnVsbCkgeyBudW0gPSBpbmRleDsgfVxuXG4gICAgdmFyIGdhcCA9IGVkZ2VQYWRkaW5nID8gZ3V0dGVyIDogMDtcbiAgICByZXR1cm4gYXV0b1dpZHRoID8gKCh2aWV3cG9ydCAtIGdhcCkgLSAoc2xpZGVQb3NpdGlvbnNbbnVtICsgMV0gLSBzbGlkZVBvc2l0aW9uc1tudW1dIC0gZ3V0dGVyKSkvMiA6XG4gICAgICBmaXhlZFdpZHRoID8gKHZpZXdwb3J0IC0gZml4ZWRXaWR0aCkgLyAyIDpcbiAgICAgICAgKGl0ZW1zIC0gMSkgLyAyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmlnaHRCb3VuZGFyeSAoKSB7XG4gICAgdmFyIGdhcCA9IGVkZ2VQYWRkaW5nID8gZ3V0dGVyIDogMCxcbiAgICAgICAgcmVzdWx0ID0gKHZpZXdwb3J0ICsgZ2FwKSAtIGdldFNsaWRlcldpZHRoKCk7XG5cbiAgICBpZiAoY2VudGVyICYmICFsb29wKSB7XG4gICAgICByZXN1bHQgPSBmaXhlZFdpZHRoID8gLSAoZml4ZWRXaWR0aCArIGd1dHRlcikgKiAoc2xpZGVDb3VudE5ldyAtIDEpIC0gZ2V0Q2VudGVyR2FwKCkgOlxuICAgICAgICBnZXRDZW50ZXJHYXAoc2xpZGVDb3VudE5ldyAtIDEpIC0gc2xpZGVQb3NpdGlvbnNbc2xpZGVDb3VudE5ldyAtIDFdO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ID4gMCkgeyByZXN1bHQgPSAwOyB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGFpbmVyVHJhbnNmb3JtVmFsdWUgKG51bSkge1xuICAgIGlmIChudW0gPT0gbnVsbCkgeyBudW0gPSBpbmRleDsgfVxuXG4gICAgdmFyIHZhbDtcbiAgICBpZiAoaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoKSB7XG4gICAgICBpZiAoZml4ZWRXaWR0aCkge1xuICAgICAgICB2YWwgPSAtIChmaXhlZFdpZHRoICsgZ3V0dGVyKSAqIG51bTtcbiAgICAgICAgaWYgKGNlbnRlcikgeyB2YWwgKz0gZ2V0Q2VudGVyR2FwKCk7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkZW5vbWluYXRvciA9IFRSQU5TRk9STSA/IHNsaWRlQ291bnROZXcgOiBpdGVtcztcbiAgICAgICAgaWYgKGNlbnRlcikgeyBudW0gLT0gZ2V0Q2VudGVyR2FwKCk7IH1cbiAgICAgICAgdmFsID0gLSBudW0gKiAxMDAgLyBkZW5vbWluYXRvcjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsID0gLSBzbGlkZVBvc2l0aW9uc1tudW1dO1xuICAgICAgaWYgKGNlbnRlciAmJiBhdXRvV2lkdGgpIHtcbiAgICAgICAgdmFsICs9IGdldENlbnRlckdhcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNSaWdodERlYWRab25lKSB7IHZhbCA9IE1hdGgubWF4KHZhbCwgcmlnaHRCb3VuZGFyeSk7IH1cblxuICAgIHZhbCArPSAoaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoICYmICFmaXhlZFdpZHRoKSA/ICclJyA6ICdweCc7XG5cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9Db250YWluZXJUcmFuc2Zvcm1TaWxlbnQgKHZhbCkge1xuICAgIHJlc2V0RHVyYXRpb24oY29udGFpbmVyLCAnMHMnKTtcbiAgICBkb0NvbnRhaW5lclRyYW5zZm9ybSh2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9Db250YWluZXJUcmFuc2Zvcm0gKHZhbCkge1xuICAgIGlmICh2YWwgPT0gbnVsbCkgeyB2YWwgPSBnZXRDb250YWluZXJUcmFuc2Zvcm1WYWx1ZSgpOyB9XG4gICAgY29udGFpbmVyLnN0eWxlW3RyYW5zZm9ybUF0dHJdID0gdHJhbnNmb3JtUHJlZml4ICsgdmFsICsgdHJhbnNmb3JtUG9zdGZpeDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZSAobnVtYmVyLCBjbGFzc091dCwgY2xhc3NJbiwgaXNPdXQpIHtcbiAgICB2YXIgbCA9IG51bWJlciArIGl0ZW1zO1xuICAgIGlmICghbG9vcCkgeyBsID0gTWF0aC5taW4obCwgc2xpZGVDb3VudE5ldyk7IH1cblxuICAgIGZvciAodmFyIGkgPSBudW1iZXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBzbGlkZUl0ZW1zW2ldO1xuXG4gICAgICAvLyBzZXQgaXRlbSBwb3NpdGlvbnNcbiAgICAgIGlmICghaXNPdXQpIHsgaXRlbS5zdHlsZS5sZWZ0ID0gKGkgLSBpbmRleCkgKiAxMDAgLyBpdGVtcyArICclJzsgfVxuXG4gICAgICBpZiAoYW5pbWF0ZURlbGF5ICYmIFRSQU5TSVRJT05ERUxBWSkge1xuICAgICAgICBpdGVtLnN0eWxlW1RSQU5TSVRJT05ERUxBWV0gPSBpdGVtLnN0eWxlW0FOSU1BVElPTkRFTEFZXSA9IGFuaW1hdGVEZWxheSAqIChpIC0gbnVtYmVyKSAvIDEwMDAgKyAncyc7XG4gICAgICB9XG4gICAgICByZW1vdmVDbGFzcyhpdGVtLCBjbGFzc091dCk7XG4gICAgICBhZGRDbGFzcyhpdGVtLCBjbGFzc0luKTtcblxuICAgICAgaWYgKGlzT3V0KSB7IHNsaWRlSXRlbXNPdXQucHVzaChpdGVtKTsgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG1ha2UgdHJhbnNmZXIgYWZ0ZXIgY2xpY2svZHJhZzpcbiAgLy8gMS4gY2hhbmdlICd0cmFuc2Zvcm0nIHByb3BlcnR5IGZvciBtb3JkZXJuIGJyb3dzZXJzXG4gIC8vIDIuIGNoYW5nZSAnbGVmdCcgcHJvcGVydHkgZm9yIGxlZ2FjeSBicm93c2Vyc1xuICB2YXIgdHJhbnNmb3JtQ29yZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhcm91c2VsID9cbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzZXREdXJhdGlvbihjb250YWluZXIsICcnKTtcbiAgICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTiB8fCAhc3BlZWQpIHtcbiAgICAgICAgICAvLyBmb3IgbW9yZGVuIGJyb3dzZXJzIHdpdGggbm9uLXplcm8gZHVyYXRpb24gb3JcbiAgICAgICAgICAvLyB6ZXJvIGR1cmF0aW9uIGZvciBhbGwgYnJvd3NlcnNcbiAgICAgICAgICBkb0NvbnRhaW5lclRyYW5zZm9ybSgpO1xuICAgICAgICAgIC8vIHJ1biBmYWxsYmFjayBmdW5jdGlvbiBtYW51YWxseVxuICAgICAgICAgIC8vIHdoZW4gZHVyYXRpb24gaXMgMCAvIGNvbnRhaW5lciBpcyBoaWRkZW5cbiAgICAgICAgICBpZiAoIXNwZWVkIHx8ICFpc1Zpc2libGUoY29udGFpbmVyKSkgeyBvblRyYW5zaXRpb25FbmQoKTsgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZm9yIG9sZCBicm93c2VyIHdpdGggbm9uLXplcm8gZHVyYXRpb25cbiAgICAgICAgICBqc1RyYW5zZm9ybShjb250YWluZXIsIHRyYW5zZm9ybUF0dHIsIHRyYW5zZm9ybVByZWZpeCwgdHJhbnNmb3JtUG9zdGZpeCwgZ2V0Q29udGFpbmVyVHJhbnNmb3JtVmFsdWUoKSwgc3BlZWQsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhvcml6b250YWwpIHsgdXBkYXRlQ29udGVudFdyYXBwZXJIZWlnaHQoKTsgfVxuICAgICAgfSA6XG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNsaWRlSXRlbXNPdXQgPSBbXTtcblxuICAgICAgICB2YXIgZXZlID0ge307XG4gICAgICAgIGV2ZVtUUkFOU0lUSU9ORU5EXSA9IGV2ZVtBTklNQVRJT05FTkRdID0gb25UcmFuc2l0aW9uRW5kO1xuICAgICAgICByZW1vdmVFdmVudHMoc2xpZGVJdGVtc1tpbmRleENhY2hlZF0sIGV2ZSk7XG4gICAgICAgIGFkZEV2ZW50cyhzbGlkZUl0ZW1zW2luZGV4XSwgZXZlKTtcblxuICAgICAgICBhbmltYXRlU2xpZGUoaW5kZXhDYWNoZWQsIGFuaW1hdGVJbiwgYW5pbWF0ZU91dCwgdHJ1ZSk7XG4gICAgICAgIGFuaW1hdGVTbGlkZShpbmRleCwgYW5pbWF0ZU5vcm1hbCwgYW5pbWF0ZUluKTtcblxuICAgICAgICAvLyBydW4gZmFsbGJhY2sgZnVuY3Rpb24gbWFudWFsbHlcbiAgICAgICAgLy8gd2hlbiB0cmFuc2l0aW9uIG9yIGFuaW1hdGlvbiBub3Qgc3VwcG9ydGVkIC8gZHVyYXRpb24gaXMgMFxuICAgICAgICBpZiAoIVRSQU5TSVRJT05FTkQgfHwgIUFOSU1BVElPTkVORCB8fCAhc3BlZWQgfHwgIWlzVmlzaWJsZShjb250YWluZXIpKSB7IG9uVHJhbnNpdGlvbkVuZCgpOyB9XG4gICAgICB9O1xuICB9KSgpO1xuXG4gIGZ1bmN0aW9uIHJlbmRlciAoZSwgc2xpZGVyTW92ZWQpIHtcbiAgICBpZiAodXBkYXRlSW5kZXhCZWZvcmVUcmFuc2Zvcm0pIHsgdXBkYXRlSW5kZXgoKTsgfVxuXG4gICAgLy8gcmVuZGVyIHdoZW4gc2xpZGVyIHdhcyBtb3ZlZCAodG91Y2ggb3IgZHJhZykgZXZlbiB0aG91Z2ggaW5kZXggbWF5IG5vdCBjaGFuZ2VcbiAgICBpZiAoaW5kZXggIT09IGluZGV4Q2FjaGVkIHx8IHNsaWRlck1vdmVkKSB7XG4gICAgICAvLyBldmVudHNcbiAgICAgIGV2ZW50cy5lbWl0KCdpbmRleENoYW5nZWQnLCBpbmZvKCkpO1xuICAgICAgZXZlbnRzLmVtaXQoJ3RyYW5zaXRpb25TdGFydCcsIGluZm8oKSk7XG4gICAgICBpZiAoYXV0b0hlaWdodCkgeyBkb0F1dG9IZWlnaHQoKTsgfVxuXG4gICAgICAvLyBwYXVzZSBhdXRvcGxheSB3aGVuIGNsaWNrIG9yIGtleWRvd24gZnJvbSB1c2VyXG4gICAgICBpZiAoYW5pbWF0aW5nICYmIGUgJiYgWydjbGljaycsICdrZXlkb3duJ10uaW5kZXhPZihlLnR5cGUpID49IDApIHsgc3RvcEF1dG9wbGF5KCk7IH1cblxuICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICB0cmFuc2Zvcm1Db3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogVHJhbnNmZXIgcHJlZml4ZWQgcHJvcGVydGllcyB0byB0aGUgc2FtZSBmb3JtYXRcbiAgICogQ1NTOiAtV2Via2l0LVRyYW5zZm9ybSA9PiB3ZWJraXR0cmFuc2Zvcm1cbiAgICogSlM6IFdlYmtpdFRyYW5zZm9ybSA9PiB3ZWJraXR0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIHByb3BlcnR5XG4gICAqXG4gICAqL1xuICBmdW5jdGlvbiBzdHJUcmFucyAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgJycpO1xuICB9XG5cbiAgLy8gQUZURVIgVFJBTlNGT1JNXG4gIC8vIFRoaW5ncyBuZWVkIHRvIGJlIGRvbmUgYWZ0ZXIgYSB0cmFuc2ZlcjpcbiAgLy8gMS4gY2hlY2sgaW5kZXhcbiAgLy8gMi4gYWRkIGNsYXNzZXMgdG8gdmlzaWJsZSBzbGlkZVxuICAvLyAzLiBkaXNhYmxlIGNvbnRyb2xzIGJ1dHRvbnMgd2hlbiByZWFjaCB0aGUgZmlyc3QvbGFzdCBzbGlkZSBpbiBub24tbG9vcCBzbGlkZXJcbiAgLy8gNC4gdXBkYXRlIG5hdiBzdGF0dXNcbiAgLy8gNS4gbGF6eWxvYWQgaW1hZ2VzXG4gIC8vIDYuIHVwZGF0ZSBjb250YWluZXIgaGVpZ2h0XG4gIGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZCAoZXZlbnQpIHtcbiAgICAvLyBjaGVjayBydW5uaW5nIG9uIGdhbGxlcnkgbW9kZVxuICAgIC8vIG1ha2Ugc3VyZSB0cmFudGlvbmVuZC9hbmltYXRpb25lbmQgZXZlbnRzIHJ1biBvbmx5IG9uY2VcbiAgICBpZiAoY2Fyb3VzZWwgfHwgcnVubmluZykge1xuICAgICAgZXZlbnRzLmVtaXQoJ3RyYW5zaXRpb25FbmQnLCBpbmZvKGV2ZW50KSk7XG5cbiAgICAgIGlmICghY2Fyb3VzZWwgJiYgc2xpZGVJdGVtc091dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVJdGVtc091dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBpdGVtID0gc2xpZGVJdGVtc091dFtpXTtcbiAgICAgICAgICAvLyBzZXQgaXRlbSBwb3NpdGlvbnNcbiAgICAgICAgICBpdGVtLnN0eWxlLmxlZnQgPSAnJztcblxuICAgICAgICAgIGlmIChBTklNQVRJT05ERUxBWSAmJiBUUkFOU0lUSU9OREVMQVkpIHtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGVbQU5JTUFUSU9OREVMQVldID0gJyc7XG4gICAgICAgICAgICBpdGVtLnN0eWxlW1RSQU5TSVRJT05ERUxBWV0gPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgYW5pbWF0ZU91dCk7XG4gICAgICAgICAgYWRkQ2xhc3MoaXRlbSwgYW5pbWF0ZU5vcm1hbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogdXBkYXRlIHNsaWRlcywgbmF2LCBjb250cm9scyBhZnRlciBjaGVja2luZyAuLi5cbiAgICAgICAqID0+IGxlZ2FjeSBicm93c2VycyB3aG8gZG9uJ3Qgc3VwcG9ydCAnZXZlbnQnXG4gICAgICAgKiAgICBoYXZlIHRvIGNoZWNrIGV2ZW50IGZpcnN0LCBvdGhlcndpc2UgZXZlbnQudGFyZ2V0IHdpbGwgY2F1c2UgYW4gZXJyb3JcbiAgICAgICAqID0+IG9yICdnYWxsZXJ5JyBtb2RlOlxuICAgICAgICogICArIGV2ZW50IHRhcmdldCBpcyBzbGlkZSBpdGVtXG4gICAgICAgKiA9PiBvciAnY2Fyb3VzZWwnIG1vZGU6XG4gICAgICAgKiAgICsgZXZlbnQgdGFyZ2V0IGlzIGNvbnRhaW5lcixcbiAgICAgICAqICAgKyBldmVudC5wcm9wZXJ0eSBpcyB0aGUgc2FtZSB3aXRoIHRyYW5zZm9ybSBhdHRyaWJ1dGVcbiAgICAgICAqL1xuICAgICAgaWYgKCFldmVudCB8fFxuICAgICAgICAgICFjYXJvdXNlbCAmJiBldmVudC50YXJnZXQucGFyZW50Tm9kZSA9PT0gY29udGFpbmVyIHx8XG4gICAgICAgICAgZXZlbnQudGFyZ2V0ID09PSBjb250YWluZXIgJiYgc3RyVHJhbnMoZXZlbnQucHJvcGVydHlOYW1lKSA9PT0gc3RyVHJhbnModHJhbnNmb3JtQXR0cikpIHtcblxuICAgICAgICBpZiAoIXVwZGF0ZUluZGV4QmVmb3JlVHJhbnNmb3JtKSB7XG4gICAgICAgICAgdmFyIGluZGV4VGVtID0gaW5kZXg7XG4gICAgICAgICAgdXBkYXRlSW5kZXgoKTtcbiAgICAgICAgICBpZiAoaW5kZXggIT09IGluZGV4VGVtKSB7XG4gICAgICAgICAgICBldmVudHMuZW1pdCgnaW5kZXhDaGFuZ2VkJywgaW5mbygpKTtcblxuICAgICAgICAgICAgZG9Db250YWluZXJUcmFuc2Zvcm1TaWxlbnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmVzdGVkID09PSAnaW5uZXInKSB7IGV2ZW50cy5lbWl0KCdpbm5lckxvYWRlZCcsIGluZm8oKSk7IH1cbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICBpbmRleENhY2hlZCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgLy8gIyBBQ1RJT05TXG4gIGZ1bmN0aW9uIGdvVG8gKHRhcmdldEluZGV4LCBlKSB7XG4gICAgaWYgKGZyZWV6ZSkgeyByZXR1cm47IH1cblxuICAgIC8vIHByZXYgc2xpZGVCeVxuICAgIGlmICh0YXJnZXRJbmRleCA9PT0gJ3ByZXYnKSB7XG4gICAgICBvbkNvbnRyb2xzQ2xpY2soZSwgLTEpO1xuXG4gICAgLy8gbmV4dCBzbGlkZUJ5XG4gICAgfSBlbHNlIGlmICh0YXJnZXRJbmRleCA9PT0gJ25leHQnKSB7XG4gICAgICBvbkNvbnRyb2xzQ2xpY2soZSwgMSk7XG5cbiAgICAvLyBnbyB0byBleGFjdCBzbGlkZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocnVubmluZykge1xuICAgICAgICBpZiAocHJldmVudEFjdGlvbldoZW5SdW5uaW5nKSB7IHJldHVybjsgfSBlbHNlIHsgb25UcmFuc2l0aW9uRW5kKCk7IH1cbiAgICAgIH1cblxuICAgICAgdmFyIGFic0luZGV4ID0gZ2V0QWJzSW5kZXgoKSxcbiAgICAgICAgICBpbmRleEdhcCA9IDA7XG5cbiAgICAgIGlmICh0YXJnZXRJbmRleCA9PT0gJ2ZpcnN0Jykge1xuICAgICAgICBpbmRleEdhcCA9IC0gYWJzSW5kZXg7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldEluZGV4ID09PSAnbGFzdCcpIHtcbiAgICAgICAgaW5kZXhHYXAgPSBjYXJvdXNlbCA/IHNsaWRlQ291bnQgLSBpdGVtcyAtIGFic0luZGV4IDogc2xpZGVDb3VudCAtIDEgLSBhYnNJbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0SW5kZXggIT09ICdudW1iZXInKSB7IHRhcmdldEluZGV4ID0gcGFyc2VJbnQodGFyZ2V0SW5kZXgpOyB9XG5cbiAgICAgICAgaWYgKCFpc05hTih0YXJnZXRJbmRleCkpIHtcbiAgICAgICAgICAvLyBmcm9tIGRpcmVjdGx5IGNhbGxlZCBnb1RvIGZ1bmN0aW9uXG4gICAgICAgICAgaWYgKCFlKSB7IHRhcmdldEluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc2xpZGVDb3VudCAtIDEsIHRhcmdldEluZGV4KSk7IH1cblxuICAgICAgICAgIGluZGV4R2FwID0gdGFyZ2V0SW5kZXggLSBhYnNJbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBnYWxsZXJ5OiBtYWtlIHN1cmUgbmV3IHBhZ2Ugd29uJ3Qgb3ZlcmxhcCB3aXRoIGN1cnJlbnQgcGFnZVxuICAgICAgaWYgKCFjYXJvdXNlbCAmJiBpbmRleEdhcCAmJiBNYXRoLmFicyhpbmRleEdhcCkgPCBpdGVtcykge1xuICAgICAgICB2YXIgZmFjdG9yID0gaW5kZXhHYXAgPiAwID8gMSA6IC0xO1xuICAgICAgICBpbmRleEdhcCArPSAoaW5kZXggKyBpbmRleEdhcCAtIHNsaWRlQ291bnQpID49IGluZGV4TWluID8gc2xpZGVDb3VudCAqIGZhY3RvciA6IHNsaWRlQ291bnQgKiAyICogZmFjdG9yICogLTE7XG4gICAgICB9XG5cbiAgICAgIGluZGV4ICs9IGluZGV4R2FwO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgaW5kZXggaXMgaW4gcmFuZ2VcbiAgICAgIGlmIChjYXJvdXNlbCAmJiBsb29wKSB7XG4gICAgICAgIGlmIChpbmRleCA8IGluZGV4TWluKSB7IGluZGV4ICs9IHNsaWRlQ291bnQ7IH1cbiAgICAgICAgaWYgKGluZGV4ID4gaW5kZXhNYXgpIHsgaW5kZXggLT0gc2xpZGVDb3VudDsgfVxuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbmRleCBpcyBjaGFuZ2VkLCBzdGFydCByZW5kZXJpbmdcbiAgICAgIGlmIChnZXRBYnNJbmRleChpbmRleCkgIT09IGdldEFic0luZGV4KGluZGV4Q2FjaGVkKSkge1xuICAgICAgICByZW5kZXIoZSk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICAvLyBvbiBjb250cm9scyBjbGlja1xuICBmdW5jdGlvbiBvbkNvbnRyb2xzQ2xpY2sgKGUsIGRpcikge1xuICAgIGlmIChydW5uaW5nKSB7XG4gICAgICBpZiAocHJldmVudEFjdGlvbldoZW5SdW5uaW5nKSB7IHJldHVybjsgfSBlbHNlIHsgb25UcmFuc2l0aW9uRW5kKCk7IH1cbiAgICB9XG4gICAgdmFyIHBhc3NFdmVudE9iamVjdDtcblxuICAgIGlmICghZGlyKSB7XG4gICAgICBlID0gZ2V0RXZlbnQoZSk7XG4gICAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGUpO1xuXG4gICAgICB3aGlsZSAodGFyZ2V0ICE9PSBjb250cm9sc0NvbnRhaW5lciAmJiBbcHJldkJ1dHRvbiwgbmV4dEJ1dHRvbl0uaW5kZXhPZih0YXJnZXQpIDwgMCkgeyB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTsgfVxuXG4gICAgICB2YXIgdGFyZ2V0SW4gPSBbcHJldkJ1dHRvbiwgbmV4dEJ1dHRvbl0uaW5kZXhPZih0YXJnZXQpO1xuICAgICAgaWYgKHRhcmdldEluID49IDApIHtcbiAgICAgICAgcGFzc0V2ZW50T2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgZGlyID0gdGFyZ2V0SW4gPT09IDAgPyAtMSA6IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJld2luZCkge1xuICAgICAgaWYgKGluZGV4ID09PSBpbmRleE1pbiAmJiBkaXIgPT09IC0xKSB7XG4gICAgICAgIGdvVG8oJ2xhc3QnLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gaW5kZXhNYXggJiYgZGlyID09PSAxKSB7XG4gICAgICAgIGdvVG8oJ2ZpcnN0JywgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlyKSB7XG4gICAgICBpbmRleCArPSBzbGlkZUJ5ICogZGlyO1xuICAgICAgaWYgKGF1dG9XaWR0aCkgeyBpbmRleCA9IE1hdGguZmxvb3IoaW5kZXgpOyB9XG4gICAgICAvLyBwYXNzIGUgd2hlbiBjbGljayBjb250cm9sIGJ1dHRvbnMgb3Iga2V5ZG93blxuICAgICAgcmVuZGVyKChwYXNzRXZlbnRPYmplY3QgfHwgKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpKSA/IGUgOiBudWxsKTtcbiAgICB9XG4gIH1cblxuICAvLyBvbiBuYXYgY2xpY2tcbiAgZnVuY3Rpb24gb25OYXZDbGljayAoZSkge1xuICAgIGlmIChydW5uaW5nKSB7XG4gICAgICBpZiAocHJldmVudEFjdGlvbldoZW5SdW5uaW5nKSB7IHJldHVybjsgfSBlbHNlIHsgb25UcmFuc2l0aW9uRW5kKCk7IH1cbiAgICB9XG5cbiAgICBlID0gZ2V0RXZlbnQoZSk7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChlKSwgbmF2SW5kZXg7XG5cbiAgICAvLyBmaW5kIHRoZSBjbGlja2VkIG5hdiBpdGVtXG4gICAgd2hpbGUgKHRhcmdldCAhPT0gbmF2Q29udGFpbmVyICYmICFoYXNBdHRyKHRhcmdldCwgJ2RhdGEtbmF2JykpIHsgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7IH1cbiAgICBpZiAoaGFzQXR0cih0YXJnZXQsICdkYXRhLW5hdicpKSB7XG4gICAgICB2YXIgbmF2SW5kZXggPSBuYXZDbGlja2VkID0gTnVtYmVyKGdldEF0dHIodGFyZ2V0LCAnZGF0YS1uYXYnKSksXG4gICAgICAgICAgdGFyZ2V0SW5kZXhCYXNlID0gZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGggPyBuYXZJbmRleCAqIHNsaWRlQ291bnQgLyBwYWdlcyA6IG5hdkluZGV4ICogaXRlbXMsXG4gICAgICAgICAgdGFyZ2V0SW5kZXggPSBuYXZBc1RodW1ibmFpbHMgPyBuYXZJbmRleCA6IE1hdGgubWluKE1hdGguY2VpbCh0YXJnZXRJbmRleEJhc2UpLCBzbGlkZUNvdW50IC0gMSk7XG4gICAgICBnb1RvKHRhcmdldEluZGV4LCBlKTtcblxuICAgICAgaWYgKG5hdkN1cnJlbnRJbmRleCA9PT0gbmF2SW5kZXgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGluZykgeyBzdG9wQXV0b3BsYXkoKTsgfVxuICAgICAgICBuYXZDbGlja2VkID0gLTE7IC8vIHJlc2V0IG5hdkNsaWNrZWRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBhdXRvcGxheSBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gc2V0QXV0b3BsYXlUaW1lciAoKSB7XG4gICAgYXV0b3BsYXlUaW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIG9uQ29udHJvbHNDbGljayhudWxsLCBhdXRvcGxheURpcmVjdGlvbik7XG4gICAgfSwgYXV0b3BsYXlUaW1lb3V0KTtcblxuICAgIGFuaW1hdGluZyA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wQXV0b3BsYXlUaW1lciAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChhdXRvcGxheVRpbWVyKTtcbiAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUF1dG9wbGF5QnV0dG9uIChhY3Rpb24sIHR4dCkge1xuICAgIHNldEF0dHJzKGF1dG9wbGF5QnV0dG9uLCB7J2RhdGEtYWN0aW9uJzogYWN0aW9ufSk7XG4gICAgYXV0b3BsYXlCdXR0b24uaW5uZXJIVE1MID0gYXV0b3BsYXlIdG1sU3RyaW5nc1swXSArIGFjdGlvbiArIGF1dG9wbGF5SHRtbFN0cmluZ3NbMV0gKyB0eHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEF1dG9wbGF5ICgpIHtcbiAgICBzZXRBdXRvcGxheVRpbWVyKCk7XG4gICAgaWYgKGF1dG9wbGF5QnV0dG9uKSB7IHVwZGF0ZUF1dG9wbGF5QnV0dG9uKCdzdG9wJywgYXV0b3BsYXlUZXh0WzFdKTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcEF1dG9wbGF5ICgpIHtcbiAgICBzdG9wQXV0b3BsYXlUaW1lcigpO1xuICAgIGlmIChhdXRvcGxheUJ1dHRvbikgeyB1cGRhdGVBdXRvcGxheUJ1dHRvbignc3RhcnQnLCBhdXRvcGxheVRleHRbMF0pOyB9XG4gIH1cblxuICAvLyBwcm9ncmFtYWl0Y2FsbHkgcGxheS9wYXVzZSB0aGUgc2xpZGVyXG4gIGZ1bmN0aW9uIHBsYXkgKCkge1xuICAgIGlmIChhdXRvcGxheSAmJiAhYW5pbWF0aW5nKSB7XG4gICAgICBzdGFydEF1dG9wbGF5KCk7XG4gICAgICBhdXRvcGxheVVzZXJQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcGF1c2UgKCkge1xuICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgIHN0b3BBdXRvcGxheSgpO1xuICAgICAgYXV0b3BsYXlVc2VyUGF1c2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVBdXRvcGxheSAoKSB7XG4gICAgaWYgKGFuaW1hdGluZykge1xuICAgICAgc3RvcEF1dG9wbGF5KCk7XG4gICAgICBhdXRvcGxheVVzZXJQYXVzZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydEF1dG9wbGF5KCk7XG4gICAgICBhdXRvcGxheVVzZXJQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblZpc2liaWxpdHlDaGFuZ2UgKCkge1xuICAgIGlmIChkb2MuaGlkZGVuKSB7XG4gICAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICAgIHN0b3BBdXRvcGxheVRpbWVyKCk7XG4gICAgICAgIGF1dG9wbGF5VmlzaWJpbGl0eVBhdXNlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhdXRvcGxheVZpc2liaWxpdHlQYXVzZWQpIHtcbiAgICAgIHNldEF1dG9wbGF5VGltZXIoKTtcbiAgICAgIGF1dG9wbGF5VmlzaWJpbGl0eVBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlb3ZlclBhdXNlICgpIHtcbiAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICBzdG9wQXV0b3BsYXlUaW1lcigpO1xuICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW91c2VvdXRSZXN0YXJ0ICgpIHtcbiAgICBpZiAoYXV0b3BsYXlIb3ZlclBhdXNlZCkge1xuICAgICAgc2V0QXV0b3BsYXlUaW1lcigpO1xuICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGtleWRvd24gZXZlbnRzIG9uIGRvY3VtZW50XG4gIGZ1bmN0aW9uIG9uRG9jdW1lbnRLZXlkb3duIChlKSB7XG4gICAgZSA9IGdldEV2ZW50KGUpO1xuICAgIHZhciBrZXlJbmRleCA9IFtLRVlTLkxFRlQsIEtFWVMuUklHSFRdLmluZGV4T2YoZS5rZXlDb2RlKTtcblxuICAgIGlmIChrZXlJbmRleCA+PSAwKSB7XG4gICAgICBvbkNvbnRyb2xzQ2xpY2soZSwga2V5SW5kZXggPT09IDAgPyAtMSA6IDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG9uIGtleSBjb250cm9sXG4gIGZ1bmN0aW9uIG9uQ29udHJvbHNLZXlkb3duIChlKSB7XG4gICAgZSA9IGdldEV2ZW50KGUpO1xuICAgIHZhciBrZXlJbmRleCA9IFtLRVlTLkxFRlQsIEtFWVMuUklHSFRdLmluZGV4T2YoZS5rZXlDb2RlKTtcblxuICAgIGlmIChrZXlJbmRleCA+PSAwKSB7XG4gICAgICBpZiAoa2V5SW5kZXggPT09IDApIHtcbiAgICAgICAgaWYgKCFwcmV2QnV0dG9uLmRpc2FibGVkKSB7IG9uQ29udHJvbHNDbGljayhlLCAtMSk7IH1cbiAgICAgIH0gZWxzZSBpZiAoIW5leHRCdXR0b24uZGlzYWJsZWQpIHtcbiAgICAgICAgb25Db250cm9sc0NsaWNrKGUsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBmb2N1c1xuICBmdW5jdGlvbiBzZXRGb2N1cyAoZWwpIHtcbiAgICBlbC5mb2N1cygpO1xuICB9XG5cbiAgLy8gb24ga2V5IG5hdlxuICBmdW5jdGlvbiBvbk5hdktleWRvd24gKGUpIHtcbiAgICBlID0gZ2V0RXZlbnQoZSk7XG4gICAgdmFyIGN1ckVsZW1lbnQgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoIWhhc0F0dHIoY3VyRWxlbWVudCwgJ2RhdGEtbmF2JykpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyB2YXIgY29kZSA9IGUua2V5Q29kZSxcbiAgICB2YXIga2V5SW5kZXggPSBbS0VZUy5MRUZULCBLRVlTLlJJR0hULCBLRVlTLkVOVEVSLCBLRVlTLlNQQUNFXS5pbmRleE9mKGUua2V5Q29kZSksXG4gICAgICAgIG5hdkluZGV4ID0gTnVtYmVyKGdldEF0dHIoY3VyRWxlbWVudCwgJ2RhdGEtbmF2JykpO1xuXG4gICAgaWYgKGtleUluZGV4ID49IDApIHtcbiAgICAgIGlmIChrZXlJbmRleCA9PT0gMCkge1xuICAgICAgICBpZiAobmF2SW5kZXggPiAwKSB7IHNldEZvY3VzKG5hdkl0ZW1zW25hdkluZGV4IC0gMV0pOyB9XG4gICAgICB9IGVsc2UgaWYgKGtleUluZGV4ID09PSAxKSB7XG4gICAgICAgIGlmIChuYXZJbmRleCA8IHBhZ2VzIC0gMSkgeyBzZXRGb2N1cyhuYXZJdGVtc1tuYXZJbmRleCArIDFdKTsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2Q2xpY2tlZCA9IG5hdkluZGV4O1xuICAgICAgICBnb1RvKG5hdkluZGV4LCBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFdmVudCAoZSkge1xuICAgIGUgPSBlIHx8IHdpbi5ldmVudDtcbiAgICByZXR1cm4gaXNUb3VjaEV2ZW50KGUpID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGU7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0VGFyZ2V0IChlKSB7XG4gICAgcmV0dXJuIGUudGFyZ2V0IHx8IHdpbi5ldmVudC5zcmNFbGVtZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUb3VjaEV2ZW50IChlKSB7XG4gICAgcmV0dXJuIGUudHlwZS5pbmRleE9mKCd0b3VjaCcpID49IDA7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEJlaGF2aW9yIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCA/IGUucHJldmVudERlZmF1bHQoKSA6IGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1vdmVEaXJlY3Rpb25FeHBlY3RlZCAoKSB7XG4gICAgcmV0dXJuIGdldFRvdWNoRGlyZWN0aW9uKHRvRGVncmVlKGxhc3RQb3NpdGlvbi55IC0gaW5pdFBvc2l0aW9uLnksIGxhc3RQb3NpdGlvbi54IC0gaW5pdFBvc2l0aW9uLngpLCBzd2lwZUFuZ2xlKSA9PT0gb3B0aW9ucy5heGlzO1xuICB9XG5cbiAgZnVuY3Rpb24gb25QYW5TdGFydCAoZSkge1xuICAgIGlmIChydW5uaW5nKSB7XG4gICAgICBpZiAocHJldmVudEFjdGlvbldoZW5SdW5uaW5nKSB7IHJldHVybjsgfSBlbHNlIHsgb25UcmFuc2l0aW9uRW5kKCk7IH1cbiAgICB9XG5cbiAgICBpZiAoYXV0b3BsYXkgJiYgYW5pbWF0aW5nKSB7IHN0b3BBdXRvcGxheVRpbWVyKCk7IH1cblxuICAgIHBhblN0YXJ0ID0gdHJ1ZTtcbiAgICBpZiAocmFmSW5kZXgpIHtcbiAgICAgIGNhZihyYWZJbmRleCk7XG4gICAgICByYWZJbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyICQgPSBnZXRFdmVudChlKTtcbiAgICBldmVudHMuZW1pdChpc1RvdWNoRXZlbnQoZSkgPyAndG91Y2hTdGFydCcgOiAnZHJhZ1N0YXJ0JywgaW5mbyhlKSk7XG5cbiAgICBpZiAoIWlzVG91Y2hFdmVudChlKSAmJiBbJ2ltZycsICdhJ10uaW5kZXhPZihnZXRMb3dlckNhc2VOb2RlTmFtZShnZXRUYXJnZXQoZSkpKSA+PSAwKSB7XG4gICAgICBwcmV2ZW50RGVmYXVsdEJlaGF2aW9yKGUpO1xuICAgIH1cblxuICAgIGxhc3RQb3NpdGlvbi54ID0gaW5pdFBvc2l0aW9uLnggPSAkLmNsaWVudFg7XG4gICAgbGFzdFBvc2l0aW9uLnkgPSBpbml0UG9zaXRpb24ueSA9ICQuY2xpZW50WTtcbiAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgIHRyYW5zbGF0ZUluaXQgPSBwYXJzZUZsb2F0KGNvbnRhaW5lci5zdHlsZVt0cmFuc2Zvcm1BdHRyXS5yZXBsYWNlKHRyYW5zZm9ybVByZWZpeCwgJycpKTtcbiAgICAgIHJlc2V0RHVyYXRpb24oY29udGFpbmVyLCAnMHMnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblBhbk1vdmUgKGUpIHtcbiAgICBpZiAocGFuU3RhcnQpIHtcbiAgICAgIHZhciAkID0gZ2V0RXZlbnQoZSk7XG4gICAgICBsYXN0UG9zaXRpb24ueCA9ICQuY2xpZW50WDtcbiAgICAgIGxhc3RQb3NpdGlvbi55ID0gJC5jbGllbnRZO1xuXG4gICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKCFyYWZJbmRleCkgeyByYWZJbmRleCA9IHJhZihmdW5jdGlvbigpeyBwYW5VcGRhdGUoZSk7IH0pOyB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobW92ZURpcmVjdGlvbkV4cGVjdGVkID09PSAnPycpIHsgbW92ZURpcmVjdGlvbkV4cGVjdGVkID0gZ2V0TW92ZURpcmVjdGlvbkV4cGVjdGVkKCk7IH1cbiAgICAgICAgaWYgKG1vdmVEaXJlY3Rpb25FeHBlY3RlZCkgeyBwcmV2ZW50U2Nyb2xsID0gdHJ1ZTsgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKHR5cGVvZiBlLmNhbmNlbGFibGUgIT09ICdib29sZWFuJyB8fCBlLmNhbmNlbGFibGUpICYmIHByZXZlbnRTY3JvbGwpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhblVwZGF0ZSAoZSkge1xuICAgIGlmICghbW92ZURpcmVjdGlvbkV4cGVjdGVkKSB7XG4gICAgICBwYW5TdGFydCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWYocmFmSW5kZXgpO1xuICAgIGlmIChwYW5TdGFydCkgeyByYWZJbmRleCA9IHJhZihmdW5jdGlvbigpeyBwYW5VcGRhdGUoZSk7IH0pOyB9XG5cbiAgICBpZiAobW92ZURpcmVjdGlvbkV4cGVjdGVkID09PSAnPycpIHsgbW92ZURpcmVjdGlvbkV4cGVjdGVkID0gZ2V0TW92ZURpcmVjdGlvbkV4cGVjdGVkKCk7IH1cbiAgICBpZiAobW92ZURpcmVjdGlvbkV4cGVjdGVkKSB7XG4gICAgICBpZiAoIXByZXZlbnRTY3JvbGwgJiYgaXNUb3VjaEV2ZW50KGUpKSB7IHByZXZlbnRTY3JvbGwgPSB0cnVlOyB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChlLnR5cGUpIHsgZXZlbnRzLmVtaXQoaXNUb3VjaEV2ZW50KGUpID8gJ3RvdWNoTW92ZScgOiAnZHJhZ01vdmUnLCBpbmZvKGUpKTsgfVxuICAgICAgfSBjYXRjaChlcnIpIHt9XG5cbiAgICAgIHZhciB4ID0gdHJhbnNsYXRlSW5pdCxcbiAgICAgICAgICBkaXN0ID0gZ2V0RGlzdChsYXN0UG9zaXRpb24sIGluaXRQb3NpdGlvbik7XG4gICAgICBpZiAoIWhvcml6b250YWwgfHwgZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGgpIHtcbiAgICAgICAgeCArPSBkaXN0O1xuICAgICAgICB4ICs9ICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGVyY2VudGFnZVggPSBUUkFOU0ZPUk0gPyBkaXN0ICogaXRlbXMgKiAxMDAgLyAoKHZpZXdwb3J0ICsgZ3V0dGVyKSAqIHNsaWRlQ291bnROZXcpOiBkaXN0ICogMTAwIC8gKHZpZXdwb3J0ICsgZ3V0dGVyKTtcbiAgICAgICAgeCArPSBwZXJjZW50YWdlWDtcbiAgICAgICAgeCArPSAnJSc7XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5lci5zdHlsZVt0cmFuc2Zvcm1BdHRyXSA9IHRyYW5zZm9ybVByZWZpeCArIHggKyB0cmFuc2Zvcm1Qb3N0Zml4O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUGFuRW5kIChlKSB7XG4gICAgaWYgKHBhblN0YXJ0KSB7XG4gICAgICBpZiAocmFmSW5kZXgpIHtcbiAgICAgICAgY2FmKHJhZkluZGV4KTtcbiAgICAgICAgcmFmSW5kZXggPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGNhcm91c2VsKSB7IHJlc2V0RHVyYXRpb24oY29udGFpbmVyLCAnJyk7IH1cbiAgICAgIHBhblN0YXJ0ID0gZmFsc2U7XG5cbiAgICAgIHZhciAkID0gZ2V0RXZlbnQoZSk7XG4gICAgICBsYXN0UG9zaXRpb24ueCA9ICQuY2xpZW50WDtcbiAgICAgIGxhc3RQb3NpdGlvbi55ID0gJC5jbGllbnRZO1xuICAgICAgdmFyIGRpc3QgPSBnZXREaXN0KGxhc3RQb3NpdGlvbiwgaW5pdFBvc2l0aW9uKTtcblxuICAgICAgaWYgKE1hdGguYWJzKGRpc3QpKSB7XG4gICAgICAgIC8vIGRyYWcgdnMgY2xpY2tcbiAgICAgICAgaWYgKCFpc1RvdWNoRXZlbnQoZSkpIHtcbiAgICAgICAgICAvLyBwcmV2ZW50IFwiY2xpY2tcIlxuICAgICAgICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoZSk7XG4gICAgICAgICAgYWRkRXZlbnRzKHRhcmdldCwgeydjbGljayc6IGZ1bmN0aW9uIHByZXZlbnRDbGljayAoZSkge1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHRCZWhhdmlvcihlKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50cyh0YXJnZXQsIHsnY2xpY2snOiBwcmV2ZW50Q2xpY2t9KTtcbiAgICAgICAgICB9fSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgICByYWZJbmRleCA9IHJhZihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChob3Jpem9udGFsICYmICFhdXRvV2lkdGgpIHtcbiAgICAgICAgICAgICAgdmFyIGluZGV4TW92ZWQgPSAtIGRpc3QgKiBpdGVtcyAvICh2aWV3cG9ydCArIGd1dHRlcik7XG4gICAgICAgICAgICAgIGluZGV4TW92ZWQgPSBkaXN0ID4gMCA/IE1hdGguZmxvb3IoaW5kZXhNb3ZlZCkgOiBNYXRoLmNlaWwoaW5kZXhNb3ZlZCk7XG4gICAgICAgICAgICAgIGluZGV4ICs9IGluZGV4TW92ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgbW92ZWQgPSAtICh0cmFuc2xhdGVJbml0ICsgZGlzdCk7XG4gICAgICAgICAgICAgIGlmIChtb3ZlZCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleE1pbjtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlZCA+PSBzbGlkZVBvc2l0aW9uc1tzbGlkZUNvdW50TmV3IC0gMV0pIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4TWF4O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IHNsaWRlQ291bnROZXcgJiYgbW92ZWQgPj0gc2xpZGVQb3NpdGlvbnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgIGlmIChtb3ZlZCA+IHNsaWRlUG9zaXRpb25zW2ldICYmIGRpc3QgPCAwKSB7IGluZGV4ICs9IDE7IH1cbiAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVuZGVyKGUsIGRpc3QpO1xuICAgICAgICAgICAgZXZlbnRzLmVtaXQoaXNUb3VjaEV2ZW50KGUpID8gJ3RvdWNoRW5kJyA6ICdkcmFnRW5kJywgaW5mbyhlKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1vdmVEaXJlY3Rpb25FeHBlY3RlZCkge1xuICAgICAgICAgICAgb25Db250cm9sc0NsaWNrKGUsIGRpc3QgPiAwID8gLTEgOiAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNldFxuICAgIGlmIChvcHRpb25zLnByZXZlbnRTY3JvbGxPblRvdWNoID09PSAnYXV0bycpIHsgcHJldmVudFNjcm9sbCA9IGZhbHNlOyB9XG4gICAgaWYgKHN3aXBlQW5nbGUpIHsgbW92ZURpcmVjdGlvbkV4cGVjdGVkID0gJz8nOyB9XG4gICAgaWYgKGF1dG9wbGF5ICYmICFhbmltYXRpbmcpIHsgc2V0QXV0b3BsYXlUaW1lcigpOyB9XG4gIH1cblxuICAvLyA9PT0gUkVTSVpFIEZVTkNUSU9OUyA9PT0gLy9cbiAgLy8gKHNsaWRlUG9zaXRpb25zLCBpbmRleCwgaXRlbXMpID0+IHZlcnRpY2FsX2NvbmVudFdyYXBwZXIuaGVpZ2h0XG4gIGZ1bmN0aW9uIHVwZGF0ZUNvbnRlbnRXcmFwcGVySGVpZ2h0ICgpIHtcbiAgICB2YXIgd3AgPSBtaWRkbGVXcmFwcGVyID8gbWlkZGxlV3JhcHBlciA6IGlubmVyV3JhcHBlcjtcbiAgICB3cC5zdHlsZS5oZWlnaHQgPSBzbGlkZVBvc2l0aW9uc1tpbmRleCArIGl0ZW1zXSAtIHNsaWRlUG9zaXRpb25zW2luZGV4XSArICdweCc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYWdlcyAoKSB7XG4gICAgdmFyIHJvdWdoID0gZml4ZWRXaWR0aCA/IChmaXhlZFdpZHRoICsgZ3V0dGVyKSAqIHNsaWRlQ291bnQgLyB2aWV3cG9ydCA6IHNsaWRlQ291bnQgLyBpdGVtcztcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5jZWlsKHJvdWdoKSwgc2xpZGVDb3VudCk7XG4gIH1cblxuICAvKlxuICAgKiAxLiB1cGRhdGUgdmlzaWJsZSBuYXYgaXRlbXMgbGlzdFxuICAgKiAyLiBhZGQgXCJoaWRkZW5cIiBhdHRyaWJ1dGVzIHRvIHByZXZpb3VzIHZpc2libGUgbmF2IGl0ZW1zXG4gICAqIDMuIHJlbW92ZSBcImhpZGRlblwiIGF0dHJ1YnV0ZXMgdG8gbmV3IHZpc2libGUgbmF2IGl0ZW1zXG4gICAqL1xuICBmdW5jdGlvbiB1cGRhdGVOYXZWaXNpYmlsaXR5ICgpIHtcbiAgICBpZiAoIW5hdiB8fCBuYXZBc1RodW1ibmFpbHMpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAocGFnZXMgIT09IHBhZ2VzQ2FjaGVkKSB7XG4gICAgICB2YXIgbWluID0gcGFnZXNDYWNoZWQsXG4gICAgICAgICAgbWF4ID0gcGFnZXMsXG4gICAgICAgICAgZm4gPSBzaG93RWxlbWVudDtcblxuICAgICAgaWYgKHBhZ2VzQ2FjaGVkID4gcGFnZXMpIHtcbiAgICAgICAgbWluID0gcGFnZXM7XG4gICAgICAgIG1heCA9IHBhZ2VzQ2FjaGVkO1xuICAgICAgICBmbiA9IGhpZGVFbGVtZW50O1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAobWluIDwgbWF4KSB7XG4gICAgICAgIGZuKG5hdkl0ZW1zW21pbl0pO1xuICAgICAgICBtaW4rKztcbiAgICAgIH1cblxuICAgICAgLy8gY2FjaGUgcGFnZXNcbiAgICAgIHBhZ2VzQ2FjaGVkID0gcGFnZXM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5mbyAoZSkge1xuICAgIHJldHVybiB7XG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgIHNsaWRlSXRlbXM6IHNsaWRlSXRlbXMsXG4gICAgICBuYXZDb250YWluZXI6IG5hdkNvbnRhaW5lcixcbiAgICAgIG5hdkl0ZW1zOiBuYXZJdGVtcyxcbiAgICAgIGNvbnRyb2xzQ29udGFpbmVyOiBjb250cm9sc0NvbnRhaW5lcixcbiAgICAgIGhhc0NvbnRyb2xzOiBoYXNDb250cm9scyxcbiAgICAgIHByZXZCdXR0b246IHByZXZCdXR0b24sXG4gICAgICBuZXh0QnV0dG9uOiBuZXh0QnV0dG9uLFxuICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgc2xpZGVCeTogc2xpZGVCeSxcbiAgICAgIGNsb25lQ291bnQ6IGNsb25lQ291bnQsXG4gICAgICBzbGlkZUNvdW50OiBzbGlkZUNvdW50LFxuICAgICAgc2xpZGVDb3VudE5ldzogc2xpZGVDb3VudE5ldyxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIGluZGV4Q2FjaGVkOiBpbmRleENhY2hlZCxcbiAgICAgIGRpc3BsYXlJbmRleDogZ2V0Q3VycmVudFNsaWRlKCksXG4gICAgICBuYXZDdXJyZW50SW5kZXg6IG5hdkN1cnJlbnRJbmRleCxcbiAgICAgIG5hdkN1cnJlbnRJbmRleENhY2hlZDogbmF2Q3VycmVudEluZGV4Q2FjaGVkLFxuICAgICAgcGFnZXM6IHBhZ2VzLFxuICAgICAgcGFnZXNDYWNoZWQ6IHBhZ2VzQ2FjaGVkLFxuICAgICAgc2hlZXQ6IHNoZWV0LFxuICAgICAgaXNPbjogaXNPbixcbiAgICAgIGV2ZW50OiBlIHx8IHt9LFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICcyLjkuNCcsXG4gICAgZ2V0SW5mbzogaW5mbyxcbiAgICBldmVudHM6IGV2ZW50cyxcbiAgICBnb1RvOiBnb1RvLFxuICAgIHBsYXk6IHBsYXksXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIGlzT246IGlzT24sXG4gICAgdXBkYXRlU2xpZGVySGVpZ2h0OiB1cGRhdGVJbm5lcldyYXBwZXJIZWlnaHQsXG4gICAgcmVmcmVzaDogaW5pdFNsaWRlclRyYW5zZm9ybSxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHJlYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRucyhleHRlbmQob3B0aW9ucywgb3B0aW9uc0VsZW1lbnRzKSk7XG4gICAgfVxuICB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=