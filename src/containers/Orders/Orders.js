import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ordersActions from "../../store/actions/orders";
import OrderList from "../../components/Orders/OrderList";
import "./Orders.scss";
const Orders = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loadOrders = useCallback(async () => {
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (error) {
      throw error;
    }
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => setIsLoading(false));
  }, [loadOrders]);

  if (orders.length == 0) {
    return (
      <div className="OrderEmptyContainer text-center w-100 mb-5">
        <h5>Order is empty</h5>
      </div>
    );
  }
  return (
    <div className="OrderContainer">
      {orders.map((order) => (
        <OrderList data={order} key={order.id} />
      ))}
    </div>
  );
};

export default Orders;
