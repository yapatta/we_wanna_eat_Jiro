import { useState, useEffect } from "react";
import Peer from "skyway-js";

import { API_PATH, SKYWAY_API_KEY } from "./env";

const Rooms = (props) => {
  const getRoomModeByHash = () => (location.hash === "#sfu" ? "sfu" : "mesh");

  const [roomMode, setRoomMode] = useState(getRoomModeByHash());
  const [roomId, setRoomId] = useState("");
  const [localVideoMuted, setLocalVideoMuted] = useState(true);
  const [localVideoPlaysInline, setLocalVideoPlaysInline] = useState(true);
  const [localVideoMessages, setLocalVideoMessages] = useState("");
  const peer = new Peer({ key: SKYWAY_API_KEY });
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
        video: true,
      }),
    });

    room.once("open", () => {
      setLocalVideoMessages(localVideoMessages + "=== You joined ===\n");
    });
    room.on("peerJoin", (peerId) => {
      setLocalVideoMessages(localVideoMessages + `=== ${peerId} joined ===\n`);
    });

    // Render remote stream for new peer join in the room
    room.on("stream", async (stream) => {
      const newVideo = document.createElement("video");
      newVideo.srcObject = stream;
      setLocalVideoPlaysInline(true);
      // mark peerId to find it later at peerLeave event
      newVideo.setAttribute("data-peer-id", stream.peerId);
      document.getElementById("remote-streams").append(newVideo);
      await newVideo.play().catch(console.error);
    });

    room.on("data", ({ data, src }) => {
      // Show a message sent to the room and who sent
      setLocalVideoMessages(localVideoMessages + `${src}: ${data}\n`);
    });

    // for closing room members
    room.on("peerLeave", (peerId) => {
      const remoteVideo = document
        .getElementById("remote-streams")
        .querySelector(`[data-peer-id=${peerId}]`);
      remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();
      setLocalVideoMessages(localVideoMessages + `=== ${peerId} left ===\n`);
    });

    // for closing myself
    room.once("close", () => {
      sendTrigger.removeEventListener("click", onClickSend);
      messages.textContent += "== You left ===\n";
      Array.from(remoteVideos.children).forEach((remoteVideo) => {
        remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });

    sendTrigger.addEventListener("click", onClickSend);
    leaveTrigger.addEventListener("click", () => room.close(), { once: true });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(localText.value);

      messages.textContent += `${peer.id}: ${localText.value}\n`;
      localText.value = "";
    }
  };

  useEffect(() => {
    window.addEventListener("hashchange", () =>
      setRoomMode(getRoomModeByHash())
    );
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="heading">Room Example タイトル</h1>
        <div className="room">
          <div>
            <video
              id="local-stream"
              muted={localVideoMuted}
              ref={async (video) => {
                // Cannot set property 'srcObject' of null問題
                video.srcObject = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: true,
                });
                await video.play();
              }}
              playsInline={localVideoPlaysInline}
            ></video>
            <span id="room-mode">{roomMode}</span>
            <input
              type="text"
              placeholder="Room Name"
              id="room-id"
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            />
            <button id="join-trigger" onClick={joinHandler}>
              Join
            </button>
            <button id="leave-trigger">Leave</button>
          </div>
          <div className="remote-streams" id="remote-streams"></div>
          <div>
            <pre className="messages" id="messages">
              {localVideoMessages}
            </pre>
            <input type="text" id="local-text" />
            <button id="send-trigger">Send</button>
          </div>
        </div>
      </div>
      <ul></ul>
    </div>
  );
};

Rooms.getInitialProps = async ({ query }) => {
  return 1;
};

export default Rooms;
