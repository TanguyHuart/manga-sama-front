import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type LoadingState = {
  isLoading: boolean;
  infoMessage: string;
  errorMessage: string;
};

const initialState: LoadingState = {
  isLoading: false,
  infoMessage: '',
  errorMessage: '',
};

const LoadingReducer = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setInfo(state, action: PayloadAction<string>) {
      state.infoMessage = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    clearMessages(state) {
      state.infoMessage = '';
      state.errorMessage = '';
    },
  },
});

export const { changeIsLoading, setError, setInfo, clearMessages } =
  LoadingReducer.actions;

export default LoadingReducer.reducer;
