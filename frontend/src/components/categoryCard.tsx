import { CardContent, Typography, CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid, makeStyles } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { CategoryDocument } from '../database/model';

type CategoryCardProps = {
  children: CategoryDocument;
};

const useStyles = makeStyles((theme) => ({
  category: {
    margin: theme.spacing(1),
  },
}));

const CategoryCard = (props: CategoryCardProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.category}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom component="h2">
              <Link
                href={{
                  pathname: '/categories/[id]',
                  query: { index: `${props.children.cid}` },
                }}
                as={`/categories/${props.children.cid}`}
              >
                <div>
                  {
                    // TODO: (@reud) 良い感じのカードレイアウトにする
                  }
                  <h3>{props.children.name}</h3>
                  <p>{props.children.description}</p>
                </div>
              </Link>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CategoryCard;
