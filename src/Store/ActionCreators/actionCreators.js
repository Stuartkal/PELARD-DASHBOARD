import actions from "../Actions";

export const setToken = (payload) => ({ type: actions.SET_TOKEN, payload });

export const removeToken = () => ({ type: actions.REMOVE_TOKEN });

export const loading = () => ({
  type: actions.LOADING,
});

export const stopLoading = () => ({
  type: actions.NOT_LOADING,
});

export const setUser = (payload) => ({
  type: actions.SET_USER,
  payload,
});

export const removeUser = () => ({ type: actions.REMOVE_USER });

export const setCases = (payload) => ({ type: actions.SET_CASES, payload });

export const removeCases = () => ({ type: actions.REMOVE_CASES });

export const showModal = () => ({
  type: actions.MODAL_SHOWING,
});

export const hideModal = () => ({
  type: actions.MODAL_NOT_SHOWING,
});

export const setError = (payload) => ({ type: actions.SET_ERROR, payload });

export const removeError = () => ({ type: actions.REMOVE_ERROR });

export const logIn = ({ userName, password }) => ({
  type: actions.LOG_IN,
  userName,
  password,
});

export const loggedIn = () => ({ type: actions.LOGGED_IN });

export const loggingOut = () => ({ type: actions.LOGGING_OUT });

export const loggedOut = () => ({ type: actions.LOGGED_OUT });

export const registering = () => ({ type: actions.REGISTERING });

export const registered = () => ({ type: actions.REGISTERED });

export const gettingCases = ({ _id, pageIndex, pageSize, filter, range }) => ({
  type: actions.GETTING_CASES,
  _id,
  pageIndex,
  pageSize,
  filter,
  range,
});

export const gotCases = () => ({ type: actions.GOT_CASES });

export const setNumCases = (number) => ({
  type: actions.SET_NUM_CASES,
  number,
});

export const setMonthly = (report) => ({ type: actions.SET_MONTHLY, report });

export const setDistrict = (report) => ({ type: actions.SET_DISTRICT, report });

export const getMonthly = (_id, year) => ({
  type: actions.GET_MONTHLY,
  _id,
  year,
});

export const getDistrict = (_id) => ({
  type: actions.GET_DISTRICT,
  _id,
});
