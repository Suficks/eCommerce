import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginByUsername } from '../services/loginByUsername';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
  password: '',
  email: '',
  username: '',
  isLoading: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
