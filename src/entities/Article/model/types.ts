import { Author } from "@entities/User/model/types";

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList?: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticleProps {
  isDetailed: boolean;
  articleData: ArticleData;
}
