import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';
import './About.scss';

function About() {
  return (
    <Page>
      <div className="about">
        <h1 className="about__title">A propos de Manga Sama</h1>

        <p className="about__content">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
          aliquam numquam. Voluptatum, exercitationem ullam ipsum reiciendis
          nihil similique. Similique quas eveniet iure quaerat vel ducimus
          voluptates nobis! Eius explicabo voluptates accusamus molestias! Rem,
          nam quae. In, quos sunt maxime accusantium minus nulla officiis
          molestias nobis! Eius alias perferendis non sequi, porro optio
          perspiciatis a dolorem facilis ab, sed aperiam. Aperiam.
        </p>
      </div>
      <Footer />
    </Page>
  );
}

export default About;
