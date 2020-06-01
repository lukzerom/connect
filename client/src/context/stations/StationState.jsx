import React, { useReducer } from "react";
import axios from "axios";
import StationContext from "./stationContext";
import stationReducer from "./stationReducer";
import {
  GET_ALL_STATIONS,
  STATION_ERROR,
  SET_POSITION,
  SET_MAP_ZOOM,
  SET_CURRENT_STATION,
} from "../types";
import { set } from "mongoose";

const StationState = (props) => {
  const initialState = {
    stations: null,
    error: null,
    position: [50.270873, 16.25341],
    zoom: 5,
    pickedStation: null,
  };

  const [state, dispatch] = useReducer(stationReducer, initialState);

  //Get stations
  const getStations = async () => {
    try {
      const res = await axios.get("/api/stations");
      dispatch({ type: GET_ALL_STATIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  //Set map position

  const setPosition = (position) => {
    dispatch({
      type: SET_POSITION,
      payload: position,
    });
  };

  //Setting zoom to manage map
  const setZoom = (zoom) => {
    dispatch({
      type: SET_MAP_ZOOM,
      payload: zoom,
    });
  };

  //Setting picked station to state
  const setStation = (station) => {
    dispatch({
      type: SET_CURRENT_STATION,
      payload: station,
    });
  };

  return (
    <StationContext.Provider
      value={{
        stations: state.stations,
        getStations: getStations,
        position: state.position,
        setPosition: setPosition,
        setZoom: setZoom,
        zoom: state.zoom,
        setStation: setStation,
        station: state.station,
      }}
    >
      {props.children}
    </StationContext.Provider>
  );
};

export default StationState;
