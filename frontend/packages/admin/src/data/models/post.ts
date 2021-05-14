import { ICategory } from "./category";
import Model from "./model";
import { POST_API_ENDPOINT } from "../../config";

export interface IPost {
  id?: string;
  title: string;
  slug?: string;
  summary?: string;
  body?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  categories: ICategory[] | string[];
  shortDescription?: string;
  thumbnail?: string;
}

export class Post extends Model {}

export type PostModelType = typeof Post;

Post.initial({ endpoint: POST_API_ENDPOINT });
