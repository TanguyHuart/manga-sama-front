import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileNav from '../MobileNav/MobileNav';

import articleData from '../../data/data';

function App() {
  console.log(articleData);

  return (
    <div>
      <Header />
      <Footer />
      <MobileNav />
    </div>
  );
}

export default App;
