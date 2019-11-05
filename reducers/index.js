import { combineReducers } from 'redux';
import UsersReducer from './users';
import NewsReducer from './news';

export default combineReducers({
  users: UsersReducer,
  news: NewsReducer
});
