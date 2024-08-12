import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './Menu.scss';
import clsx from 'clsx';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeSearchInputValue } from '../../store/reducers/searchBarMenu';
import { changeFilteredArticle } from '../../store/reducers/article';
import { getCategories } from '../../store/reducers/categories';

function Menu() {
  const dispatch = useAppDispatch();

  const [categoriesIsVisible, setCategoriesIsVisible] = useState(false); // État pour gérer la visibilité des catégories.
  const [menuIsVisible, setMenuIsVisible] = useState(false); // État pour gérer la visibilité du menu
  // Sélecteur Redux pour récupérer la liste des catégories.
  const categories = useAppSelector(
    (state) => state.categories.list_categories
  );
  // Sélecteur Redux pour récupérer la liste des articles.
  const articles = useAppSelector((state) => state.article.list_articles);
  // Sélecteur Redux pour récupérer la valeur de l'input de recherche
  const searchBarInputValue = useAppSelector(
    (state) => state.searchBar.searchBarInputValue
  );

  // Fonction pour filtrer les articles en fonction de l'input de recherche
  const filterArticle = (searchValue: string) => {
    const filteredArticle = articles.filter(
      (article) =>
        article.article.title.toLowerCase().includes(searchValue) &&
        article.article.transaction_id === null
    );

    dispatch(changeFilteredArticle(filteredArticle)); // Dispatch une action pour mettre à jour les articles filtrés dans le Redux store.
  };

  const handleOnCategoryButton = () => {
    setCategoriesIsVisible(!categoriesIsVisible); // Inverse la visibilité des catégories.
  };

  const handleOnMenuButton = () => {
    setMenuIsVisible(!menuIsVisible); // Inverse la visibilité du menu.
  };

  const handleChangeSearchBarInputValue = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchValue = event.target.value.toLowerCase();

    dispatch(changeSearchInputValue(newSearchValue)); // Dispatch une action pour mettre à jour la valeur de l'input de recherche dans le Redux store.
    filterArticle(newSearchValue); // Applique le filtrage des articles en fonction de la nouvelle valeur de l'input
  };

  // Effet qui s'exécute lors du premier rendu du composant et lorsque la liste des articles change.
  useEffect(() => {
    // dispatch(getCategories());
    const filter = () => {
      const filteredArticle = articles.filter(
        (article) =>
          article.article.title.toLowerCase().includes('') &&
          article.article.transaction_id === null
      );
      dispatch(changeFilteredArticle(filteredArticle));
    };
    filter();
  }, [dispatch, articles]);

  const handleSubmitSearchInput = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMenuIsVisible(false); // Masque le menu après la soumission du formulaire.
    dispatch(changeSearchInputValue('')); // Réinitialise la valeur de l'input de recherche dans le Redux store.
  };

  return (
    <div className="menu-mobile">
      <button
        onClick={handleOnMenuButton}
        type="button"
        className="home-menu__toggle-button"
      >
        <img
          className="home-menu__toggle-button--icon"
          src="/assets/icons/menuPink.png"
          alt="menu-burger"
        />
      </button>
      <div
        className={clsx('home-menu', { 'home-menu--hidden': !menuIsVisible })}
      >
        <div className="home-menu__container">
          <img className="home-menu__logo" src="/assets/logo/logo.png" alt="" />

          <form className="home-menu__form" onSubmit={handleSubmitSearchInput}>
            <input
              type="text"
              placeholder="Rechercher..."
              className="home-menu__form--inputSearch"
              onChange={handleChangeSearchBarInputValue}
              value={searchBarInputValue}
            />
          </form>
          <nav className="home-menu__nav">
            <button
              onClick={handleOnCategoryButton}
              type="button"
              className="nav__categories-button"
            >
              Catégories
              <img
                className={clsx('nav__categories-arrowicon', {
                  'nav__categories-arrowicon--rotated': categoriesIsVisible,
                })}
                src="/assets/icons/fleche-vers-le-cote.png"
                alt="arrow-icon"
              />
            </button>
            <ul
              className={clsx('nav__categories-list', {
                'nav__categories-list--hidden': !categoriesIsVisible,
              })}
            >
              {categories.map((category) => (
                <Link
                  key={category.category_name}
                  to={`/category/${category.id}`}
                  onClick={() => {
                    setMenuIsVisible(false);
                  }}
                >
                  <li className="nav__categories-item">
                    {category.category_name}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        <div className="home-menu__socials">
          <a href="/" className="home-menu__socials-icon">
            <img src="/assets/icons/facebook.png" alt="facebook logo" />
          </a>
          <a href="/" className="home-menu__socials-icon">
            <img src="/assets/icons/instagram.png" alt="instagram logo" />
          </a>
          <a href="/" className="home-menu__socials-icon">
            <img src="/assets/icons/twitter.png" alt="x logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
