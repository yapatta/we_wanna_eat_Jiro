import React from 'react';
import fetch from 'isomorphic-unfetch';
import { API_PATH } from '../env';
import Layout from '../components/layout';
import CategoryCard from '../components/categoryCard';
import {Card, CardMedia, Grid, makeStyles} from '@material-ui/core';
import { selectCategories } from '../database';
import { CategoryDocument } from '../database/model';
import { Container } from '@material-ui/core';

interface AppProps {
  categories: CategoryDocument[];
}

const useStyles = makeStyles({
  container: {
    marginTop: '14px',
  },
});

const Index = (props: AppProps) => {
  const classes = useStyles();
  return (
    <Layout>
      <Card>
        {/* MEMO 画像とテキストを組み合わせてえ〜感じに表示したい*/}
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          width="100%"
          image="/static/top_image.svg"
          title="Contemplative Reptile"
        />
      </Card>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          {props.categories.map((category: CategoryDocument, index: number) => {
            return <CategoryCard key={index}>{category}</CategoryCard>;
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

Index.getInitialProps = async ({ req }) => {
  const categoryDocuments = await selectCategories();

  // ルームの全てのカテゴリを取得
  const res = await fetch(API_PATH + '/categories');
  const cats = await categoryDocuments.get();
  const categories: CategoryDocument[] = [];
  cats.forEach((doc) => {
    categories.push(doc.data() as CategoryDocument);
  });

  return { categories };
};

export default Index;
