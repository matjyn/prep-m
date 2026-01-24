import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "../api/assets";

export function useQueryAssets(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ["assets", limit, offset],
    queryFn: () => fetchAssets(limit, offset),
    staleTime: 5 * 60 * 1000,
  });
}
