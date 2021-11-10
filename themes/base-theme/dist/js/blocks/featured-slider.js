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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/blocks/featuredSlider/index.js":
/*!**********************************************************!*\
  !*** ./assets/javascript/blocks/featuredSlider/index.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}





var DraggableImage = function DraggableImage(_ref) {
  var title = _ref.title,
      button = _ref.button,
      description = _ref.description,
      image = _ref.image,
      removeImage = _ref.removeImage,
      setDescription = _ref.setDescription,
      setButtons = _ref.setButtons,
      setTitle = _ref.setTitle;
  return /*#__PURE__*/React.createElement("div", {
    className: "slider-item-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "slider-item",
    src: image.url,
    key: image.id
  }), /*#__PURE__*/React.createElement("div", {
    className: "fields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["RichText"], {
    tagName: "span",
    className: "title-field",
    value: title,
    onChange: setTitle,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Type the title here', 'jaci')
  })), /*#__PURE__*/React.createElement("div", {
    className: "description"
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["RichText"], {
    tagName: "span",
    className: "description-field",
    value: description,
    onChange: setDescription,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Type here your description', 'jaci')
  })), /*#__PURE__*/React.createElement("div", {
    className: "featured-button"
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["RichText"], {
    tagName: "span",
    className: "button-field",
    value: button,
    onChange: setButtons,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Type button text', 'jaci')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "remove-item",
    onClick: removeImage
  }, /*#__PURE__*/React.createElement("span", {
    "class": "dashicons dashicons-trash"
  })));
};

