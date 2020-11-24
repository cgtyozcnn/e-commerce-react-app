import * as actionTypes from "../actions/actionTypes";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      const addOrderData = {
        id: `EC${new Date().getTime()}`,
        items: action.orderData.items,
        totalAmount: action.orderData.amount,
        date: new Date(),
      };
      return {
        ...state,
        orders: state.orders.concat(addOrderData),
      };
    case actionTypes.SET_ORDERS:
      return state;
    default:
      return state;
  }
};
