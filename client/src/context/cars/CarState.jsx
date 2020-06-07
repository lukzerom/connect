import React, { useReducer } from "react";
import axios from "axios";
import CarContext from "./carContext";
import carReducer from "./carReducer";
import {
  GET_USER_CARS,
  ADD_CAR,
  EDIT_CAR,
  DELETE_CAR,
  CAR_ERROR,
  SET_CURRENT_CAR,
} from "../types";

const CarState = (props) => {
  const initialState = {
    cars: [],
    editedCar: null,
  };

  const [state, dispatch] = useReducer(carReducer, initialState);

  //Get user cars
  const getCars = async () => {
    try {
      const res = await axios.get("/api/cars");
      dispatch({ type: GET_USER_CARS, payload: res.data });
    } catch (err) {
      dispatch({ type: CAR_ERROR, payload: err.res.msg });
    }
  };

  //Setting picked car to state
  const setCar = (car) => {
    dispatch({
      type: SET_CURRENT_CAR,
      payload: car,
    });
  };

  //Add new car

  const addCar = async (car) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/cars", car, config);
      dispatch({ type: ADD_CAR, payload: res.data });
    } catch (err) {
      dispatch({ type: CAR_ERROR, payload: err.msg });
    }
  };

  //Update car

  const updateCar = async (car) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/cars/${car.id}`, car, config);
      dispatch({ type: EDIT_CAR, payload: res.data });
    } catch (err) {
      dispatch({ type: CAR_ERROR, payload: err.res.msg });
    }
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(`/api/cars/${id}`);
      dispatch({ type: DELETE_CAR, payload: id });
    } catch (err) {
      dispatch({ type: CAR_ERROR, payload: err.res.msg });
    }
  };

  return (
    <CarContext.Provider
      value={{
        getCars,
        setCar,
        updateCar,
        deleteCar,
        addCar,
        cars: state.cars,
        editedCar: state.editedCar,
      }}
    >
      {props.children}
    </CarContext.Provider>
  );
};

export default CarState;
