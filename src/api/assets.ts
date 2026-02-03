import { API_URL } from "../config/constants";
import type { Asset, AssetsQueryParams } from "../types/api/assets";

async function fetchAssets(params: AssetsQueryParams = {}): Promise<Asset[]> {
  const { limit = 10, offset = 0 } = params;
  const page = Math.floor(offset / limit) + 1;

  const res = await fetch(`${API_URL}?vs_currency=usd&per_page=${limit}&page=${page}`);

  if (!res.ok) throw new Error("Failed to fetch assets");

  const data: Asset[] = await res.json();
  return data;
}

export { fetchAssets };
