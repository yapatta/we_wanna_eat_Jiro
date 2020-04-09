import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { API_PATH } from "./env";

interface AppProps {
  categories: Category[];
}

interface Category {
  id: number;
  name: string;
}

const App = (props: AppProps) => {
  return (
    <div>
      <h1>オンライン飲み会やろうぜ！！</h1>
      <ul>
        {props.categories.map((category: Category, index: number) => {
          return (
            <li key={index}>
              <Link
                href={{
                  pathname: "/categories",
                  query: { index: `${category.id}` },
                }}
                as={"/categories"}
              >
                <a>{category.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

App.getInitialProps = async ({ req }) => {
  // ルームの全てのカテゴリを取得
  const res = await fetch(API_PATH + "/categories");
  const categories: Category[] = await res.json();
  return { categories };
};
export default App;
