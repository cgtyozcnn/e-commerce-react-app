import React, { useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
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
          <SearchIcon/>
        </button>
      </div>
      {props.errorLabel !== "" && (
        <div className="error-label">
          <p>{props.errorLabel}</p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
