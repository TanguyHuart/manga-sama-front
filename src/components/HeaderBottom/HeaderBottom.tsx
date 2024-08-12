import { Link } from 'react-router-dom';
import './HeaderBottom.scss';

function HeaderBottom() {
  return (
    <div className="header-bottom">
      <div className="header-bottom__container">
        <div className="header-bottom__content">
          <h2 className="header-bottom__content-title">
            Bienvenue sur Manga-Sama
          </h2>
          <h3 className="header-bottom__content-text">
            Leader français de la vente de mangas entre particuliers
          </h3>
        </div>
      </div>
      <div className="header-bottom__button">
        <Link to="/createArticle" className="header-bottom__button-link">
          Publier une annonce
          <img
            src="/assets/icons/add.png"
            alt="logo-publier-une-annonce"
            className="header-bottom__button-logo"
          />
        </Link>
      </div>
    </div>
  );
}

export default HeaderBottom;
