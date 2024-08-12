import { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import Footer from '../../components/Footer/Footer';
import './UserTransactions.scss';

import { LocalStorage } from '../../utils/LocalStorage';

import { getArticleByUser } from '../../store/reducers/userPage';
import { useAppDispatch } from '../../hooks/redux';
import { TArticle } from '../../@types';

function UserTransactions() {
  const dispatch = useAppDispatch();
  function getUserFromLocalStorage() {
    const userID = LocalStorage.getItem('user').id;
    return userID;
  }

  const user = getUserFromLocalStorage();

  const [userArticle, setUserArticle] = useState<TArticle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getArticleByUser(user));

      const getArticles = LocalStorage.getItem('userArticle');
      const filteredArticles = getArticles.filter(
        (article: { transaction_id: null }) => article.transaction_id != null
      );
      setUserArticle(filteredArticles);
    };
    fetch();
  }, [dispatch, user]);

  return (
    <Page>
      <div className="user-transactions">
        <div className="user-transactions__top_container">
          <h2 className="user-transactions__top_title">
            Mon historique de transaction(s)
          </h2>
        </div>
        <div className="user-transactions__main_container">
          <ul className="user-transactions__cards">
            {userArticle.map((article) => (
              <li key={article.id} className="user-transactions__cards_item">
                {/* <img
                    className="user-transactions__cards_item-img"
                    src={article.image_url}
                    alt="article"
                  /> */}
                <div className="user-transactions__cards_item-info">
                  <div className="user-transactions__cards_item-content">
                    <h4 className="user-transactions__cards_item-content-title">
                      {article.title}
                    </h4>
                    <p className="user-transactions__cards_item-content-price">
                      {article.price} €
                    </p>
                  </div>
                  <div className="user-transactions__cards_item-content">
                    <div>
                      <p> N° de transaction : </p>
                      <p className="user-transactions__cards_item-content-price">
                        {article.transaction_id}
                      </p>
                    </div>
                    <div>
                      <p>le {article.date_transaction}</p>
                    </div>
                  </div>

                  <p className="user-transactions__cards_item-state">
                    {article.state_completion}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </Page>
  );
}

export default UserTransactions;
