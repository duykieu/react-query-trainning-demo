import { useQuery, useQueryClient } from "react-query";
import React from "react";
import { BaseError, IBaseResponse } from "../models/model";
import { DEFAULT_PAGE_SIZE } from "../../config";

export interface IPaging {
  limit: number;
  offset: number;
}

interface IBasePaginationQuery<T, E> {
  params: Partial<IPaging>;
  queryKey: string;
  fetchFn(params: Partial<IPaging>): Promise<IBaseResponse<T>>;
}

/**
 * Base pagination query hook
 * @param params
 * @param queryKey
 * @param fetchFn
 */
export function useBasePaginationQuery<T>({
  params,
  queryKey,
  fetchFn,
}: IBasePaginationQuery<T, BaseError>) {
  /**
   * Query client for prefetch next page
   */
  const queryClient = useQueryClient();

  /**
   * Our main query
   */
  const query = useQuery<IBaseResponse<T>, BaseError>({
    queryKey: [queryKey, params],
    queryFn() {
      return fetchFn(params);
    },
    keepPreviousData: true,
  });

  /**
   * Build next page params
   */

  const nextFetchParams = {
    ...params,
    offset: (params.limit || 0) + (params.offset || DEFAULT_PAGE_SIZE),
  };

  /**
   * Fetch next page data
   */
  React.useEffect(() => {
    if (query.data && query.data.next) {
      queryClient.prefetchQuery([queryKey, nextFetchParams], function () {
        return fetchFn(nextFetchParams);
      });
    }
  }, [query.data, queryClient, nextFetchParams]);

  return query;
}
