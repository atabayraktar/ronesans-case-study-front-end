import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../entities/Todo";
import TodoService from "../../services/todoService";

type TodoState = {
  todos: Todo[];
  todo: Todo;
};

const initialState: TodoState = {
  todos: [],
  todo: {
    id: "",
    name: "",
    time: new Date(),
    user_id: "",
    isChecked: false,
    version: 0,
  },
};

export const todoService = new TodoService();

export const getAll = createAsyncThunk(
  "todo/GetAll",
  async (params: Todo) => await todoService.GetAll(params)
);
export const getOne = createAsyncThunk(
  "todo/GetOne",
  async (params: Todo) => await todoService.GetOne(params)
);
export const Filter = createAsyncThunk(
  "todo/Filter",
  async (params: Todo) => await todoService.Filter(params)
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => ({
      ...state,
      todos: [],
    }));
    builder.addCase(getAll.rejected, (state, action) => ({
      ...state,
      todos: [],
    }));
    builder.addCase(getAll.fulfilled, (state, action) => ({
      ...state,
      todos: action.payload.todos,
    }));

    builder.addCase(getOne.pending, (state) => ({
      ...state,
      todo: {
        id: "",
        name: "",
        time: new Date(),
        user_id: "",
        isChecked: false,
        version: 0,
      },
    }));
    builder.addCase(getOne.rejected, (state, action) => ({
      ...state,
      todo: {
        id: "",
        name: "",
        time: new Date(),
        user_id: "",
        isChecked: false,
        version: 0,
      },
    }));
    builder.addCase(getOne.fulfilled, (state, action) => ({
      ...state,
      todo: action.payload,
    }));

    builder.addCase(Filter.pending, (state) => ({
      ...state,
      todos: [],
    }));
    builder.addCase(Filter.rejected, (state, action) => ({
      ...state,
      todos: [],
    }));
    builder.addCase(Filter.fulfilled, (state, action) => ({
      ...state,
      todos: action.payload.todos,
    }));
  },
});

export default todoSlice.reducer;
