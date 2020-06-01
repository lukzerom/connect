import React, { useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const MyVehicles = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  const { isAuthenticated, logout, user } = authContext;
  return <div>My Vehicles</div>;
};

export default MyVehicles;
