export const formatPrice = (price: number | undefined): string => {
  return price
    ? price.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
      })
    : "-";
};
