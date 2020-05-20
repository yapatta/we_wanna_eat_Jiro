import Button from "@material-ui/core/Button";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import Link from "next/link";

import {
  RoomDocument,
  UserDocument,
  CategoryDocument,
} from "../database/model";
import { insertRoomDocument, selectCategories } from "../database/index";
import {getCurrentUser} from "../src/firebase/Authentication";
import firebase from "../plugins/firebase";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  result: {
    textAlign: "left",
    marginTop: theme.spacing(2),
  },
}));

const makeRoom = (props) => {
  const classes = useStyles();

  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomCategory, setRoomCategory] = useState<number>(0);
  const [newRoomFlag, setNewRoomFlag] = useState(false);
  const [roomUUID, setRoomUUID] = useState("");

  const handleNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setRoomDescription(event.target.value);
  };

  const handleRoomCategoryChange = (event) => {
    setRoomCategory(event.target.value);
  };

  const validateNewRoom = (newRoom: RoomDocument) => {
    if (newRoom.name === undefined || newRoom.name === "") {
      window.alert("ルーム名を入力してください");
      return false;
    }

    if (
      newRoom.admin_uid === undefined ||
      newRoom.admin_uid === "" ||
      newRoom.admin === undefined ||
      newRoom.admin === ""
    ) {
      window.alert("ログインしてから試してください");
      return false;
    }

    return true;
  };
  const createRoom = async () => {
    /*
    const newRoom: RoomDocument = {
      name: roomName,
      admin_uid: props.childlen.uid, // adminは現在ログインしてるユーザ
      admin: props.childlen.nickname,
      description: roomDescription,
      users: [], // FIXME: 初期状態でadminをusersに追加
    };

    if (validateNewRoom(newRoom)) {
      // roomを作成したときroomのUUIDを返すことってお願いしていいですか？
      const uuid = await insertRoomDocument(roomCategory, newRoom); // FIXME: カテゴリを取得

      setNewRoomFlag(true);
      // setRoomUUID(uuid);
    }
    */
    setNewRoomFlag(true);
  };

  return (
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
            管理者: 田中
          </Typography>
          <Typography component="h4" className={classes.result}>
            説明: {roomDescription}
          </Typography>
          <Typography>
            <Link
              href={{
                pathname: "/room",
                query: { index: `${roomUUID}` },
              }}
              as={"/room"}
            >
              <a>部屋に入る</a>
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
              id="roomName"
              label="ルーム名"
              value={roomName}
              fullWidth
              onChange={handleNameChange}
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
                  {props.categories.map((category, index) => (
                    <MenuItem value={`${index}`}>{category.name}</MenuItem>
                  ))}
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
            <p>{props.currentUser?.email ?? '非ログイン'}</p>
          </div>
        </div>
      )}
    </Container>
  );
};

makeRoom.getInitialProps = async ({ props }) => {
  const c = await selectCategories();
  const docs = await c.get();

  let categories = [];
  docs.forEach((doc) => {
    categories.push(doc.data());
  });

  const currentUser = getCurrentUser;

  return { ...props, categories, currentUser};
};

export default makeRoom;
