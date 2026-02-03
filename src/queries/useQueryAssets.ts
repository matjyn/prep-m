import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAssets } from "../api/assets";
import type { AssetsQueryParams } from "../types/api/assets";

export function useQueryAssets(params: AssetsQueryParams = {}) {
  const { limit = 10 } = params;

  return useInfiniteQuery({
    queryKey: ["assets", limit],
    queryFn: ({ pageParam = 0 }) => fetchAssets({ limit, offset: pageParam * limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === limit ? allPages.length : undefined,
    staleTime: 5 * 60 * 1000,
  });
}
