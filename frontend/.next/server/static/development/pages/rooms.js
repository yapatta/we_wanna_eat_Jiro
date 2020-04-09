module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/env.ts":
/*!**********************!*\
  !*** ./pages/env.ts ***!
  \**********************/
/*! exports provided: API_PATH, SKYWAY_API_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_PATH", function() { return API_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SKYWAY_API_KEY", function() { return SKYWAY_API_KEY; });
const API_PATH = "http://virtserver.swaggerhub.com/ziroppe/WeWantToEatJiro/1.0.0";
const SKYWAY_API_KEY = "81bf4144-2a7f-4b43-84d4-a94c867113ab";

/***/ }),

/***/ "./pages/rooms.tsx":
/*!*************************!*\
  !*** ./pages/rooms.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var skyway_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! skyway-js */ "skyway-js");
/* harmony import */ var skyway_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(skyway_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./env */ "./pages/env.ts");
var _jsxFileName = "/Users/yuzi/myprograming/we_wanna_eat_Jiro/frontend/pages/rooms.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Rooms = props => {
  const localStreamSetting = async () => {
    localStreamRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    await localStreamRef.current.play();
  };

  const localStreamRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const remoteStreamRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const {
    0: localId,
    1: setLocalId
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: localVideoMuted,
    1: setLocalVideoMuted
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: localVideoPlaysInline,
    1: setLocalVideoPlaysInline
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: remoteId,
    1: setRemoteId
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: remoteVideoMuted,
    1: setRemoteVideoMuted
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: remoteVideoPlaysInline,
    1: setRemoteVideoPlaysInline
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: peer,
    1: setPeer
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(new skyway_js__WEBPACK_IMPORTED_MODULE_1___default.a({
    key: _env__WEBPACK_IMPORTED_MODULE_2__["SKYWAY_API_KEY"]
  }));

  const callTrigerClick = async () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const mediaConnection = localStreamRef.current.srcObject instanceof MediaStream ? peer.call(remoteId, localStreamRef.current.srcObject) : null;
    mediaConnection.on("stream", async stream => {
      // Render remote stream for caller
      remoteStreamRef.current.srcObject = stream;
      setRemoteVideoPlaysInline(true);
      await remoteStreamRef.current.play().catch(console.error);
    });
    mediaConnection.once("close", () => {
      if (remoteStreamRef.current.srcObject instanceof MediaStream) remoteStreamRef.current.srcObject.getTracks().forEach(track => track.stop());
      remoteStreamRef.current.srcObject = null;
    });
    document.getElementById("close-trigger").addEventListener("click", () => mediaConnection.close(true));
  };

  peer.once("open", id => setLocalId(id)); // Register callee handler

  peer.on("call", mediaConnection => {
    if (localStreamRef.current.srcObject instanceof MediaStream) mediaConnection.answer(localStreamRef.current.srcObject);
    mediaConnection.on("stream", async stream => {
      // Render remote stream for callee
      remoteStreamRef.current.srcObject = stream;
      setRemoteVideoPlaysInline(true);
      await remoteStreamRef.current.play().catch(console.error);
    });
    mediaConnection.once("close", () => {
      if (remoteStreamRef.current.srcObject instanceof MediaStream) remoteStreamRef.current.srcObject.getTracks().forEach(track => track.stop());
      remoteStreamRef.current.srcObject = null;
    });
    document.getElementById("close-trigger").addEventListener("click", () => mediaConnection.close(true));
  });
  peer.on("error", console.error);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    (async () => {
      await localStreamSetting();
    })();
  }, []);
  return __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "heading",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 9
    }
  }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("p", {
    className: "note",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 9
    }
  }, "Enter remote peer ID to call."), __jsx("div", {
    className: "p2p-media",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "remote-stream",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "video-remote-stream",
    muted: remoteVideoMuted,
    ref: remoteStreamRef,
    playsInline: remoteVideoPlaysInline,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 13
    }
  })), __jsx("div", {
    className: "local-stream",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "video-local-stream",
    muted: localVideoMuted,
    ref: localStreamRef,
    playsInline: localVideoPlaysInline,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 13
    }
  }), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 13
    }
  }, "Your ID: ", __jsx("span", {
    id: "local-id",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 24
    }
  }, localId)), __jsx("input", {
    type: "text",
    placeholder: "Remote Peer ID",
    id: "remote-id",
    onChange: e => setRemoteId(e.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "call-trigger",
    onClick: callTrigerClick,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 13
    }
  }, "Join"), __jsx("button", {
    id: "close-trigger",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 13
    }
  }, "Leave")))), __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 7
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Rooms);

/***/ }),

/***/ 6:
/*!*******************************!*\
  !*** multi ./pages/rooms.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yuzi/myprograming/we_wanna_eat_Jiro/frontend/pages/rooms.tsx */"./pages/rooms.tsx");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "skyway-js":
/*!****************************!*\
  !*** external "skyway-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("skyway-js");

/***/ })

/******/ });
//# sourceMappingURL=rooms.js.map