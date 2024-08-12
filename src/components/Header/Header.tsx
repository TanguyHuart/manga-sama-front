import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeUserisConnected } from '../../store/reducers/loginForm';
import { LocalStorage } from '../../utils/LocalStorage';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Message from '../Message/Message';

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userIsConnected = useAppSelector(
    (state) => state.loginForm.userIsConnected
  );
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const errorMessage = useAppSelector((state) => state.loading.errorMessage);
  const infoMessage = useAppSelector((state) => state.loading.infoMessage);

  function handleDisconnect() {
    dispatch(changeUserisConnected(false));
    LocalStorage.removeItem('user');
    LocalStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="header">
      {isLoading && <Loader />}
      {errorMessage && <ErrorMessage errorContent={errorMessage} />}
      {infoMessage && <Message messageContent={infoMessage} />}
      <div className="header__top_container">
        <div className="header__top_container-button" />
        <Link to="/">
          <img
            src="/assets/logo/logo.png"
            alt="logo-manga-sama"
            className="header__logo"
          />
        </Link>
        {!userIsConnected && (
          <div className="header__top_container-links">
            <div className="header__top_container-links-signup">
              <Link to="signup" className="header__top_container-signup">
                Inscription
                <img src="/assets/icons/register-icon.png" alt="signup-logo" />
              </Link>
            </div>
            <div className="header__top_container-links-login">
              <Link to="login" className="header__top_container-login">
                Connexion
                <img src="/assets/icons/user-icon.png" alt="login-logo" />
              </Link>
            </div>
          </div>
        )}
        {userIsConnected && (
          <div className="header__top_connected">
            <div className="header__top_connected-welcome">
              Bienvenue
              <div className="header__top_connected-nickname">
                {LocalStorage.getItem('user').pseudo}-sama
              </div>
            </div>

            <div className="header__top_container-links">
              <div className="header__top_container-links-signup">
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="header__top_container-signup"
                >
                  Se déconnecter
                  <img
                    src="/assets/icons/register-icon.png"
                    alt="signup-logo"
                  />
                </button>
              </div>
              <div className="header__top_container-links-login">
                <Link
                  to="/user/dashboard"
                  className="header__top_container-login"
                >
                  Page de Profil
                  <img src="/assets/icons/user-icon.png" alt="login-logo" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
