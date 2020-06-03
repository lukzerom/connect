import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EvStationIcon from "@material-ui/icons/EvStation";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ChargerIcon from "../layout/ChargerIcon";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import Extras from "../layout/Extras";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem 0",
    height: "10rem",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    height: "5rem",
    justifyContent: "space-between",
  },

  icon: {
    height: "100%",
    width: "3rem",
    marginRight: "2rem",
  },
  wrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    top: "0",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  adressBox: {
    flexDirection: "column",
  },
  niceButtons: {
    borderRadius: "2rem",
  },
  extras: {
    display: "flex",
  },
}));

const UserStation = ({ station }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid item xs={2}>
                <ChargerIcon plugin={station.plugin} />
              </Grid>
              <Box className={classes.adressBox}>
                <Typography variant="h6">{station.name}</Typography>
                <Typography variant="caption">
                  {station.country} {station.city} {station.street}{" "}
                  {station.streetNumber}
                </Typography>
                <Box className={classes.extras}>
                  {station.additives.map((extra, index) => (
                    <Extras key={index} extra={extra} />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h2">{station.price} zł/h</Typography>
              </Box>
              <Box className={classes.box}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserStation;
