import './Category.scss';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useAppSelector } from '../../hooks/redux';
import HeaderBottom from '../../components/HeaderBottom/HeaderBottom';

function Category() {
  const articles = useAppSelector((state) => state.article.filteredArticles);
  const categories = useAppSelector(
    (state) => state.categories.list_categories
  );

  const { id } = useParams();

  if (!id) {
    throw new Error("Id manquant dans l'url");
  }
  const findedCategory = categories.find(
    (category) => category.id === parseInt(id, 10)
  );
  const filteredArticles = articles.filter(
    (article) => article.mangas[0].category_id === parseInt(id, 10)
  );

  return (
    <div className="category">
      <HeaderBottom />
      <div className="category__articles">
        <div className="category__articles-title-area">
          <h2 className="category__articles-title">
            {`Les dernières annonces de ${findedCategory?.category_name}`}
            <span>
              <img
                src="/assets/icons/register-icon.png"
                alt="icon"
                className="category__articles-title-icon"
              />
            </span>
          </h2>
        </div>
        <div className="category__articles-area">
          {filteredArticles.length === 0 && (
            <p className="category__articles-noarticles">
              Il n'y a pas d'article correspondant à cette catégorie en vente !
            </p>
          )}
          <ul className="category__articles-list">
            {filteredArticles.map((article) => (
              <Link
                to={`/article/${article.article.id}`}
                key={article.article.id}
              >
                <li className="category__articles-item">
                  <img
                    src={article.mangas[0].cover_url}
                    alt="/"
                    className="category__articles-item-image"
                  />
                  <div className="category__articles-info">
                    <h3 className="category__articles-info-title">
                      {article.article.title}
                    </h3>
                    {/* <p className="category__articles-info-tome">
                      Tome {article.mangas[0].volume}
                    </p> */}
                    <p className="category__articles-info-price">
                      {article.article.price} €
                    </p>
                    {/* <p className="category__articles-info-localisation">
                      {article.user.city}
                    </p> */}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Category;
