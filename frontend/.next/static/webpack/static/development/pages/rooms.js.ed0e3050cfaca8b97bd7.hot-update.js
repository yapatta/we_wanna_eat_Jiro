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
  var localStreamSetting = function localStreamSetting() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function localStreamSetting$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
            }));

          case 2:
            localStreamRef.current.srcObject = _context.sent;
            _context.next = 5;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(localStreamRef.current.play());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, null, Promise);
  };

  var localStreamRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var remoteStreamRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      localId = _useState[0],
      setLocalId = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoMuted = _useState2[0],
      setLocalVideoMuted = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoPlaysInline = _useState3[0],
      setLocalVideoPlaysInline = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      remoteId = _useState4[0],
      setRemoteId = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      remoteVideoMuted = _useState5[0],
      setRemoteVideoMuted = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      remoteVideoPlaysInline = _useState6[0],
      setRemoteVideoPlaysInline = _useState6[1];

  var peer = new skyway_js__WEBPACK_IMPORTED_MODULE_2___default.a({
    key: _env__WEBPACK_IMPORTED_MODULE_3__["SKYWAY_API_KEY"]
  });

  var callTrigerClick = function callTrigerClick() {
    var mediaConnection, connectionClose;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function callTrigerClick$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (peer.open) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return");

          case 2:
            _context3.t0 = peer;
            _context3.t1 = remoteId;
            _context3.next = 6;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
            }));

          case 6:
            _context3.t2 = _context3.sent;
            mediaConnection = _context3.t0.call.call(_context3.t0, _context3.t1, _context3.t2);
            mediaConnection.on("stream", function _callee(stream) {
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      // Render remote stream for caller
                      remoteStreamRef.current.srcObject = stream;
                      setRemoteVideoPlaysInline(true);
                      _context2.next = 4;
                      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(remoteStreamRef.current.play()["catch"](console.error));

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, null, Promise);
            });
            mediaConnection.once("close", function () {
              if (remoteStreamRef.current.srcObject instanceof MediaStream) remoteStreamRef.current.srcObject.getTracks().forEach(function (track) {
                return track.stop();
              });
              remoteStreamRef.current.srcObject = null;
            });

            connectionClose = function connectionClose() {
              return mediaConnection.close(true);
            };

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, null, Promise);
  };

  peer.once("open", function (id) {
    return setLocalId(id);
  }); // Register callee handler

  peer.on("call", function (mediaConnection) {
    if (localStreamRef.current.srcObject instanceof MediaStream) mediaConnection.answer(localStreamRef.current.srcObject);
    mediaConnection.on("stream", function _callee2(stream) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee2$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // Render remote stream for callee
              remoteStreamRef.current.srcObject = stream;
              setRemoteVideoPlaysInline(true);
              _context4.next = 4;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(remoteStreamRef.current.play()["catch"](console.error));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, null, Promise);
    });
    mediaConnection.once("close", function () {
      if (remoteStreamRef.current.srcObject instanceof MediaStream) remoteStreamRef.current.srcObject.getTracks().forEach(function (track) {
        return track.stop();
      });
      remoteStreamRef.current.srcObject = null;
    });
    document.getElementById("close-trigger").addEventListener("click", function () {
      return mediaConnection.close(true);
    });
  });
  peer.on("error", console.error);
  return __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "heading",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 9
    }
  }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("p", {
    className: "note",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 9
    }
  }, "Enter remote peer ID to call."), __jsx("div", {
    className: "p2p-media",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "remote-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "video-remote-stream",
    muted: remoteVideoMuted,
    ref: remoteStreamRef,
    playsInline: remoteVideoPlaysInline,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 13
    }
  })), __jsx("div", {
    className: "local-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "video-local-stream",
    muted: localVideoMuted,
    ref: localStreamRef,
    playsInline: localVideoPlaysInline,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 13
    }
  }), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 13
    }
  }, "Your ID: ", __jsx("span", {
    id: "local-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 24
    }
  }, localId)), __jsx("input", {
    type: "text",
    placeholder: "Remote Peer ID",
    id: "remote-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "call-trigger",
    onClick: callTrigerClick,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 13
    }
  }, "Join"), __jsx("button", {
    id: "close-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 13
    }
  }, "Leave")))), __jsx("ul", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 7
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Rooms);

/***/ })

})
//# sourceMappingURL=rooms.js.ed0e3050cfaca8b97bd7.hot-update.js.map