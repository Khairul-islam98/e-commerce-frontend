export const discountPrice = (price: number, discount: number = 0) => {
  return Math.round(price - (price * discount) / 100);
};
