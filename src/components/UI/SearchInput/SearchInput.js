import React, { useEffect, useState } from "react";
import Search from "../../../assets/img/svg/search.svg";
import "./SearchInput.scss";
const SearchInput = (props) => {
  const [isValid, setIsValid]=useState(true)

  const changeHandler = (e) => {
    let searchKeyword = e.target.value;
    if(searchKeyword.length < props.minLength){
      searchKeyword="";
    }
    props.inputChanged(searchKeyword);
  };

  return (
    <div className="SearchInputContainer">
      <div className="search-input">
        <input placeholder={props.placeHolder} onChange={changeHandler} />
        <button className="search-button">
          <img src={Search} alt="search" />
        </button>
      </div>
      {props.errorLabel !== "" && (
        <div className="error-label">
          <label>{props.errorLabel}</label>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
