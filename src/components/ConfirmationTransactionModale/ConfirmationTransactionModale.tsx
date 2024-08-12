import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { acceptTransaction } from '../../store/reducers/transaction';
import { LocalStorage } from '../../utils/LocalStorage';
import './ConfirmationTransactionModale.scss';
import { setInfo } from '../../store/reducers/loading';

function ConfirmationTransactionModale() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sellerId = useAppSelector(
    (state) => state.article.viewedArticle?.user.id
  );
  const articleId = useAppSelector(
    (state) => state.article.viewedArticle?.article.id
  );
  const buyerId = LocalStorage.getItem('user').id;

  const handleClickAcceptTransaction = async () => {
    const data = await dispatch(
      acceptTransaction({
        sellerId,
        articleId,
        buyerId,
      })
    );

    if (data.payload.status === 200) {
      dispatch(
        setInfo(
          " Félicitations ! Vous serez bientôt propriétaire d'un ou plusieurs nouveaux mangas !"
        )
      );
      window.location.assign('/');
    }

    throw new Error('Transaction échouéeS');
  };

  return (
    <div className="transaction__modale">
      <h2 className="transaction__modale-warning">Attention !</h2>
      <div className="transaction__modale-content">
        <p className="transaction__modale-content-1">
          Manga-Sama se charge uniquement de mettre en relation les utilisateurs
          entre eux
        </p>

        <p className="transaction__modale-content-2">
          Un email avec les coordonnées du vendeur va vous être envoyé afin que
          vous puissiez procéder à l'achat
        </p>

        <p className="transaction__modale-content-3">
          Nous travaillons actuellement afin de mettre en place un moyen de
          paiement sécurisé sur le site
        </p>
      </div>
      <button
        onClick={handleClickAcceptTransaction}
        className="transaction__modale-btn"
        type="button"
      >
        Nous mettre en relation
      </button>
    </div>
  );
}

export default ConfirmationTransactionModale;
