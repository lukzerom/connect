import React, { useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import StationContext from "../../context/stations/stationContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const stationContext = useContext(StationContext);
  const { getUserStations, userstations } = stationContext;
  useEffect(() => {
    authContext.loadUser();
    getUserStations();
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
