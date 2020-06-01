import React, { useContext, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";
import ProtectedMap from "../layout/ProtectedMap";
import ChargerDetails from "../layout/ChargerDetails";
import { Grid } from "@material-ui/core";

const ChargersMap = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  const useStyles = makeStyles((theme) => ({
    bg: {
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
  }));
  const classes = useStyles();
  const { isAuthenticated, logout, user } = authContext;
  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={7}>
        <ProtectedMap />
      </Grid>
      <Grid item xs={12} sm={5} className={classes.bg}>
        <ChargerDetails />
      </Grid>
    </Grid>
  );
};

export default ChargersMap;
