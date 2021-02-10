import actions from "../Actions";

const token = (state = "", { type, payload }) => {
  switch (type) {
    case actions.SET_TOKEN:
      return payload;
    case actions.REMOVE_TOKEN:
      return "";
    default:
      return state;
  }
};

const loading = (state = false, { type }) => {
  switch (type) {
    case actions.LOADING:
      return true;
    case actions.NOT_LOADING:
      return false;
    default:
      return state;
  }
};

const user = (state = {}, { type, payload, error }) => {
  switch (type) {
    case actions.SET_USER:
      return payload;
    case actions.REMOVE_USER:
      return {};
    default:
      return state;
  }
};

const cases = (state = [], { type, payload }) => {
  switch (type) {
    case actions.SET_CASES:
      return payload;
    case actions.REMOVE_CASES:
      return [];
    default:
      return state;
  }
};

const numCases = (state = 0, { type, number }) => {
  switch (type) {
    case actions.SET_NUM_CASES:
      return number;
    default:
      return state;
  }
};

const modalShowing = (state = false, { type }) => {
  switch (type) {
    case actions.MODAL_SHOWING:
      return true;
    case actions.MODAL_NOT_SHOWING:
      return false;
    default:
      return state;
  }
};

const error = (state = "", { type, payload }) => {
  switch (type) {
    case actions.SET_ERROR:
      return payload;
    case actions.REMOVE_ERROR:
      return "";
    default:
      return state;
  }
};

const registering = (state = false, { type }) => {
  switch (type) {
    case actions.REGISTERING:
      return true;
    case actions.REGISTERED:
      return false;
    default:
      return state;
  }
};

const monthlyReport = (state = {}, { type, report }) => {
  switch (type) {
    case actions.SET_MONTHLY:
      return report;
    default:
      return state;
  }
};

const districtReport = (state = {}, { type, report }) => {
  switch (type) {
    case actions.SET_DISTRICT:
      return report;
    default:
      return state;
  }
};

const loggedIn = (state = false, { type }) => {
  switch (type) {
    case actions.LOGGED_IN:
      console.log("logged IN");
      return true;
    case actions.LOGGED_OUT:
      return false;
    default:
      return state;
  }
};

const singleCase = (state = [], {type, payload}) => {
  switch (type) {
    case actions.SET_SINGLE_CASE:
      return payload
    case actions.REMOVE_CASES:
      return []
    default:
      return state
  }
}

export default {
  modalShowing,
  cases,
  user,
  loading,
  token,
  error,
  registering,
  numCases,
  monthlyReport,
  districtReport,
  loggedIn,
  singleCase
};
