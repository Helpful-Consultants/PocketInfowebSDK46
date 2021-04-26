import { combineReducers } from 'redux';
import UserReducer from './user';
import UsersReducer from './users';
import NewsReducer from './news';
import ProductsReducer from './products';
import LtpReducer from './ltp';
import LtpBookingsReducer from './ltpBookings';
import OdisReducer from './odis';
import StatsReducer from './stats';
import DealerWipsReducer from './dealerWips';
import DealerToolsReducer from './dealerTools';
import ServiceMeasuresReducer from './serviceMeasures';

export default combineReducers({
  users: UsersReducer,
  user: UserReducer,
  news: NewsReducer,
  products: ProductsReducer,
  ltp: LtpReducer,
  ltpBookings: LtpBookingsReducer,
  odis: OdisReducer,
  stats: StatsReducer,
  dealerTools: DealerToolsReducer,
  dealerWips: DealerWipsReducer,
  serviceMeasures: ServiceMeasuresReducer,
});
