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
  var getRoomModeByHash, _useState, roomMode, setRoomMode, _useState2, localVideoMuted, setLocalVideoMuted, _useState3, localVideoStream, setLocalVideoStream, _useState4, localVideoPlaysInline, setLocalVideoPlaysInline, peer;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function Rooms$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          getRoomModeByHash = function getRoomModeByHash() {
            return location.hash === "#sfu" ? "sfu" : "mesh";
          };

          _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(getRoomModeByHash()), roomMode = _useState[0], setRoomMode = _useState[1];
          _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true), localVideoMuted = _useState2[0], setLocalVideoMuted = _useState2[1];
          _context2.t0 = react__WEBPACK_IMPORTED_MODULE_1__["useState"];
          _context2.next = 6;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }));

        case 6:
          _context2.t1 = _context2.sent;
          _useState3 = (0, _context2.t0)(_context2.t1);
          localVideoStream = _useState3[0];
          setLocalVideoStream = _useState3[1];
          _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true), localVideoPlaysInline = _useState4[0], setLocalVideoPlaysInline = _useState4[1];
          peer = new skyway_js__WEBPACK_IMPORTED_MODULE_2___default.a({
            key: _env__WEBPACK_IMPORTED_MODULE_3__["SKYWAY_API_KEY"]
          });
          Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
            window.addEventListener("hashchange", function () {
              return setRoomMode(getRoomModeByHash());
            });
          }, []);
          return _context2.abrupt("return", __jsx("div", {
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 27,
              columnNumber: 5
            }
          }, __jsx("div", {
            className: "container",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28,
              columnNumber: 7
            }
          }, __jsx("h1", {
            className: "heading",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 29,
              columnNumber: 9
            }
          }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("div", {
            className: "room",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30,
              columnNumber: 9
            }
          }, __jsx("div", {
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 31,
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
                      // Cannot set property 'srcObject' of null問題
                      video.srcObject = localVideoStream;
                      _context.next = 3;
                      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(video.play());

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, null, Promise);
            },
            playsInline: localVideoPlaysInline,
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 32,
              columnNumber: 13
            }
          }), __jsx("span", {
            id: "room-mode",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 42,
              columnNumber: 13
            }
          }, roomMode), __jsx("input", {
            type: "text",
            placeholder: "Room Name",
            id: "js-room-id",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 13
            }
          }), __jsx("button", {
            id: "join-trigger",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 44,
              columnNumber: 13
            }
          }, "Join"), __jsx("button", {
            id: "leave-trigger",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 45,
              columnNumber: 13
            }
          }, "Leave")), __jsx("div", {
            className: "remote-streams",
            id: "js-remote-streams",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 47,
              columnNumber: 11
            }
          }), __jsx("div", {
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 48,
              columnNumber: 11
            }
          }, __jsx("pre", {
            className: "messages",
            id: "messages",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 49,
              columnNumber: 13
            }
          }), __jsx("input", {
            type: "text",
            id: "local-text",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 50,
              columnNumber: 13
            }
          }), __jsx("button", {
            id: "send-trigger",
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 51,
              columnNumber: 13
            }
          }, "Send")))), __jsx("ul", {
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 55,
              columnNumber: 7
            }
          })));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, null, Promise);
};

Rooms.getInitialProps = function _callee2(_ref) {
  var query;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee2$(_context3) {
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
//# sourceMappingURL=rooms.js.5735a17fd74774e87fd1.hot-update.js.map