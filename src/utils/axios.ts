/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { LocalStorage } from './LocalStorage';

// On créer une instance d'axios.
// Cela permet de spécifier une configuration pour toutes les requêtes effectuées avec cette instance
export const axiosInstance = axios.create({
  baseURL: 'https://manga-sama-back-production.up.railway.app',
});
// Je rajoute un intercepteur, cela me permet avant que la requête soit faite de modifier la configuration
axiosInstance.interceptors.request.use((config) => {
  // Je récupère l'utilisateur connecter en localStorage
  const token = LocalStorage.getItem('token');
  // Si il y a bien quelqu'un
  if (token) {
    // Je rajoute son token dans le header Authorization de ma requête
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${token}`;
  }
  return config;
});
