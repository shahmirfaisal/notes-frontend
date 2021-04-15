import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useStyles } from "./style";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" align="center" component={Link} to="/">
          Notes App
        </Typography>
        <Typography onClick={() => dispatch(logout())}>Logout</Typography>
      </Toolbar>
    </AppBar>
  );
};
