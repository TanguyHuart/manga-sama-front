/* eslint-disable import/no-named-as-default */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Article, TCondition } from '../../@types';
import { axiosInstance } from '../../utils/axios';
import { changeIsLoading, setError } from './loading';
import { LocalStorage } from '../../utils/LocalStorage';

// Définit le type d'état initial pour le slice d'articles
type ArticleState = {
  list_articles: Article[];
  list_condition: TCondition[];

  filteredArticles: Article[];
  viewedArticle: Article | null;
};

// Initialise l'état initial pour le slice d'articles.
const initialState: ArticleState = {
  list_condition: [],
  list_articles: [],
  filteredArticles: [],
  viewedArticle: null,
};

// Crée une action asynchrone pour récupérer les articles depuis le serveur.
export const getArticles = createAsyncThunk(
  'articles/fetch',
  async (_, thunkAPI) => {
    try {
      // thunkAPI est un parametre qui permet d'utiliser des fonction contenue dans d'autre reducer
      thunkAPI.dispatch(changeIsLoading(true));
      // requete via axiosInstance , on récupère un array d'article
      const { data } = await axiosInstance.get<Article[]>('/article');
      thunkAPI.dispatch(changeIsLoading(false));
      return data;
    } catch (error) {
      thunkAPI.dispatch(changeIsLoading(false));
      // envoie un message d'erreur dans la modale d'information pour l'utilisateur
      thunkAPI.dispatch(
        setError('Un problème est survenu lors de la récupération des données')
      );
      throw error;
    }
  }
);

// Crée une action asynchrone pour supprimer un article.

export const deleteArticle = createAsyncThunk(
  'article/delete',
  async (articleId: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeIsLoading(true));
      const { data } = await axiosInstance.delete(`/article/${articleId}`);
      thunkAPI.dispatch(changeIsLoading(false));
      return data;
    } catch (error) {
      thunkAPI.dispatch(changeIsLoading(false));
      throw error;
    }
  }
);

// Crée une action asynchrone pour récupérer les conditions depuis le serveur.
export const getConditions = createAsyncThunk(
  'condition/fetch',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeIsLoading(true));
      const { data } = await axiosInstance.get<TCondition[]>('/condition');
      thunkAPI.dispatch(changeIsLoading(false));
      return data;
    } catch (error) {
      thunkAPI.dispatch(
        setError('Un problème est survenu lors de la récupération des données')
      );
      throw error;
    }
  }
);

// Définit le slice d'articles avec son nom, son état initial et ses réducers.
const articleReducer = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // Fonction qui Modifie la valeur de filteredArticles dans le store
    changeFilteredArticle(state, action: PayloadAction<Article[]>) {
      state.filteredArticles = action.payload;
    },
    // Fonction qui Modifie la valeur de viewedArticle dans le store
    changeViewedArticle(state, action: PayloadAction<Article>) {
      state.viewedArticle = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // gestion des données lorque que le fetch est terminé
      .addCase(getArticles.fulfilled, (state, action) => {
        state.list_articles = action.payload.reverse(); // inversion de l'ordre des articles dans le tableau afin d'avoir les dernier articles créer en premier
        LocalStorage.setItem('articles', action.payload); // stockage des articles dans le local storage pour eviter de faire un fetch a chaque passage sur la home page
      })

      .addCase(getConditions.fulfilled, (state, action) => {
        state.list_condition = action.payload;
        LocalStorage.setItem('conditions', action.payload);
      });
  },
});

// exporte les fonctions du slice
export const { changeFilteredArticle, changeViewedArticle } =
  articleReducer.actions;
// export du reducer
export default articleReducer.reducer;
