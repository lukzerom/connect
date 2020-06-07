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
  GET_USER_STATIONS,
  SET_MARKER_POSITION,
  ADD_STATION,
  SET_EDIT_STATION,
  EDIT_STATION,
  DELETE_STATION,
} from "../types";
import { set } from "mongoose";

const StationState = (props) => {
  const initialState = {
    stations: null,
    error: null,
    position: [50.270873, 16.25341],
    zoom: 5,
    pickedStation: null,
    userstations: null,
    markerPosition: [50.270873, 16.25341],
    editStation: null,
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

  //Get choosen station
  const setEditStation = (stat) => {
    dispatch({
      type: SET_EDIT_STATION,
      payload: stat,
    });
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

  const getUserStations = async () => {
    try {
      const res = await axios.get("/api/stations/userstations");
      dispatch({ type: GET_USER_STATIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  const setMarkerPosition = (markerPosition) => {
    dispatch({
      type: SET_MARKER_POSITION,
      payload: markerPosition,
    });
  };

  const addStation = async (station) => {
    console.log(station);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/stations", station, config);
      dispatch({ type: ADD_STATION, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.msg });
    }
  };

  //Update station

  const updateStation = async (station) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/stations/${station.id}`,
        station,
        config
      );
      dispatch({ type: EDIT_STATION, payload: res.data });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
  };

  const deleteStation = async (id) => {
    try {
      await axios.delete(`/api/stations/${id}`);
      dispatch({ type: DELETE_STATION, payload: id });
    } catch (err) {
      dispatch({ type: STATION_ERROR, payload: err.res.msg });
    }
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
        getUserStations: getUserStations,
        userstations: state.userstations,
        setMarkerPosition: setMarkerPosition,
        markerPosition: state.markerPosition,
        addStation: addStation,
        editStation: state.editStation,
        setEditStation: setEditStation,
        updateStation: updateStation,
        deleteStation: deleteStation,
      }}
    >
      {props.children}
    </StationContext.Provider>
  );
};

export default StationState;
