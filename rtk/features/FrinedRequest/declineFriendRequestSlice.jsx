import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {Api} from "../../../ApiConfig/ApiConfigfile"
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  declineFriendRequest: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const declineFriendRequest = createAsyncThunk(
  "hotel/declineFriendRequest",
  async (id) => {
    try {
        const config = {
            headers: {
              token: `${getTokenFromLocalStorage()}`,
              "Content-Type": "application/json",
            },
          };
    

      const response = await axios.patch(
        Api + `decliningFriendRequest/${id}`,{_id:id},
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

const declineFriendRequestSlice = createSlice({
  name: "declineFriendRequest",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(declineFriendRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(declineFriendRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(declineFriendRequest.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default declineFriendRequestSlice.reducer;
