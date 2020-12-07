import * as actionTypes from "./actionTypes";
import db from "../../config/firebase";

export const addOrder = (cartItems, details, totalAmount, created) => {
  return async (dispatch, getState) => {
    let orderNumber = `EC${new Date().getTime()}`;
    const userId = getState().auth.userId;
    try {
      await db
        .collection("orders")
        .add({
          orderNumber: orderNumber,
          userRefNo: userId,
          items: cartItems,
          billingDetails: details,
          amount: totalAmount,
          createdTime: new Date(),
        })
        .then((response) => {
          dispatch({
            type: actionTypes.ADD_ORDER,
            orderData: {
              orderNumber: orderNumber,
              items: cartItems,
              billingDetails: details,
              amount: totalAmount,
            },
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      throw error;
    }
  };
};
export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const orders = [];
      await db
        .collection("orders")
        .where("userRefNo", "==", userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            orders.push(doc.data());
            // console.log(doc.data());
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
      // console.log(orders);
      dispatch({ type: actionTypes.SET_ORDERS, orders });
    } catch (error) {
      throw error;
    }
  };
};
