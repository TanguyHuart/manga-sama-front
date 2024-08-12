import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios';
import { changeIsLoading, setError, setInfo } from './loading';

// Définition du type d'état initial pour le formulaire d'inscription.
type SignUpFormState = {
  credentials: {
    pseudo: string;
    email: string;
    password: string;
    password_bis: string;
  };

  loadingPseudo: boolean; // Indique si la vérification du pseudo est en cours.
  pseudoNotDisp: boolean; // Indique si le pseudo n'est pas disponible.
};
// Initialisation de l'état initial pour le formulaire d'inscription.
export const initialState: SignUpFormState = {
  credentials: {
    pseudo: '',
    email: '',
    password: '',
    password_bis: '',
  },

  loadingPseudo: false,
  pseudoNotDisp: false,
};

// Définition du type des informations nécessaires pour créer un utilisateur.
type SignUpCredentials = {
  pseudo: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

// Création d'une action asynchrone pour créer un utilisateur.
export const createUser = createAsyncThunk(
  'user/signUp',
  async (credentials: SignUpCredentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(changeIsLoading(true)); // Indique que la requête est en cours.
      const { data } = await axiosInstance.post('/user', credentials); // Envoie la requête pour créer un utilisateur.
      thunkAPI.dispatch(
        setInfo('Le compte a bien été crée ! Connectes-toi maintenant :) ') // Indique le succès de la création du compte.
      );
      thunkAPI.dispatch(changeIsLoading(false)); // Indique que la requête est terminée.
      return data;
    } catch (error) {
      thunkAPI.dispatch(changeIsLoading(false));
      thunkAPI.dispatch(setError("Le compte utilisateur n'a pas pu être crée"));
      throw error;
    }
  }
);

// Création d'une action asynchrone pour trouver un utilisateur.
export const findUser = createAsyncThunk('user/findUser', async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
});

// Création d'un slice Redux pour gérer l'état du formulaire d'inscription.
const signUpFormReducer = createSlice({
  name: 'signupForm', // Nom du slice.
  initialState, // État initial du slice.
  reducers: {
    // Réducteur pour changer les champs du formulaire d'inscription.
    changeSignUpFormInputFields(
      state,
      action: PayloadAction<{
        fieldName: keyof SignUpFormState['credentials'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;
      state.credentials[fieldName] = value;
    },
    // Réducteur pour réinitialiser le formulaire d'inscription.
    resetForm(state) {
      state.credentials.pseudo = '';
      state.credentials.email = '';
      state.credentials.password = '';
      state.credentials.password_bis = '';
      state.loadingPseudo = false;
      state.pseudoNotDisp = false;
    },
  },
  extraReducers(builder) {
    // Réducteur pour traiter le succès de la création d'un utilisateur.
    builder.addCase(createUser.fulfilled, (state) => {
      state.credentials.email = '';
      state.credentials.password = '';
      state.credentials.password_bis = '';
      state.credentials.pseudo = '';
    });
    builder
      // Réducteur pour traiter le début de la recherche d'un utilisateur.
      .addCase(findUser.pending, (state) => {
        state.loadingPseudo = true;
        state.pseudoNotDisp = false;
      })
      // Réducteur pour traiter la fin de la recherche d'un utilisateur.
      .addCase(findUser.fulfilled, (state, action) => {
        state.loadingPseudo = false;
        const findedPseudo = action.payload.find(
          (user: { pseudo: string }) => user.pseudo === state.credentials.pseudo
        );
        if (findedPseudo) {
          state.pseudoNotDisp = true;
        }
      });
  },
});

export const { changeSignUpFormInputFields, resetForm } =
  signUpFormReducer.actions;

export default signUpFormReducer.reducer;
