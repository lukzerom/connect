import React from "react";
import "./App.css";
import Nav from "./components/layout/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Main from "./components/pages/Main";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import StationState from "./context/stations/StationState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import ReservationState from "./context/reservations/ReservationState";
import CarState from "./context/cars/CarState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import MyVehicles from "./components/pages/MyVehicles";
import MyStations from "./components/pages/MyStations";
import MyReservations from "./components/pages/MyReservations";
import ChargersMap from "./components/pages/ChargersMap";
import AddStation from "./components/pages/AddStation";
import EditStation from "./components/pages/EditStation";
import AddVehicle from "./components/pages/AddVehicle";
import EditVehicle from "./components/pages/EditVehicle";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AlertState>
          <ReservationState>
            <StationState>
              <CarState>
                <div className="App">
                  <Router>
                    <Nav />
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path="/" component={Main} />
                      <PrivateRoute path="/dashboard" component={Dashboard} />
                      <PrivateRoute
                        path="/my-vehicles"
                        component={MyVehicles}
                      />
                      <PrivateRoute
                        path="/my-stations"
                        component={MyStations}
                      />
                      <PrivateRoute
                        path="/add-station"
                        component={AddStation}
                      />
                      <PrivateRoute
                        path="/add-vehicle"
                        component={AddVehicle}
                      />
                      <PrivateRoute
                        path="/edit-station"
                        component={EditStation}
                      />
                      <PrivateRoute
                        path="/edit-vehicle"
                        component={EditVehicle}
                      />
                      <PrivateRoute
                        path="/my-reservations"
                        component={MyReservations}
                      />
                      <PrivateRoute
                        path="/chargersmap"
                        component={ChargersMap}
                      />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                    </Switch>
                  </Router>
                </div>
              </CarState>
            </StationState>
          </ReservationState>
        </AlertState>
      </MuiPickersUtilsProvider>
    </AuthState>
  );
}

export default App;
