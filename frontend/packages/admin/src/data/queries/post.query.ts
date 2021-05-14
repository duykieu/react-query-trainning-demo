import { POST_QUERY_KEY } from "../../config";
import { IPost, Post } from "../models/post";
import { BaseError, IBaseResponse } from "../models/model";
import { useBasePaginationQuery } from "./pagination.base.query";

export function usePostQuery(params) {
  return useBasePaginationQuery<IPost>({
    params,
    queryKey: POST_QUERY_KEY,
    fetchFn(params) {
      return Post.find<IBaseResponse<IPost>>(params);
    },
  });
}
