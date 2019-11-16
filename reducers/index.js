import { combineReducers } from 'redux';
import UsersReducer from './users';
import NewsReducer from './news';
import ProductsReducer from './products';
import LtpReducer from './ltp';
import OdisReducer from './odis';
import StatsReducer from './stats';
import UserWipsReducer from './userWips';
import DealerToolsReducer from './dealerTools';

export default combineReducers({
  users: UsersReducer,
  news: NewsReducer,
  products: ProductsReducer,
  ltp: LtpReducer,
  odis: OdisReducer,
  stats: StatsReducer,
  dealerTools: DealerToolsReducer,
  userWips: UserWipsReducer
});
