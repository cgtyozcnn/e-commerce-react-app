import React, { useReducer, useCallback, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./Checkout.scss";

import Card from "../../components/UI/Card/Card";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import * as ordersActions from "../../store/actions/orders";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "../../axios/axios";
import BillingDetails from "../../components/Orders/BillingDetails/BillingDetails";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedInputValues = {
        ...state.inputValues,
        [action.id]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.id]: action.valid,
      };
      let formValid = true;
      for (const key in updatedValidities) {
        formValid = formValid && updatedValidities[key];
      }

      return {
        inputValues: updatedInputValues,
        inputValidities: updatedValidities,
        formIsValid: formValid,
      };
    default:
      return state;
  }
};
const Checkout = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    },
    inputValidities: {
      firstName: false,
      lastName: false,
      address: false,
      address2: true,
      city: false,
      state: false,
      zip: false,
    },
    formIsValid: false,
  });

  const stripe = useStripe();
  const elements = useElements();

  let totalAmount = 0;
  const cartArray = [];
  const cart = useSelector((state) => state.cart.cart);
  for (let key in cart) {
    totalAmount += parseInt(cart[key].quantity) * cart[key].price;
    cartArray.push(cart[key]);
  }

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${totalAmount * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  console.log("secret is >>> ", clientSecret);

  const inputChangeHandler = useCallback(
    (id, value, valid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        id: id,
        value: value,
        valid: valid,
      });
    },
    [dispatchFormState]
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const cardElement = elements.getElement(CardElement);
    const billingDetails = {
      name: `${formState.inputValues.firstName} ${formState.inputValues.lastName}`,
      address: {
        city: formState.inputValues.city,
        line1: formState.inputValues.address,
        state: formState.inputValues.state,
        postal_code: formState.inputValues.zip,
      },
    };

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })
      .then(async ({ paymentIntent }) => {
        console.log(paymentIntent);
        let paymentAmount = paymentIntent.amount.toString();
        await dispatch(
          ordersActions.addOrder(
            cart,
            billingDetails,
            paymentAmount.substring(0, paymentAmount.length - 2) +
              "." +
              paymentAmount.substring(paymentAmount.length - 2),
            paymentIntent.created
          )
        );

        setProcessing(false);
        history.push("/orders");
      });
  };
  let authRedirect = null;
  
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  } 
  return (
    <div className="container CheckoutContainer">
      {authRedirect}
      <Card classes="contact-info col-md-12">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <BillingDetails inputChangeHandler={inputChangeHandler} />
              <div className="credit-card-body">
                <h4>Credit Card</h4>
                <div className="CardElementContainer">
                  <CardElement />
                </div>
              </div>
            </div>
            <div className=" col-md-4 col-sm-12">
              <div className="summary-info">
                <h4>Summary</h4>
                <div className="d-flex flex-column">
                  <div className="purchase-item">
                    <p>Amount: </p>
                    <p>{totalAmount.toFixed(2)} &#36;</p>
                  </div>
                  <div className="purchase-item">
                    <p>Discount (%0): </p>
                    <p>0</p>
                  </div>
                  <div className="purchase-item divider">
                    <p>Total Amount: </p>
                    <p>{totalAmount.toFixed(2)} &#36;</p>
                  </div>
                </div>
                <Button
                  variant="contained"
                  className="form-button"
                  type="submit"
                  disabled={
                    processing || cartArray.length <= 0 || !isAuthenticated
                  }
                >
                  {processing ? (
                    <CircularProgress className="loading-progress" />
                  ) : (
                    "Order"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Checkout;
