import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// Async action for login
export const loginAction = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = response.data;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials and try again.",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || "",
    refresh: localStorage.getItem("refresh") || "",
    status: "idle",
    error: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = "";
      state.refresh = "";
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { token, refresh, userInfo } = action.payload;
        state.status = "succeeded";
        state.user = userInfo;
        state.token = token;
        state.refresh = refresh;
        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refresh);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to login";
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
