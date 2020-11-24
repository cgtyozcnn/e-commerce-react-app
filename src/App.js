import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Orders from "./containers/Orders/Orders";
import product from "./containers/Product/Product";
import Layout from "./hoc/Layout/Layout";
import { useDispatch } from "react-redux";
import * as productsActions from "./store/actions/products";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsActions.fetchProducts());
  }, [dispatch]);
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/orders" component={Orders} />
          <Route path="/product/:productId" component={product} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
