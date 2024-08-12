export type Article = {
  article: TArticle;
  mangas: TManga[];
  user: TUserArticle;
};

export type TCategory = {
  id: number;
  category_name: string;
  created_at: string;
  updated_at: null | string;
};

export type TManga = {
  code_isbn: number;
  title: string;
  volume: number;
  year_publication: number;
  author: string;
  description: string | undefined;
  cover_url: string;
  category_id: number;
  create_at: string;
  updated_at: string;
};
export type TCondition = {
  id: number;
  condition_name: string;
  created_at: string;
  updated_at: null | string;
};

export type TArticle = {
  id: number;
  title: string;
  description: string;
  price: string;
  transaction_id: number | null;
  date_transaction: string | null;
  state_completion: string | null;
  photo_url: null | string;
  image_url: string;
  condition_id: number;
  created_at: string;
  updated_at: string | null;
};

export type TCreatedArticle = {
  id: number;
  title: string;
  description: string;
  price: number;
  transaction_id: null | number;
  date_transaction: null | string;
  state_transaction: null | string;
  image_url: string | undefined;
  condition_id: number;
};

export type TCreateArticleForm = {
  title: string;
  description: string;
  price: number;
  transaction_id: null | number;
  date_transaction: null | string;
  state_transaction: null | string;
  image_url: string | undefined;
  condition_id: number;
};

export type TUserArticle = {
  id: number;
  pseudo: string;
  city: string;
  created_at: string;
  updated_at: string;
};

export type TUserConnected = {
  id: number;
  firstName: string;
  lastname: string;
  pseudo: string;
  adress: string;
  zipCode: string;
  city: string;
  email: string;
  phoneNumber: string;
  created_at: string;
  updated_at: string;
};
