import React from "react";
import Input from "../../UI/Input/Input";
import "./BillingDetails.scss";

const BillingDetails = (props) => {
  return (
    <>
      <h4>Billing Address</h4>
      <div className="d-flex">
        <Input
          id="firstName"
          placeHolder="First Name*"
          onInputChange={props.inputChangeHandler}
          required
        />
        <Input
          id="lastName"
          placeHolder="Last Name*"
          onInputChange={props.inputChangeHandler}
          required
        />
      </div>

      <Input
        id="address"
        placeHolder="Address*"
        onInputChange={props.inputChangeHandler}
        required
      />
      <Input
        id="address2"
        placeHolder="Address 2 (Optional)"
        onInputChange={props.inputChangeHandler}
      />
      <div className="d-flex">
        <Input
          id="city"
          placeHolder="City*"
          onInputChange={props.inputChangeHandler}
          required
        />
        <Input
          id="state"
          placeHolder="State*"
          onInputChange={props.inputChangeHandler}
          required
        />
        <Input
          id="zip"
          placeHolder="Zip*"
          onInputChange={props.inputChangeHandler}
          required
        />
      </div>
    </>
  );
};

export default BillingDetails;
