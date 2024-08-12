import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TUserConnected } from '../../@types';
import { axiosInstance } from '../../utils/axios';
import { LocalStorage } from '../../utils/LocalStorage';
import { changeIsLoading, setError, setInfo } from './loading';

// Définition du type d'état initial pour le formulaire de connexion.
type LoginFormState = {
  credentials: {
    email: string;
    password: string;
  };
  token: string;
  userIsConnected: boolean; // Indique si l'utilisateur est connecté.
  user: TUserConnected | null; // Détails de l'utilisateur connecté.
};

// Initialisation de l'état initial pour le formulaire de connexion.
export const initialState: LoginFormState = {
  credentials: {
    email: '',
    password: '',
  },
  token: '',
  userIsConnected: false,
  user: null,
};

// Définition du type des informations nécessaires pour la connexion d'un utilisateur.
type LoginCredentials = {
  email: string;
  password: string;
};

// Création d'une action asynchrone pour connecter un utilisateur.
export const loginUser = createAsyncThunk(
  'user/login',

  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeIsLoading(true));
      const { data } = await axiosInstance.post<{
        user: TUserConnected;
        token: string;
      }>('/auth/login', credentials); // Envoie la requête pour connecter un utilisateur.
      LocalStorage.setItem('user', data.user); // Stocke les informations de l'utilisateur dans le stockage local.
      LocalStorage.setItem('token', data.token); // Stocke le token dans le stockage local.

      thunkAPI.dispatch(changeIsLoading(false));
      thunkAPI.dispatch(setInfo('Tu es maintenant connecté ! '));
      return data;
    } catch (error) {
      thunkAPI.dispatch(changeIsLoading(false));
      thunkAPI.dispatch(setError('Mot de passe ou email incorrect'));
      throw error;
    }
  }
);

// Création d'une action asynchrone pour vérifier si l'utilisateur est connecté.
export const checkLogin = createAsyncThunk('user/check', async () => {
  const { data } = await axiosInstance.get('/auth/check'); // Envoie une requête pour vérifier la connexion de l'utilisateur.
  return data;
});

// Création d'un slice Redux pour gérer l'état du formulaire de connexion.
const loginFormReducer = createSlice({
  name: 'loginForm', // Nom du slice
  initialState, // État initial du slice.
  reducers: {
    // Réducteur pour changer les champs du formulaire de connexion.
    changeLoginFormInputsField(
      state,
      action: PayloadAction<{
        fieldName: keyof LoginFormState['credentials'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;
      state.credentials[fieldName] = value;
    },
    // Réducteur pour changer l'état d'authentification de l'utilisateur.
    changeUserisConnected(state, action: PayloadAction<boolean>) {
      state.userIsConnected = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // Réducteur pour traiter le succès de la connexion d'un utilisateur.
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userIsConnected = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      // Réducteur pour traiter le rejet de la vérification de la connexion.
      .addCase(checkLogin.rejected, (state) => {
        LocalStorage.removeItem('user');
        LocalStorage.removeItem('token'); // Supprime les informations stockées dans le stockage local.
        state.userIsConnected = false;
      });
  },
});
export const { changeLoginFormInputsField, changeUserisConnected } =
  loginFormReducer.actions;

export default loginFormReducer.reducer;
