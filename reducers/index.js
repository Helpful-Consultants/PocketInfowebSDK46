import { combineReducers } from 'redux';
import UsersReducer from './users';
import NewsReducer from './news';
import ProductsReducer from './products';
import LtpReducer from './ltp';
import OdisReducer from './odis';

export default combineReducers({
  users: UsersReducer,
  news: NewsReducer,
  products: ProductsReducer,
  ltp: LtpReducer,
  odis: OdisReducer
});
