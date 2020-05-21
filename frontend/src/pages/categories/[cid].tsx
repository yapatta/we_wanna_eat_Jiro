import React from 'react';
import Layout from '../../components/layout';
import RoomCard from '../../components/roomCard';
import { Grid, Container } from '@material-ui/core';
import { RoomDocument } from '../../database/model';
import { selectRoomDocument } from '../../database';

interface CategoryProps {
  rooms: RoomDocument[];
}

const Categories = (props: CategoryProps) => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container>
          {props.rooms.map((room: RoomDocument, index: number) => {
            return <RoomCard key={index}>{room}</RoomCard>;
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

Categories.getInitialProps = async (props) => {
  const res = await selectRoomDocument(Number(props.query.cid));
  const rooms: RoomDocument[] = [];
  const docs = await res.get();
  docs.forEach((doc) => rooms.push(doc.data() as RoomDocument));
  return { rooms };
};
export default Categories;
