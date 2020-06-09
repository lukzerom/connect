import {
  GET_RESERVATIONS_AS_DRIVER,
  GET_RESERVATIONS_AS_CHARGER,
  ADD_RESERVATION,
  DELETE_RESERVATION,
  CONFIRM_RESERVATION,
  REJECT_RESERVATION,
  SET_DATE_FROM,
  SET_DATE_TO,
  TOGGLE_MODAL,
  RESERVATION_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_AS_CHARGER:
      return {
        ...state,
        reservationsAsCharger: action.payload,
        loading: false,
      };
    case GET_RESERVATIONS_AS_DRIVER:
      return { ...state, reservationsAsDriver: action.payload, loading: false };
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: action.payload, loading: false };

    case SET_DATE_FROM:
      console.log(action.payload);
      return { ...state, dateFrom: action.payload, loading: false };
    case SET_DATE_TO:
      return { ...state, dateTo: action.payload, loading: false };

    case ADD_RESERVATION:
      return {
        ...state,
        reservationsAsDriver: [action.payload, ...state.reservationsAsDriver],
        loading: false,
      };

    case CONFIRM_RESERVATION:
      return {
        ...state,
        reservationsAsCharger: [action.payload, ...state.reservationsAsCharger],
        loading: false,
      };

    case REJECT_RESERVATION:
      return {
        ...state,
        reservationsAsCharger: [action.payload, ...state.reservationsAsCharger],
        loading: false,
      };

    case RESERVATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_RESERVATION:
      return {
        ...state,
        reservationsAsDriver: state.reservationsAsDriver.filter(
          (reservation) => reservation._id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};
