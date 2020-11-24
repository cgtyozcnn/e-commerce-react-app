import React, { useState } from "react";
import Card from "../UI/Card/Card";
import "./OrderList.scss";
import OrderDetail from "./OrderDetails/OrderDetails";
const OrderList = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  let orderDetailsArray = [];
  for (let key in props.data.items) {
    orderDetailsArray.push(props.data.items[key]);
  }

  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    props.date
  );
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
    props.date
  );
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    props.date
  );

  return (
    <Card>
      <div className="OrderBody">
        <div className="OrderTop">
          <p>
            <strong>Order Number: </strong>
            {props.data.id}
          </p>
          <p>
            <strong>Ordered Date: </strong>
            {`${da}-${mo}-${ye}`}
          </p>
          <p>
            <strong>Amount: </strong>
            {props.data.totalAmount} &#36;
          </p>
        </div>
        <div className="OrderBottom">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowDetail((prevState) => !prevState)}
          >
            Show detail
          </button>
        </div>
        {showDetail &&
          orderDetailsArray.map((product) => <OrderDetail data={product} key={product.id}/>)}
      </div>
    </Card>
  );
};
export default OrderList;
