import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../entities/User";
import UserService from "../../services/userService";

type UserState = {
  user: User;
  user_id?: string;
};

const initialState: UserState = {
  user: {
    username: "",
    password: "",
    id: "",
  },
  user_id: "",
};

export const userService = new UserService();

export const login = createAsyncThunk(
  "user/Login",
  async (params: User) => await userService.Login(params)
);

export const register = createAsyncThunk(
  "user/Register",
  async (params: User) => await userService.Register(params)
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      user: {
        username: "",
        password: "",
        id: "",
      },
      user_id: "",
    }));
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      user: {
        username: "",
        password: "",
        id: "",
      },
      user_id: "",
    }));
    builder.addCase(login.fulfilled, (state, action) => ({
      ...state,
      user: action?.payload?.foundUser,
      user_id: action?.payload?.foundUser?.id,
    }));

    builder.addCase(register.pending, (state) => ({
      ...state,
      user: {
        username: "",
        password: "",
        id: "",
      },
    }));
    builder.addCase(register.rejected, (state, action) => ({
      ...state,
      user: {
        username: "",
        password: "",
        id: "",
      },
    }));
    builder.addCase(register.fulfilled, (state, action) => ({
      ...state,
      user: action.payload?.foundUser,
    }));
  },
});

export default userSlice.reducer;
