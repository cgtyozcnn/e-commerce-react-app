import React from "react";
import { useSelector, useDispatch } from "react-redux";
//  import CartSvg from "../../assets/img/svg/cart.svg";
import Dropdown from "../UI/Dropdown/Dropdown";
import "./Cart.scss";
import CartItem from "./CartItem/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
const Cart = (props) => {

  let totalQuantities = 0;
  let totalAmount = 0;
  
  const cartArray = [];
  const cart = useSelector((state) => state.cart.cart);
  for (let key in cart) {
    totalQuantities += parseInt(cart[key].quantity);
    totalAmount += parseInt(cart[key].quantity) * cart[key].price;
    cartArray.push(cart[key]);
  }

  const dispatch = useDispatch();
  const removeFromCartHandler = () => {
    console.log("remove");
    dispatch(cartActions.removeFromCart());
  };
  const addOrderHandler = () => {
    dispatch(ordersActions.addOrder(cart, totalAmount.toFixed(2)));
  };
  return (
    <Dropdown
      element={
        <div className="dropdown-element">
          {totalQuantities !== 0 && (
            <span className="cart-badge">{totalQuantities}</span>
          )}
          {/* <img src={CartSvg} alt="Cart" /> */}
          <ShoppingCartOutlinedIcon
            fontSize="large"
            className={totalQuantities === 0 && "disabled"}
          />
        </div>
      }
    >
      {cartArray.length > 0 && (
        <div className="CartContainer">
          <div className="cart-header">
            <p>My Products</p>
          </div>
          <div className="cart-items">
            {cartArray.map((cartItem) => (
              <CartItem key={cartItem.name} data={cartItem} />
            ))}
          </div>

          <div className="cart-bottom">
            <p>
              <strong>Total Amount:</strong>
              {totalAmount.toFixed(2)} &#36;
            </p>
            <div className="cart-buttons">
              <button
                className="btn btn-orange"
                type="submit"
                onClick={removeFromCartHandler}
              >
                Remove Cart
              </button>
              <button
                className="btn btn-outline-orange"
                type="submit"
                onClick={addOrderHandler}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </Dropdown>
  );
};
export default Cart;
