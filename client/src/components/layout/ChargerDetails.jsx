import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Plugin from "../../assets/plugin.jpg";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Rating from "@material-ui/lab/Rating";
import StationContext from "../../context/stations/stationContext";
import ChargerIcon from "./ChargerIcon";
import Extras from "../layout/Extras";

import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    margin: "1rem",
    height: "100%",
  },
  media: {
    width: "100%",
    height: "10rem",
    objectFit: "contain",
  },
  divider: {
    margin: "1rem 0",
  },
  icon: {
    verticalAlign: "middle",
    marginRight: "0.5rem",
    fontSize: "16px",
    color: "#880000",
  },
  subtitle: {
    fontSize: "14px",
    verticalAlign: "middle",
    margin: "0",
  },
  plugin: {
    height: "8rem",
    objectFit: "contain",
    margin: "0 auto",
  },
  price: {
    alignSelf: "center",
  },
  rating: {
    verticalAlign: "middle",
    marginLeft: "1rem",
  },
  extrasBox: {
    display: "flex",
  },
}));

const ChargerDetails = () => {
  const stationContext = useContext(StationContext);
  const { stations, station, setStation } = stationContext;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {station === undefined ? (
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="h3"
            align="center"
          >
            Wybierz stację
          </Typography>
        </CardContent>
      ) : (
        <>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              variant="h6"
              align="center"
            >
              {station.name}
              <Rating
                name="read-only"
                value={0}
                readOnly
                className={classes.rating}
              />{" "}
              (3)
            </Typography>

            <Divider variant="middle" className={classes.divider} />
            <CardMedia
              className={classes.media}
              image={station.picture}
              title="Station picture"
              component="img"
            />
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  <LocationCityIcon className={classes.icon} />
                  {station.city}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.subtitle}
                  color="textSecondary"
                  variant="subtitle2"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  <LocationOnIcon className={classes.icon} />
                  Al. {station.street} {station.streetNumber}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={3}>
              <Grid item xs={6} align="center" className={classes.plugin}>
                <ChargerIcon plugin={station.plugin} />
              </Grid>
              <Grid item xs={6} align="center">
                <Typography
                  color="textSecondary"
                  variant="h4"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  className={classes.price}
                >
                  {station.price} zł / h
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Typography color="textSecondary" gutterBottom>
              Dodatkowo:
            </Typography>
            <Box className={classes.extrasBox}>
              {station.additives.map((extra, index) => {
                return <Extras key={index} extra={extra} />;
              })}
            </Box>
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  Od: 12.06.2019 11:00
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  Do: 12.06.2019 12:00
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  fontWeight="fontWeightBold"
                  align="center"
                >
                  Łącznie: 1h
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xs={12} align="center">
              <Button variant="contained" size="large" color="primary">
                Zarezerwuj
              </Button>
            </Grid>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default ChargerDetails;
