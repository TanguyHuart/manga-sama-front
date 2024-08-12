import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import './Root.scss';
import MobileNav from '../../components/MobileNav/MobileNav';

import { useAppDispatch } from '../../hooks/redux';
import { getArticles, getConditions } from '../../store/reducers/article';
import { getCategories } from '../../store/reducers/categories';
import { LocalStorage } from '../../utils/LocalStorage';
import {
  changeUserisConnected,
  checkLogin,
} from '../../store/reducers/loginForm';
import MenuDesktop from '../../components/MenuDesktop/MenuDesktop';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

function Root() {
  // Utilise le hook useAppDispatch de Redux Toolkit pour obtenir la fonction dispatch.
  const dispatch = useAppDispatch();

  // Récupère l'utilisateur depuis le stockage local.
  const user = LocalStorage.getItem('user');

  // Au premier chargement de Root , on fait des demande a l'API pour qu'elle nous donnes les donées nécéssaire :  tous les articles , toutes les catégories , toutes les conditions d'article
  useEffect(() => {
    dispatch(getArticles());
    dispatch(getConditions());
    dispatch(getCategories());

    // Si un utilisateur est présent dans le stockage local, effectue des actions de connexion automatique.
    if (user) {
      dispatch(checkLogin());
      dispatch(changeUserisConnected(true));
    }
  }, [dispatch, user]);

  return (
    <div className="root">
      <ScrollToTop />
      <Menu />
      <MenuDesktop />
      <div className="right__section">
        <Header />

        <Outlet />
        {/* Composant représentant le point de sortie pour le routage. */}
      </div>
      <MobileNav />
    </div>
  );
}

export default Root;
