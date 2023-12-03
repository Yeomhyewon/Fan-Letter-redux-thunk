import jsonInstance from "api/jsonServerApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  letters: [],
  isLoding: false,
  error: null,
  isError: false,
};

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonInstance.get(
        `/letters?_sort=createdAt&_order=desc`
      );
      console.log("response", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonInstance.post(`/letters`, payload);
      console.log("response", response);
      thunkAPI.dispatch(__getLetters());
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonInstance.delete(`/letters/${payload}`);
      thunkAPI.dispatch(__getLetters());
      console.log("response", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editLetter = createAsyncThunk(
  "editLetter",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonInstance.patch(`/letters/${payload.id}`, {
        content: payload.letter,
      });
      console.log("response", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {},
  extraReducers: {
    [__getLetters.pending]: (state, action) => {
      state.isLoding = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.isError = false;
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoding = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addLetter.pending]: (state) => {
      state.isLoding = true;
      state.isError = false;
    },
    [__addLetter.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.isError = false;
      state.letters.push(action.payload);
    },
    [__addLetter.rejected]: (state, action) => {
      state.isLoding = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__deleteLetter.pending]: (state, action) => {
      state.isLoding = true;
      state.isError = false;
    },
    [__deleteLetter.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.isError = false;
    },
    [__deleteLetter.rejected]: (state, action) => {
      state.isLoding = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__editLetter.pending]: (state, action) => {
      state.isLoding = true;
      state.isError = false;
    },
    [__editLetter.fulfilled]: (state, action) => {
      const filterLetter = state.letters.findIndex((i) => {
        return i.id === action.payload.id;
      });

      state.letters.splice(filterLetter, 1, action.payload);
      state.isLoding = false;
      state.isError = false;
    },
    [__editLetter.rejected]: (state, action) => {
      state.isLoding = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default letterSlice.reducer;
