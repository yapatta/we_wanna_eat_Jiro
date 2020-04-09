import { useState, useEffect, useRef } from "react";
import Peer from "skyway-js";

import { API_PATH, SKYWAY_API_KEY } from "./env";

const Rooms = (props) => {
  const localStreamSetting = async () => {
    localStreamRef.current.srcObject = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true,
      }
    );
    await localStreamRef.current.play();
  };

  const localStreamRef = useRef<HTMLVideoElement>(null);
  const remoteStreamRef = useRef<HTMLVideoElement>(null);

  const [localId, setLocalId] = useState("");
  const [localVideoMuted, setLocalVideoMuted] = useState(true);
  const [localVideoPlaysInline, setLocalVideoPlaysInline] = useState(true);

  const [remoteId, setRemoteId] = useState("");
  const [remoteVideoMuted, setRemoteVideoMuted] = useState(true);
  const [remoteVideoPlaysInline, setRemoteVideoPlaysInline] = useState(false);

  const [peer, setPeer] = useState(new Peer({ key: SKYWAY_API_KEY }));

  const callTrigerClick = async () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const mediaConnection =
      localStreamRef.current.srcObject instanceof MediaStream
        ? peer.call(remoteId, localStreamRef.current.srcObject)
        : null;

    mediaConnection.on("stream", async (stream: MediaStream) => {
      // Render remote stream for caller
      remoteStreamRef.current.srcObject = stream;
      setRemoteVideoPlaysInline(true);
      await remoteStreamRef.current.play().catch(console.error);
    });

    mediaConnection.once("close", () => {
      if (remoteStreamRef.current.srcObject instanceof MediaStream)
        remoteStreamRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      remoteStreamRef.current.srcObject = null;
    });

    document
      .getElementById("close-trigger")
      .addEventListener("click", () => mediaConnection.close(true));
  };

  peer.once("open", (id: string) => setLocalId(id));

  // Register callee handler
  peer.on("call", (mediaConnection) => {
    if (localStreamRef.current.srcObject instanceof MediaStream)
      mediaConnection.answer(localStreamRef.current.srcObject);

    mediaConnection.on("stream", async (stream) => {
      // Render remote stream for callee
      remoteStreamRef.current.srcObject = stream;
      setRemoteVideoPlaysInline(true);
      await remoteStreamRef.current.play().catch(console.error);
    });

    mediaConnection.once("close", () => {
      if (remoteStreamRef.current.srcObject instanceof MediaStream)
        remoteStreamRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      remoteStreamRef.current.srcObject = null;
    });

    document
      .getElementById("close-trigger")
      .addEventListener("click", () => mediaConnection.close(true));
  });
  peer.on("error", console.error);

  useEffect(() => {
    (async () => {
      await localStreamSetting();
    })();
  }, []);
  return (
    <div>
      <div className="container">
        <h1 className="heading">Room Example タイトル</h1>
        <p className="note">Enter remote peer ID to call.</p>
        <div className="p2p-media">
          <div className="remote-stream">
            <video
              id="video-remote-stream"
              muted={remoteVideoMuted}
              ref={remoteStreamRef}
              playsInline={remoteVideoPlaysInline}
            ></video>
          </div>
          <div className="local-stream">
            <video
              id="video-local-stream"
              muted={localVideoMuted}
              ref={localStreamRef}
              playsInline={localVideoPlaysInline}
            ></video>
            <p>
              Your ID: <span id="local-id">{localId}</span>
            </p>
            <input
              type="text"
              placeholder="Remote Peer ID"
              id="remote-id"
              onChange={(e) => setRemoteId(e.target.value)}
            ></input>
            <button id="call-trigger" onClick={callTrigerClick}>
              Join
            </button>
            <button id="close-trigger">Leave</button>
          </div>
        </div>
      </div>
      <ul></ul>
    </div>
  );
};

export default Rooms;
