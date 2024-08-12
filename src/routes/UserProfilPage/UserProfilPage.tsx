/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import MobileNav from '../../components/MobileNav/MobileNav';
import Page from '../../components/Page/Page';
import './UserProfilPage.scss';
import Footer from '../../components/Footer/Footer';
import { LocalStorage } from '../../utils/LocalStorage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  modifyInputUserInfo,
  modifyUser,
  resetForm,
} from '../../store/reducers/userModify';
import HeaderBottom from '../../components/HeaderBottom/HeaderBottom';
import { setError } from '../../store/reducers/loading';

function UserProfilPage() {
  const dispatch = useAppDispatch();

  // Gestion de l'apparition des différents étatt des formulaire de moifiacations via UseState
  const [pseudoInputIsVisible, setPseudoInputIsVisible] = useState(false);
  const [firstNameInputIsVisible, setFirstNameInputIsVisible] = useState(false);
  const [lastNameInputIsVisible, setLastNameInputIsVisible] = useState(false);
  const [adressInputIsVisible, setAdressInputIsVisible] = useState(false);
  const [cityInputIsVisible, setCityInputIsVisible] = useState(false);
  const [zipCodeInputIsVisible, setZipCodeInputIsVisible] = useState(false);
  const [phoneNumberInputIsVisible, setPhoneNumberInputIsVisible] =
    useState(false);

  // Récupération des valeurs des inputs contrôlés via le store redux
  const firstNameInput = useAppSelector(
    (state) => state.userModify.credentials.firstname
  );
  const lastNameInput = useAppSelector(
    (state) => state.userModify.credentials.lastname
  );
  const pseudoInput = useAppSelector(
    (state) => state.userModify.credentials.pseudo
  );
  const adressInput = useAppSelector(
    (state) => state.userModify.credentials.address
  );
  const cityInput = useAppSelector(
    (state) => state.userModify.credentials.city
  );
  const zipcodeInput = useAppSelector(
    (state) => state.userModify.credentials.zip_code
  );
  const phoneNumberInput = useAppSelector(
    (state) => state.userModify.credentials.phone_number
  );

  const user = LocalStorage.getItem('user');

  // au changement de l'input dispatch la fonction qui permet de modifier les infos dans le state, il faut préciser le nom de l'input qui est train d'être modifié en argument
  const handleChangeInputUserInfo = (
    event: ChangeEvent<HTMLInputElement>,
    name:
      | 'firstname'
      | 'lastname'
      | 'pseudo'
      | 'address'
      | 'city'
      | 'zip_code'
      | 'phone_number'
  ): void => {
    dispatch(
      modifyInputUserInfo({
        fieldName: name,
        value: event.target.value,
      })
    );
  };

  //  A la soumission du formulaire , on créer un objet qui sera envoyé dans le body de la requête , correspondant aux attente de la base de donnée.
  const handleValidateUserInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const regex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
    if (
      (pseudoInput && !regex.exec(pseudoInput)) ||
      (firstNameInput && regex.exec(firstNameInput)) ||
      (lastNameInput && !regex.exec(lastNameInput))
    ) {
      dispatch(
        setError(
          'Le prénom , nom et pseudo ne peuvent pas contenir de caractère spéciaux'
        )
      );
      return;
    }

    const modifiedUser = {
      firstname: firstNameInput === '' ? user.firstname : firstNameInput,
      lastname: lastNameInput === '' ? user.lastname : lastNameInput,
      pseudo: pseudoInput === '' ? user.pseudo : pseudoInput,
      address: adressInput === '' ? user.address : adressInput,
      birthdate: user.birthdate,
      zip_code: zipcodeInput === '' ? user.zip_code : zipcodeInput,
      city: cityInput === '' ? user.city : cityInput,
      phone_number:
        phoneNumberInput === '' ? user.phone_number : phoneNumberInput,
    };

    await dispatch(
      modifyUser({
        userCredentials: modifiedUser,
        id: user.id.toString(),
      })
    );
    window.location.reload();
  };

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <Page>
      <HeaderBottom />
      <div className="userpage">
        <div className="userpage__picture">
          <img
            src="/assets/logo/logo.png"
            alt="user"
            className="userpage__picture-user"
          />
          <Link to="/">
            <p className="userpage__picture-modify">
              Changer la photo de profil
            </p>
          </Link>
        </div>
        <div className="userpage__infos">
          <form
            onSubmit={handleValidateUserInfo}
            className="userpage__infos-form"
          >
            <h3 className="userpage__infos-title">Mes informations</h3>
            <p>Cliquez sur un champ pour le modifier</p>
            <div className="userpage__infos-area">
              <ul className="userpage__infos-list">
                {/* Pour chaque item du formulaire , il y a un bouton et un input qui se cotoie , le bouton est d'abord visible , puis si on clique dessus , c'est l'input qui devient visible et on peut changer sa valeur */}
                {/* De base , si la valeur du champs n'est pas vide en base de donnée , on récupère les information via le localStorage */}
                <li className="userpage__infos-item">
                  <p>Pseudo:</p>
                  <button
                    type="button"
                    className={clsx('userpage__infos-content', {
                      'userpage__infos-content--hidden': pseudoInputIsVisible,
                    })}
                    onClick={() => {
                      setPseudoInputIsVisible(true);
                    }}
                  >
                    {LocalStorage.getItem('user').pseudo}
                  </button>
                  <input
                    value={pseudoInput}
                    onChange={(event) => {
                      handleChangeInputUserInfo(event, 'pseudo');
                    }}
                    type="text"
                    className={clsx('userpage__infos-input', {
                      'userpage__infos-input--hidden': !pseudoInputIsVisible,
                    })}
                  />
                </li>
                <li className="userpage__infos-item">
                  <p>Prénom:</p>
                  <button
                    type="button"
                    className={clsx('userpage__infos-content', {
                      'userpage__infos-content--hidden':
                        firstNameInputIsVisible,
                    })}
                    onClick={() => {
                      setFirstNameInputIsVisible(true);
                    }}
                  >
                    {LocalStorage.getItem('user').firstname}
                  </button>
                  <input
                    value={firstNameInput}
                    onChange={(event) => {
                      handleChangeInputUserInfo(event, 'firstname');
                    }}
                    type="text"
                    className={clsx('userpage__infos-input', {
                      'userpage__infos-input--hidden': !firstNameInputIsVisible,
                    })}
                  />
                </li>
                <li className="userpage__infos-item">
                  <p>Nom de famille:</p>
                  <button
                    type="button"
                    className={clsx('userpage__infos-content', {
                      'userpage__infos-content--hidden': lastNameInputIsVisible,
                    })}
                    onClick={() => {
                      setLastNameInputIsVisible(true);
                    }}
                  >
                    {LocalStorage.getItem('user').lastname}
                  </button>
                  <input
                    value={lastNameInput}
                    onChange={(event) => {
                      handleChangeInputUserInfo(event, 'lastname');
                    }}
                    type="text"
                    className={clsx('userpage__infos-input', {
                      'userpage__infos-input--hidden': !lastNameInputIsVisible,
                    })}
                  />
                </li>
                <li className="userpage__infos-item">
                  <p>Adresse:</p>
                  <button
                    type="button"
                    className={clsx('userpage__infos-content', {
                      'userpage__infos-content--hidden': adressInputIsVisible,
                    })}
                    onClick={() => {
                      setAdressInputIsVisible(true);
                    }}
                  >
                    {LocalStorage.getItem('user').address}
                  </button>
                  <input
                    value={adressInput}
                    onChange={(event) => {
                      handleChangeInputUserInfo(event, 'address');
                    }}
                    type="text"
                    className={clsx('userpage__infos-input', {
                      'userpage__infos-input--hidden': !adressInputIsVisible,
                    })}
                  />
                </li>
                <li className="userpage__infos-item">
                  <p>Ville:</p>
                  <button
                    type="button"
                    className={clsx('userpage__infos-content', {
                      'userpage__infos-content--hidden': cityInputIsVisible,
                    })}
                    onClick={() => {
                      setCityInputIsVisible(true);
                    }}
                    onKeyDown={() => {
                      setPseudoInputIsVisible(true);
                    }}
                  >
                    {LocalStorage.getItem('user').city}
                  </button>
                  <input
                    value={cityInput}
                    onChange={(event) => {
                      handleChangeInputUserInfo(event, 'city');
                    }}
                    type="text"
                    className={clsx('userpage__infos-input', {
                      'userpage__infos-input--hidden': !cityInputIsVisible,
                    })}
                  />
                </li>
                <li className="userpage__infos-item">
                  <p>Code postal:</p>
                  <button
                    type="button"
                    className={clsx('userpage__infos-content', {
                      'userpage__infos-content--hidden': zipCodeInputIsVisible,
                    })}
                    onClick={() => {
                      setZipCodeInputIsVisible(true);
                    }}
                  >
                    {LocalStorage.getItem('user').zip_code}
                  </button>
                  <input
                    value={zipcodeInput}
                    onChange={(event) => {
                      handleChangeInputUserInfo(event, 'zip_code');
                    }}
                    type="text"
                    className={clsx('userpage__infos-input', {
                      'userpage__infos-input--hidden': !zipCodeInputIsVisible,
                    })}
                  />
                </li>
                <li className="userpage__infos-item">
                  <p>Numéro de téléphone:</p>
                  <button
                    type="button"
                    className={clsx('userpage__infos-content', {
                      'userpage__infos-content--hidden':
                        phoneNumberInputIsVisible,
                    })}
                    onClick={() => {
                      setPhoneNumberInputIsVisible(true);
                    }}
                  >
                    {LocalStorage.getItem('user').phone_number}
                  </button>
                  <input
                    value={phoneNumberInput}
                    onChange={(event) => {
                      handleChangeInputUserInfo(event, 'phone_number');
                    }}
                    type="tel"
                    className={clsx('userpage__infos-input', {
                      'userpage__infos-input--hidden':
                        !phoneNumberInputIsVisible,
                    })}
                  />
                </li>
              </ul>
              <div className="userpage__infos-footer">
                <button type="submit" className="userpage__infos-button">
                  Modifier
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <MobileNav />
      <Footer />
    </Page>
  );
}

export default UserProfilPage;
