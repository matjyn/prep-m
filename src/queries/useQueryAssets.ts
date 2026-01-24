import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "../api/assets";

export function useQueryAssets(
  limit = 10,
  offset = 0,
  sortBy?: string | null,
  sortOrder?: "asc" | "desc",
) {
  return useQuery({
    queryKey: ["assets", limit, offset, sortBy, sortOrder],
    queryFn: () => fetchAssets(limit, offset, sortBy ?? undefined, sortOrder),
    staleTime: 5 * 60 * 1000,
  });
}
