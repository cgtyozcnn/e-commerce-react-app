import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Orders from "./containers/Orders/Orders";
import Product from "./containers/Product/Product";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import Checkout from "./containers/Checkout/Checkout";
import Layout from "./hoc/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import * as productsActions from "./store/actions/products";
import * as authActions from "./store/actions/auth";
import { useEffect } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const promise = loadStripe(
  "pk_test_51HjMU0DcMxJH8WOqmlZiZISdOom8e9hLNucsX474Zn8wUMcFUDCgvNq5LmJ7wzbvqUu7FTQP5PZBKO0VQB1inPWG00wGZhRueL"
);
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  useEffect(() => {
    dispatch(productsActions.fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(authActions.authCheckState());
  }, [dispatch]);
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/checkout">
        <Elements stripe={promise}>
          <Checkout />
        </Elements>
      </Route>
      <Route path="/orders" component={Orders} />
      <Route path="/product/:productId" component={Product} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
  // if (isAuthenticated) {
  //   routes = (
  //     <Switch>
  //       <Route path="/logout" component={Logout} />
  //       <Route path="/orders" component={Orders} />
  //       <Route path="/product/:productId" component={Product} />
  //       <Route path="/" exact component={Home} />
  //       <Redirect to="/" />
  //     </Switch>
  //   );
  // }
  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
