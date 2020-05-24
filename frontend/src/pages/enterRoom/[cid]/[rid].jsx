import React, { useState, useEffect, useRef } from 'react';
import {
  makeStyles,
  Button,
  TextField,
  Typography,
  Container,
  Card,
} from '@material-ui/core';
import { getCurrentUser } from '../../../firebase/Authentication';
import { selectUser, updateUsername } from '../../../database';
import Layout from '../../../components/layout';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  panel: {
    padding: '12px',
  },
  container: {
    marginTop: '14px',
  },
}));

const enterRoom = (props) => {
  const classes = useStyles();
  const localStreamRef = useRef(null);
  const [userName, setUserName] = useState('');

  const localStreamSetting = async () => {
    localStreamRef.current.srcObject = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true,
      },
    );
    await localStreamRef.current.play();
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const updateUsernameIfChanged = async () => {
    const user = await getCurrentUser();
    const userDocument = await selectUser(user.uid);
    if (userDocument.nickname !== userName) {
      await updateUsername(user.uid, userName);
    }
  };

  const setUpUsernameInput = async () => {
    const user = await getCurrentUser();
    const userDocument = await selectUser(user.uid);
    setUserName(userDocument.nickname);
  };

  const roomJoinClick = async () => {
    await updateUsernameIfChanged();

    if (process.browser) {
      const urls = location.pathname.split('/');
      window.location.href = `../../room/${urls[urls.length - 2]}/${
        urls[urls.length - 1]
      }`;
    }
  };

  useEffect(() => {
    (async () => {
      await setUpUsernameInput();
      await localStreamSetting();
      // 現在のユーザ名をプレースホルダーに入れる、
      // 画面にルーム情報の表示
    })();
  }, []);

  return (
    <Layout>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Card className={classes.panel}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              ルームに入室
            </Typography>
            <div className={classes.form}>
              <TextField
                id="userName"
                label="名前"
                value={userName}
                fullWidth
                onChange={handleUserNameChange}
                placeholder={userName}
                variant="outlined"
                className={classes.input}
              />
              <div className={classes.input}>
                <video
                  id="js-local-stream"
                  muted
                  ref={localStreamRef}
                  playsinline
                  width="100%"
                  height="100%"
                />
              </div>
              <Button
                variant="contained"
                id="js-join-trigger"
                type="submit"
                color="primary"
                fullWidth
                onClick={roomJoinClick}
                className={classes.submit}
              >
                通話を開始する
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default enterRoom;
