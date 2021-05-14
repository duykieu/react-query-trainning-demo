import Model from "./model";
import { PAGE_API_ENDPOINT } from "../../config";

export interface IPage {
  id?: string;
  name: string;
  slug?: string;
  summary?: string;
  body?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export class Page extends Model {}

Page.initial({ endpoint: PAGE_API_ENDPOINT });
