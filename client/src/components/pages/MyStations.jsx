import React, { useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import StationContext from "../../context/stations/stationContext";
import UserStation from "../layout/UserStation";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  stationsWrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "0 10vw",
  },
  topPanel: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
  },
}));

const MyStations = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const stationContext = useContext(StationContext);

  const { isAuthenticated, logout, user } = authContext;
  const { userstations, getUserStations } = stationContext;

  useEffect(() => {
    authContext.loadUser();
    getUserStations();
    //eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.stationsWrapper}>
      <Grid container justify="center">
        <Grid item xs={10} className={classes.topPanel}>
          <Typography variant="h4">My stations</Typography>
          <Link to="/add-station" style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<AddToPhotosIcon />}>
              Add station
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Divider />
      {userstations === null ? (
        <Typography variant="h6" align="center">
          Nie posiadasz jeszcze stacji
        </Typography>
      ) : (
        userstations.map((station) => {
          return <UserStation key={station._id} station={station} />;
        })
      )}
    </Box>
  );
};

export default MyStations;
