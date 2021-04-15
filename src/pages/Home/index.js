import { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote } from "../../store/slices/noteSlice";
import { Notes } from "../../components/Notes/index";
import { withAuth } from "../../hoc/withAuth";

export const Home = withAuth(true)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.note.contentLoading);
  const createLoading = useSelector((state) => state.note.createLoading);
  const user = useSelector((state) => state.user.user);
  const notes = useSelector((state) => state.note.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Typography variant="h5" className={classes.name}>
            Hi {user?.name}!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(createNote())}
            endIcon={
              createLoading && <CircularProgress size={20} color="white" />
            }
          >
            Create note
          </Button>
          <Notes notes={notes} />
        </>
      )}
    </Container>
  );
});
