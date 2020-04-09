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
    _jsxFileName = "/Users/yuzi/myprograming/next-todo/pages/rooms.tsx";


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




var Rooms = function Rooms(props) {
  var getRoomModeByHash = function getRoomModeByHash() {
    return location.hash === "#sfu" ? "sfu" : "mesh";
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(getRoomModeByHash()),
      roomMode = _useState[0],
      setRoomMode = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoMuted = _useState2[0],
      setLocalVideoMuted = _useState2[1]; // const [localVideoStream, setLocalVideoStream] = useState();


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var peer = new skyway_js__WEBPACK_IMPORTED_MODULE_2___default.a({
      key: _env__WEBPACK_IMPORTED_MODULE_3__["SKYWAY_API_KEY"]
    });
    window.addEventListener("hashchange", function () {
      return setRoomMode(getRoomModeByHash());
    });
  }, []);
  return __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "heading",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("div", {
    className: "room",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 9
    }
  }, __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "local-stream",
    muted: localVideoMuted,
    ref: function _callee(video) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
              }));

            case 2:
              video.srcObject = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, null, Promise);
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }), __jsx("span", {
    id: "room-mode",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 13
    }
  }, roomMode), __jsx("input", {
    type: "text",
    placeholder: "Room Name",
    id: "js-room-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "join-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 13
    }
  }, "Join"), __jsx("button", {
    id: "leave-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 13
    }
  }, "Leave")), __jsx("div", {
    className: "remote-streams",
    id: "js-remote-streams",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 11
    }
  }), __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 11
    }
  }, __jsx("pre", {
    className: "messages",
    id: "messages",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 13
    }
  }), __jsx("input", {
    type: "text",
    id: "local-text",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "send-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 13
    }
  }, "Send")))), __jsx("ul", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }));
};

Rooms.getInitialProps = function _callee2(_ref) {
  var query;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = _ref.query;
          return _context2.abrupt("return", 1);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, null, Promise);
};

/* harmony default export */ __webpack_exports__["default"] = (Rooms);

/***/ })

})
//# sourceMappingURL=rooms.js.fb866555c3acdf14febd.hot-update.js.map