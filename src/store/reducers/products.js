import * as actionTypes from "../actions/actionTypes";
import { PRODUCTS } from "../../data/dummy-data";
const initialState = {
  products: [],
  filteredProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return { ...state, products: PRODUCTS, filteredProducts: PRODUCTS };
    case actionTypes.FILTER_PRODUCTS:
      let products = [...state.products];
      let filteredProducts = [];
      if (action.searchKeyword.length == 0) {
        filteredProducts = products;
      }
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(action.searchKeyword.toLowerCase())
      );

      return { ...state, filteredProducts: filteredProducts };
    default:
      return state;
  }
};