var ImageGallery = function ImageGallery(_ref2) {
  var images = _ref2.images,
      imagesTitle = _ref2.imagesTitle,
      imagesDescriptions = _ref2.imagesDescriptions,
      imagesButtons = _ref2.imagesButtons,
      setAttributes = _ref2.setAttributes;

  var removeImage = function removeImage(index) {
    return function () {
      var newImages = images.filter(function (image, i) {
        if (i != index) {
          return image;
        }
      });
      imagesDescriptions.splice(index, 1);
      imagesTitle.splice(index, 1);
      imagesButtons.splice(index, 1);
      setAttributes({
        images: newImages,
        imagesDescriptions: imagesDescriptions,
        imagesTitle: imagesTitle,
        imagesButtons: imagesButtons
      });
    };
  };

  var updateItem = function updateItem(key, collection, index) {
    return function (content) {
      setAttributes(_defineProperty({}, key, collection.map(function (item, i) {
        if (i == index) {
          return content;
        } else {
          return item;
        }
      })));
    };
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "sliders-grid"
  }, images.map(function (image, index) {
    return /*#__PURE__*/React.createElement(DraggableImage, {
      collection: images,
      title: imagesTitle[index],
      description: imagesDescriptions[index],
      button: imagesButtons[index],
      image: image,
      index: index,
      key: image.id,
      removeImage: removeImage(index),
      setButtons: updateItem('imagesButtons', imagesButtons, index),
      setTitle: updateItem('imagesTitle', imagesTitle, index),
      setDescription: updateItem('imagesDescriptions', imagesDescriptions, index)
    });
  }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["MediaUpload"], {
    onSelect: function onSelect(media) {
      setAttributes({
        images: [].concat(_toConsumableArray(images), _toConsumableArray(media))
      });
    },
    type: "image",
    multiple: true,
    value: images,
    render: function render(_ref3) {
      var open = _ref3.open;
      return /*#__PURE__*/React.createElement("div", {
        className: "select-images-button is-button is-default is-large",
        onClick: open
      }, /*#__PURE__*/React.createElement("span", {
        "class": "dashicons dashicons-plus"
      }));
    }
  }));
};

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])('jaci/featured-slider', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Featured Slider', 'jaci'),
  icon: 'format-gallery',
  category: 'common',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('materialtheme'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('photos'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('images')],
  supports: {
    align: true
  },
  attributes: {
    images: {
      type: 'array'
    },
    imagesTitle: {
      type: 'array'
    },
    imagesDescriptions: {
      type: 'array'
    },
    imagesButtons: {
      type: 'array'
    }
  },
  edit: function edit(_ref4) {
    var attributes = _ref4.attributes,
        className = _ref4.className,
        setAttributes = _ref4.setAttributes;
    var _attributes$images = attributes.images,
        images = _attributes$images === void 0 ? [] : _attributes$images,
        _attributes$imagesDes = attributes.imagesDescriptions,
        imagesDescriptions = _attributes$imagesDes === void 0 ? [] : _attributes$imagesDes,
        _attributes$imagesTit = attributes.imagesTitle,
        imagesTitle = _attributes$imagesTit === void 0 ? [] : _attributes$imagesTit,
        _attributes$imagesBut = attributes.imagesButtons,
        imagesButtons = _attributes$imagesBut === void 0 ? [] : _attributes$imagesBut;
    images.forEach(function (image, index) {
      if (!imagesDescriptions[index] && imagesDescriptions[index] != '') {
        imagesDescriptions[index] = "";
      }

      if (!imagesTitle[index] && imagesTitle[index] != '') {
        imagesTitle[index] = "";
      }

      if (!imagesButtons[index] && imagesButtons[index] != '') {
        imagesButtons[index] = "";
      }
    });

    var onSortEnd = function onSortEnd(_ref5) {
      var newIndex = _ref5.newIndex,
          oldIndex = _ref5.oldIndex;
      setAttributes({
        images: arrayMove(images, oldIndex, newIndex),
        imagesTitle: arrayMove(imagesTitle, oldIndex, newIndex),
        imagesDescriptions: arrayMove(imagesDescriptions, oldIndex, newIndex),
        imagesButtons: arrayMove(imagesButtons, oldIndex, newIndex)
      });
    };

    if (imagesTitle != attributes.imagesTitle) {
      setAttributes(_objectSpread(_objectSpread({}, attributes), {}, {
        imagesTitle: imagesTitle
      }));
    }

    if (imagesButtons != attributes.imagesButtons) {
      setAttributes(_objectSpread(_objectSpread({}, attributes), {}, {
        imagesButtons: imagesButtons
      }));
    }

    if (imagesDescriptions != attributes.imagesDescriptions) {
      setAttributes(_objectSpread(_objectSpread({}, attributes), {}, {
        imagesDescriptions: imagesDescriptions
      }));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "slider-image-gallery"
    }, /*#__PURE__*/React.createElement(ImageGallery, {
      axis: "xy",
      helperClass: "moving",
      helperContainer: document.querySelector('.sliders-grid'),
      images: images,
      imagesTitle: imagesTitle,
      imagesDescriptions: imagesDescriptions,
      imagesButtons: imagesButtons,
      onSortEnd: onSortEnd,
      pressDelay: 200,
      setAttributes: setAttributes
    }));
  },
  save: function save(_ref6) {
    var attributes = _ref6.attributes;
    var _attributes$images2 = attributes.images,
        images = _attributes$images2 === void 0 ? [] : _attributes$images2,
        _attributes$imagesDes2 = attributes.imagesDescriptions,
        imagesDescriptions = _attributes$imagesDes2 === void 0 ? [] : _attributes$imagesDes2,
        _attributes$imagesTit2 = attributes.imagesTitle,
        imagesTitle = _attributes$imagesTit2 === void 0 ? [] : _attributes$imagesTit2,
        _attributes$imagesBut2 = attributes.imagesButtons,
        imagesButtons = _attributes$imagesBut2 === void 0 ? [] : _attributes$imagesBut2;

    var displayImages = function displayImages(images) {
      return images.map(function (image, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "slide-item-wrapper"
        }, /*#__PURE__*/React.createElement("img", {
          className: "gallery-item",
          key: images.id,
          src: image.url,
          alt: image.alt,
          width: image.width,
          height: image.height,
          load: "lazy"
        }), /*#__PURE__*/React.createElement("div", {
          className: "wrapper container"
        }, /*#__PURE__*/React.createElement("div", {
          "class": "image-meta row"
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-md-12"
        }, /*#__PURE__*/React.createElement("div", {
          className: "slide-content"
        }, /*#__PURE__*/React.createElement("div", {
          className: "counter"
        }, (index + 1 + '').padStart(2, '0') + '-' + (images.length + '').padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
          "class": "image-title"
        }, " ", /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["RichText"].Content, {
          tagName: "span",
          value: imagesTitle[index]
        })), imagesDescriptions[index].length > 0 && /*#__PURE__*/React.createElement("div", {
          "class": "image-description"
        }, " ", /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["RichText"].Content, {
          tagName: "span",
          value: imagesDescriptions[index]
        })), imagesButtons[index].length > 0 && /*#__PURE__*/React.createElement("div", {
          "class": "image-button"
        }, " ", /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["RichText"].Content, {
          tagName: "span",
          value: imagesButtons[index]
        })), /*#__PURE__*/React.createElement("div", {
          "class": "tns-controls",
          "aria-label": "Carousel Navigation"
        }, /*#__PURE__*/React.createElement("button", {
          "data-controls": "prev",
          tabindex: "-1",
          "aria-controls": "tns1"
        }, /*#__PURE__*/React.createElement("svg", {
          width: "32",
          height: "16",
          viewBox: "0 0 32 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, /*#__PURE__*/React.createElement("g", {
          "clip-path": "url(#clip0)"
        }, /*#__PURE__*/React.createElement("path", {
          d: "M4.76837e-06 8L32 8",
          stroke: "white",
          "stroke-width": "1.6769",
          "stroke-miterlimit": "10"
        }), /*#__PURE__*/React.createElement("path", {
          d: "M8 16C8 11.58 4.42 8 2.60673e-06 8C4.42 8 8 4.42 8 2.38419e-06",
          stroke: "white",
          "stroke-width": "1.9212",
          "stroke-miterlimit": "10"
        })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
          id: "clip0"
        }, /*#__PURE__*/React.createElement("rect", {
          width: "32",
          height: "16",
          fill: "white",
          transform: "translate(32 16) rotate(-180)"
        }))))), /*#__PURE__*/React.createElement("button", {
          "data-controls": "next",
          tabindex: "-1",
          "aria-controls": "tns1"
        }, /*#__PURE__*/React.createElement("svg", {
          width: "32",
          height: "16",
          viewBox: "0 0 32 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, /*#__PURE__*/React.createElement("path", {
          d: "M32 8L0 8",
          stroke: "white",
          "stroke-width": "1.6769",
          "stroke-miterlimit": "10"
        }), /*#__PURE__*/React.createElement("path", {
          d: "M24 0C24 4.42 27.58 8 32 8C27.58 8 24 11.58 24 16",
          stroke: "white",
          "stroke-width": "1.9212",
          "stroke-miterlimit": "10"
        })))))))));
      });
    };

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "featured-slider"
    }, /*#__PURE__*/React.createElement("div", {
      className: "itens-wrapper"
    }, displayImages(images))));
  }
});

