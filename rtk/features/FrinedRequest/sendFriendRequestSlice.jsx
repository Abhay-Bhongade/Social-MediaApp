import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {Api} from "../../../ApiConfig/ApiConfigfile"
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  sendFriendRequest: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const sendFriendRequest = createAsyncThunk(
  "hotel/sendFriendRequest",
  async (userData) => {
    try {
        const config = {
            headers: {
              token: `${getTokenFromLocalStorage()}`,
              "Content-Type": "application/json",
            },
          };
    

      const response = await axios.post(
        Api + "sendFriendRequest",userData,
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

const sendFriendRequestSlice = createSlice({
  name: "sendFriendRequest",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(sendFriendRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default sendFriendRequestSlice.reducer;
