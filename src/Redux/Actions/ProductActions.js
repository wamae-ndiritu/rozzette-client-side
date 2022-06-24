import axios from "axios";
import { URL } from "../../url.js";
import {
  CATEGORY_PRODUCTS_REQUEST,
  CATEGORY_PRODUCTS_SUCCESS,
  CATEGORY_PRODUCTS_FAIL,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRICE_RANGE_REQUEST,
  PRICE_RANGE_SUCCESS,
  PRICE_RANGE_FAIL,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";

// PRODUCT LIST
export const listProduct =
  (keyword = "", pageNumber = " ", price, cat = "", color = "", source = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const minPrice = Number(price[0]);
      const maxPrice = Number(price[1]);

      const { data } = await axios.get(
        `${URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}&minPrice=${minPrice}&maxPrice=${maxPrice}&cat=${cat}&color=${color}&source=${source}`
      );

      console.log(data);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//GET PRICE RANGE

export const getPriceRange = () => async (dispatch) => {
  try {
    dispatch({ type: PRICE_RANGE_REQUEST });

    const { data } = await axios.get(`${URL}/api/products/price/min-max`);

    dispatch({ type: PRICE_RANGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRICE_RANGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LIST CATEGORY PRODUCTS

export const listCategoryProducts =
  (categoryName = "", price, source = "", color = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_PRODUCTS_REQUEST });

      const minPrice = Number(price[0]);
      const maxPrice = Number(price[1]);

      const { data } = await axios.get(
        `${URL}/api/products/category/products?cat=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}&source=${source}&color=${color}`
      );

      dispatch({ type: CATEGORY_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CATEGORY_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${URL}/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${URL}/api/products/${productId}/review`,
        review,
        config
      );
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
