import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authActions from "../../store/actions/auth";

const Logout = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.logout());
  });
  return <Redirect to="/" />;
};

export default Logout;
