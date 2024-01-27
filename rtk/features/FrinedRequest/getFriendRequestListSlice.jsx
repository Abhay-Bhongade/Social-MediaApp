import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {Api} from "../../../ApiConfig/ApiConfigfile"
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getFriendRequestList: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getFriendRequestList = createAsyncThunk(
  "hotel/getFriendRequestList",
  async () => {
    try {
        const config = {
            headers: {
              token: `${getTokenFromLocalStorage()}`,
              "Content-Type": "application/json",
            },
          };
    

      const response = await axios.get(
        Api + "getFriendRequestList",
        config
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred3:", error?.response?.data);
      const customId = "custom-id-yes";
      toast.error(error?.response?.data?.message, {
        toastId: customId,
      });
    }
  }
);

const getFriendRequestListSlice = createSlice({
  name: "getFriendRequestList",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getFriendRequestList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFriendRequestList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getFriendRequestList.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default getFriendRequestListSlice.reducer;
