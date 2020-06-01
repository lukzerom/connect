import React, { useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  const { isAuthenticated, logout, user } = authContext;
  return (
    <div>
      <h1>Witaj przybyszu {user && user.name}</h1>
    </div>
  );
};

export default Dashboard;
