export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const STORE_PRODUCTS = 'STORE_PRODUCTS';

export function clearProducts(payload) {
  return {
    type: CLEAR_PRODUCTS,
    payload
  };
}

export const createProducts = payload => {
  return {
    type: STORE_PRODUCTS,
    payload
  };
}