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
  var getRoomModeByHash = function getRoomModeByHash() {
    return location.hash === "#sfu" ? "sfu" : "mesh";
  };

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

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(getRoomModeByHash()),
      roomMode = _useState[0],
      setRoomMode = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      roomId = _useState2[0],
      setRoomId = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoMuted = _useState3[0],
      setLocalVideoMuted = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(new MediaStream()),
      localVideoStream = _useState4[0],
      setLocalVideoStream = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoPlaysInline = _useState5[0],
      setLocalVideoPlaysInline = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      localVideoMessages = _useState6[0],
      setLocalVideoMessages = _useState6[1];

  var joinHandler = function joinHandler() {
    var peer, room;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function joinHandler$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            peer = new skyway_js__WEBPACK_IMPORTED_MODULE_2___default.a({
              key: _env__WEBPACK_IMPORTED_MODULE_3__["SKYWAY_API_KEY"]
            });

            if (peer.open) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            _context3.t0 = peer;
            _context3.t1 = roomId;
            _context3.t2 = getRoomModeByHash();
            _context3.next = 8;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getLocalStream());

          case 8:
            _context3.t3 = _context3.sent;
            _context3.t4 = {
              mode: _context3.t2,
              stream: _context3.t3
            };
            room = _context3.t0.joinRoom.call(_context3.t0, _context3.t1, _context3.t4);
            room.once("open", function () {
              setLocalVideoMessages(localVideoMessages + "=== You joined ===\n");
            });
            room.on("peerJoin", function (peerId) {
              setLocalVideoMessages(localVideoMessages + "=== ".concat(peerId, " joined ===\n"));
            }); // Render remote stream for new peer join in the room

            room.on("stream", function _callee(stream) {
              var newVideo;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      newVideo = document.createElement("video");
                      newVideo.srcObject = stream;
                      setLocalVideoPlaysInline(true); // mark peerId to find it later at peerLeave event

                      newVideo.setAttribute("data-peer-id", stream.peerId);
                      document.getElementById("remote-streams").append(newVideo);
                      _context2.next = 7;
                      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(newVideo.play()["catch"](console.error));

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, null, Promise);
            });
            room.on("data", function (_ref) {
              var data = _ref.data,
                  src = _ref.src;
              // Show a message sent to the room and who sent
              setLocalVideoMessages(localVideoMessages + "".concat(src, ": ").concat(data, "\n"));
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, null, Promise);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    window.addEventListener("hashchange", function () {
      return setRoomMode(getRoomModeByHash());
    });
    getLocalStream().then(function (stream) {
      setLocalVideoStream(stream);
      return joinHandler();
    }).then(function () {});
  }, [localVideoStream]);
  return __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "heading",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 9
    }
  }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("p", {
    "class": "note",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 9
    }
  }, "Enter remote peer ID to call."), __jsx("div", {
    className: "p2p-media",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 9
    }
  }), __jsx("div", {
    className: "remote-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 9
    }
  }, __jsx("video", {
    id: "video-remote-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "local-stream",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 9
    }
  }, __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "video-local-stream",
    muted: localVideoMuted,
    ref: function _callee2(video) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee2$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getLocalStream());

            case 2:
              video.srcObject = _context4.sent;
              _context4.next = 5;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(video.play());

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, null, Promise);
    },
    playsInline: localVideoPlaysInline,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 13
    }
  }), __jsx("span", {
    id: "room-mode",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 13
    }
  }, roomMode), __jsx("input", {
    type: "text",
    placeholder: "Room Name",
    id: "room-id",
    onChange: function onChange(e) {
      setRoomId(e.target.value);
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 13
    }
  }), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 13
    }
  }, "Your ID: ", __jsx("span", {
    id: "local-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 24
    }
  })), __jsx("input", {
    type: "text",
    placeholder: "Remote Peer ID",
    id: "remote-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "call-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 13
    }
  }, "Join"), __jsx("button", {
    id: "close-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 13
    }
  }, "Leave")))), __jsx("ul", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 7
    }
  }));
};

Rooms.getInitialProps = function _callee3(_ref2) {
  var query;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          query = _ref2.query;
          return _context5.abrupt("return", 1);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, null, Promise);
};

/* harmony default export */ __webpack_exports__["default"] = (Rooms);

/***/ })

})
//# sourceMappingURL=rooms.js.d768ab81bce0ba4705b7.hot-update.js.map