/***/ }),

/***/ 11:
/*!****************************************************************!*\
  !*** multi ./assets/javascript/blocks/featuredSlider/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /app/assets/javascript/blocks/featuredSlider/index.js */"./assets/javascript/blocks/featuredSlider/index.js");


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvYmxvY2tzL2ZlYXR1cmVkU2xpZGVyL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBbXCJ3cFwiLFwiYmxvY2tFZGl0b3JcIl0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFtcIndwXCIsXCJibG9ja3NcIl0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFtcIndwXCIsXCJpMThuXCJdIl0sIm5hbWVzIjpbIkRyYWdnYWJsZUltYWdlIiwidGl0bGUiLCJidXR0b24iLCJkZXNjcmlwdGlvbiIsImltYWdlIiwicmVtb3ZlSW1hZ2UiLCJzZXREZXNjcmlwdGlvbiIsInNldEJ1dHRvbnMiLCJzZXRUaXRsZSIsImlkIiwiX18iLCJJbWFnZUdhbGxlcnkiLCJpbWFnZXMiLCJpbWFnZXNUaXRsZSIsImltYWdlc0Rlc2NyaXB0aW9ucyIsImltYWdlc0J1dHRvbnMiLCJzZXRBdHRyaWJ1dGVzIiwibmV3SW1hZ2VzIiwiaSIsInVwZGF0ZUl0ZW0iLCJvcGVuIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInN1cHBvcnRzIiwiYWxpZ24iLCJhdHRyaWJ1dGVzIiwidHlwZSIsImVkaXQiLCJjbGFzc05hbWUiLCJvblNvcnRFbmQiLCJuZXdJbmRleCIsIm9sZEluZGV4IiwiYXJyYXlNb3ZlIiwiZG9jdW1lbnQiLCJzYXZlIiwiZGlzcGxheUltYWdlcyIsImluZGV4Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7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QUF0QjtBQUE0QixpQkFBTyxFQUFuQztBQUFnRCxjQUFJLEVBQXBEO0FBQTRELGVBQUssRUFBQztBQUFsRSx3QkFBK0Y7QUFBTSxXQUFDLEVBQVA7QUFBb0IsZ0JBQU0sRUFBMUI7QUFBbUMsMEJBQW5DO0FBQXlELCtCQUFrQjtBQUEzRSxVQUEvRixlQUFzTDtBQUFNLFdBQUMsRUFBUDtBQUE0RCxnQkFBTSxFQUFsRTtBQUEyRSwwQkFBM0U7QUFBaUcsK0JBQWtCO0FBQW5ILFVBQXRMLENBQWhFLENBQTduQixDQVJKLENBREosQ0FESixDQURKLENBVkosQ0FESjtBQUhSLE9BQ0ksQ0FESjtBQURKOztBQXNDQSx3QkFDSSw4Q0FDSTtBQUFLLGVBQVMsRUFBQztBQUFmLG9CQUNJO0FBQUssZUFBUyxFQUFDO0FBQWYsT0FDS3NCLGFBQWEsQ0FKOUIsTUFJOEIsQ0FEbEIsQ0FESixDQURKLENBREo7QUFVSDtBQTFJcUMsQ0FBekIsQ0FBakJoQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25IQSxhQUFhLDhDQUE4QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTdELGFBQWEseUNBQXlDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBeEQsYUFBYSx1Q0FBdUMsRUFBRSxJIiwiZmlsZSI6Ii9qcy9ibG9ja3MvZmVhdHVyZWQtc2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLy9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG4iLCJpbXBvcnQgeyByZWdpc3RlckJsb2NrVHlwZSB9IGZyb20gXCJAd29yZHByZXNzL2Jsb2Nrc1wiO1xuaW1wb3J0IHsgTWVkaWFVcGxvYWQsIFJpY2hUZXh0IH0gZnJvbSBcIkB3b3JkcHJlc3MvYmxvY2stZWRpdG9yXCI7XG5pbXBvcnQgeyBfXyB9IGZyb20gXCJAd29yZHByZXNzL2kxOG5cIjtcblxuY29uc3QgRHJhZ2dhYmxlSW1hZ2UgPSAoeyB0aXRsZSwgYnV0dG9uLCBkZXNjcmlwdGlvbiwgaW1hZ2UsIHJlbW92ZUltYWdlLCBzZXREZXNjcmlwdGlvbiwgc2V0QnV0dG9ucywgc2V0VGl0bGUgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyLWl0ZW0tY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT0nc2xpZGVyLWl0ZW0nIHNyYz17aW1hZ2UudXJsfSBrZXk9e2ltYWdlLmlkfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgPFJpY2hUZXh0XG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWU9XCJzcGFuXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGl0bGUtZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRUaXRsZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e19fKCdUeXBlIHRoZSB0aXRsZSBoZXJlJywgJ2phY2knKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICA8UmljaFRleHRcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZT1cInNwYW5cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkZXNjcmlwdGlvbi1maWVsZFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17X18oJ1R5cGUgaGVyZSB5b3VyIGRlc2NyaXB0aW9uJywgJ2phY2knKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmZWF0dXJlZC1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgPFJpY2hUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdOYW1lPVwic3BhblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidXR0b24tZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRCdXR0b25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e19fKCdUeXBlIGJ1dHRvbiB0ZXh0JywgJ2phY2knKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVtb3ZlLWl0ZW1cIiBvbkNsaWNrPXtyZW1vdmVJbWFnZX0+PHNwYW4gY2xhc3M9XCJkYXNoaWNvbnMgZGFzaGljb25zLXRyYXNoXCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuY29uc3QgSW1hZ2VHYWxsZXJ5ID0gKHsgaW1hZ2VzLCBpbWFnZXNUaXRsZSwgaW1hZ2VzRGVzY3JpcHRpb25zLCBpbWFnZXNCdXR0b25zLCBzZXRBdHRyaWJ1dGVzIH0pID0+IHtcbiAgICBjb25zdCByZW1vdmVJbWFnZSA9IChpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3SW1hZ2VzID0gaW1hZ2VzLmZpbHRlcigoaW1hZ2UsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGltYWdlc0Rlc2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgaW1hZ2VzVGl0bGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGltYWdlc0J1dHRvbnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBuZXdJbWFnZXMsXG4gICAgICAgICAgICAgICAgaW1hZ2VzRGVzY3JpcHRpb25zLFxuICAgICAgICAgICAgICAgIGltYWdlc1RpdGxlLFxuICAgICAgICAgICAgICAgIGltYWdlc0J1dHRvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZUl0ZW0gPSAoa2V5LCBjb2xsZWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgIFtrZXldOiBjb2xsZWN0aW9uLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJzLWdyaWRcIj5cbiAgICAgICAgICAgIHtpbWFnZXMubWFwKChpbWFnZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8RHJhZ2dhYmxlSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb249e2ltYWdlc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtpbWFnZXNUaXRsZVtpbmRleF19XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17aW1hZ2VzRGVzY3JpcHRpb25zW2luZGV4XX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbj17aW1hZ2VzQnV0dG9uc1tpbmRleF19XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZT17aW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2ltYWdlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSW1hZ2U9e3JlbW92ZUltYWdlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ1dHRvbnM9e3VwZGF0ZUl0ZW0oJ2ltYWdlc0J1dHRvbnMnLCBpbWFnZXNCdXR0b25zLCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaXRsZT17dXBkYXRlSXRlbSgnaW1hZ2VzVGl0bGUnLCBpbWFnZXNUaXRsZSwgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGVzY3JpcHRpb249e3VwZGF0ZUl0ZW0oJ2ltYWdlc0Rlc2NyaXB0aW9ucycsIGltYWdlc0Rlc2NyaXB0aW9ucywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxNZWRpYVVwbG9hZFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsobWVkaWEpID0+IHsgc2V0QXR0cmlidXRlcyh7IGltYWdlczogWy4uLmltYWdlcywgLi4ubWVkaWFdIH0pOyB9fVxuICAgICAgICAgICAgICAgIHR5cGU9XCJpbWFnZVwiXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2ltYWdlc31cbiAgICAgICAgICAgICAgICByZW5kZXI9eyh7IG9wZW4gfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1pbWFnZXMtYnV0dG9uIGlzLWJ1dHRvbiBpcy1kZWZhdWx0IGlzLWxhcmdlXCIgb25DbGljaz17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhc2hpY29ucyBkYXNoaWNvbnMtcGx1c1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5yZWdpc3RlckJsb2NrVHlwZSgnamFjaS9mZWF0dXJlZC1zbGlkZXInLCB7XG4gICAgdGl0bGU6IF9fKCdGZWF0dXJlZCBTbGlkZXInLCAnamFjaScpLFxuICAgIGljb246ICdmb3JtYXQtZ2FsbGVyeScsXG4gICAgY2F0ZWdvcnk6ICdjb21tb24nLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgIF9fKCdtYXRlcmlhbHRoZW1lJyksXG4gICAgICAgIF9fKCdwaG90b3MnKSxcbiAgICAgICAgX18oJ2ltYWdlcycpXG4gICAgXSxcbiAgICBzdXBwb3J0czoge1xuICAgICAgICBhbGlnbjogdHJ1ZSxcbiAgICB9LFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaW1hZ2VzOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICB9LFxuXG4gICAgICAgIGltYWdlc1RpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICB9LFxuXG4gICAgICAgIGltYWdlc0Rlc2NyaXB0aW9uczoge1xuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgfSxcblxuICAgICAgICBpbWFnZXNCdXR0b25zOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBlZGl0KHsgYXR0cmlidXRlcywgY2xhc3NOYW1lLCBzZXRBdHRyaWJ1dGVzIH0pIHtcbiAgICAgICAgY29uc3QgeyBpbWFnZXMgPSBbXSwgaW1hZ2VzRGVzY3JpcHRpb25zID0gW10sIGltYWdlc1RpdGxlID0gW10sIGltYWdlc0J1dHRvbnMgPSBbXSB9ID0gYXR0cmlidXRlcztcblxuICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoICEgaW1hZ2VzRGVzY3JpcHRpb25zW2luZGV4XSAmJiBpbWFnZXNEZXNjcmlwdGlvbnNbaW5kZXhdICE9ICcnICkge1xuICAgICAgICAgICAgICAgIGltYWdlc0Rlc2NyaXB0aW9uc1tpbmRleF0gPSBcIlwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoICEgaW1hZ2VzVGl0bGVbaW5kZXhdICYmIGltYWdlc1RpdGxlW2luZGV4XSAhPSAnJykge1xuICAgICAgICAgICAgICAgIGltYWdlc1RpdGxlW2luZGV4XSA9IFwiXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggISBpbWFnZXNCdXR0b25zW2luZGV4XSAmJiBpbWFnZXNCdXR0b25zW2luZGV4XSAhPSAnJykge1xuICAgICAgICAgICAgICAgIGltYWdlc0J1dHRvbnNbaW5kZXhdID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBjb25zdCBvblNvcnRFbmQgPSAoeyBuZXdJbmRleCwgb2xkSW5kZXggfSkgPT4ge1xuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBhcnJheU1vdmUoaW1hZ2VzLCBvbGRJbmRleCwgbmV3SW5kZXgpLFxuICAgICAgICAgICAgICAgIGltYWdlc1RpdGxlOiBhcnJheU1vdmUoaW1hZ2VzVGl0bGUsIG9sZEluZGV4LCBuZXdJbmRleCksXG4gICAgICAgICAgICAgICAgaW1hZ2VzRGVzY3JpcHRpb25zOiBhcnJheU1vdmUoaW1hZ2VzRGVzY3JpcHRpb25zLCBvbGRJbmRleCwgbmV3SW5kZXgpLFxuICAgICAgICAgICAgICAgIGltYWdlc0J1dHRvbnM6IGFycmF5TW92ZShpbWFnZXNCdXR0b25zLCBvbGRJbmRleCwgbmV3SW5kZXgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCBpbWFnZXNUaXRsZSAhPSBhdHRyaWJ1dGVzLmltYWdlc1RpdGxlICkge1xuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyggeyAuLi5hdHRyaWJ1dGVzLCBpbWFnZXNUaXRsZSB9ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGltYWdlc0J1dHRvbnMgIT0gYXR0cmlidXRlcy5pbWFnZXNCdXR0b25zICkge1xuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyggeyAuLi5hdHRyaWJ1dGVzLCBpbWFnZXNCdXR0b25zIH0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaW1hZ2VzRGVzY3JpcHRpb25zICE9IGF0dHJpYnV0ZXMuaW1hZ2VzRGVzY3JpcHRpb25zICkge1xuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyggeyAuLi5hdHRyaWJ1dGVzLCBpbWFnZXNEZXNjcmlwdGlvbnMgfSApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyLWltYWdlLWdhbGxlcnlcIj5cbiAgICAgICAgICAgICAgICA8SW1hZ2VHYWxsZXJ5XG4gICAgICAgICAgICAgICAgICAgIGF4aXM9XCJ4eVwiXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNsYXNzPVwibW92aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29udGFpbmVyPXtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVycy1ncmlkJyl9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlcz17aW1hZ2VzfVxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNUaXRsZT17aW1hZ2VzVGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlc0Rlc2NyaXB0aW9ucz17aW1hZ2VzRGVzY3JpcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICBpbWFnZXNCdXR0b25zPXtpbWFnZXNCdXR0b25zfVxuICAgICAgICAgICAgICAgICAgICBvblNvcnRFbmQ9e29uU29ydEVuZH1cbiAgICAgICAgICAgICAgICAgICAgcHJlc3NEZWxheT17MjAwfVxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGVzPXtzZXRBdHRyaWJ1dGVzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgc2F2ZTogKHsgYXR0cmlidXRlcyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaW1hZ2VzID0gW10sIGltYWdlc0Rlc2NyaXB0aW9ucyA9IFtdLCBpbWFnZXNUaXRsZSA9IFtdLCBpbWFnZXNCdXR0b25zID0gW10gfSA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgICAgY29uc3QgZGlzcGxheUltYWdlcyA9IChpbWFnZXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgaW1hZ2VzLm1hcCgoaW1hZ2UsIGluZGV4KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGUtaXRlbS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2dhbGxlcnktaXRlbSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbWFnZXMuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17aW1hZ2UudXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2ltYWdlLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e2ltYWdlLndpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e2ltYWdlLmhlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZD1cImxhenlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwcGVyIGNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtbWV0YSByb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY291bnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyAoaW5kZXggKyAxICsgJycpLnBhZFN0YXJ0KDIsICcwJykgICsgJy0nICsgKGltYWdlcy5sZW5ndGggKyAnJykucGFkU3RhcnQoMiwgJzAnKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtdGl0bGVcIj4gPFJpY2hUZXh0LkNvbnRlbnQgdGFnTmFtZT1cInNwYW5cIiB2YWx1ZT17aW1hZ2VzVGl0bGVbaW5kZXhdfSAvPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGltYWdlc0Rlc2NyaXB0aW9uc1tpbmRleF0ubGVuZ3RoID4gMCAmJiA8ZGl2IGNsYXNzPVwiaW1hZ2UtZGVzY3JpcHRpb25cIj4gPFJpY2hUZXh0LkNvbnRlbnQgdGFnTmFtZT1cInNwYW5cIiB2YWx1ZT17aW1hZ2VzRGVzY3JpcHRpb25zW2luZGV4XX0gLz48L2Rpdj4gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGltYWdlc0J1dHRvbnNbaW5kZXhdLmxlbmd0aCA+IDAgJiYgPGRpdiBjbGFzcz1cImltYWdlLWJ1dHRvblwiPiA8UmljaFRleHQuQ29udGVudCB0YWdOYW1lPVwic3BhblwiIHZhbHVlPXtpbWFnZXNCdXR0b25zW2luZGV4XX0gLz48L2Rpdj4gfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0bnMtY29udHJvbHNcIiBhcmlhLWxhYmVsPVwiQ2Fyb3VzZWwgTmF2aWdhdGlvblwiPjxidXR0b24gZGF0YS1jb250cm9scz1cInByZXZcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1jb250cm9scz1cInRuczFcIj48c3ZnIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMzIgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZyBjbGlwLXBhdGg9XCJ1cmwoI2NsaXAwKVwiPjxwYXRoIGQ9XCJNNC43NjgzN2UtMDYgOEwzMiA4XCIgc3Ryb2tlPVwid2hpdGVcIiBzdHJva2Utd2lkdGg9XCIxLjY3NjlcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCI+PC9wYXRoPjxwYXRoIGQ9XCJNOCAxNkM4IDExLjU4IDQuNDIgOCAyLjYwNjczZS0wNiA4QzQuNDIgOCA4IDQuNDIgOCAyLjM4NDE5ZS0wNlwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiMS45MjEyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiPjwvcGF0aD48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPVwiY2xpcDBcIj48cmVjdCB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwid2hpdGVcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMzIgMTYpIHJvdGF0ZSgtMTgwKVwiPjwvcmVjdD48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz48L2J1dHRvbj48YnV0dG9uIGRhdGEtY29udHJvbHM9XCJuZXh0XCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtY29udHJvbHM9XCJ0bnMxXCI+PHN2ZyB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDMyIDE2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0zMiA4TDAgOFwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiMS42NzY5XCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiPjwvcGF0aD48cGF0aCBkPVwiTTI0IDBDMjQgNC40MiAyNy41OCA4IDMyIDhDMjcuNTggOCAyNCAxMS41OCAyNCAxNlwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiMS45MjEyXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiPjwvcGF0aD48L3N2Zz48L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmZWF0dXJlZC1zbGlkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVucy13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheUltYWdlcyhpbWFnZXMpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuXG4gICAgfSxcbn0pOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImJsb2NrRWRpdG9yXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImJsb2Nrc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJpMThuXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=