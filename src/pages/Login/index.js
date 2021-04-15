import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";
import { withAuth } from "../../hoc/withAuth";

export const Login = withAuth(false)(() => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.buttonLoading);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" className={classes.heading}>
        Login
      </Typography>

      <Paper component="form" onSubmit={loginHandler} className={classes.form}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={changeEmail}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={changePassword}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={loading && <CircularProgress size={25} color="white" />}
        >
          Login
        </Button>

        <Typography component={Link} to="/signup">
          Don't have an account? Signup!
        </Typography>
      </Paper>
    </Container>
  );
});
