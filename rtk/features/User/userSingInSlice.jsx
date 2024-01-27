import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {Api} from "../../../ApiConfig/ApiConfigfile"

const initialState = {
  loading: false,
  userSignInData: [],
  error: "",
};

const getFcmTokenFromLocalStorage = () => {
  const token = localStorage.getItem("fcmtoken");
  console.log("Retrieved fcmtoken from localStorage:", token);
  return (
    token || ""
  );
};

// Generates pending, fulfilled and rejected action types
export const userSignInData = createAsyncThunk(
  "login/loginform",
  async (userSignUp) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
       
    const response = await axios.post(Api + "login", userSignUp, config);
    console.log("response in login", response);
  localStorage.setItem("token",response?.data?.data?.token)
  localStorage.setItem("userId",response?.data?.data?.userId)


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

const userSignInSlice = createSlice({
  name: "userSignInData",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.loading = false;
      state.users = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignInData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userSignInData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(userSignInData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    // ----------------------------------------------------
  },
});

export const { resetForm } = userSignInSlice.actions;
export default userSignInSlice.reducer;
