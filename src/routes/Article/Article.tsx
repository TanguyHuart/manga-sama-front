/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';
import './Article.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { findArticle } from '../../store/selectors/articles';

import { changeUserInfo } from '../../store/reducers/userPage';
import {
  changeViewedArticle,
  getConditions,
} from '../../store/reducers/article';
import Carousel from '../../components/Carousel/Carousel';
import { LocalStorage } from '../../utils/LocalStorage';
import { getCategories } from '../../store/reducers/categories';

function Article() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const conditions = LocalStorage.getItem('conditions');
  const articles = LocalStorage.getItem('articles');

  if (!id) {
    throw new Error('id is missing');
  }

  const parsedId = parseInt(id, 10);

  const articleFinded = findArticle(articles, parsedId);

  const URLArray: string[] = [];
  if (articleFinded) {
    articleFinded.mangas.forEach((manga) => {
      console.log(manga.cover_url);

      URLArray.push(manga.cover_url);
    });
  }

  if (!articleFinded) {
    throw new Error(`Article with id ${parsedId} not found`);
  }

  useEffect(() => {
    dispatch(changeUserInfo(articleFinded.user));
    dispatch(changeViewedArticle(articleFinded));
  }, [dispatch, articleFinded]);

  return (
    <Page>
      <div className="Article">
        <div className="Article__container">
          <div className="Article__container_title">
            {articleFinded.article.title}
          </div>
          <div className="Article__container_price">
            {articleFinded.article.price} €
          </div>
          <div className="Article__container_main">
            <div className="Article__container_img">
              <Carousel images={URLArray} />
            </div>
            <div className="Article__container_info">
              <div className="Article__container_manga-info">
                <table>
                  <tbody>
                    {articleFinded.mangas.map((manga) => (
                      <tr key={manga.code_isbn}>
                        <td
                          className="Article__container_manga-title"
                          key={manga.title}
                        >
                          {manga.title}
                        </td>
                        <td className="Article__container_manga-volume">
                          Volume {manga.volume}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="Article__container_description">
                <div className="Article__container_description-title">
                  Description :
                </div>
                <div className="Article__container_description-content">
                  {articleFinded.article.description}
                </div>
              </div>
              <div className="Article__container_state">
                <div className="Article__container_state-title">
                  Etat de l'article :
                </div>
                <div className="Article__container_state-content">
                  {
                    conditions[articleFinded.article.condition_id - 1]
                      .condition_name
                  }
                </div>
              </div>
              <div className="Article__container_soldby">
                <div className="Article__container_soldby-content">
                  Vendu par :
                  <Link to={`/article/user/${articleFinded.user.id}`}>
                    <div className="Article__container_soldby-name">
                      {articleFinded.user.pseudo}
                    </div>
                  </Link>
                  {articleFinded.user.city && (
                    <p className="Article__container_info-localisation">
                      A {articleFinded.user.city}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="Article__container_bottom">
            <Link to={`/article/${articleFinded.article.id}/transaction`}>
              <button type="button" className="Article__purchase_btn">
                Acheter
                <img
                  className="Article__purchase_img"
                  src="\assets\icons\cart-icon-32px.png"
                  alt="icône de caddy"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </Page>
  );
}

export default Article;
