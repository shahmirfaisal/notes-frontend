import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@material-ui/core";
import { CreateOutlined } from "@material-ui/icons";
import { useStyles } from "./style";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNote,
  changeContent,
  toggleRenameNote,
} from "../../store/slices/noteSlice";
import { useParams, useHistory } from "react-router-dom";
import { withAuth } from "../../hoc/withAuth";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { RenameNote } from "../../components/RenameNote/";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

export const Note = withAuth(true)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const contentLoading = useSelector((state) => state.note.contentLoading);
  const note = useSelector((state) => state.note.note);
  const { id } = useParams();
  const [socketIO, setSocketIO] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    dispatch(fetchNote(id));
    const socket = openSocket(process.env.REACT_APP_API_URL);
    setSocketIO(socket);
    socket.on("connected", () => console.log("Connected"));
  }, []);

  const contentChangeHandler = (text) => {
    setSaveLoading(true);
    dispatch(changeContent(text));
    socketIO?.emit("save updated note", { id, content: text });
    socketIO?.on("get updated note", (note) => {
      setSaveLoading(false);
    });
  };

  return (
    <Container maxWidth="lg">
      {contentLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Box marginTop={5}></Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => push("/")}
          >
            Go to home
          </Button>
          <div className={classes.header}>
            <Typography variant="h4">
              {note?.name}{" "}
              <CreateOutlined
                onClick={() =>
                  dispatch(
                    toggleRenameNote({ open: true, id, name: note?.name })
                  )
                }
                className={classes.renameIcon}
              />
            </Typography>
            <Typography>{saveLoading ? "Saving" : "Saved"}</Typography>
          </div>
          <SunEditor
            setContents={note?.content}
            onChange={contentChangeHandler}
            height="300"
          />
          <RenameNote />
        </>
      )}
    </Container>
  );
});
