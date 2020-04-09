webpackHotUpdate("static/development/pages/rooms.js",{

/***/ "./pages/rooms.tsx":
/*!*************************!*\
  !*** ./pages/rooms.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var skyway_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! skyway-js */ "./node_modules/skyway-js/dist/skyway.js");
/* harmony import */ var skyway_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(skyway_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env */ "./pages/env.ts");


var _this = undefined,
    _jsxFileName = "/Users/yuzi/myprograming/we_wanna_eat_Jiro/frontend/pages/rooms.tsx";


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




var Rooms = function Rooms(props) {
  var getLocalStream = function getLocalStream() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getLocalStream$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
            }));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, null, Promise);
  };

  var localStreamSetting = function localStreamSetting(video) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function localStreamSetting$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getLocalStream());

          case 2:
            video.srcObject = _context2.sent;
            _context2.next = 5;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(video.play());

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, null, Promise);
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoMuted = _useState[0],
      setLocalVideoMuted = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(new MediaStream()),
      localVideoStream = _useState2[0],
      setLocalVideoStream = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoPlaysInline = _useState3[0],
      setLocalVideoPlaysInline = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      localVideoMessages = _useState4[0],
      setLocalVideoMessages = _useState4[1];

  var peer = new skyway_js__WEBPACK_IMPORTED_MODULE_2___default.a({
    key: _env__WEBPACK_IMPORTED_MODULE_3__["SKYWAY_API_KEY"]
  });
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {}, []);
  return __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "heading",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("p", {
    className: "note",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  }, "Enter remote peer ID to call."), __jsx("div", {
    className: "p2p-media",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "remote-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "video-remote-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 13
    }
  })), __jsx("div", {
    className: "local-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "video-local-stream",
    muted: localVideoMuted,
    ref: localStreamSetting,
    playsInline: localVideoPlaysInline,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 13
    }
  }), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 13
    }
  }, "Your ID: ", __jsx("span", {
    id: "local-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 24
    }
  })), __jsx("input", {
    type: "text",
    placeholder: "Remote Peer ID",
    id: "remote-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "call-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  }, "Join"), __jsx("button", {
    id: "close-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 13
    }
  }, "Leave")))), __jsx("ul", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }
  }));
};

Rooms.getInitialProps = function _callee(_ref) {
  var query;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = _ref.query;
          return _context3.abrupt("return", 1);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, null, Promise);
};

/* harmony default export */ __webpack_exports__["default"] = (Rooms);

/***/ })

})
//# sourceMappingURL=rooms.js.48d48d0d5aa8e8111f68.hot-update.js.map