import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationTransactionModale from '../../components/ConfirmationTransactionModale/ConfirmationTransactionModale';
import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LocalStorage } from '../../utils/LocalStorage';
import './Transaction.scss';
import { setError } from '../../store/reducers/loading';

function Transaction() {
  const dispatch = useAppDispatch();
  const transactionArticle = useAppSelector(
    (state) => state.article.viewedArticle
  );

  const [modaleIsVisible, setModaleIsVisible] = useState(false);

  function handleClickTransactionBtn() {
    setModaleIsVisible(true);
  }

  if (!LocalStorage.getItem('user')) {
    dispatch(
      setError(
        "L'achat d'un article nécessite la connexion à un compte Utilisateur !"
      )
    );
    return <Navigate to="/login" />;
  }

  return (
    <Page>
      <div className="transaction">
        <div className="transaction__area">
          <h2 className="transaction__area-top-title">
            Récapitulatif de la commande
          </h2>
          <div className="transaction__area-top">
            <div className="transaction__area-top-profile">
              <h2>Le vendeur</h2>
              <img
                src="/assets/logo/tonio.png"
                className="transaction__area-top-profile-img"
                alt="logo"
              />
              <h3 className="transaction__area-top-profile-name">
                {transactionArticle?.user.pseudo}
              </h3>
              <p className="transaction__area-top-profile-location">
                {transactionArticle?.user.city}
              </p>
            </div>
            <img
              src="/assets/icons/arrow-point-to-right.png"
              alt="arrow-right icon"
              className="transaction__area-arrowicon"
            />
            <div className="transaction__area-top-article">
              <img
                src={transactionArticle?.mangas[0].cover_url}
                alt="article"
                className="transaction__area-top-article-image"
              />
              <table>
                <tbody className="transaction__area-top-article-table">
                  {transactionArticle?.mangas.map((manga) => (
                    <tr key={manga.code_isbn}>
                      <td
                        className="transaction__area-top-article-title"
                        key={manga.title}
                      >
                        {manga.title}
                      </td>
                      <td className="transaction__area-top-article-volume">
                        Volume : {manga.volume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="transaction__area-top-article-price">
                {transactionArticle?.article.price} €
              </p>
            </div>
            <img
              src="/assets/icons/arrow-point-to-right.png"
              alt="arrow-right icon"
              className="transaction__area-arrowicon"
            />
            <div className="transaction__area-top-profile">
              <h2>Je suis acheteur</h2>
              <img
                src="/assets/logo/houd.png"
                alt="logo"
                className="transaction__area-top-profile-img"
              />
              <h3 className="transaction__area-top-profile-name">
                {LocalStorage.getItem('user').pseudo}
              </h3>
              <p className="transaction__area-top-profile-location">
                {LocalStorage.getItem('user').city}
              </p>
            </div>
          </div>
          <div className="transaction__area-bottom-button">
            <button
              onClick={handleClickTransactionBtn}
              type="button"
              className="transaction__button"
            >
              Procéder au paiement
            </button>
          </div>
        </div>
      </div>

      {modaleIsVisible && <ConfirmationTransactionModale />}
      <Footer />
    </Page>
  );
}

export default Transaction;
