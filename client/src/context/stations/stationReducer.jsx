import {
  GET_ALL_STATIONS,
  STATION_ERROR,
  SET_POSITION,
  SET_MAP_ZOOM,
  SET_CURRENT_STATION,
  GET_USER_STATIONS,
  SET_MARKER_POSITION,
  ADD_STATION,
  EDIT_STATION_CHOOSEN,
  SET_EDIT_STATION,
  EDIT_STATION,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_STATIONS:
      return { ...state, stations: action.payload, loading: false };
    case SET_POSITION:
      return { ...state, position: action.payload, loading: false };
    case SET_MAP_ZOOM:
      return { ...state, zoom: action.payload, loading: false };
    case SET_CURRENT_STATION:
      return { ...state, station: action.payload, loading: false };
    case GET_USER_STATIONS:
      return { ...state, userstations: action.payload, loading: false };
    case SET_MARKER_POSITION:
      return { ...state, markerPosition: action.payload, loading: false };

    case SET_EDIT_STATION:
      return { ...state, editStation: action.payload, loading: false };

    case ADD_STATION:
      return {
        ...state,
        stations: [action.payload, ...state.stations],
        loading: false,
      };

    case EDIT_STATION:
      return {
        ...state,
        stations: [action.payload, ...state.stations],
        loading: false,
      };

    case STATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
