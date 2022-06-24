import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  CATEGORY_PRODUCTS_REQUEST,
  CATEGORY_PRODUCTS_SUCCESS,
  CATEGORY_PRODUCTS_FAIL,
  PRICE_RANGE_REQUEST,
  PRICE_RANGE_SUCCESS,
  PRICE_RANGE_FAIL,
} from "../Constants/ProductConstants";

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//GET PRICE RANGE

export const priceRangeReducer = (state = {}, action) => {
  switch (action.type) {
    case PRICE_RANGE_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case PRICE_RANGE_SUCCESS:
      return {
        loading: false,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };
    case PRICE_RANGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//LIST CATEGORY PRODUCTS
export const listCategoryProducts = (state = { products: [] }, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCTS_REQUEST:
      return {
        loading: true,
        error: false,
        products: [],
      };
    case CATEGORY_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case CATEGORY_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// SINGLE PRODUCT
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, index: 0 };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// PRODUCT REVIEW CREATE
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
