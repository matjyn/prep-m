import type { Asset } from "../types/api/assets";

async function fetchAssets(
  limit = 10,
  offset = 0,
  sortBy?: string | null,
  sortOrder?: "asc" | "desc",
): Promise<Asset[]> {
  const page = Math.floor(offset / limit) + 1;
  let order = "market_cap_desc";
  if (sortBy && sortOrder) {
    if (sortBy === "name") {
      order = sortOrder === "asc" ? "id_asc" : "id_desc";
    } else if (sortBy === "price") {
      order = sortOrder === "asc" ? "price_asc" : "price_desc";
    }
  }
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${order}&per_page=${limit}&page=${page}`,
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
