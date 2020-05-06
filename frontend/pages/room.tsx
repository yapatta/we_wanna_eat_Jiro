import { useState, useEffect, useRef } from "react";
import Peer, { RoomStream } from "skyway-js";

import { API_PATH, SKYWAY_API_KEY } from "./env";
import Layout from "../components/layout";
import { Grid, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  myVideo: {},
  remoteStreams: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const Room = (props) => {
  const classes = useStyles();

  const jsLocalStream = document.getElementById("js-local-stream");
  const jsRemoteStream = document.getElementById("js-remote-streams");
  const jsSendTrigger = document.getElementById("js-send-trigger");
  const jsLeaveTrigger = document.getElementById("js-leave-trigger");
  const getRoomModeByHash = () => (location.hash === "#sfu" ? "sfu" : "mesh");

  const localStreamRef = useRef<HTMLVideoElement>(null);

  const localStreamSetting = async () => {
    localStreamRef.current.srcObject = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true,
      }
    );
    await localStreamRef.current.play();
  };

  const localStreamOff = () => {
    // ローカルストリームを複数回オン, オフにしたとき, current = nullになるため
    if (localStreamRef.current) {
      if (localStreamRef.current.srcObject instanceof MediaStream) {
        localStreamRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    }
  };

  const [roomMode, setRoomMode] = useState(getRoomModeByHash());
  const [roomId, setRoomId] = useState("");
  const [roomMessages, setRoomMessages] = useState("");
  const [localText, setLocalText] = useState("");
  const [peer, setPeer] = useState(new Peer({ key: SKYWAY_API_KEY }));

  window.addEventListener("hashchange", () => setRoomMode(getRoomModeByHash()));

  window.addEventListener("popstate", (e) => {
    localStreamOff();
  });

  const joinTroggerClick = async () => {
    if (!peer.open) {
      // FIXME: 通話相手がいない的な旨の処理を表示
      return;
    }

    const room =
      localStreamRef.current.srcObject instanceof MediaStream
        ? peer.joinRoom(roomId, {
            mode: getRoomModeByHash(),
            stream: localStreamRef.current.srcObject,
          })
        : null;

    room.once("open", () => {
      setRoomMessages(roomMessages + "=== You joined ===\n");
    });
    room.on("peerJoin", (peerId: string) => {
      setRoomMessages(roomMessages + `=== ${peerId} joined ===\n`);
    });

    room.on("stream", async (stream) => {
      const newVideo = document.createElement("video");
      newVideo.srcObject = stream;
      newVideo.setAttribute("data-peer-id", stream.peerId);
      newVideo.setAttribute("width", "25%");
      jsRemoteStream.append(newVideo);
      await newVideo.play().catch(console.error);
    });

    room.on("data", ({ data, src }) => {
      // Show a message sent to the room and who sent
      setRoomMessages(roomMessages + `${src}: ${data}\n`);
    });

    // for closing room members
    room.on("peerLeave", (peerId: string) => {
      const remoteVideo: HTMLVideoElement = jsRemoteStream.querySelector(
        `[data-peer-id=${peerId}]`
      );

      if (remoteVideo.id !== "js-local-stream") {
        if (remoteVideo.srcObject instanceof MediaStream) {
          remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
        }
        remoteVideo.srcObject = null;
        remoteVideo.remove();
        setRoomMessages(roomMessages + `=== ${peerId} left ===\n`);
      }
    });

    // for closing myself
    room.once("close", () => {
      jsSendTrigger.removeEventListener("click", onClickSend);
      setRoomMessages(roomMessages + "== You left ===\n");
      Array.from(jsRemoteStream.children).forEach(
        (remoteVideo: HTMLVideoElement) => {
          if (remoteVideo.id !== "js-local-stream") {
            if (remoteVideo.srcObject instanceof MediaStream) {
              remoteVideo.srcObject
                .getTracks()
                .forEach((track) => track.stop());
            }
            remoteVideo.srcObject = null;
            remoteVideo.remove();
          }
        }
      );
    });

    jsSendTrigger.addEventListener("click", onClickSend);
    jsLeaveTrigger.addEventListener("click", () => room.close(), {
      once: true,
    });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(localText);

      setRoomMessages(roomMessages + `${peer.id}: ${localText}\n`);
      setLocalText("");
    }
  };

  useEffect(() => {
    (async () => {
      await localStreamSetting();
    })();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h1 className="heading">Room example</h1>
        <p className="note">
          Change Room mode (before join in a room):
          <a href="#">mesh</a> / <a href="#sfu">sfu</a>
        </p>
        <div className="room">
          <div className={classes.myVideo}></div>
          <div className={classes.remoteStreams} id="js-remote-streams">
            <video
              id="js-local-stream"
              muted
              ref={localStreamRef}
              playsInline
              width="25%"
            ></video>
          </div>
          <span id="js-room-mode">{roomMode}</span>:
          <input
            type="text"
            placeholder="Room Name"
            id="js-room-id"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button
            variant="contained"
            id="js-join-trigger"
            color="primary"
            onClick={joinTroggerClick}
          >
            Join
          </Button>
          <Button id="js-leave-trigger">Leave</Button>
          <div>
            <pre className="messages" id="js-messages">
              {roomMessages}
            </pre>
            <input
              type="text"
              id="js-local-text"
              value={localText}
              onChange={(e) => {
                setLocalText(e.target.value);
              }}
            />
            <button id="js-send-trigger">Send</button>
          </div>
          <button
            onClick={() => {
              history.back();
            }}
          >
            前のページに戻る
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Room;
