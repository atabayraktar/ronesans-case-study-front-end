import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo/todo.slice";
import userSlice from "./user/user.slice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
