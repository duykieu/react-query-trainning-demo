import { PAGE_QUERY_KEY } from "../../config";
import { IPage, Page } from "../models/page";
import { BaseError, IBaseResponse } from "../models/model";
import { useBasePaginationQuery } from "./pagination.base.query";

export function usePageQuery(params) {
  return useBasePaginationQuery<IPage>({
    params,
    queryKey: PAGE_QUERY_KEY,
    fetchFn(params) {
      return Page.find<IBaseResponse<IPage>>(params);
    },
  });
}
