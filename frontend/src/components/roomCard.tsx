import { CardContent, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';

import Link from 'next/link';
import React from 'react';
import { RoomDocument } from '../database/model';

type RoomCardProps = {
  children: RoomDocument;
};

const RoomCard = (props: RoomCardProps) => {
  // yuziroppe: 28行目, room IDってどうやってとりました？
  // ${props.children.rid}の値
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography component="h2">{props.children.name}</Typography>
          <Typography component="h3">管理者: {props.children.admin}</Typography>
          <Typography component="p">
            説明: {props.children.description}
          </Typography>
          <Typography>
            <Link
              href={{
                pathname: '/room',
                query: { index: `2` },
              }}
              as={'/room'}
            >
              <a>部屋に入る</a>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RoomCard;
