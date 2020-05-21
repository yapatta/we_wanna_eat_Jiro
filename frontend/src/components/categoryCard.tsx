import { CardContent, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';

import Link from 'next/link';
import React from 'react';
import { CategoryDocument } from '../database/model';

type CategoryCardProps = {
  children: CategoryDocument;
};

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography component="h2">
            <Link
              href={{
                pathname: '/categories',
                query: { index: `${props.children.cid}` },
              }}
              as={`/${props.children.name}`}
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
      </Card>
    </Grid>
  );
};

export default CategoryCard;
