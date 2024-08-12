import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TManga } from '../../@types';

type SearchBarMenuState = {
  manga: TManga | null;
  searchBarInputValue: string;
  isLoading: boolean;
  error: null | string;
};

// manga: null a un état initial définie comme null (vide)
// SearchBarInputValue: '' : est décrite comme une chaine vide qui représente la valeur actuellement saisie dans la barre de recherche
// La propriété isLoading: false suggère que lorsqu'on charge des données, celle-ci pourra être changée en "true" et indiquer le changement en cours
// error: null : indique qu'aucune erreur n'est survenue initialement
const initialState: SearchBarMenuState = {
  manga: null,
  searchBarInputValue: '',
  isLoading: false,
  error: null,
};

// Nous créons un "Slice" de reducer pour gérer l'état associé à la barre de recherche
// l'initialState nous permet de déclarer l'état initial
// La partie "reducers" nous permet de définir les actions qui pourront modifier l'état de la barre de recherche
// L'action.payload nous permet de mettre à jour la propriété SearchInputValue avec la valeur fournie dans le "payload"

const searchBarMenuReducer = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    changeSearchInputValue(state, action: PayloadAction<string>) {
      state.searchBarInputValue = action.payload;
    },
  },
});
export const { changeSearchInputValue } = searchBarMenuReducer.actions;
export default searchBarMenuReducer.reducer;
