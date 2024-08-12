import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TManga } from '../../@types';
import { axiosInstance } from '../../utils/axios';
import { changeIsLoading, setError } from './loading';

type MangaState = {
  manga: TManga[];
  arrayURL: string[];

  ISBNFormIsVisible: boolean;
  ISBNInputValue: string;

  error: null | string;
};

const initialState: MangaState = {
  manga: [],
  arrayURL: [],

  ISBNFormIsVisible: true,
  ISBNInputValue: '',
  error: null,
};

export const getMangaByISBN = createAsyncThunk(
  'manga/fetch',
  async (isbn: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeIsLoading(true));
      const { data } = await axiosInstance.get<TManga>(`/manga/${isbn}`);
      thunkAPI.dispatch(changeIsLoading(false));
      return data;
    } catch (error) {
      thunkAPI.dispatch(changeIsLoading(false));
      thunkAPI.dispatch(setError('Impossible de retrouver ce manga'));
      throw error;
    }
  }
);

const mangaReducer = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    changeISBNFormIsVisible(state) {
      state.ISBNFormIsVisible = !state.ISBNFormIsVisible;
    },
    changeISBNInputValue(state, action: PayloadAction<string>) {
      state.ISBNInputValue = action.payload;
    },
    resetMangaState(state) {
      state.manga = [];
      state.arrayURL = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMangaByISBN.pending, () => {})
      .addCase(getMangaByISBN.rejected, (state) => {
        state.error = 'Problème rencontré lors de la récupération du manga';
        state.ISBNInputValue = '';
        state.ISBNFormIsVisible = true;
      })
      .addCase(getMangaByISBN.fulfilled, (state, action) => {
        state.error = '';
        state.ISBNInputValue = '';
        state.ISBNFormIsVisible = false;

        state.manga.push(action.payload);
        state.arrayURL.push(action.payload.cover_url);
      });
  },
});

export const {
  changeISBNFormIsVisible,
  changeISBNInputValue,
  resetMangaState,
} = mangaReducer.actions;
export default mangaReducer.reducer;
