import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem/ProductItem";
import "./ProductList.scss";
const ProductList = (props) => {
  const products = useSelector((state) => state.products.filteredProducts);

  if (products.length === 0) {
    return (
      <div className="EmptyProduct">
        <h4>oops..!!</h4>
        <p>There is no products!</p>
      </div>
    );
  }
  return (
    <div className="ProductsContainer">
      <div className="row">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
              <ProductItem
                key={product.id}
                data={product}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
