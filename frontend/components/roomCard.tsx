import { CardContent, Typography, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";

import Link from "next/link";
import React from "react";

const useStyles = makeStyles({});

const RoomCard = (props) => {
  const classes = useStyles();
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
                pathname: "/room",
                query: { index: `${props.children.rid}` },
              }}
              as={"/room"}
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
