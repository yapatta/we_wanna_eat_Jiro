import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { API_PATH } from "./env";
import Layout from "../components/layout";
import RoomCard from "../components/roomCard";
import { Grid } from "@material-ui/core";
import { RoomDocument } from "../database/model";
import { selectRoomDocument } from "../database";
import React from "react";

interface CategoryProps {
  rooms: RoomDocument[];
}

const Categories = (props: CategoryProps) => {
  return (
    <Layout>
      <Grid container>
        {props.rooms.map((room: RoomDocument, index: number) => {
          return <RoomCard>{room}</RoomCard>;
        })}
      </Grid>
      <Link href="/">
        <a>ホームに戻る</a>
      </Link>
    </Layout>
  );
};

Categories.getInitialProps = async ({ query }) => {
  const res = await selectRoomDocument(query.index);
  const rooms: RoomDocument[] = [];
  const docs = await res.get();
  console.log(query.index);
  console.log(docs);
  docs.forEach((doc) => rooms.push(doc.data() as RoomDocument));
  return { rooms };
};
export default Categories;
