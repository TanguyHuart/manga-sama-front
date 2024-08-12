import clsx from 'clsx';
import './UserMenu.scss';
import { Link } from 'react-router-dom';
import '../Menu/Menu.scss';
import { useState } from 'react';

function UserMenu() {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  function handleOnMenuButton() {
    setMenuIsVisible(!menuIsVisible);
  }

  return (
    <div className="menu-mobile">
      <button
        onClick={handleOnMenuButton}
        type="button"
        className="home-menu__toggle-button"
      >
        <img
          className="home-menu__toggle-button--icon"
          src="/assets/icons/menuPink.png"
          alt="menu-burger"
        />
      </button>
      <div
        className={clsx('home-menu', { 'home-menu--hidden': !menuIsVisible })}
      >
        <div className="home-menu__container">
          <img className="home-menu__logo" src="/assets/logo/logo.png" alt="" />
        </div>
        <div className="home-menu__user-links">
          <ul className="home-menu__user-list">
            <li className="home-menu__user-item">
              <Link to="/user/dashboard">Mes informations</Link>
            </li>
            <li className="home-menu__user-item">
              <Link to="/user/dashboard/articles">Mes annonces</Link>
            </li>
            <li className="home-menu__user-item">
              <Link to="/user/dashboard/transactions">Mes transactions</Link>
            </li>
          </ul>
        </div>

        <div className="home-menu__socials">
          <a href="/" className="home-menu__socials-icon">
            <img src="/assets/icons/facebook.png" alt="facebook logo" />
          </a>
          <a href="/" className="home-menu__socials-icon">
            <img src="/assets/icons/instagram.png" alt="instagram logo" />
          </a>
          <a href="/" className="home-menu__socials-icon">
            <img src="/assets/icons/twitter.png" alt="x logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
