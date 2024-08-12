import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Page from '../../components/Page/Page';
import './userInfo.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getArticleByUser } from '../../store/reducers/userPage';
import { findArticleByUserId } from '../../store/selectors/articles';
import Footer from '../../components/Footer/Footer';
import { LocalStorage } from '../../utils/LocalStorage';
import { Article } from '../../@types';
import article from '../../store/reducers/article';

function UserInfo() {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  if (!id) {
    throw new Error('id is missing');
  }
  const parsedId = parseInt(id, 10);

  const userArticle: Article[] = LocalStorage.getItem('articles').filter(
    (article: Article) =>
      article.user.id === parsedId && article.article.transaction_id === null
  );

  return (
    <Page>
      <div className="user-info__main_container">
        <div className="user-info__top_container">
          <div className="user-info__top_container-credentials">
            {userArticle.length > 0 && (
              <p className="user-info__top_container-credentials-nickname">
                {userArticle[0].user.pseudo}
              </p>
            )}
            {userArticle.length === 0 && (
              <p className="user-info__top_container-credentials-nickname">
                Cet utilisateur n'a pas d'article en vente !
              </p>
            )}
            {/* <p className="user-info__top_container-credentials-city">
              {user?.city}
            </p> */}
          </div>
        </div>
        <div className="user-info__bottom_container">
          {userArticle.length > 0 && (
            <h2 className="user-info__bottom_container-title">
              Les annonces de : {userArticle[0].user.pseudo}
            </h2>
          )}
          <ul className="user-info__bottom_container-articles-list">
            {userArticle.map((article) => (
              <li
                key={article.article.id}
                className="user-info__bottom_container-articles-item"
              >
                <Link to={`/article/${article.article.id}`}>
                  <img
                    src={article.mangas[0].cover_url}
                    alt="/"
                    className="user-info__bottom_container-articles-image"
                  />
                  <div className="user-info__bottom_container-articles-info">
                    <h3 className="user-info__bottom_container-articles-info-title">
                      {article.article.title}
                    </h3>

                    <p className="user-info__bottom_container-articles-info-price">
                      {article.article.price} €
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </Page>
  );
}

export default UserInfo;
