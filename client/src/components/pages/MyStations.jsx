import React, { useContext, Fragment, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import StationContext from "../../context/stations/stationContext";
import UserStation from "../layout/UserStation";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  title: {
    color: "#127681",
  },
  loading: {
    margin: "10rem auto",
  },
}));

const MyStations = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const stationContext = useContext(StationContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { userstations, getUserStations, loading } = stationContext;

  useEffect(() => {
    loadUser();
    getUserStations();
    //eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.stationsWrapper}>
      <Grid container justify="center">
        <Grid item xs={10} className={classes.topPanel}>
          <Typography variant="h4" className={classes.title}>
            My stations
          </Typography>
          <Link to="/add-station" style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<AddToPhotosIcon />}>
              Add station
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Divider />

      {loading ? (
        <Typography variant="h6" align="center" className={classes.title}>
          <CircularProgress color="primary" className={classes.loading} />
        </Typography>
      ) : (
        <Box>
          {userstations === null ? (
            <Typography variant="h6" align="center" className={classes.title}>
              Add your first station :)
            </Typography>
          ) : (
            userstations.map((userstation) => {
              return (
                <UserStation key={userstation._id} station={userstation} />
              );
            })
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyStations;
