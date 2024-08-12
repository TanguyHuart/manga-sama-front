import { useState } from 'react';
import './MobileNav.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

function MobileNav() {
  const [clickedButton, setClickedButton] = useState(null);

  function handleClickedButton(buttonType: any) {
    setClickedButton(clickedButton === buttonType ? null : buttonType);
  }

  return (
    <div className="MobileNav">
      <NavLink to="/">
        <button
          className={clsx('MobileNav__element', {
            active: clickedButton === 'search',
          })}
          onClick={() => handleClickedButton('search')}
          type="button"
        >
          <img
            src={`/assets/icons/MobileNavHomeIcon${
              clickedButton === 'search' ? 'Red' : ''
            }.png`}
            className="MobileNav__icon"
            alt="/"
          />
          <p
            className={clsx('MobileNav__icon_title', {
              active: clickedButton === 'search',
            })}
          >
            Accueil
          </p>
        </button>
      </NavLink>

      <NavLink to="/createarticle">
        <button
          className={clsx('MobileNav__element', {
            active: clickedButton === 'publish',
          })}
          onClick={() => handleClickedButton('publish')}
          type="button"
        >
          <img
            src={`/assets/icons/MobileNavPublishIcon${
              clickedButton === 'publish' ? 'Red' : ''
            }.png`}
            className="MobileNav__icon"
            alt="/"
          />
          <p
            className={clsx('MobileNav__icon_title', {
              active: clickedButton === 'publish',
            })}
          >
            Publier
          </p>
        </button>
      </NavLink>

      <NavLink to="/user/dashboard">
        <button
          className={clsx('MobileNav__element', {
            active: clickedButton === 'account',
          })}
          onClick={() => handleClickedButton('account')}
          type="button"
        >
          <img
            src={`/assets/icons/MobileNavAccountIcon${
              clickedButton === 'account' ? 'Red' : ''
            }.png`}
            className="MobileNav__icon"
            alt="/"
          />
          <p
            className={clsx('MobileNav__icon_title', {
              active: clickedButton === 'account',
            })}
          >
            Mon compte
          </p>
        </button>
      </NavLink>
    </div>
  );
}

export default MobileNav;
