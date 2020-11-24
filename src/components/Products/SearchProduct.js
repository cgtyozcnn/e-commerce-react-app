import React, { useState } from "react";
import SearchInput from "../UI/SearchInput/SearchInput";
import * as productsActions from "../../store/actions/products";

import { useDispatch } from "react-redux";


const SearchProduct = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
 

  const inputChangedHandler = (keyword) => {
    setError("");
    if (keyword.length === 0) {
      setError("Please enter min 3 keyword...");
    }
    dispatch(productsActions.filterProducts(keyword));
  
  };

  return (
    <SearchInput
      placeHolder="Search Product.."
      minLength={3}
      errorLabel={error}
      inputChanged={inputChangedHandler}
    />
  );
};

export default SearchProduct;
