import * as actionTypes from "./actionTypes";

import db from "../../config/firebase";
import firebase from "firebase/app";
import "firebase/auth";
export const authenticate = (userId, token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTHENTICATE, userId: userId, token: token });
  };
};
export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          localStorage.setItem("token", response.user.refreshToken);
          localStorage.setItem("userId", response.user.uid);
          dispatch(authenticate(response.user.uid, response.user.refreshToken));
        })
        .catch((error) => {
          const errorMessage = error.message;
          const errorCode = error.code;

          throw new Error(errorMessage);
        });
    } catch (error) {
      throw error;
    }
  };
};
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response.user.uid);
          localStorage.setItem("token", response.user.refreshToken);
          localStorage.setItem("userId", response.user.uid);
          dispatch(authenticate(response.user.uid, response.user.refreshToken));
        })
        .catch((error) => {
          var errorCode = error.code;
          const errorMessage = error.message;

          throw new Error(errorMessage);
        });
    } catch (error) {
      throw error;
    }
  };
};
export const logout = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      })
      .catch((error) => {
        console.log("sign out error", error);
      });
    dispatch({ type: actionTypes.LOGOUT });
  };
};
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authenticate(userId, token));
    }
  };
};
