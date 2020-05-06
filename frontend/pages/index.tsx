import React from "react";
import fetch from "isomorphic-unfetch";
import { API_PATH } from "./env";
import Layout from "../components/layout";
import CategoryCard from "../components/categoryCard";
import { Grid } from "@material-ui/core";

interface AppProps {
  categories: Category[];
}

interface Category {
  cid: number;
  name: string;
}

const Index = (props: AppProps) => {
  return (
    <Layout>
      <Grid container>
        {props.categories.map((category: Category, index: number) => {
          return <CategoryCard>{category}</CategoryCard>;
        })}
      </Grid>
    </Layout>
  );
};

Index.getInitialProps = async ({ req }) => {
  // ルームの全てのカテゴリを取得
  const res = await fetch(API_PATH + "/categories");
  const categories: Category[] = await res.json();
  return { categories };
};

export default Index;
