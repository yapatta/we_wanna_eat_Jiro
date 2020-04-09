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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
var _jsxFileName = "/Users/yuzi/myprograming/next-todo/pages/rooms.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Rooms = props => {
  const getRoomModeByHash = () => location.hash === "#sfu" ? "sfu" : "mesh";

  const {
    0: roomMode,
    1: setRoomMode
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(getRoomModeByHash());
  const {
    0: roomId,
    1: setRoomId
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
    0: localVideoMessages,
    1: setLocalVideoMessages
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const peer = new skyway_js__WEBPACK_IMPORTED_MODULE_1___default.a({
    key: _env__WEBPACK_IMPORTED_MODULE_2__["SKYWAY_API_KEY"]
  });

  const joinHandler = async () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const room = peer.joinRoom(roomId, {
      mode: getRoomModeByHash(),
      stream: await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
    });
    room.once("open", () => {
      setLocalVideoMessages(localVideoMessages + "=== You joined ===\n");
    });
    room.on("peerJoin", peerId => {
      setLocalVideoMessages(localVideoMessages + `=== ${peerId} joined ===\n`);
    }); // Render remote stream for new peer join in the room

    room.on("stream", async stream => {
      const newVideo = document.createElement("video");
      newVideo.srcObject = stream;
      setLocalVideoPlaysInline(true); // mark peerId to find it later at peerLeave event

      newVideo.setAttribute("data-peer-id", stream.peerId);
      document.getElementById("remote-streams").append(newVideo);
      await newVideo.play().catch(console.error);
    });
    room.on("data", ({
      data,
      src
    }) => {
      // Show a message sent to the room and who sent
      setLocalVideoMessages(localVideoMessages + `${src}: ${data}\n`);
    }); // for closing room members

    room.on("peerLeave", peerId => {
      const remoteVideo = document.getElementById("remote-streams").querySelector(`[data-peer-id=${peerId}]`);
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();
      setLocalVideoMessages(localVideoMessages + `=== ${peerId} left ===\n`);
    }); // for closing myself

    room.once("close", () => {
      sendTrigger.removeEventListener("click", onClickSend);
      messages.textContent += "== You left ===\n";
      Array.from(remoteVideos.children).forEach(remoteVideo => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });
    sendTrigger.addEventListener("click", onClickSend);
    leaveTrigger.addEventListener("click", () => room.close(), {
      once: true
    });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(localText.value);
      messages.textContent += `${peer.id}: ${localText.value}\n`;
      localText.value = "";
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    window.addEventListener("hashchange", () => setRoomMode(getRoomModeByHash()));
  }, []);
  return __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "heading",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 9
    }
  }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("div", {
    className: "room",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 9
    }
  }, __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "local-stream",
    muted: localVideoMuted,
    ref: async video => {
      // Cannot set property 'srcObject' of null問題
      video.srcObject = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      await video.play();
    },
    playsInline: localVideoPlaysInline,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 13
    }
  }), __jsx("span", {
    id: "room-mode",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 13
    }
  }, roomMode), __jsx("input", {
    type: "text",
    placeholder: "Room Name",
    id: "room-id",
    onChange: e => {
      setRoomId(e.target.value);
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "join-trigger",
    onClick: joinHandler,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 13
    }
  }, "Join"), __jsx("button", {
    id: "leave-trigger",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 13
    }
  }, "Leave")), __jsx("div", {
    className: "remote-streams",
    id: "remote-streams",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 11
    }
  }), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 11
    }
  }, __jsx("pre", {
    className: "messages",
    id: "messages",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 13
    }
  }, localVideoMessages), __jsx("input", {
    type: "text",
    id: "local-text",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "send-trigger",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 13
    }
  }, "Send")))), __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 7
    }
  }));
};

Rooms.getInitialProps = async ({
  query
}) => {
  return 1;
};

/* harmony default export */ __webpack_exports__["default"] = (Rooms);

/***/ }),

/***/ 5:
/*!*******************************!*\
  !*** multi ./pages/rooms.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yuzi/myprograming/next-todo/pages/rooms.tsx */"./pages/rooms.tsx");


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