import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {Api} from "../../../ApiConfig/ApiConfigfile"
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  updateUserProfileData: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const updateUserProfileData = createAsyncThunk(
  "hotel/updateUserProfileData",
  async (userData) => {
    try {
      const config = {
        headers: {
          token: `${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };

      console.log("config",config);

      const response = await axios.patch(
        Api + "editProfile",userData,
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

const updateUserProfileDataSlice = createSlice({
  name: "updateUserProfileData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(updateUserProfileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfileData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(updateUserProfileData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default updateUserProfileDataSlice.reducer;
