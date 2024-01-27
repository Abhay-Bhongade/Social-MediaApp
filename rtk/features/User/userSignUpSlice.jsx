import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {Api} from "../../../ApiConfig/ApiConfigfile"

const initialState = {
  loading: false,
  userSignUpData: [],
  error: "",
};



// Generates pending, fulfilled and rejected action types
export const userSignUpData = createAsyncThunk(
  "login/loginform",
  async (userSignUp) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(Api + "signup", userSignUp, config);
      console.log("response in login", response);
    
      console.log("response in login", response);
      return response;
    } catch (error) {
      console.error("An error occurred3:", error?.response?.data);
      const customId = "custom-id-yes";
      toast.error(error?.response?.data?.message, {
        toastId: customId,
      });
    }



  }
);

const userSignUpSlice = createSlice({
  name: "userSignUpData",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.loading = false;
      state.users = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignUpData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userSignUpData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(userSignUpData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------------------------
  },
});

export const { resetForm } = userSignUpSlice.actions;
export default userSignUpSlice.reducer;
