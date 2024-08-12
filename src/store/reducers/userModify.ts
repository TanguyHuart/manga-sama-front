import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { TUserConnected } from '../../@types';
import { axiosInstance } from '../../utils/axios';
import { LocalStorage } from '../../utils/LocalStorage';

type TUserFormModified = {
  id: number;
  firstName: string;
  lastName: string;
  pseudo: string;
  address: string;
  birthdate: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  created_at: string;
  updated_at: string;
};

type UserModifyState = {
  isLoading: boolean;
  error: string;
  userInfo: TUserFormModified;
  credentials: UserCredentials;
};

const initialState: UserModifyState = {
  isLoading: false,
  error: '',
  userInfo: {
    id: 0,
    firstName: '',
    lastName: '',
    pseudo: '',
    address: '',
    birthdate: '',
    zipCode: '',
    city: '',
    phoneNumber: '',
    created_at: '',
    updated_at: '',
  },
  credentials: {
    firstname: '',
    lastname: '',
    pseudo: '',
    address: '',
    birthdate: '',
    zip_code: '',
    city: '',
    phone_number: '',
  },
};

type UserCredentials = {
  firstname: string;
  lastname: string;
  pseudo: string;
  address: string;
  birthdate: string;
  zip_code: string;
  city: string;
  phone_number: string;
};

export const modifyUser = createAsyncThunk(
  'modifyUser/fetch',
  async (credentials: { userCredentials: UserCredentials; id: string }) => {
    try {
      const { data } = await axiosInstance.put<{ user: TUserFormModified }>(
        `/user/${credentials.id}`,
        credentials.userCredentials
      );
      LocalStorage.setItem('user', data.user);
      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
);

const userModifyReducer = createSlice({
  name: 'userModify',
  initialState,
  reducers: {
    modifyInputUserInfo(
      state,
      action: PayloadAction<{
        fieldName: keyof UserCredentials;
        value: string | number;
      }>
    ) {
      const { fieldName, value } = action.payload;
      switch (fieldName) {
        case 'firstname':
          state.credentials.firstname = value as string;
          break;
        case 'lastname':
          state.credentials.lastname = value as string;
          break;
        case 'pseudo':
          state.credentials.pseudo = value as string;
          break;
        case 'address':
          state.credentials.address = value as string;
          break;
        case 'zip_code':
          state.credentials.zip_code = value as string;
          break;
        case 'city':
          state.credentials.city = value as string;
          break;
        case 'phone_number':
          state.credentials.phone_number = value as string;
          break;
        case 'birthdate':
          state.credentials.birthdate = value as string;
          break;
        default:
          break;
      }
    },
    resetForm(state) {
      state.credentials.address = '';
      state.credentials.birthdate = '';
      state.credentials.city = '';
      state.credentials.firstname = '';
      state.credentials.lastname = '';
      state.credentials.zip_code = '';
      state.credentials.phone_number = '';
      state.credentials.pseudo = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(modifyUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(modifyUser.rejected, (state) => {
        state.isLoading = false;
        state.error =
          'Un problème est survenue lors de la modification des données';
      })
      .addCase(modifyUser.fulfilled, (state, action) => {});
  },
});

export const { modifyInputUserInfo, resetForm } = userModifyReducer.actions;
export default userModifyReducer.reducer;
