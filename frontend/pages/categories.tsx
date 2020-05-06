import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { API_PATH } from "./env";
import Layout from "../components/layout";
import RoomCard from "../components/roomCard";
import { Grid } from "@material-ui/core";

interface Room {
  rid: number;
  name: string;
  admin: string;
  description: string;
}

interface CategoryProps {
  rooms: Room[];
}

const Categories = (props: CategoryProps) => {
  return (
    <Layout>
      <Grid container>
        {props.rooms.map((room: Room, index: number) => {
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
  // indexを元にapi叩く
  // ex: /categories/1/rooms (カテゴリID = 1の部屋全て)
  const res = await fetch(API_PATH + "/categories/" + query.name + "/rooms");
  const rooms: Room[] = await res.json();
  return { rooms };
};
export default Categories;
