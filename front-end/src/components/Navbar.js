import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import img from "../img/Frame1.png";
import rev from "../img/Review.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  imagesContainer: {
    display: "inline-block",
    marginRight: theme.spacing(2),
  },
  image: {
    marginRight: theme.spacing(1),
    verticalAlign: "middle",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
    background: "linear-gradient(90deg, #D100F3 0%, #002BC5 100%)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(90deg, #002BC5 0%, #D100F3 100%)",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <div className={classes.imagesContainer}>
              <img src={img} alt="abc" className={classes.image} />
              <img src={rev} alt="abc" className={classes.image} />
            </div>
          </Typography>
          <div className={classes.grow} />
          <Button className={classes.button}>Signup</Button>
          <Button className={classes.button}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
