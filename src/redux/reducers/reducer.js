import { combineReducers } from 'redux';

// reducers
import shop from '../reducers/shops';
import incharges from '../reducers/incharges';
import orders from '../reducers/orders';
import urls from './urls';
import categories from '../reducers/categories';
import products from '../reducers/products';

const reducer = combineReducers({
  shop,
  incharges,
  orders,
  urls,
  categories,
  products
});

export default reducer;
