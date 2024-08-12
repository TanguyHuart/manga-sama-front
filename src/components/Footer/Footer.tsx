/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__top_container">
        <div className="Footer__top_container-left">
          <ul className="Footer__list">
            <li className="Footer__list_item">
              <Link to="/copyright">Mentions légales</Link>
            </li>
            <li className="Footer__list_item">
              <Link to="/privacy">Politique de confidentialité</Link>
            </li>
            <li className="Footer__list_item">
              <Link to="/">C.G.V.</Link>
            </li>
          </ul>
        </div>
        <div className="Footer__top_container-right">
          <ul className="Footer__list">
            <li className="Footer__list_item">
              <Link to="/team">L'équipe</Link>
            </li>
            <li className="Footer__list_item">
              <Link to="/about">A propos</Link>
            </li>
            <li className="Footer__list_item">
              <Link to="/contact">Nous contacter</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="Footer__bottom_container">
        <a href="/">Manga Sama - tous droits réservés 2023</a>
      </div>
    </footer>
  );
}

export default Footer;
