import React from "react";
import "./OrderDetails.scss";
const OrderDetail = (props) => {
  const productImage = require(`../../../assets/img/products/product-${props.data.imageURL}.jpg`)
    .default;
  return (
    <div className="order-detail-item">
      <div className="OrderDetailImageContainer">
        <img src={productImage} alt={props.data.name} className="cart-image"/>
      </div>
      <div className="OrderDetailInfo">
        <p className="order-detail-item-name">{props.data.name}</p>
        <p>
          <strong>Quantity: </strong>
          {props.data.quantity}
        </p>
        <p>
          <strong>Price: </strong>
          {(props.data.price * props.data.quantity).toFixed(2)} &#36;
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
