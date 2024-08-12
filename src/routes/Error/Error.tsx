import { Link } from 'react-router-dom';
import Page from '../../components/Page/Page';
import './Error.scss';

function Error() {
  return (
    <Page>
      <div className="error__container">
        <div className="error__container-top">
          <h1 className="error__container-top-title">Vous vous êtes perdu ?</h1>
        </div>
        <Link to="/">
          <button type="button" className="error__container-btn">
            Retour à l`accueil
          </button>
        </Link>
        <div className="error__container-main">
          <img
            className="error__container-main-img"
            src="\assets\logo\404.jpeg"
            alt=" poulpe erreur 404"
          />
        </div>
      </div>
    </Page>
  );
}

export default Error;
