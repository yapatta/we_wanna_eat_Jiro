import React, { useState, useEffect } from "react";
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
  isUser,
} from "../src/firebase/Authentication";
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

  const [uid, setUid] = useState("");

  const login = async () => {
    const res = await handleGoogleLogin();
    setUid(res);
  };

  const logout = async () => {
    await handleLogout();
    setUid("");
  };

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
          {uid === "" || !isUser(uid) ? (
            <Button color="inherit" onClick={login}>
              Login
            </Button>
          ) : (
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
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
