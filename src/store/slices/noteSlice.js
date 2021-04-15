import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../../utils";

const initialState = {
  notes: [],
  note: null,
  contentLoading: false,
  deleteLoading: false,
  createLoading: false,
  renameLoading: false,
  openRenameNote: false,
  renameId: null,
  renameNoteName: null,
};

const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  const res = await axios.get("/note");
  return res.data.notes;
});

const fetchNote = createAsyncThunk("note/fetchNote", async (id) => {
  const res = await axios.get(`/note/${id}`);
  return res.data.note;
});

const deleteNote = createAsyncThunk("note/deleteNote", async (id) => {
  const res = await axios.delete(`/note/${id}`);
  NotificationManager.success("Note deleted!");
  return id;
});

const createNote = createAsyncThunk("note/createNote", async () => {
  const res = await axios.post("/note");
  NotificationManager.success("Note created!");
  history.push(`/note/${res.data.note._id}`);
  return res.data.note;
});

const renameNote = createAsyncThunk("note/renameNote", async ({ id, name }) => {
  try {
    const res = await axios.patch(`/note/${id}`, {
      name,
    });
    NotificationManager.success("Note renamed!");
    return res.data.note;
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message);
    return Promise.reject(error);
  }
});

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    changeContent(state, action) {
      state.note.content = action.payload;
    },
    toggleRenameNote(state, action) {
      state.openRenameNote = action.payload.open;
      state.renameId = action.payload.id;
      state.renameNoteName = action.payload.name;
    },
    changeRenameNoteName(state, action) {
      state.renameNoteName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.contentLoading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.contentLoading = false;
      })
      .addCase(fetchNote.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchNote.fulfilled, (state, action) => {
        state.note = action.payload;
        state.contentLoading = false;
      })
      .addCase(fetchNote.rejected, (state, action) => {
        state.contentLoading = false;
      })
      .addCase(deleteNote.pending, (state, action) => {
        state.deleteLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id != action.payload);
        state.deleteLoading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.deleteLoading = false;
      })
      .addCase(createNote.pending, (state, action) => {
        state.createLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.createLoading = false;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.createLoading = false;
      })
      .addCase(renameNote.pending, (state, action) => {
        state.renameLoading = true;
      })
      .addCase(renameNote.fulfilled, (state, action) => {
        state.note = action.payload;
        const index = state.notes.findIndex(
          (note) => note._id == action.payload._id
        );
        state.notes[index] = action.payload;
        state.openRenameNote = false;
        state.renameLoading = false;
      })
      .addCase(renameNote.rejected, (state, action) => {
        state.renameLoading = false;
      });
  },
});

export { fetchNotes, fetchNote, deleteNote, createNote, renameNote };
export const {
  changeContent,
  toggleRenameNote,
  changeRenameNoteName,
} = noteSlice.actions;
export default noteSlice.reducer;
