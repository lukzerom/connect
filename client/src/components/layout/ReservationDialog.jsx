import React, { useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import DatePicker from "./DatePicker";
import ReservationContext from "../../context/reservations/reservationContext";
import StationContext from "../../context/stations/stationContext";
import CarSelect from "../layout/CarSelect";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  stationsWrapper: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    width: "100%",
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  divider: {
    margin: "1rem 0;",
  },
  price: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));

const ReservationDialog = () => {
  const [alert, setAlert] = useState(false);
  const reservationContext = useContext(ReservationContext);
  const stationContext = useContext(StationContext);

  const {
    dateFrom,
    dateTo,
    car,

    isReservationModalOpen,
    toggleReservationModal,
    addReservation,
  } = reservationContext;

  const { getAvailableStations, station } = stationContext;

  const classes = useStyles();

  const from = moment(dateFrom).format("YYYY-MM-DD HH:00");
  const to = moment(dateTo).format("YYYY-MM-DD HH:00");
  const duration = moment.duration(moment(dateTo).diff(moment(dateFrom)));
  const durationHours = Math.round(duration.asHours());

  const handleClose = () => {
    toggleReservationModal(false);
  };

  const handleBook = () => {
    let reservation = {
      timeStampFrom: dateFrom,
      timeStampTo: dateTo,
      car,
      id: station._id,
    };

    addReservation(reservation);
    toggleReservationModal(false);
    getAvailableStations(dateFrom, dateTo);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isReservationModalOpen}
      >
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Confirm data and pick your car</Typography>

          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>

        <DialogContent dividers>
          <Grid container>
            <Grid xs={6}>
              <Typography align="center">
                <strong>Date from: </strong> {from}
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Typography align="center">
                <strong>Date to :</strong> {to}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container>
            <Grid xs={4} align="center">
              <CarSelect />
            </Grid>
            <Grid xs={8} className={classes.price} align="center">
              <Typography align="center">
                {station === undefined
                  ? null
                  : `Total : ${durationHours} h * ${station.price} EUR = appx
              ${durationHours * station.price} EUR`}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography>
            Station reservation is preliminary and requires the owner's
            approval. Settlement takes place outside the application so take
            some cash with you.
          </Typography>
          {alert ? (
            <Alert severity="error">Please enter a valid date range</Alert>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleBook} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReservationDialog;
