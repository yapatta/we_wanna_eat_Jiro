import { useState, useEffect, useRef } from "react";
import Peer, { RoomStream } from "skyway-js";

import { API_PATH, SKYWAY_API_KEY } from "./env";

const Room = (props) => {
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
    // FIXME: ローカルストリームを複数回オン, オフにしたとき, localStreamのsrcObjectがnullになって落ちる
    if (localStreamRef.current.srcObject instanceof MediaStream) {
      localStreamRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const [roomMode, setRoomMode] = useState(getRoomModeByHash());
  const [roomId, setRoomId] = useState("");
  const [roomMessages, setRoomMessages] = useState("");

  const [remoteStreams, setRemoteStreams] = useState<RoomStream[]>([]);

  const [localText, setLocalText] = useState("");

  //const [localVideoMuted, setLocalVideoMuted] = useState(true);
  //const [localVideoPlaysInline, setLocalVideoPlaysInline] = useState(true);

  const [peer, setPeer] = useState(new Peer({ key: SKYWAY_API_KEY }));

  window.addEventListener("hashchange", () => setRoomMode(getRoomModeByHash()));

  window.addEventListener("popstate", (e) => {
    localStreamOff();
  });

  const joinTroggerClick = async () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
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
    room.on("peerJoin", (peerId) => {
      setRoomMessages(roomMessages + `=== ${peerId} joined ===\n`);
    });

    room.on("stream", async (stream: RoomStream) => {
      setRemoteStreams([...remoteStreams, stream]);
    });

    room.on("data", ({ data, src }) => {
      // Show a message sent to the room and who sent
      setRoomMessages(roomMessages + `${src}: ${data}\n`);
    });

    // for closing room members
    room.on("peerLeave", (peerId: string) => {
      setRemoteStreams(
        remoteStreams.filter((remoteStream) => {
          if (peerId === remoteStream.peerId) {
            remoteStream.getTracks().forEach((track) => track.stop());
            remoteStream = null;
          }
          return peerId != remoteStream.peerId;
        })
      );

      setRoomMessages(roomMessages + `=== ${peerId} left ===\n`);
    });

    // for closing myself
    room.once("close", () => {
      document
        .getElementById("js-send-trigger")
        .removeEventListener("click", onClickSend);
      setRoomMessages(roomMessages + "== You left ===\n");
      remoteStreams.map((remoteStream) => {
        remoteStream.getTracks().forEach((track) => track.stop());
        remoteStream = null;
      });
      setRemoteStreams([]);
    });

    document
      .getElementById("js-send-trigger")
      .addEventListener("click", onClickSend);
    document
      .getElementById("js-leave-trigger")
      .addEventListener("click", () => room.close(), { once: true });

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
    <div>
      <div className="container">
        <h1 className="heading">Room example</h1>
        <p className="note">
          Change Room mode (before join in a room):
          <a href="#">mesh</a> / <a href="#sfu">sfu</a>
        </p>
        <div className="room">
          <div>
            <video
              id="js-local-stream"
              muted
              ref={localStreamRef}
              playsInline
            ></video>
            <span id="js-room-mode">{roomMode}</span>:
            <input
              type="text"
              placeholder="Room Name"
              id="js-room-id"
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button id="js-join-trigger" onClick={joinTroggerClick}>
              Join
            </button>
            <button id="js-leave-trigger">Leave</button>
          </div>

          <div className="remote-streams" id="js-remote-streams">
            {remoteStreams.map((remoteStream: RoomStream) => {
              return (
                <video
                  ref={async (video) => {
                    // FIXME: リモートストリームが切れた(誰かが退出し)とき, remoteStreamがnullになって型エラーで落ちる
                    video.srcObject = remoteStream;
                    await video.play();
                  }}
                  playsInline
                  id={remoteStream.peerId}
                ></video>
              );
            })}
          </div>

          <div>
            <pre className="messages" id="js-messages"></pre>
            <input
              type="text"
              id="js-local-text"
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
            />
            <button id="js-send-trigger">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
