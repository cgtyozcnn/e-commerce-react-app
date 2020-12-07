import * as actionTypes from "../actions/actionTypes";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      const addOrderData = {
        orderNumber: action.orderData.orderNumber,
        items: action.orderData.items,
        details: action.orderData.billingDetails,
        amount: action.orderData.amount,
        date: new Date(),
      };

      return {
        ...state,
        orders: state.orders.concat(addOrderData),
      };
    case actionTypes.SET_ORDERS:
      return {
        orders: action.orders,
      };
    default:
      return state;
  }
};
