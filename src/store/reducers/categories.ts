import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TCategory } from '../../@types';
import { axiosInstance } from '../../utils/axios';
import { setError } from './loading';

type CategoriesState = {
  list_categories: TCategory[];
};

const initialState: CategoriesState = {
  list_categories: [],
};

export const getCategories = createAsyncThunk(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get<TCategory[]>('/category');
      return data;
    } catch (error) {
      thunkAPI.dispatch(
        setError('Un problème est survenu lors de la récupération des données')
      );
      throw error;
    }
  }
);

const categoriesReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list_categories = action.payload;
    });
  },
});

export default categoriesReducer.reducer;
