export const Types = {
  GET_PRODUCTS_REQUEST: 'products/get_products_request',
  GET_PRODUCTS_SUCCESS: 'products/get_products_success',
  PRODUCTS_ERROR: 'products/products_error'
};

export const getProductsRequest = () => ({
  type: Types.GET_PRODUCTS_REQUEST
});

export const getProductsSuccess = ({ items }) => ({
  type: Types.GET_PRODUCTS_SUCCESS,
  payload: {
    items: items
  }
});

export const productsError = ({ error }) => ({
  type: Types.PRODUCTS_ERROR,
  payload: {
    error
  }
});
