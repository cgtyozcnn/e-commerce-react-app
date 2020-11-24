import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../components/UI/Card/Card";
import QuantityInput from "../../components/UI/QuantityInput/QuantityInput";
import "./Product.scss";
import * as cartActions from "../../store/actions/cart";
const Product = (props) => {
  const [quantity, setQuantity] = useState(1);
  let productId = useParams().productId;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products).find(
    (f) => f.id === parseInt(productId)
  );
  if (!product) {
    return <div>Empty</div>;
  }
  const productImage = require(`../../assets/img/products/product-${product.imageURL}.jpg`)
    .default;
  const productImage2x = require(`../../assets/img/products/product-${product.imageURL}@2x.jpg`)
    .default;

  const changeHandler = (value) => {
    // console.log(value);
    setQuantity(value);
  };

  const addToCartHandler = () => {
    console.log(quantity)
    dispatch(cartActions.addToCart(product, quantity));
  };
  return (
    <div className="container mt-5">
      <div className="product-body">
        <div className="ProductImageContainer">
          <picture>
            <source media="(min-width:650px)" srcSet={productImage2x} />
            <source media="(min-width:465px)" srcSet={productImage} />
            <img
              src={productImage}
              alt={product.name}
              className="product-image"
            />
          </picture>
        </div>

        <div className="ProductInfoContainer">
          <Card>
            <div className="product-info">
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price} TL</p>
            </div>
          </Card>

          <div className="ProductButtonsContainer">
            <QuantityInput quantityChanged={changeHandler} />
            <button
              className="btn btn-orange"
              type="submit"
              onClick={addToCartHandler}
            >
              Sepete ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
