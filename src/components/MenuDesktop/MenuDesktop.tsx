import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { changeFilteredArticle } from '../../store/reducers/article';
import { changeSearchInputValue } from '../../store/reducers/searchBarMenu';
import './MenuDesktop.scss';
import { getCategories } from '../../store/reducers/categories';

function MenuDesktop() {
  const dispatch = useAppDispatch();

  const [categoriesIsVisible, setCategoriesIsVisible] = useState(false);

  const categories = useAppSelector(
    (state) => state.categories.list_categories
  );

  const articles = useAppSelector((state) => state.article.list_articles);

  const searchBarInputValue = useAppSelector(
    (state) => state.searchBar.searchBarInputValue
  );

  const filterArticle = (searchValue: string) => {
    const filteredArticle = articles.filter(
      (article) =>
        article.article.title.toLowerCase().includes(searchValue) &&
        article.article.transaction_id === null
    );

    dispatch(changeFilteredArticle(filteredArticle));
  };

  function handleOnCategoryButton() {
    setCategoriesIsVisible(!categoriesIsVisible);
  }

  function handleChangeSearchBarInputValue(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const newSearchValue = event.target.value.toLowerCase();

    dispatch(changeSearchInputValue(newSearchValue));
    filterArticle(newSearchValue);
  }

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

  function handleSubmitSearchInput(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(changeSearchInputValue(''));
  }

  return (
    <div className="home-menuDesktop">
      <div className="home-menuDesktop__container">
        <Link to="/">
          <img
            className="home-menuDesktop__logo"
            src="/assets/logo/logo.png"
            alt=""
          />
        </Link>

        <form
          className="home-menuDesktop__form"
          onSubmit={handleSubmitSearchInput}
        >
          <input
            type="text"
            placeholder="Rechercher..."
            className="home-menuDesktop__form--inputSearch"
            onChange={handleChangeSearchBarInputValue}
            value={searchBarInputValue}
          />
        </form>
        <nav className="home-menuDesktop__nav">
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
              >
                <li className="nav__categories-item">
                  {category.category_name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <div className="home-menuDesktop__socials">
        <a href="/" className="home-menuDesktop__socials-icon">
          <img src="/assets/icons/facebook.png" alt="facebook logo" />
        </a>
        <a href="/" className="home-menuDesktop__socials-icon">
          <img src="/assets/icons/instagram.png" alt="instagram logo" />
        </a>
        <a href="/" className="home-menuDesktop__socials-icon">
          <img src="/assets/icons/twitter.png" alt="x logo" />
        </a>
      </div>
    </div>
  );
}

export default MenuDesktop;
