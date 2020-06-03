import React from "react";
import "./App.css";
import Nav from "./components/layout/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/pages/Main";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import StationState from "./context/stations/StationState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import MyVehicles from "./components/pages/MyVehicles";
import MyStations from "./components/pages/MyStations";
import MyReservations from "./components/pages/MyReservations";
import ChargersMap from "./components/pages/ChargersMap";
import AddStation from "./components/pages/AddStation";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <StationState>
          <div className="App">
            <Router>
              <Nav />
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Main} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/my-vehicles" component={MyVehicles} />
                <PrivateRoute path="/my-stations" component={MyStations} />
                <PrivateRoute path="/add-station" component={AddStation} />
                <PrivateRoute
                  path="/my-reservations"
                  component={MyReservations}
                />
                <PrivateRoute path="/chargersmap" component={ChargersMap} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </Router>
          </div>
        </StationState>
      </AlertState>
    </AuthState>
  );
}

export default App;
