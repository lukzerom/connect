import React, { useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import StationContext from "../../context/stations/stationContext";
import UserStation from "../layout/UserStation";
import CarContext from "../../context/cars/carContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { Link } from "react-router-dom";
import CarCard from "../layout/CarCard";

const useStyles = makeStyles((theme) => ({
  vehiclesWrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "0 10vw",
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },
  carContainer: {
    display: "flex",
  },
}));

const MyVehicles = () => {
  const authContext = useContext(AuthContext);
  const carContext = useContext(CarContext);
  const classes = useStyles();

  const { getCars, cars } = carContext;
  const { isAuthenticated, logout, user } = authContext;
  useEffect(() => {
    authContext.loadUser();
    getCars();
    //eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.vehiclesWrapper}>
      <Grid container justify="center">
        <Grid item xs={10} className={classes.topPanel}>
          <Typography variant="h4">My Vehicles</Typography>
          <Link to="/add-vehicle" style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<AddToPhotosIcon />}>
              Add vehicle
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Divider />
      <Grid container classNames={classes.carContainer}>
        {cars === [] ? (
          <Typography variant="h1">Nie posiadasz jeszcze samochodu</Typography>
        ) : (
          cars.map((car) => {
            return <CarCard key={car._id} car={car} />;
          })
        )}
      </Grid>
    </Box>
  );
};

export default MyVehicles;
