import React, { useState } from "react";
import "./QuantityInput.scss";
const QuantityInput = (props) => {
  const [quantityValue, setQuantityValue] = useState(1);

  const onChangeHandler = (type) => {
    let updatedValue = quantityValue;
    if (type === "decrease" && quantityValue !== 1) {
      updatedValue -= 1;
    }
    if (type === "increase") {
      updatedValue += 1;
    }
    setQuantityValue(updatedValue);
    props.quantityChanged(updatedValue);
  };
  return (
    <div className="ButtonContainer">
      <button
        className="btn btn-secondary"
        type="submit"
        onClick={() => {
          onChangeHandler("decrease");
        }}
      >
        <i className="fas fa-minus"></i>
      </button>
      <input className="quantity-input text-center" value={quantityValue} disabled />
      <button
        className="btn btn-secondary"
        type="submit"
        onClick={() => {
          onChangeHandler("increase");
        }}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};
export default QuantityInput;
