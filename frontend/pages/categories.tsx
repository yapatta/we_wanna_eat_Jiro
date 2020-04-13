import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { API_PATH } from "./env";

interface Room {
  id: number;
  name: string;
  admin: string;
  description: string;
}

interface CategoryProps {
  rooms: Room[];
}

const Categories = (props: CategoryProps) => {
  return (
    <div>
      <ul>
        {props.rooms.map((room: Room, index: number) => {
          return (
            <li key={index}>
              <div>名前: {room.name}</div>
              <div>管理者: {room.admin}</div>
              <div>説明: {room.description}</div>
              <Link
                href={{ pathname: "/room", query: { index: `${room.id}` } }}
                as={"/room"}
              >
                <a>部屋に入る</a>
              </Link>
              <Link
                href={{ pathname: "/chat", query: { index: `${room.id}` } }}
                as={"/chat"}
              >
                <a>二人でチャットする(消去予定)</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/">
        <a>ホームに戻る</a>
      </Link>
    </div>
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
