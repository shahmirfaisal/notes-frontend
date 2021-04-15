import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../../utils";

const initialState = {
  user: null,
  buttonLoading: false,
  contentLoading: true,
};

const login = createAsyncThunk("user/login", async ({ email, password }) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    NotificationManager.success("Logged in!");
    history.replace("/");
    return res.data;
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message);
    return error;
  }
});

const isLogin = createAsyncThunk("user/isLogin", async () => {
  const res = await axios.get("/user/is-login");
  return res.data.user;
});

const signup = createAsyncThunk(
  "user/signup",
  async ({ name, email, password }) => {
    try {
      const res = await axios.post("/user/signup", { name, email, password });
      NotificationManager.success("Signed up!");
      history.replace("/");
      return res.data;
    } catch (error) {
      NotificationManager.error(error?.response?.data?.message);
      return error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.buttonLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        state.buttonLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.buttonLoading = false;
      })
      .addCase(signup.pending, (state, action) => {
        state.buttonLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        state.buttonLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.buttonLoading = false;
      })
      .addCase(isLogin.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(isLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.contentLoading = false;
      })
      .addCase(isLogin.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.contentLoading = false;
      });
  },
});

export { login, signup, isLogin };
export const { logout } = userSlice.actions;
export default userSlice.reducer;
