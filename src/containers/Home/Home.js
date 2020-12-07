import React from "react";
import ProductList from "../../components/Products/ProductList";
import "./Home.scss";
const Home = (props) => {

  return (
    <div className="HomeContainer">
      <ProductList />
    </div>
  );
};

export default Home;
