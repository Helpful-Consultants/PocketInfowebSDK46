import { combineReducers } from 'redux';
import UserReducer from './user';
import UsersReducer from './users';
import NewsReducer from './news';
import ProductsReducer from './products';
import LtpReducer from './ltp';
import OdisReducer from './odis';
import StatsReducer from './stats';
import DealerWipsReducer from './dealerWips';
import DealerToolsReducer from './dealerTools';

export default combineReducers({
  users: UsersReducer,
  user: UserReducer,
  news: NewsReducer,
  products: ProductsReducer,
  ltp: LtpReducer,
  odis: OdisReducer,
  stats: StatsReducer,
  dealerTools: DealerToolsReducer,
  dealerWips: DealerWipsReducer,
});
