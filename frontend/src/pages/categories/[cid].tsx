import React from 'react';
import Layout from '../../components/layout';
import RoomCard from '../../components/roomCard';
import { Grid, Container } from '@material-ui/core';
import { RoomCardProp } from '../../database/model';
import { getRoomCardProps } from '../../database/index';

interface CategoryProps {
  roomCards: RoomCardProp[];
}

const Categories = (props: CategoryProps) => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container>
          {props.roomCards.map((roomCard: RoomCardProp, index: number) => {
            return <RoomCard key={index}>{roomCard}</RoomCard>;
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

Categories.getInitialProps = async (props) => {
  const roomCards = await getRoomCardProps(Number(props.query.cid));
  return { roomCards };
};
export default Categories;
