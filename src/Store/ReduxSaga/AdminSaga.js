import { all, call, put, takeLatest } from "redux-saga/effects";
import { login, register } from "../../Requests/auth";
import {
  getReportedCases,
  getSingleCase,
  updateCase,
  updateUserRole,
  deleteCase,
  generatePdf,
} from "../../Requests/cases";
import {
  districtReport,
  monthlyReport as getMonthlyReport,
} from "../../Requests/reports";
import {
  getUsers,
  getApplications,
  getApplication,
  updateUser,
  deleteUser,
} from "../../Requests/admin";
import { ActionCreators } from "../ActionCreators";
import actions from "../Actions";

function* registerUser({
  firstName,
  lastName,
  userName,
  email,
  password,
  phoneNumber,
}) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(register, {
      firstName,
      lastName,
      userName,
      email,
      password,
      phoneNumber,
    });

    console.log(response);

    yield put(ActionCreators.stopLoading());
  } catch (error) {
    yield put(ActionCreators.setError(error));
  }
}

function* loginUser({ userName, password, callback }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(login, userName, password);

    yield all([
      put(ActionCreators.setLoggedInUser(response.data.user)),
      put(ActionCreators.setToken(response.token)),
      callback({ success: true, res: response.data }),
      put(ActionCreators.loggedIn()),
      put(ActionCreators.stopLoading()),
    ]);
  } catch (error) {
    yield all([put(ActionCreators.setError(error))]);
  }
}

function* reportedCases({ _id, pageSize, pageIndex, filter, range }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(
      getReportedCases,
      _id,
      pageIndex,
      pageSize,
      filter,
      range
    );

    if (response.statusCode === 401) {
      yield put(ActionCreators.setError(response.message));
    } else {
      yield put(ActionCreators.setCases(response.data.violations));
      yield put(ActionCreators.setNumCases(response.data.pages));
      yield put(ActionCreators.stopLoading());
    }
  } catch (error) {
    yield put(ActionCreators.setError(error));
    yield put(ActionCreators.stopLoading());
  }
}

function* montlyReport({ _id, year }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(getMonthlyReport, _id, year);
    yield all([
      put(ActionCreators.setMonthly(response.data)),
      put(ActionCreators.stopLoading()),
    ]);
  } catch (error) {}
}

function* getDistrict({ _id, year }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(districtReport, _id);
    yield all([
      put(ActionCreators.setDistrict(response.data)),
      put(ActionCreators.stopLoading()),
    ]);
    yield put(ActionCreators.stopLoading());
  } catch (error) {}
}

function* singleCase({ _id, id, callback }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(getSingleCase, _id, id);
    yield all([
      put(ActionCreators.setSingleCase(response.data)),
      callback({ success: true, res: response.data }),
      put(ActionCreators.stopLoading()),
    ]);
    yield put(ActionCreators.stopLoading());
  } catch (error) {}
}

function* removeCase({ _id, id, callback }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(deleteCase, _id, id);
    yield all([
      callback({ success: true, res: response.data }),
      put(ActionCreators.stopLoading()),
    ]);
    yield put(ActionCreators.stopLoading());
  } catch (error) {}
}

function* updateSingleCase({
  _id,
  id,
  reporterName,
  reporterContact,
  dateTime,
  violationType,
  violationDescription,
  village,
  districtOfViolation,
  victimName,
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
}) {
  try {
    const response = yield call(
      updateCase,
      _id,
      id,
      reporterName,
      reporterContact,
      dateTime,
      violationType,
      violationDescription,
      village,
      districtOfViolation,
      victimName
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
    );
  } catch (error) {}
}

function* downloadPdf({ _id }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(generatePdf, _id);
    yield put(ActionCreators.stopLoading());
  } catch (error) {}
}

function* updateRole({ _id, role }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(updateUserRole, _id, role);
    yield put(ActionCreators.setSuccessMessage(response.message));
    yield put(ActionCreators.stopLoading());
  } catch (error) {}
}

function* getAllUsers({ _id, pageSize, pageIndex, filter, range }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(
      getUsers,
      _id,
      pageIndex,
      pageSize,
      filter,
      range
    );
    if (response.statusCode === 401) {
      yield put(ActionCreators.setError(response.message));
    } else {
      yield all([
        put(ActionCreators.setUsers(response.data.users)),
        put(ActionCreators.setNumUsers(response.data.pages)),
        put(ActionCreators.stopLoading()),
      ]);
    }
  } catch (error) {
    yield all([
      put(ActionCreators.setError(error)),
      put(ActionCreators.stopLoading()),
    ]);
  }
}

function* getAllApplications({ _id, pageSize, pageIndex, filter }) {
  console.log("id", _id);
  try {
    yield put(ActionCreators.loading());
    const response = yield call(
      getApplications,
      _id,
      pageIndex,
      pageSize,
      filter
    );
    console.log("response");
    console.log(response);
    yield all([
      put(ActionCreators.setApplications(response.data.applications)),
      put(ActionCreators.setNumApplications(response.data.pages)),
      put(ActionCreators.stopLoading()),
    ]);
  } catch (error) {}
}

function* watchUserLogin() {
  yield takeLatest(actions.LOG_IN, loginUser);
}

function* watchUserRegistration() {
  yield takeLatest(actions.REGISTERING, registerUser);
}

function* watchAllReportedCases() {
  yield takeLatest(actions.GETTING_CASES, reportedCases);
}

function* watchMonthly() {
  yield takeLatest(actions.GET_MONTHLY, montlyReport);
}

function* watchDistrict() {
  yield takeLatest(actions.GET_DISTRICT, getDistrict);
}

function* watchGetSingleCase() {
  yield takeLatest(actions.GETTING_CASE, singleCase);
}

function* watchDeleteCase() {
  yield takeLatest(actions.DELETING_CASE, removeCase);
}

function* watchUpdateSingleCase() {
  yield takeLatest(actions.UPDATING_CASE, updateSingleCase);
}

function* watchGeneratePdf() {
  yield takeLatest(actions.GENERATING_PDF, downloadPdf);
}

function* watchUpdateRole() {
  yield takeLatest(actions.UPDATE_USER_ROLE, updateRole);
}

function* watchGetAllUsers() {
  yield takeLatest(actions.GET_ALL_USERS, getAllUsers);
}

function* watchGetAllApplications() {
  yield takeLatest(actions.GET_ALL_APPLICATIONS, getAllApplications);
}

export {
  watchUserRegistration,
  watchUserLogin,
  watchAllReportedCases,
  watchGetSingleCase,
  watchDistrict,
  watchMonthly,
  watchDeleteCase,
  watchUpdateSingleCase,
  watchGeneratePdf,
  watchUpdateRole,
  watchGetAllUsers,
  watchGetAllApplications,
};
