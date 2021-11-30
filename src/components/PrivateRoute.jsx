import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { authContext } from "../contexts/auth-context";

function PrivateRoute(props) {
  const { logged } = useContext(authContext);
  if (!logged) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}

export default PrivateRoute;
