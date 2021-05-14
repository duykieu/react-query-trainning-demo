import Model from "./model";
import { IPost } from "./post";
import { CATEGORY_API_ENDPOINT } from "../../config";

export interface ICategory {
  id?: string;
  name: string;
  description?: string;
  slug?: string;
  children?: ICategory[];
  posts?: IPost[] | string[];
}

export class Category extends Model {}

Category.initial({ endpoint: CATEGORY_API_ENDPOINT });
