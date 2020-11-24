import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/Products/ProductList";
import * as productsActions from "../../store/actions/products";
import "./Home.scss";
const Home = (props) => {

  return (
    <div className="HomeContainer">
      <ProductList />
    </div>
  );
};

export default Home;
