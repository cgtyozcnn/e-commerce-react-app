import React, { useCallback, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import "./Login.scss";

import * as authActions from "../../store/actions/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      //   for (let key in updatedValidities) {
      //     updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      //   }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    default:
      return state;
  }
};
const Login = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "test@test.com",
      password: "asdasd",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: true,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (formState.formIsValid) {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } else {
        alert("Is not valid!");
      }
    } catch (error) {
      throw error;
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (id, value, isValid) => {
      // console.log(id, value, isValid);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: value,
        isValid: isValid,
        input: id,
      });
    },
    [dispatchFormState]
  );
  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  }
  return (
    <div className="container LoginContainer">
      {authRedirect}
      <Card classes="login-body d-flex flex-column">
        <h4>Log in</h4>
        <form className="d-flex flex-column" onSubmit={submitHandler}>
          <Input
            id="email"
            email
            required
            placeHolder="E-mail"
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.email}
            disabled
          />
          <Input
            id="password"
            required
            placeHolder="Password"
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.password}
            disabled
          />
          <Button variant="contained" className="form-button" type="submit">
            {isLoading ? (
              <CircularProgress className="loading-progress" />
            ) : (
              "Log in"
            )}
          </Button>
          <p>
            Don't you have an account?
            <NavLink to="/">Register</NavLink>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
