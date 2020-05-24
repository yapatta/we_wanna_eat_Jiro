import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import RoomCard from '../../components/roomCard';
import {Grid, Container, makeStyles} from '@material-ui/core';
import { RoomCardProp } from '../../database/model';
import { getRoomCardProps } from '../../database/index';
import AdminRoomCard from '../../components/adminRoomCard';
import firebase from '../../plugins/firebase';

interface CategoryProps {
  roomCards: RoomCardProp[];
}

const useStyles = makeStyles({
  container: {
    marginTop: '14px',
  },
});

const Categories = (props) => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<firebase.User>();
  const [roomCards, setRoomCards] = useState<Array<RoomCardProp>>([]);
  const router = useRouter();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  useEffect(() => {
    (async () => {
      const rcs = await getRoomCardProps(Number(router.query.cid));
      setRoomCards(rcs);
    })();
  }, [roomCards, currentUser]);

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          {roomCards.map((roomCard: RoomCardProp, index: number) => {
            if (currentUser && currentUser.uid === roomCard.adminUid)
              return <AdminRoomCard key={index}>{roomCard}</AdminRoomCard>;
            else return <RoomCard key={index}>{roomCard}</RoomCard>;
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Categories;
