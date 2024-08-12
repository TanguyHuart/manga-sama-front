import Footer from '../../components/Footer/Footer';
import Page from '../../components/Page/Page';
import './Contacts.scss';

function Contact() {
  return (
    <Page>
      <div className="contactus__page">
        <h1 className="contactus__page-title">Pour nous contacter!</h1>

        <p className="contactus__page-content">
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

export default Contact;
