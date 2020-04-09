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
      setLocalVideoMuted = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(new MediaStream()),
      localVideoStream = _useState3[0],
      setLocalVideoStream = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      localVideoPlaysInline = _useState4[0],
      setLocalVideoPlaysInline = _useState4[1];

  var peer = new skyway_js__WEBPACK_IMPORTED_MODULE_2___default.a({
    key: _env__WEBPACK_IMPORTED_MODULE_3__["SKYWAY_API_KEY"]
  });

  var joinHandler = function joinHandler() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function joinHandler$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", function () {
              // Note that you need to ensure the peer has connected to signaling server
              // before using methods of peer instance.
              if (!peer.open) {
                return;
              }

              var room = peer.joinRoom(roomId.value, {
                mode: getRoomModeByHash(),
                stream: localStream
              });
              room.once("open", function () {
                messages.textContent += "=== You joined ===\n";
              });
              room.on("peerJoin", function (peerId) {
                messages.textContent += "=== ".concat(peerId, " joined ===\n");
              }); // Render remote stream for new peer join in the room

              room.on("stream", function _callee(stream) {
                var newVideo;
                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        newVideo = document.createElement("video");
                        newVideo.srcObject = stream;
                        newVideo.playsInline = true; // mark peerId to find it later at peerLeave event

                        newVideo.setAttribute("data-peer-id", stream.peerId);
                        remoteVideos.append(newVideo);
                        _context.next = 7;
                        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(newVideo.play()["catch"](console.error));

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, null, null, Promise);
              });
              room.on("data", function (_ref) {
                var data = _ref.data,
                    src = _ref.src;
                // Show a message sent to the room and who sent
                messages.textContent += "".concat(src, ": ").concat(data, "\n");
              }); // for closing room members

              room.on("peerLeave", function (peerId) {
                var remoteVideo = remoteVideos.querySelector("[data-peer-id=".concat(peerId, "]"));
                remoteVideo.srcObject.getTracks().forEach(function (track) {
                  return track.stop();
                });
                remoteVideo.srcObject = null;
                remoteVideo.remove();
                messages.textContent += "=== ".concat(peerId, " left ===\n");
              }); // for closing myself

              room.once("close", function () {
                sendTrigger.removeEventListener("click", onClickSend);
                messages.textContent += "== You left ===\n";
                Array.from(remoteVideos.children).forEach(function (remoteVideo) {
                  remoteVideo.srcObject.getTracks().forEach(function (track) {
                    return track.stop();
                  });
                  remoteVideo.srcObject = null;
                  remoteVideo.remove();
                });
              });
              sendTrigger.addEventListener("click", onClickSend);
              leaveTrigger.addEventListener("click", function () {
                return room.close();
              }, {
                once: true
              });

              function onClickSend() {
                // Send message to all of the peers in the room via websocket
                room.send(localText.value);
                messages.textContent += "".concat(peer.id, ": ").concat(localText.value, "\n");
                localText.value = "";
              }
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, null, Promise);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    window.addEventListener("hashchange", function () {
      return setRoomMode(getRoomModeByHash());
    });
  }, []);
  return __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "heading",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }
  }, "Room Example \u30BF\u30A4\u30C8\u30EB"), __jsx("div", {
    className: "room",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 9
    }
  }, __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 11
    }
  }, __jsx("video", {
    id: "local-stream",
    muted: localVideoMuted,
    ref: function _callee2(video) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
              }));

            case 2:
              video.srcObject = _context3.sent;
              _context3.next = 5;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(video.play());

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, null, Promise);
    },
    playsInline: localVideoPlaysInline,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 13
    }
  }), __jsx("span", {
    id: "room-mode",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 13
    }
  }, roomMode), __jsx("input", {
    type: "text",
    placeholder: "Room Name",
    id: "js-room-id",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "join-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 13
    }
  }, "Join"), __jsx("button", {
    id: "leave-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 13
    }
  }, "Leave")), __jsx("div", {
    className: "remote-streams",
    id: "js-remote-streams",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 11
    }
  }), __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 11
    }
  }, __jsx("pre", {
    className: "messages",
    id: "messages",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 13
    }
  }), __jsx("input", {
    type: "text",
    id: "local-text",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 13
    }
  }), __jsx("button", {
    id: "send-trigger",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 13
    }
  }, "Send")))), __jsx("ul", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 7
    }
  }));
};

Rooms.getInitialProps = function _callee3(_ref2) {
  var query;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          query = _ref2.query;
          return _context4.abrupt("return", 1);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, null, Promise);
};

/* harmony default export */ __webpack_exports__["default"] = (Rooms);

/***/ })

})
//# sourceMappingURL=rooms.js.bb8215907d5e11e8a23a.hot-update.js.map