import './Home.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getArticles } from '../../store/reducers/article';
import HeaderBottom from '../../components/HeaderBottom/HeaderBottom';
import { LocalStorage } from '../../utils/LocalStorage';

function Home() {
  const articlesFiltered = useAppSelector(
    (state) => state.article.filteredArticles
  );
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getArticles());
  // }, [dispatch]);
  return (
    <div className="home">
      <HeaderBottom />
      <div className="home__articles">
        <div className="home__articles-title-area">
          <h2 className="home__articles-title">
            Les dernières annonces
            <span>
              <img
                src="assets/icons/register-icon.png"
                alt="icon"
                className="home__articles-title-icon"
              />
            </span>
          </h2>
        </div>
        <div className="home__articles-area">
          {articlesFiltered.length === 0 && (
            <p className="category__articles-noarticles">
              Il n'y a pas d'article correspondant à cette recherche en vente !
            </p>
          )}
          <ul className="home__articles-list">
            {articlesFiltered.map((article) => (
              <Link
                to={`/article/${article.article.id}`}
                key={article.article.id}
              >
                <li className="home__articles-item">
                  <img
                    src={article.mangas[0].cover_url}
                    alt="/"
                    className="home__articles-item-image"
                  />
                  <div className="home__articles-info">
                    <h3 className="home__articles-info-title">
                      {article.article.title}
                    </h3>
                    {/* <p className="home__articles-info-tome">
                      Tome {article.manga.volume}
                    </p> */}
                    <p className="home__articles-info-price">
                      {article.article.price} €
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
