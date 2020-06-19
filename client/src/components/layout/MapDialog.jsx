import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, Box } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ReservationContext from "../../context/reservations/reservationContext";
import ShowStationMap from "./ShowStationMap";

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
  map: {
    height: 500,
  },
}));

const MapDialog = () => {
  const reservationContext = useContext(ReservationContext);

  const { isMapModalOpen, toggleMapModal } = reservationContext;

  const classes = useStyles();

  const handleClose = () => {
    toggleMapModal(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isMapModalOpen}
        fullWidth
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
          <Box className={classes.map}>
            <ShowStationMap />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapDialog;
