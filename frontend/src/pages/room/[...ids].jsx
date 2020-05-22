import React, { useState, useEffect, useRef } from 'react';
import { SKYWAY_API_KEY } from '../../env';
import Layout from '../../components/layout';
import {
  TextField,
  makeStyles,
  Button,
  Grid,
  Container,
} from '@material-ui/core';
import { selectRoomDocument } from '../../database';

const useStyles = makeStyles({
  myVideo: {},
  remoteStreams: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const Room = (props) => {
  const classes = useStyles();
  let Peer;
  let peer;
  let jsLocalStream;
  let jsRemoteStream;
  let jsLeaveTrigger;

  if (process.browser) {
    Peer = require('skyway-js');
    peer = new Peer({ key: SKYWAY_API_KEY });
    jsLocalStream = document.getElementById('js-local-stream');
    jsRemoteStream = document.getElementById('js-remote-streams');
    jsLeaveTrigger = document.getElementById('js-leave-trigger');
  }

  const localStreamRef = useRef(null);

  const localStreamSetting = async () => {
    localStreamRef.current.srcObject = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true,
      },
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

  const [userName, setUserName] = useState('');
  const [roomMessages, setRoomMessages] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const joinTroggerClick = async () => {
    if (!peer.open) {
      // FIXME: 通話相手がいない的な旨の処理を表示
      return;
    }

    const room = peer.joinRoom(props.id, {
      mode: 'mesh',
      stream: localStreamRef.current.srcObject,
    });

    room.once('open', () => {
      setRoomMessages(roomMessages + '=== You joined ===\n');
      setIsJoined(true);
    });
    room.on('peerJoin', (peerId) => {
      setRoomMessages(roomMessages + `=== ${peerId} joined ===\n`);
    });

    room.on('stream', async (stream) => {
      const grid = document.createElement('div');
      grid.setAttribute('id', stream.peerId);
      grid.setAttribute(
        'class',
        'MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-6',
      );
      const newVideo = document.createElement('video');
      newVideo.setAttribute('id', 'js-local-stream');
      grid.append(newVideo);
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      newVideo.setAttribute('width', '100%');
      newVideo.setAttribute('height', '100%');
      jsRemoteStream.append(grid);
      console.log('test');
      await newVideo.play().catch(console.error);
    });

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent
      setRoomMessages(roomMessages + `${src}: ${data}\n`);
    });

    // for closing room members
    room.on('peerLeave', (peerId) => {
      const remoteVideoContainer = jsRemoteStream.querySelector(`#${peerId}`);

      remoteVideoContainer.children[0].srcObject
        .getTracks()
        .forEach((track) => track.stop());
      remoteVideoContainer.children[0].srcObject = null;
      remoteVideoContainer.remove();

      setRoomMessages(roomMessages + `=== ${peerId} left ===\n`);
    });

    // for closing myself
    room.once('close', () => {
      setRoomMessages(roomMessages + '== You left ===\n');
      jsRemoteStream
        .querySelectorAll('div:not(#my-video)')
        .forEach((remoteVideoContainer) => {
          remoteVideoContainer.children[0].srcObject
            .getTracks()
            .forEach((track) => track.stop());
          remoteVideoContainer.children[0].srcObject = null;
          remoteVideoContainer.remove();
        });
    });

    jsLeaveTrigger.addEventListener(
      'click',
      () => {
        setIsJoined(false);
        room.close();
      },
      {
        once: true,
      },
    );
  };

  useEffect(() => {
    (async () => {
      await localStreamSetting();
    })();
  }, []);

  return (
    <Layout>
      <Container maxWidth="xl">
        <h1 className="heading">{props.doc.name}</h1>
        <Grid
          container
          className={classes.remoteStreams}
          id="js-remote-streams"
          spacing={2}
        >
          <Grid id="my-video" item xs={12} md={6} lg={6}>
            <video
              id="js-local-stream"
              muted
              ref={localStreamRef}
              playsinline
              width="100%"
              height="100%"
            />
          </Grid>
        </Grid>
      </Container>

      {/*移行する*/}
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            id="userName"
            label="名前"
            value={userName}
            onChange={handleUserNameChange}
            variant="outlined"
          />
          <Button
            id="js-leave-trigger"
            style={{ display: !isJoined ? 'none' : '' }}
          >
            Leave
          </Button>
          <Button
            variant="contained"
            id="js-join-trigger"
            color="primary"
            onClick={joinTroggerClick}
            style={{ display: isJoined ? 'none' : '' }}
          >
            Join
          </Button>

          <div>
            <pre className="messages" id="js-messages">
              {roomMessages}
            </pre>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

Room.getInitialProps = async (props) => {
  const ids = props.query.ids;
  const cid = ids[0];
  const rid = ids[1];
  const res = await selectRoomDocument(Number(cid), rid);
  const doc = await res.get();
  const room = doc.data();
  const id = doc.id;
  return { ...props, room, id };
};

export default Room;
