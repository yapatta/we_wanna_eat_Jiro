import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { SKYWAY_API_KEY } from '../../../env';
import Layout from '../../../components/layout';
import firebase from '../../../plugins/firebase';

import {
  makeStyles,
  Button,
  Grid,
  Container,
  GridListTile,
  GridListTileBar,
  GridList,
  TextField,
} from '@material-ui/core';
import {selectRoomDocument, selectUser, updateUsername} from '../../../database';
import {getCurrentUser} from "../../../firebase/Authentication";

const useStyles = makeStyles({
  remoteStreams: {
    // height: '100vh',
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  videoContainer: {
    backgroundColor: 'gray',
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
  const [roomName, setRoomName] = useState('');

  const router = useRouter();
  const roomId = router.query.rid;
  const cid = router.query.cid;

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  /**
   * 入力欄に入っているユーザ名が現在の名前と変更があるかを調べる、変更がない場合は名前のアップデートを行う
   */
  const updateUsernameIfChanged = async () => {
    const user = await getCurrentUser();
    const userDocument = await selectUser(user.uid);
    if( userDocument.nickname !== userName) {
      await updateUsername(user.uid,userName);
      alert('名前のアップデートを行いました！');
    }
  }

  const joinTroggerClick = async () => {
    if (!peer.open) {
      // FIXME: 通話相手がいない的な旨の処理を表示
      return;
    }

    await updateUsernameIfChanged();
    const room = peer.joinRoom(roomId, {
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
      // gridListTitle
      const gridListTitleRoot = document.createElement('li');
      gridListTitleRoot.setAttribute('id', stream.peerId);
      gridListTitleRoot.setAttribute(
        'class',
        'MuiGridListTile-tile-root makeStyles-videoContainer-2',
      );
      gridListTitleRoot.setAttribute('style', 'width: 50%; padding: 1px;');
      const gridListTitleVideo = document.createElement('div');
      gridListTitleVideo.setAttribute('class', 'MuiGridListTile-tile');
      gridListTitleRoot.append(gridListTitleVideo);
      // video
      const newVideo = document.createElement('video');
      newVideo.setAttribute('id', 'js-local-stream');
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      newVideo.setAttribute('width', '100%');
      newVideo.setAttribute('height', '100%');
      gridListTitleVideo.append(newVideo);

      // gridListTitleBar
      const gridListTitleBar = document.createElement('div');
      gridListTitleBar.setAttribute(
        'class',
        'MuiGridListTileBar-root MuiGridListTileBar-titlePositionBottom',
      );
      gridListTitleVideo.append(gridListTitleBar);
      const gridListTitleWrap = document.createElement('div');
      gridListTitleWrap.setAttribute('class', 'MuiGridListTileBar-titleWrap');
      gridListTitleBar.append(gridListTitleWrap);
      const gridListTitle = document.createElement('div');
      gridListTitle.setAttribute('class', 'MuiGridListTileBar-title');
      // TODO ここでユーザーの表示名を入れる
      const userName = document.createTextNode('TaKa');
      gridListTitle.append(userName);
      gridListTitleWrap.append(gridListTitle);

      jsRemoteStream.append(gridListTitleRoot);
      await newVideo.play().catch(console.error);
    });

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent
      setRoomMessages(roomMessages + `${src}: ${data}\n`);
    });

    // for closing room members
    room.on('peerLeave', (peerId) => {
      const remoteVideoContainer = jsRemoteStream.querySelector(`#${peerId}`);

      remoteVideoContainer.children[0].children[0].srcObject
        .getTracks()
        .forEach((track) => track.stop());
      remoteVideoContainer.children[0].children[0].srcObject = null;
      remoteVideoContainer.remove();

      setRoomMessages(roomMessages + `=== ${peerId} left ===\n`);
    });

    // for closing myself
    room.once('close', () => {
      setRoomMessages(roomMessages + '== You left ===\n');
      jsRemoteStream
        .querySelectorAll('li:not(#my-video)')
        .forEach((remoteVideoContainer) => {
          remoteVideoContainer.children[0].children[0].srcObject
            .getTracks()
            .forEach((track) => track.stop());
          remoteVideoContainer.children[0].children[0].srcObject = null;
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


  /**
   * ユーザをプレースホルダーに入れる
   **/
  const setUpUsernameInput = async () => {
    const user = await getCurrentUser();
    const userDocument = await selectUser(user.uid);
    setUserName(userDocument.nickname);
  }


  const setUpRoomInfo = async () => {
    const urls = location.pathname.split('/');
    const roomDoc = await selectRoomDocument(Number(urls[urls.length - 2]),urls[urls.length - 1]);
    const rd = await roomDoc.get();
    console.log(rd.data().name);
    setRoomName(rd.data().name);
  }

  useEffect(() => {
    (async () => {
      await setUpUsernameInput();
      await setUpRoomInfo();
      await localStreamSetting();
      // 現在のユーザ名をプレースホルダーに入れる、
      // 画面にルーム情報の表示
    })();
  }, []);

  return (
    <Layout>
      <Container maxWidth="xl">
        <GridList
          cellHeight="90vh"
          id="js-remote-streams"
          className={classes.remoteStreams}
          cols={2}
          spacing={2}
        >
          <GridListTile className={classes.videoContainer} id="my-video">
            <video
              id="js-local-stream"
              muted
              ref={localStreamRef}
              playsinline
              width="100%"
              height="100%"
            />
            <GridListTileBar title={userName} onChange={handleUserNameChange} />
          </GridListTile>
        </GridList>
      </Container>

      {/*移行する*/}
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            id="userName"
            label="名前"
            value={userName}
            onChange={handleUserNameChange}
            placeholder={roomName}
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

export default Room;
