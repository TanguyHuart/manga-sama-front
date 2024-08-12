/* eslint-disable react/no-unescaped-entities */
import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';
import './CreateArticle.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeISBNFormIsVisible,
  resetMangaState,
} from '../../store/reducers/manga';
import ISBNFormModal from '../../components/ISBNFormModal/ISBNFormModal';
import {
  associateMangaToArticle,
  associateUserToArticle,
  changeCreateArticleConditionValue,
  changeCreateArticleInputValue,
  createArticleFetch,
} from '../../store/reducers/createArticle';

import { LocalStorage } from '../../utils/LocalStorage';
import { setError } from '../../store/reducers/loading';
import Carousel from '../../components/Carousel/Carousel';

function CreateArticle() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Au début de notre composant on récupère toutes les donées du store qui vont être utlisé dans notre composant.
  const ISBNModal = useAppSelector((state) => state.manga.ISBNFormIsVisible);
  const mangas = useAppSelector((state) => state.manga.manga);
  const arrayURL = useAppSelector((state) => state.manga.arrayURL);
  const articleTitleInputValue = useAppSelector(
    (state) => state.createArticle.credentials.article_title
  );
  const articlePriceInputValue = useAppSelector(
    (state) => state.createArticle.credentials.article_price
  );
  const articleDescriptionInputValue = useAppSelector(
    (state) => state.createArticle.credentials.article_description
  );
  const conditionsList = useAppSelector(
    (state) => state.article.list_condition
  );
  const articleCondition = useAppSelector(
    (state) => state.createArticle.article_condition
  );

  const user = LocalStorage.getItem('user');
  // Fonction qui permet de changer l'état de la modale pour ajouter un manga a l'article
  function handleClickAddMangaToArticle() {
    dispatch(changeISBNFormIsVisible());
  }

  // Fonction qui permet de changer les valeurs des inputs controlés dans le store sur l'évènement onChange
  const handleChangeInputField = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    name: 'article_title' | 'article_price' | 'article_description'
  ) => {
    dispatch(
      changeCreateArticleInputValue({
        value: event.target.value,
        fieldName: name,
      })
    );
  };

  // Au premier chargement du composant createArticle , on reset la valeur des mangas stockés dans le store, celui des inputs des formulaires
  useEffect(() => {
    dispatch(resetMangaState());
    dispatch(
      changeCreateArticleInputValue({
        fieldName: 'article_description',
        value: '',
      })
    );
    dispatch(
      changeCreateArticleInputValue({
        fieldName: 'article_price',
        value: '',
      })
    );
    dispatch(
      changeCreateArticleInputValue({
        fieldName: 'article_title',
        value: '',
      })
    );
  }, [dispatch]);

  // Si l'utilisateur n'est pas connecté lors du click sur le bouton pour acceder à la page de creation d'article , ça le redirige vers la page de connexion avec un message d'erreur lui demandant de se connecter
  if (!user) {
    dispatch(
      setError(
        "La création d'un article nécessite la connexion à un compte Utilisateur !"
      )
    );
    return <Navigate to="/login" />;
  }

  // Fonction qui permet de changer la valeur dans le store de article_condition
  const handleChangeConditionArticle = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(changeCreateArticleConditionValue(event.target.value));
  };

  // Fonction qui gère la soumission du formulaire de creation d'article
  const handleSubmitCreateArticleForm = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // A la soumission du formulaire , je crée un objet qui contiens les différentes information que l'API back a besoin pour ajouter un article dans la base de donnée
    const newArticle = {
      title: articleTitleInputValue,
      description: articleDescriptionInputValue,
      price: parseInt(articlePriceInputValue, 10),
      transaction_id: null,
      date_transaction: null,
      state_transaction: null,
      image_url: mangas[0].cover_url,
      condition_id: parseInt(articleCondition, 10),
    };

    try {
      // ensuite , je fais un appel a API en post pour donner l'objet afin que l'API crée l'article.
      const createdArticle = await dispatch(createArticleFetch(newArticle));

      // si l'API crée l'article , elle me renvoie l'article qui vient d'etre crée dans le base de donnée
      if (createdArticle) {
        // ce qui me permet de lancer une boucle : pour chaque manga qui ont été ajouté a l'article , je fait une requete pour associer le manga a l'article dans la BDD
        mangas.forEach(async (manga) => {
          await dispatch(
            associateMangaToArticle({
              article_id: createdArticle.payload.article.id,
              isbn: manga.code_isbn,
            })
          );
        });
        // Je fais enfin une derniere requete pour associer l'utilisateur à son article dans la BDD
        await dispatch(
          associateUserToArticle({
            user_id: LocalStorage.getItem('user').id,
            article_id: createdArticle.payload.article.id,
          })
        );
        // puis je suis redirigé vers la home page
        window.location.assign('/');
      }
    } catch {
      navigate('/');
      throw new Error('Probleme lors de la fonction asynchrone');
    }
  };

  return (
    <Page>
      <h2 className="CreateArticle__title">Créer une nouvelle annonce</h2>

      <div className="CreateArticle__container">
        <div className="CreateArticle__container_left">
          {mangas.length > 1 && <Carousel images={arrayURL} />}
          {mangas.length === 1 && (
            <img src={mangas[0]?.cover_url} alt="manga" />
          )}
        </div>
        <div className="CreateArticle__container_right">
          <form
            className="CreateArticle__form"
            onSubmit={handleSubmitCreateArticleForm}
          >
            <label htmlFor="title" className="CreateArticle__form_label">
              Titre de l'annonce :
            </label>
            <input
              className="CreateArticle__form_input"
              type="text"
              id="title"
              onChange={(event) => {
                handleChangeInputField(event, 'article_title');
              }}
              value={articleTitleInputValue}
              required
            />
            <button
              className="CreateArticle__form-addMangaButton"
              onClick={handleClickAddMangaToArticle}
              type="button"
            >
              Ajouter un manga
            </button>

            <h3 className="CreateArticle__form_label">
              Manga(s) lié(s) à l'annonce
            </h3>
            <table>
              <tbody>
                {mangas.map((manga) => (
                  <tr key={manga.code_isbn}>
                    <td
                      className="CreateArticle__form-mangaListItem"
                      key={manga.title}
                    >
                      {manga.title}
                    </td>
                    <td className="CreateArticle__form-mangaListItem">
                      Volume : {manga.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <label htmlFor="price" className="CreateArticle__form_label">
              Prix :
            </label>
            <input
              className="CreateArticle__form_input"
              type="text"
              id="price"
              required
              onChange={(event) => {
                handleChangeInputField(event, 'article_price');
              }}
              value={articlePriceInputValue}
            />

            <label htmlFor="description" className="CreateArticle__form_label">
              Description de l'article :
            </label>
            <textarea
              className="CreateArticle__form_input"
              id="description"
              required
              onChange={(event) => {
                handleChangeInputField(event, 'article_description');
              }}
              value={articleDescriptionInputValue}
            />

            <label htmlFor="condition" className="CreateArticle__form_label">
              État de l'article :
            </label>
            <select
              className="CreateArticle__form_input"
              id="condition"
              required
              onChange={handleChangeConditionArticle}
            >
              <option disabled value="0">
                Sélectionnez l'état
              </option>
              {conditionsList.map((condition) => (
                <option key={condition.id} value={condition.id}>
                  {condition.condition_name}
                </option>
              ))}
            </select>

            <button className="CreateArticle__form_btn" type="submit">
              Publier mon annonce <img src="assets\icons\add.png" alt="logo" />
            </button>
          </form>
        </div>
      </div>

      {ISBNModal && <ISBNFormModal />}

      <Footer />
    </Page>
  );
}

export default CreateArticle;
