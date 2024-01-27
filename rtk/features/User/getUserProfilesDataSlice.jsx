import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {Api} from "../../../ApiConfig/ApiConfigfile"
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getUserProfilesData: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getUserProfilesData = createAsyncThunk(
  "hotel/getUserProfilesData",
  async () => {
    try {
      const config = {
        headers: {
          token: `${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };

      console.log("config",config);

      const response = await axios.get(
        Api + "getProfile",
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

const getUserProfilesDataSlice = createSlice({
  name: "getUserProfilesData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getUserProfilesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfilesData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getUserProfilesData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default getUserProfilesDataSlice.reducer;
