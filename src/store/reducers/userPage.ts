/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TArticle, TUserArticle } from '../../@types';
import { axiosInstance } from '../../utils/axios';
import { LocalStorage } from '../../utils/LocalStorage';
import { changeIsLoading, setError } from './loading';

type UserPageState = {
  userPageArticle: TArticle[];
  userPageInfo: TUserArticle;
  userId: string | null;
};

const initialState: UserPageState = {
  userPageArticle: [],
  userPageInfo: {
    id: 0,
    pseudo: '',
    city: '',
    created_at: '',
    updated_at: '',
  },
  userId: null,
};

export const getArticleByUser = createAsyncThunk(
  'userArticle/fetch',
  async (userId: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeIsLoading(true));
      const { data } = await axiosInstance.get<TArticle[]>(
        `/associate/user/${userId}/article`
      );
      thunkAPI.dispatch(changeIsLoading(false));
      return data;
    } catch (error) {
      thunkAPI.dispatch(changeIsLoading(false));
      thunkAPI.dispatch(setError('Erreur lors de la récupération des données'));
      throw error;
    }
  }
);

// export const getUserById = createAsyncThunk(
//   'userInfo/fetch',
//   async (userId: number) => {
//     const { data } = await axios.get<TUserArticle>(
//       `http://localhost:3000/user/${userId}`
//     );
//     return data;
//   }
// );

const userPageReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserInfo(state, action: PayloadAction<TUserArticle>) {
      state.userPageInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // Gestion du fetch afin de recuperer les article selon le user

      .addCase(getArticleByUser.fulfilled, (state, action) => {
        state.userPageArticle = action.payload;

        LocalStorage.setItem('userArticle', action.payload);
      });
    // // gestion du fetch afin de recuperer un user par son id
    // .addCase(getUserById.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getUserById.rejected, (state) => {
    //   state.isLoading = true;
    //   state.errorUserPage = ' Aucun utilisateur trouvé ';
    // })
    // .addCase(getUserById.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.userPageInfo = action.payload;
    // });
  },
});

export const { changeUserInfo } = userPageReducer.actions;
export default userPageReducer.reducer;
