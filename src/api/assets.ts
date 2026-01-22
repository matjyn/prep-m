import type { Asset } from "../types/api/assets";

async function fetchAssets(limit = 10, offset = 0): Promise<Asset[]> {
  const page = Math.floor(offset / limit) + 1;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch assets");
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: item.current_price ?? 0,
    iconUrl: item.image ?? "",
  }));
}

export { fetchAssets };
