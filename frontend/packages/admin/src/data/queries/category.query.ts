import { useQuery } from "react-query";
import { CATEGORY_QUERY_KEY, SINGLE_CATEGORY_QUERY_KEY } from "../../config";
import { Category, ICategory } from "../models/category";
import { BaseError } from "../models/model";

export function useCategoryQuery() {
  const query = useQuery<ICategory[], BaseError>(
    CATEGORY_QUERY_KEY,
    function () {
      return Category.find<ICategory[]>({});
    }
  );

  return {
    ...query,
    get entries() {
      return this.data || [];
    },
  };
}

export function useSingleCategoryQuery(id: string, enable?: boolean) {
  return useQuery<ICategory | null, BaseError>(
    [SINGLE_CATEGORY_QUERY_KEY, id],
    function () {
      if (!enable) return null;
      return Category.findOne<ICategory>(id);
    }
  );
}
