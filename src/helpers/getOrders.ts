export function getOrder(sortBy?: string | null, sortOrder?: "asc" | "desc"): string {
  if (!sortBy || !sortOrder) return "market_cap_desc";

  if (sortBy === "name") {
    return sortOrder === "asc" ? "id_asc" : "id_desc";
  } else if (sortBy === "price") {
    return sortOrder === "asc" ? "price_asc" : "price_desc";
  }

  return "market_cap_desc";
}
