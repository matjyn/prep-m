export interface Asset {
  id: string;
  name: string;
  current_price: number;
  image: string;
}

export interface AssetsQueryParams {
  limit?: number;
  offset?: number;
  sortBy?: string | null;
  sortOrder?: "asc" | "desc";
}
