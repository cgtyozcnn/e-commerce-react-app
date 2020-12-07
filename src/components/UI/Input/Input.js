import React, { useEffect, useReducer } from "react";
import "./Input.scss";
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        valid: action.isValid,
        error: action.error,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    valid: props.initiallyValid,
    touched: false,
    error: "",
  });

  const { onInputChange, id } = props;
  useEffect(() => {
    if (inputState.touched)
      onInputChange(id, inputState.value, inputState.valid);
  }, [inputState, onInputChange, id]);

  const changeHandler = (e) => {
    let text = e.target.value;
    let errorText = "";
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
      errorText = "Required*";
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
      errorText = "Email is not valid";
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
      errorText = "Can't be less than " + props.min;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
      errorText = "Can't be greater than " + props.max;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
      errorText = "Max length must be " + props.minLength + " character";
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
      error: errorText,
    });
  };
  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  return (
    <div className="input-container">
      <input
        {...props}
        className={`input ${
          inputState.error && inputState.touched ? "error-input" : null
        }`}
        placeholder={props.placeHolder}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={lostFocusHandler}
      />
      {inputState.error && inputState.touched ? (
        <label className="error-text">{inputState.error}</label>
      ) : null}
    </div>
  );
};
export default Input;
