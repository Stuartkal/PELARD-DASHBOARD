import { all, call, put, takeLatest } from "redux-saga/effects";
import { login, register, resetPassword } from "../../Requests/auth";
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
  updateUserRoleAdmin,
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

function* passwordReset({ identifier }) {
  try {
    const response = yield call(resetPassword, identifier)
    // console.log(response, 'l')
  }
  catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
}

function* downloadPdf({ _id }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(generatePdf, _id);
    yield put(ActionCreators.stopLoading());
  } catch (error) { }
}

function* updateRole({ _id, role }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(updateUserRole, _id, role);
    yield put(ActionCreators.setSuccessMessage(response.message));
    yield put(ActionCreators.stopLoading());
  } catch (error) { }
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

function* userUpdate({
  _id,
  userId,
  firstName,
  lastName,
  phoneNumber,
  email,
  userName,
  callback
}) {
  try {
    const response = yield call(updateUser,
      _id,
      userId,
      firstName,
      lastName,
      phoneNumber,
      email,
      userName
    );
    yield all([
      callback({ success: true, res: response.message }),
    ]);
  }
  catch (error) { }
}

function* userDelete({ _id, userId, callback }) {
  try {
    const response = yield call(deleteUser, _id, userId);
    yield all([
      callback({ success: true, res: response.message }),
    ]);
  }
  catch (error) { }
}

function* getAllApplications({ _id, pageSize, pageIndex, filter }) {

  try {
    yield put(ActionCreators.loading());
    const response = yield call(
      getApplications,
      _id,
      pageIndex,
      pageSize,
      filter
    );
    // console.log("response");
    // console.log(response);
    yield all([
      put(ActionCreators.setApplications(response.data.applications)),
      put(ActionCreators.setNumApplications(response.data.pages)),
      put(ActionCreators.stopLoading()),
    ]);
  } catch (error) { }
}

function* getApplicant({ _id, applicationId, callback }) {

  try {
    const response = yield call(getApplication, _id, applicationId)

    yield all([
      put(ActionCreators.setApplication(response.data)),
      callback({ success: true, res: response.data })
    ])
  }
  catch (error) { }
}

function* updateUserAdmin({ _id, userId, applicationId, callback }) {

  try {
    const response = yield call(updateUserRoleAdmin, '5eb1463e4e00270004d4a601', '602968cfe104680004353dde', '602b91c9bc8e370004bf5497')
    console.log(response, 'dd')
    callback({ success: true, res: response.data })
  }
  catch (error) { }
}

function* watchUserLogin() {
  yield takeLatest(actions.LOG_IN, loginUser);
}

function* watchPasswordReset() {
  yield takeLatest(actions.FOGOT_PASSWORD, passwordReset)
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

function* watchUpdateUser() {
  yield takeLatest(actions.UPDATE_USER, userUpdate);
}

function* watchDeleteUser() {
  yield takeLatest(actions.DELETE_USER, userDelete);
}

function* watchGetAllApplications() {
  yield takeLatest(actions.GET_ALL_APPLICATIONS, getAllApplications);
}

function* watchGetApplication() {
  yield takeLatest(actions.GET_SINGLE_APPLICATION, getApplicant);
}

function* watchUpdateRoleAdmin() {
  yield takeLatest(actions.UPDATE_USER_ROLE_ADMIN, updateUserAdmin);
}

export {
  watchUserRegistration,
  watchUserLogin,
  watchPasswordReset,
  watchAllReportedCases,
  watchGetSingleCase,
  watchDistrict,
  watchMonthly,
  watchDeleteCase,
  watchUpdateSingleCase,
  watchGeneratePdf,
  watchUpdateRole,
  watchGetAllUsers,
  watchUpdateUser,
  watchDeleteUser,
  watchGetAllApplications,
  watchGetApplication,
  watchUpdateRoleAdmin
};
