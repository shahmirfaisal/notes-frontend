import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { CreateOutlined, DeleteOutlineOutlined } from "@material-ui/icons";
import { useStyles } from "./style";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, toggleRenameNote } from "../../store/slices/noteSlice";
import { RenameNote } from "../RenameNote/";

export const Notes = ({ notes }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteLoading = useSelector((state) => state.note.deleteLoading);

  const deleteNoteHandler = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Last updated</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {notes.length ? (
            notes.map((note) => (
              <TableRow>
                <TableCell>
                  <Typography component={Link} to={`/note/${note._id}`}>
                    {note.name}
                  </Typography>
                </TableCell>
                <TableCell>{moment(note.createdAt).fromNow()}</TableCell>
                <TableCell>{moment(note.updatedAt).fromNow()}</TableCell>
                <TableCell>
                  <Tooltip title="Rename">
                    <IconButton
                      onClick={() =>
                        dispatch(
                          toggleRenameNote({
                            open: true,
                            id: note._id,
                            name: note.name,
                          })
                        )
                      }
                    >
                      <CreateOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    {deleteLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <IconButton onClick={() => deleteNoteHandler(note._id)}>
                        <DeleteOutlineOutlined />
                      </IconButton>
                    )}
                  </Tooltip>
                </TableCell>
                <RenameNote />
              </TableRow>
            ))
          ) : (
            <Box marginTop={3}>
              <Typography>No notes</Typography>
            </Box>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
