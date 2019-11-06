import { Types } from '../actions/products';

const INITIAL_STATE = {
  productsItems: []
};

export default function products(state = INITIAL_STATE, action) {
  //   console.log(Types);
  console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productsItems: action.payload.items
      };
    }
    case Types.PRODUCTS_ERROR: {
      return {
        ...state,
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
