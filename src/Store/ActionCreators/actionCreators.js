import actions from "../Actions";

export const setToken = (payload) => ({ type: actions.SET_TOKEN, payload });

export const removeToken = () => ({ type: actions.REMOVE_TOKEN });

export const loading = () => ({ type: actions.LOADING });

export const stopLoading = () => ({ type: actions.NOT_LOADING });

export const setLoggedInUser = (payload) => ({
  type: actions.SET_LOGGEDIN_USER,
  payload,
});

export const removeUser = () => ({ type: actions.REMOVE_USER });

export const setCases = (payload) => ({ type: actions.SET_CASES, payload });

export const removeCases = () => ({ type: actions.REMOVE_CASES });

export const showModal = () => ({ type: actions.MODAL_SHOWING });

export const hideModal = () => ({ type: actions.MODAL_NOT_SHOWING });

export const setSuccessMessage = (payload) => ({
  type: actions.SET_SUCCESS_MESSAGE,
  payload,
});

export const setError = (payload) => ({ type: actions.SET_ERROR, payload });

export const removeError = () => ({ type: actions.REMOVE_ERROR });

export const logIn = ({ userName, password, callback }) => ({
  type: actions.LOG_IN,
  userName,
  password,
  callback,
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

export const setTotalCases = (number) => ({
  type: actions.SET_TOTAL_CASES,
  number,
});

export const setMonthly = (report) => ({ type: actions.SET_MONTHLY, report });

export const setDistrict = (report) => ({ type: actions.SET_DISTRICT, report });

export const getMonthly = (_id, year) => ({
  type: actions.GET_MONTHLY,
  _id,
  year,
});

export const getDistrict = (_id) => ({ type: actions.GET_DISTRICT, _id });

export const setSingleCase = (payload) => ({
  type: actions.SET_SINGLE_CASE,
  payload,
});

export const gettingCase = ({ _id, id, callback }) => ({
  type: actions.GETTING_CASE,
  _id,
  id,
  callback,
});

export const deletingCase = (_id, id, callback) => ({
  type: actions.DELETING_CASE,
  _id,
  id,
  callback,
});

export const updatingCaseStatus = (_id, id, status, description, prevStatus, currStatus,callback) => ({
  type: actions.UPDATING_CASE_STATUS,
  _id,
  id,
  status,
  description,
  prevStatus,
  currStatus,
  callback
})

export const updatingCaseEvidence = (_id, id, link, description, evidenceType,callback) => ({
  type: actions.UPDATING_CASE_EVIDENCE,
  _id,
  id,
  link,
  description,
  evidenceType,
  callback
})


export const updatingCase = (
  _id,
  id,
  reporterName,
  reporterContact,
  dateTime,
  violationType,
  violationDescription,
  village,
  districtOfViolation
  // victimName,
  // otherVictim,
  // suspectName,
  // otherSuspect,
  // witnessName,
  // otherWitness,
  // injuries,
  // secure_url,
  // contactAuthority,
  // authorityResponse,
  // otherViolation,
  // fileDescription,
  // callback
) => ({
  type: actions.UPDATING_CASE,
  _id,
  id,
  reporterName,
  reporterContact,
  dateTime,
  violationType,
  violationDescription,
  village,
  districtOfViolation,
  // victimName,
  // otherVictim,
  // suspectName,
  // otherSuspect,
  // witnessName,
  // otherWitness,
  // injuries,
  // secure_url,
  // contactAuthority,
  // authorityResponse,
  // otherViolation,
  // fileDescription,
  // callback
});

export const generatingPdf = (_id) => ({ type: actions.GENERATING_PDF, _id });

export const updatingRole = (_id, role) => ({
  type: actions.UPDATE_USER_ROLE,
  _id,
  role,
});

export const setUsers = (payload) => ({ type: actions.SET_USERS, payload });

export const setNumUsers = (number) => ({
  type: actions.SET_NUM_USERS,
  number,
});

export const setApplications = (payload) => ({
  type: actions.SET_APPLICATIONS,
  payload,
});

export const setNumApplications = (number) => ({
  type: actions.SET_NUM_APPLICATIONS,
  number,
});

export const gettingUsers = (_id, pageIndex, pageSize, filter, range) => ({
  type: actions.GET_ALL_USERS,
  _id,
  pageIndex,
  pageSize,
  filter,
  range,
});

export const gettingApplications = (
  _id,
  pageIndex,
  pageSize,
  filter,
  range
) => ({
  type: actions.GET_ALL_APPLICATIONS,
  _id,
  pageIndex,
  pageSize,
  filter,
  range,
});

export const setApplication = (payload) => ({
  type: actions.SET_APPLICATION,
  payload
})

export const gettingApplication = (_id, applicationId, callback) => ({
  type: actions.GET_SINGLE_APPLICATION,
  _id,
  applicationId,
  callback
})

export const updatingUserRole = (_id, applicationId, callback) => ({
  type: actions.UPDATE_USER_ROLE_ADMIN,
  _id,
  applicationId,
  callback
})

export const updatingUser = (
  _id,
  userId,
  firstName,
  lastName,
  phoneNumber,
  email,
  userName,
  role,
  callback
) => ({
  type: actions.UPDATE_USER,
  _id,
  userId,
  firstName,
  lastName,
  phoneNumber,
  email,
  userName,
  role,
  callback
})

export const deletingUser = (_id, userId, callback) => ({
  type: actions.DELETE_USER,
  _id,
  userId,
  callback
})

export const passwordResetting = (identifier) => ({
  type: actions.FOGOT_PASSWORD,
  identifier
})

export const setViolation = (payload) => ({
  type: actions.SET_VIOLATION,
  payload
})

export const setExploreViolation = (payload) => ({
  type: actions.SET_EXPLORE_VIOLATION,
  payload
})

export const gettingViolation = (_id, limit) => ({
  type: actions.GET_VIOLATIONS,
  _id,
  limit
})

export const getExploreViolation = (_id,pageIndex, limit) => ({
  type: actions.GET_EXPLORE_VIOLATIONS,
  _id,
  pageIndex,
  limit
})

export const setDistrictFilter = (payload) => ({
  type: actions.SET_DISTRICT_FILTER,
  payload
})

export const districtFilter = (_id, district) => ({
  type: actions.GET_DISTRICT_FILTER,
  _id,
  district
})
