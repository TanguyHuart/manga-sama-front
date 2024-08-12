/* eslint-disable import/prefer-default-export */
import { Article } from '../../@types';

export function findArticle(articles: Article[], searchedId: number) {
  const article = articles.find((testedArticle) => {
    return testedArticle.article.id === searchedId;
  });
  return article;
}

export function findArticleByUserId(articles: Article[], searchId: number) {
  const article = articles.find((testedArticle) => {
    return testedArticle.user.id === searchId;
  });
  return article;
}
