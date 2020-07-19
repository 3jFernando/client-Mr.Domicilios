export const CLEAR_ORDERS = 'CLEAR_ORDERS';
export const CREARE_ORDER = 'CREARE_ORDER';

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS,
  }
}

export const createOrder = payload => {
  return {
    type: CREARE_ORDER,
    payload: payload
  }
}