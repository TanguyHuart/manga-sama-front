/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';
import './LegalNotice.scss';

function LegalNotice() {
  return (
    <Page>
      <div className="legalNotice">
        <h1 className="legalNotice__title"> Mentions Légales</h1>
        <h2>1. Information Editoriales</h2>

        <p>Nom du site : Manga-Sama </p>
        <p>Propriétaire : Manga-Sama</p>
        <p> Contact : manga-sama@gmail.com </p>

        <h2>2. Hébergeur </h2>
        <p>Nom de l'hébergeur : Render</p>

        <p>
          Contact :{' '}
          <Link className="legalNotice__link" to="https://render.com/">
            https://render.com/
          </Link>
        </p>

        <h2>3. Conditions Générales de Vente : </h2>

        <p>
          Les conditions générales de vente définissent les modalités d'achat et
          de vente de mangas entre les utilisateurs du site. Elles sont
          accessibles{' '}
          <Link className="legalNotice__link" to="/cgv">
            {' '}
            ICI
          </Link>
          .
        </p>
        <h2>4. Politique de Confidentialité :</h2>
        <p>
          La politique de confidentialité explique comment les données
          personnelles des utilisateurs sont collectées, utilisées et protégées.
          Elle est disponible{' '}
          <Link className="legalNotice__link" to="/confidentiality">
            {' '}
            ICI
          </Link>
        </p>
        <h2>5. Propriété Intellectuelle :</h2>
        <p>
          Les contenus présents sur le site (textes, images, logos, etc.) sont
          la propriété exclusive du propriétaire du site ou font l'objet d'une
          autorisation d'utilisation
        </p>

        <h2>6. Responsabilité </h2>
        <p>
          Le propriétaire du site ne peut être tenu responsable des transactions
          entre les utilisateurs. Les utilisateurs sont encouragés à faire
          preuve de prudence et à respecter les lois en vigueur.
        </p>
        <h2>7. Contact </h2>
        <p>
          Les utilisateurs peuvent contacter le propriétaire du site via
          <p> manga-sama@gmail.com </p>
        </p>
        <h2>8. Modification des Mentions Légales </h2>
        <p>
          Le propriétaire se réserve le droit de modifier les présentes mentions
          légales à tout moment. Les utilisateurs sont invités à les consulter
          régulièrement
        </p>
      </div>
      <Footer />
    </Page>
  );
}

export default LegalNotice;
