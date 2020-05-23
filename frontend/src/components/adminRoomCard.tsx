import { CardContent, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid, makeStyles } from '@material-ui/core';

import Link from 'next/link';
import React from 'react';
import { RoomCardProp } from '../database/model';
import { deleteRoomDocument } from '../database/index';

type CardProps = {
  children: RoomCardProp;
};

const useStyles = makeStyles((theme) => ({
  room: {
    margin: theme.spacing(1),
  },
  joinRoom: {
    titleLink: { color: 'white', textDecoration: 'none' },
  },
  rightRoom: {
    titleLink: { color: 'white', textDecoration: 'none' },
    marginLeft: '20px',
  },
}));

const AdminRoomCard = (props: CardProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.room}>
        <CardContent>
          <Typography gutterBottom component="h2">
            <div>
              <h3>{props.children.name}</h3>
              <p>説明: {props.children.description}</p>
              <p>オーナー: {props.children.admin}</p>
              <p>現在の人数: {props.children.userNum} / 4</p>
            </div>
          </Typography>
          <Typography>
            {props.children.userNum === 4 ? (
              <p>人数がいっぱいです、ごめんなさい！</p>
            ) : (
              <>
                <Link
                  href={{
                    pathname: `/enterRoom/${props.children.cid}/${props.children.rid}`,
                  }}
                  as={`/enterRoom/${props.children.cid}/${props.children.rid}`}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.joinRoom}
                  >
                    部屋に入る
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.rightRoom}
                  onClick={() => {
                    deleteRoomDocument(props.children.cid, props.children.rid);
                  }}
                >
                  部屋を削除する
                </Button>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AdminRoomCard;
