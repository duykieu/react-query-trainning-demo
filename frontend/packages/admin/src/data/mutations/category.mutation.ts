import { Category, ICategory } from "../models/category";
import { useBaseMutation } from "./mutation.base";

export function useCategoryMutation() {
  return useBaseMutation<ICategory, typeof Category>({ model: Category });
}
