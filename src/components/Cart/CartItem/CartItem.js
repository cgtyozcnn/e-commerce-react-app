import React from "react";
import "./CartItem.scss";
const CartItem = (props) => {
  const productImage = require(`../../../assets/img/products/product-${props.data.imageURL}.jpg`)
    .default;
  // console.log(props.data);
  return (
    <div className="cart-item">
      <div className="CartImageContainer">
        <img src={productImage} alt={props.data.name} className="cart-image"/>
      </div>
      <div className="CartInfo">
        <p className="cart-item-name">{props.data.name}</p>
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

export default CartItem;
