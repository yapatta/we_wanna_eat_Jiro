import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  handleGoogleLogin,
  handleLogout,
} from "../src/firebase/Authentication";
import firebase from "../plugins/firebase";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<firebase.User>();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            オンライン飲み会！！
          </Typography>
          {currentUser ? (
            <span>
              <Button color="inherit">
                <Link
                  href={{
                    pathname: "/makeRoom",
                  }}
                  as={"/makeRoom"}
                >
                  <span style={{ color: "white" }}> 部屋を作る</span>
                </Link>
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </span>
          ) : (
            <Button color="inherit" onClick={handleGoogleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
