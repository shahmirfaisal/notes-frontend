import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRenameNote,
  renameNote,
  changeRenameNoteName,
} from "../../store/slices/noteSlice";

export const RenameNote = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.note.openRenameNote);
  const loading = useSelector((state) => state.note.renameLoading);
  const id = useSelector((state) => state.note.renameId);
  const renameNoteName = useSelector((state) => state.note.renameNoteName);

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(toggleRenameNote({ open: false, id: null }))}
    >
      <DialogTitle>Rename note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={renameNoteName}
          onChange={(e) => dispatch(changeRenameNoteName(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={() => dispatch(toggleRenameNote({ open: false, id: null }))}
        >
          cancel
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(renameNote({ id, name: renameNoteName }))}
          endIcon={loading && <CircularProgress size={15} />}
        >
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
