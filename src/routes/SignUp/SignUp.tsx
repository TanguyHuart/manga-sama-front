/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeSignUpFormInputFields,
  createUser,
  findUser,
  resetForm,
} from '../../store/reducers/signUpForm';
import './SignUp.scss';
import { setError } from '../../store/reducers/loading';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pseudoInputValue = useAppSelector(
    (state) => state.signUpForm.credentials.pseudo
  );
  const emailInputValue = useAppSelector(
    (state) => state.signUpForm.credentials.email
  );
  const passwordInputValue = useAppSelector(
    (state) => state.signUpForm.credentials.password
  );
  const passwordBisInputValue = useAppSelector(
    (state) => state.signUpForm.credentials.password_bis
  );
  const loadingPseudo = useAppSelector(
    (state) => state.signUpForm.loadingPseudo
  );
  const pseudoNotDisp = useAppSelector(
    (state) => state.signUpForm.pseudoNotDisp
  );
  const [timer, setTimer] = useState<number | null>(null);

  const handleChangeInputValue = (
    event: ChangeEvent<HTMLInputElement>,
    name: 'email' | 'password' | 'pseudo' | 'password_bis'
  ) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    dispatch(
      changeSignUpFormInputFields({
        fieldName: name,
        value: event.target.value,
      })
    );

    if (name === 'pseudo' && pseudoInputValue) {
      const newTimer = setTimeout(() => {
        dispatch(findUser());
        setTimer(null);
      }, 3000);
      setTimer(newTimer);
    }
  };

  const handleSubmitSignUpForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pseudoRegex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
    const pseudoOk = pseudoRegex.exec(pseudoInputValue);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]+$/;
    const passwordOk = passwordRegex.exec(passwordInputValue);

    if (
      !pseudoInputValue ||
      !emailInputValue ||
      !passwordBisInputValue ||
      !passwordInputValue
    ) {
      dispatch(
        setError(
          "Un ou plusieurs champ sont manquants pour valdier l'inscription"
        )
      );
      return;
    }

    if (!pseudoOk) {
      dispatch(
        setError('le pseudo ne peut pas contenir de caractères spéciaux ')
      );
    }

    if (pseudoNotDisp) {
      dispatch(setError('Ce pseudo est déjà pris !'));
      return;
    }

    if (!passwordOk) {
      dispatch(
        setError(
          'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial parmi !@#$%^&*'
        )
      );
      return;
    }

    if (passwordInputValue === passwordBisInputValue) {
      await dispatch(
        createUser({
          pseudo: pseudoInputValue,
          email: emailInputValue,
          password: passwordInputValue,
          passwordConfirmation: passwordBisInputValue,
        })
      );
      navigate('/login');
    } else {
      dispatch(
        setError('Le mot de passe et sa confirmation ne sont pas identiques')
      );
    }
  };

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <Page>
      <div className="signUp">
        <div className="signUp__logo-container">
          <img
            className="signUp__logo"
            src="assets/logo/poulpesignup.png"
            alt="logo-Manga-Sama"
          />
        </div>
        <div className="signUp__area">
          <h2 className="signUp__area-title">Création de compte</h2>
          <div className="signUp__area-fields">
            <form
              action="/"
              method="post"
              className="signUp__area-form"
              onSubmit={handleSubmitSignUpForm}
            >
              <ul className="signUp__area-lists">
                <li className="signUp__area-item">
                  <div className="signUp__area-item--pseudo">
                    <input
                      value={pseudoInputValue}
                      type="text"
                      placeholder="Nom d'utilisateur"
                      onChange={(event) =>
                        handleChangeInputValue(event, 'pseudo')
                      }
                      required
                      autoComplete="username"
                    />
                    {loadingPseudo && (
                      <img
                        className="signUp__area-item--loader"
                        src="assets/icons/loading.png"
                        alt="loader"
                      />
                    )}
                  </div>

                  {pseudoNotDisp && (
                    <p className="signUp__area-item--error">
                      Le pseudo n'est pas disponible !
                    </p>
                  )}
                </li>
                <li className="signUp__area-item signUp__area-item--email">
                  <input
                    value={emailInputValue}
                    type="email"
                    placeholder="E-mail"
                    onChange={(event) => handleChangeInputValue(event, 'email')}
                    required
                    autoComplete="email"
                  />
                </li>
                <li className="signUp__area-item">
                  <input
                    id="password"
                    value={passwordInputValue}
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(event) =>
                      handleChangeInputValue(event, 'password')
                    }
                    autoComplete="current-password"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="signUp__area-item--label"
                  >
                    Doit contenir au moins 1 Majuscule, 1 minuscule, 1 caractère
                    spécial et 1 chiffre
                  </label>
                </li>
                <li className="signUp__area-item">
                  <input
                    value={passwordBisInputValue}
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    onChange={(event) =>
                      handleChangeInputValue(event, 'password_bis')
                    }
                    autoComplete="current-password"
                    required
                  />
                </li>
                <li className="signUp__area-item">
                  <div className="signUp__area-item--pseudo">
                    <input type="checkbox" id="checkbox" required />
                    <label htmlFor="checkbox">
                      J'ai lu les
                      <Link className="signUp__area-item--link" to={'/'}>
                        {' '}
                        CGV
                      </Link>
                      , les{' '}
                      <Link
                        className="signUp__area-item--link"
                        to={'/copyright'}
                      >
                        {' '}
                        mentions légales
                      </Link>{' '}
                      et la{' '}
                      <Link className="signUp__area-item--link" to={'/'}>
                        {' '}
                        politique de confidentialité
                      </Link>
                    </label>
                  </div>
                </li>
              </ul>
              <button type="submit" className="signUp__area-button">
                Valider
                <img
                  src="assets/icons/CheckMarkIcon.png"
                  alt="check-button-icon"
                  className="signUp__area-button-icon"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Page>
  );
}

export default SignUp;
