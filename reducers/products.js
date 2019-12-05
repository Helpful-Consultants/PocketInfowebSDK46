// import { Types } from '../actions/products';
import Types from '../constants/Types';

const INITIAL_STATE = {
  productsItems: [],
  isLoading: false,
  error: null
};

export default function products(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_PRODUCTS_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case Types.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productsItems: action.payload.items,
        isLoading: false,
        error: null
      };
    }
    case Types.PRODUCTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
