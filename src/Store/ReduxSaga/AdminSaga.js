import { all, call, put, takeLatest } from "redux-saga/effects";
import { login, register } from "../../Requests/auth";
import { 
  getReportedCases,
  getSingleCase,
  updateCase,
  deleteCase 
} from "../../Requests/cases";
import {
  districtReport,
  monthlyReport as getMonthlyReport,
} from "../../Requests/reports";
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

function* loginUser({ userName, password }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(login, userName, password);

    yield all([
      put(ActionCreators.setUser(response.data.user)),
      put(ActionCreators.setToken(response.token)),
      put(ActionCreators.loggedIn()),
      put(ActionCreators.stopLoading()),
    ]);
  } catch (error) {
    yield put(ActionCreators.setError(error));
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

function* singleCase({_id, id, callback}){
  try{
    yield put(ActionCreators.loading());
    const response = yield call(getSingleCase, _id, id);
    yield all([
      put(ActionCreators.setSingleCase(response.data)),
      callback({success: true, res:response.data}),
      put(ActionCreators.stopLoading())
    ]);
    yield put(ActionCreators.stopLoading());
  }
  catch(error){}
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
  yield takeLatest(actions.GETTING_CASE,singleCase)
}

export {
  watchUserRegistration,
  watchUserLogin,
  watchAllReportedCases,
  watchGetSingleCase,
  watchDistrict,
  watchMonthly,
};
