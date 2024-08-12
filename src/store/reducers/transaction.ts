import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { changeIsLoading, setError } from './loading';

type TransactionState = {
  isLoading: boolean;
};

const initialState: TransactionState = {
  isLoading: false,
};

type TransactionCredentials = {
  buyerId: number;
  sellerId: number | undefined;
  articleId: number | undefined;
};

export const acceptTransaction = createAsyncThunk(
  'transaction/accepted',
  async (credentials: TransactionCredentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeIsLoading(true));
      const { data } = await axiosInstance.post('/transaction', credentials);
      thunkAPI.dispatch(changeIsLoading(false));
      return data;
    } catch (error) {
      thunkAPI.dispatch(changeIsLoading(false));
      thunkAPI.dispatch(setError('La transaction a échouée'));
      throw error;
    }
  }
);

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(acceptTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptTransaction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(acceptTransaction.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export default transactionReducer.reducer;
