import { CardContent, Typography, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";

import Link from "next/link";

const useStyles = makeStyles({
  card: {
    margin: "auto",
  },
});

const CategoryCard = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.card}>
        <CardContent>
          <Typography component="h2">
            <Link
              href={{
                pathname: "/categories",
                query: { index: `${props.children.cid}` },
              }}
              as={`/${props.children.name}`}
            >
              <a>{props.children.name}</a>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryCard;
