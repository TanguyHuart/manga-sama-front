import articlesReducer from './article';
import categoriesReducer from './categories';
import loginFormReducer from './loginForm';
import signUpFormReducer from './signUpForm';
import mangaReducer from './manga';
import userPageReducer from './userPage';

import createArticleReducer from './createArticle';

import searchBarMenuReducer from './searchBarMenu';
import transactionReducer from './transaction';

import userModifyReducer from './userModify';

import loadingReducer from './loading';


const reducer = {
  article: articlesReducer,
  loginForm: loginFormReducer,
  signUpForm: signUpFormReducer,
  categories: categoriesReducer,
  manga: mangaReducer,
  userPage: userPageReducer,
  userModify: userModifyReducer,
  createArticle: createArticleReducer,
  searchBar: searchBarMenuReducer,
  transaction: transactionReducer,
  loading: loadingReducer,
};

export default reducer;
