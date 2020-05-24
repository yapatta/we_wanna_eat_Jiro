import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { SKYWAY_API_KEY } from '../../../env';
import Layout from '../../../components/layout';
import firebase from '../../../plugins/firebase';

import {
  makeStyles,
  Button,
  Container,
  GridListTile,
  GridListTileBar,
  GridList,
  Card,
} from '@material-ui/core';
import {
  selectRoomDocument,
  selectUser,
  updateRoomDocumentWhenJoined,
  updateRoomDocumentWhenLeaved,
} from '../../../database';
import { getCurrentUser } from '../../../firebase/Authentication';

const useStyles = makeStyles({
  rootContainer: {
    marginTop: '12px',
  },
  remoteStreams: {
    backgroundColor: 'white',
    padding: '14px',
  },
  roomTitle: {
    color: 'gray',
  },
  roomFooter: {
    textAlign: 'right',
    margin: '22px',
  },
  videoContainer: {
    backgroundColor: 'gray',
  },
});

const Room = (props) => {
  const classes = useStyles();
  let Peer;
  let jsLocalStream;
  let jsRemoteStream;
  let jsLeaveTrigger;

  if (process.browser) {
    Peer = require('skyway-js');
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
  const [roomName, setRoomName] = useState('');
  const [peer, setPeer] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();
  const roomId = router.query.rid;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
      const urls = location.pathname.split('/');
      router.push(
          `/enterRoom/${urls[urls.length - 2]}/${urls[urls.length - 1]}`,
      );
    }
  });



  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const JoinTriggerClick = async () => {
    if (!peer.open) {
      return;
    }

    // 入室処理
    const user = await getCurrentUser();
    const userDocument = await selectUser(user.uid);
    const urls = location.pathname.split('/');
    await updateRoomDocumentWhenJoined(
      Number(urls[urls.length - 2]),
      urls[urls.length - 1],
      userDocument,
    );

    const room = peer.joinRoom(roomId, {
      mode: 'mesh',
      stream: localStreamRef.current.srcObject,
    });

    room.once('open', () => {
      console.log('=== You joined ===\n');
    });
    room.on('peerJoin', (peerId) => {
      console.log(`=== ${peerId} joined ===\n`);
    });

    room.on('stream', async (stream) => {
      // gridListTitle
      const gridListTitleRoot = document.createElement('li');
      gridListTitleRoot.setAttribute('id', stream.peerId);
      gridListTitleRoot.setAttribute(
        'class',
        'MuiGridListTile-tile-root makeStyles-videoContainer-2',
      );
      gridListTitleRoot.setAttribute(
        'style',
        'width: 50%; padding: 1px; background-color:gray;',
      );
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

      console.log(stream.peerId);
      const user = await selectUser(stream.peerId);
      const userName = document.createTextNode(user.nickname);
      gridListTitle.append(userName);
      gridListTitleWrap.append(gridListTitle);

      jsRemoteStream.append(gridListTitleRoot);
      await newVideo.play().catch(console.error);
    });

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent
      console.log(`${src}: ${data}\n`);
    });

    // for closing room members
    room.on('peerLeave', (peerId) => {
      const remoteVideoContainer = document.getElementById(`${peerId}`);

      remoteVideoContainer.children[0].children[0].srcObject
        .getTracks()
        .forEach((track) => track.stop());
      remoteVideoContainer.children[0].children[0].srcObject = null;
      remoteVideoContainer.remove();

      console.log(`=== ${peerId} left ===\n`);
    });

    // for closing myself
    room.once('close', () => {
      console.log('== You left ===\n');
      jsRemoteStream
        .querySelectorAll('li:not(.my-video)')
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
        room.close();
      },
      {
        once: true,
      },
    );

    /*
    if (process.browser) {
      window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue =
          'このページを離れる場合は退出ボタンを押して離れてください';
      });
    }
    */
  };

  const LeaveTriggerClick = async () => {
    // 退出処理
    const user = await getCurrentUser();
    const userDocument = await selectUser(user.uid);
    const urls = location.pathname.split('/');
    await updateRoomDocumentWhenLeaved(
      Number(urls[urls.length - 2]),
      urls[urls.length - 1],
      userDocument,
    );

    await localStreamOff();

    if (process.browser) {
      const urls = location.pathname.split('/');
      window.location.href = `../../categories/${urls[urls.length - 2]}`;
    }
  };

  /**
   * ユーザをプレースホルダーに入れる
   **/
  const setUpUsernameInput = async () => {
    const user = await getCurrentUser();
    const userDocument = await selectUser(user.uid);
    setUserName(userDocument.nickname);
  };

  const setUpRoomInfo = async () => {
    const urls = location.pathname.split('/');
    const roomDoc = await selectRoomDocument(
      Number(urls[urls.length - 2]),
      urls[urls.length - 1],
    );
    const rd = await roomDoc.get();
    console.log(rd.data().name);
    setRoomName(rd.data().name);
  };

  useEffect(() => {
    (async () => {
      if(!!currentUser) {
        await setUpUsernameInput();
        await setUpRoomInfo();
        setPeer(new Peer(currentUser.uid, { key: SKYWAY_API_KEY }));
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (peer) {
        await localStreamSetting();
        await JoinTriggerClick();
      }
    })();
  }, [peer]);

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.rootContainer}>
        <Card>
          <GridList
            cellHeight="90vh"
            id="js-remote-streams"
            className={classes.remoteStreams}
            cols={2}
          >
            <GridListTile cols={2} className="my-video">
              <h1 className={classes.roomTitle}>{roomName}</h1>
            </GridListTile>
            <GridListTile className={classes.videoContainer + ' ' + 'my-video'}>
              <video
                id="js-local-stream"
                muted
                ref={localStreamRef}
                playsinline
                width="100%"
                height="100%"
              />
              <GridListTileBar
                title={userName}
                onChange={handleUserNameChange}
              />
            </GridListTile>
          </GridList>

          <div className={classes.roomFooter}>
            <Button
              variant="contained"
              id="js-leave-trigger"
              onClick={LeaveTriggerClick}
              color="secondary"
            >
              退出する
            </Button>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default Room;
