import { Link } from 'react-router-dom';
import './UserMenuDesktop.scss';

function UserMenuDesktop() {
  return (
    <div className="home-menuDesktop">
      <div className="home-menuDesktop__container">
        <img
          className="home-menuDesktop__logo"
          src="/assets/logo/logo.png"
          alt=""
        />
      </div>
      <div className="home-menuDesktop__user-links">
        <ul className="home-menuDesktop__user-list">
          <li className="home-menuDesktop__user-item">
            <Link to="/user/dashboard">Mes informations</Link>
          </li>
          <li className="home-menuDesktop__user-item">
            <Link to="/user/dashboard/articles">Mes annonces</Link>
          </li>
          <li className="home-menuDesktop__user-item">
            <Link to="/user/dashboard/transactions">Mes transactions</Link>
          </li>
        </ul>
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

export default UserMenuDesktop;
