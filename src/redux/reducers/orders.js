import { CLEAR_ORDERS, CREARE_ORDER } from '../actions/orders';

const reducer = (state = [], {type, payload}) => {

  switch (type) {

    case CLEAR_ORDERS: {
      state = [];
      return state;
    }

    case CREARE_ORDER: {
      const orders = [
        ...state,
        payload
      ];
      return orders;
    }

    default: return state;

  }

}

export default reducer;