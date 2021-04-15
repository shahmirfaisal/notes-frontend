import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "../Login/style";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";
import { withAuth } from "../../hoc/withAuth";

export const Signup = withAuth(false)(() => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.buttonLoading);

  const changeName = (e) => setName(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" className={classes.heading}>
        Signup
      </Typography>

      <Paper component="form" onSubmit={signupHandler} className={classes.form}>
        <TextField label="Name" value={name} onChange={changeName} />
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
          Signup
        </Button>

        <Typography component={Link} to="/login">
          Already have an account? Login!
        </Typography>
      </Paper>
    </Container>
  );
});
