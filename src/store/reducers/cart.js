import * as actionTypes from "../actions/actionTypes";
import products from "./products";

const initialState = {
  cart: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const addedProduct = action.product;
      let updatedOrNewCartItem;

      if (state.cart[addedProduct.id]) {
        updatedOrNewCartItem = {
          quantity: state.cart[addedProduct.id].quantity + action.quantity,
          name: addedProduct.name,
          price: addedProduct.price,
          imageURL: addedProduct.imageURL,
        };
      } else {
        updatedOrNewCartItem = updatedOrNewCartItem = {
          quantity: action.quantity,
          name: addedProduct.name,
          price: addedProduct.price,
          imageURL: addedProduct.imageURL,
        };
      }
      return {
        ...state,
        cart: { ...state.cart, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.price,
      };
    case actionTypes.REMOVE_FROM_CART:
      return initialState;
    case actionTypes.ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};
