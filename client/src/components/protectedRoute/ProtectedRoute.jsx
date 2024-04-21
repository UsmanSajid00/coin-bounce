import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, childeren }) => {
  if (isAuth) {
    return childeren;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
