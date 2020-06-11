import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CarContext from "../../context/cars/carContext";
import ReservationContext from "../../context/reservations/reservationContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CarSelect = () => {
  const classes = useStyles();
  const carContext = useContext(CarContext);
  const reservationContext = useContext(ReservationContext);
  const { getCars, cars } = carContext;
  const { setReservationCar, car } = reservationContext;

  useEffect(() => {
    getCars();
  });

  const handleChange = (e) => {
    setReservationCar(e.target.value);
  };

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id="car-select">Pick car</InputLabel>
      <Select
        labelId="car-select"
        id="car-label-select"
        onChange={handleChange}
        value={car}
      >
        {cars.map((car) => {
          return (
            <MenuItem value={String(car._id)} key={String(car._id)}>
              {car.brand} {car.model}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CarSelect;
