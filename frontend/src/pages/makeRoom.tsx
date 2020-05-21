import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Button from '@material-ui/core/Button';
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import Link from 'next/link';
import firebase from '../plugins/firebase';
import { RoomDocument, CategoryDocument } from '../database/model';
import { selectCategories } from '../database';

type makeRoomProps = {
  categories: CategoryDocument[];
};

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
  result: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
  },
}));

const makeRoom = (props: makeRoomProps) => {
  const classes = useStyles();

  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomCategory, setRoomCategory] = useState<number>(0);
  const [newRoomFlag, setNewRoomFlag] = useState(false);
  const [roomUUID, setRoomUUID] = useState('');

  const [currentUser, setCurrentUser] = useState<firebase.User>();
  const [adminName, setAdminName] = useState('');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleAdminNameChange = (event) => {
    setAdminName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setRoomDescription(event.target.value);
  };

  const handleRoomCategoryChange = (event) => {
    setRoomCategory(event.target.value);
  };

  // FXME: 時間あるときにエラーバリデーションをalertじゃなく変更したい
  const validateNewRoom = (newRoom: RoomDocument) => {
    if (newRoom.name === undefined || newRoom.name === '') {
      alert('ルーム名を入力してください');
      return false;
    }

    if (newRoom.admin === undefined || newRoom.admin === '') {
      alert('名前を入力して下さい');
      return false;
    }

    return true;
  };

  const createRoom = async () => {
    if (!currentUser) {
      alert('ログインしてください');
      return false;
    }

    const newRoom: RoomDocument = {
      name: roomName,
      adminUid: currentUser.uid, // FIXME: Userを取り出すクエリを叩いて取得した値でuidを取り出すほうが良さそう
      admin: adminName,
      description: roomDescription,
      users: [], // FIXME: 初期状態でadminをusersに追加
    };

    if (validateNewRoom(newRoom)) {
      // FIXME: adminの名前を変更(queryを作る必要あり)
      // const res = await insertRoomDocument(roomCategory, newRoom);
      // FIXME: roomUUIDをセットする
      setNewRoomFlag(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (currentUser) {
        // const doc = await selectUserDocument(currentUser.uid);
        // FIXME: adminNameをDBから取得してsetAdminNameする
      }
    })();
  }, [currentUser]);

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        {newRoomFlag ? (
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              ルームが作成されました！
            </Typography>
            <Typography component="h2" className={classes.result}>
              {roomName}
            </Typography>
            <Typography component="h3" className={classes.result}>
              管理者: {adminName}
            </Typography>
            <Typography component="h4" className={classes.result}>
              説明: {roomDescription}
            </Typography>
            <Typography>
              <Link
                href={{
                  pathname: '/room',
                  query: { index: `${roomUUID}` },
                }}
                as={'/room'}
              >
                <a>部屋に入る</a>
              </Link>
              <Link href="/">
                <a>ホームに戻る</a>
              </Link>
            </Typography>
          </div>
        ) : (
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              ルームを作成
            </Typography>
            <div className={classes.form}>
              <TextField
                id="adminName"
                label="名前"
                value={adminName}
                fullWidth
                onChange={handleAdminNameChange}
                variant="outlined"
                className={classes.input}
              />
              <TextField
                id="roomName"
                label="ルーム名"
                value={roomName}
                fullWidth
                onChange={handleRoomNameChange}
                variant="outlined"
                className={classes.input}
              />
              <TextField
                id="roomDescription"
                label="ルーム詳細"
                multiline
                rows={3}
                value={roomDescription}
                fullWidth
                onChange={handleDescriptionChange}
                variant="outlined"
                className={classes.input}
              />
              <Grid container>
                <Grid item container className={classes.input}>
                  <InputLabel id="demo-simple-select-label">
                    カテゴリ選択
                  </InputLabel>
                </Grid>
                <Grid>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomCategory}
                    required
                    onClick={handleRoomCategoryChange}
                    style={{ width: 200 }}
                  >
                    {props.categories.map(
                      (category: CategoryDocument, index: number) => (
                        <MenuItem value={`${category.cid}`} key={index}>
                          {category.name}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                onClick={createRoom}
                className={classes.submit}
              >
                作成
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

makeRoom.getInitialProps = async ({ props }) => {
  const c = await selectCategories();
  const docs = await c.get();

  const categories = [];
  docs.forEach((doc) => {
    categories.push(doc.data());
  });

  return { ...props, categories };
};

export default makeRoom;
