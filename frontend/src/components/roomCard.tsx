import { CardContent, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid, makeStyles } from '@material-ui/core';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { RoomDocument } from '../database/model';

type RoomCardProps = {
  children: RoomDocument;
};

const useStyles = makeStyles((theme) => ({
  room: {
    margin: theme.spacing(1),
  },
  joinRoom: {
    titleLink: { color: 'white', textDecoration: 'none' },
  },
}));

const RoomCard = (props: RoomCardProps) => {
  // yuziroppe: 28行目, room IDってどうやってとりました？
  // ${props.children.rid}の値
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
            </div>
          </Typography>
          <Typography>
            <Link
              href={{
                pathname: `/room/`,
                query: { index: 2 },
              }}
              as={`room`}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.joinRoom}
              >
                部屋に入る
              </Button>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RoomCard;
