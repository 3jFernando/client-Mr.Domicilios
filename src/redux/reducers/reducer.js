import { combineReducers } from 'redux';

// reducers
import shop from '../reducers/shops';
import incharges from '../reducers/incharges';
import orders from '../reducers/orders';
import urls from './urls';
import categories from '../reducers/categories';
import products from '../reducers/products';
import licence from '../reducers/licence';

const reducer = combineReducers({
  shop,
  incharges,
  orders,
  urls,
  categories,
  products,
  licence
});

export default reducer;
