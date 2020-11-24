import React from "react";
import Card from "../../UI/Card/Card";
import "./ProductItem.scss";
import { useDispatch } from "react-redux";
import * as cartActions from "../../../store/actions/cart";
import { Link } from "react-router-dom";
const ProductItem = (props) => {
  const productImage = require(`../../../assets/img/products/product-${props.data.imageURL}.jpg`)
    .default;
  const productImage2x = require(`../../../assets/img/products/product-${props.data.imageURL}@2x.jpg`)
    .default;
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(props.data, 1));
  };
  return (
    <Card classes="ProductContainer" >
      <picture>
        <source media="(min-width:650px)" srcSet={productImage2x} />
        <source media="(min-width:465px)" srcSet={productImage} />
        <img
          src={productImage}
          alt={props.data.name}
          className="product-image"
        />
      </picture>

      <div className="product-body">
        <p className="product-name">{props.data.name}</p>
        <p className="product-price">
          <strong>Price: </strong>
          {props.data.price} &#36;
        </p>
        <div className="ProductButtonsContainer">
          <button
            className="btn btn-orange"
            type="submit"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
          <Link
            className="btn btn-outline-orange"
            to={"/product/" + props.data.id}
          >
            Detail
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
