import React from "react";
import fetch from "isomorphic-unfetch";
import { API_PATH } from "./env";
import Layout from "../components/layout";
import CategoryCard from "../components/categoryCard";
import { Grid } from "@material-ui/core";
import {selectCategories} from "../database";
import {CategoryDocument} from "../database/model";

interface AppProps {
  categories: CategoryDocument[];
}


const Index = (props: AppProps) => {
  return (
    <Layout>
      <Grid container>
        {props.categories.map((category: CategoryDocument, index: number) => {
          return (
              <CategoryCard>
                {category}
              </CategoryCard>)
        })}
      </Grid>
    </Layout>
  );
};

Index.getInitialProps = async ({ req }) => {
  const categoryDocuments = await selectCategories();

  // ルームの全てのカテゴリを取得
  const res = await fetch(API_PATH + "/categories");
  const cats = await categoryDocuments.get();
  const categories: CategoryDocument[] = [];
  cats.forEach( doc => {
    categories.push(doc.data() as CategoryDocument);
  });



  return { categories };
};

export default Index;
