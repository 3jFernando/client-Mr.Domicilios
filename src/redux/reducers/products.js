import {CLEAR_PRODUCTS, STORE_PRODUCTS} from '../actions/products';

const reducer = (state = [], {type, payload}) => {

  switch(type) {
    case CLEAR_PRODUCTS: {
      state = [];
      return state;
    }
    case STORE_PRODUCTS: {
      const products = [
        ...state,
        payload
      ];
      return products;
    }
    default: return state;
  }

}
export default reducer;