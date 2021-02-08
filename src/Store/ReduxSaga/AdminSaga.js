import { all, call, put, takeLatest } from "redux-saga/effects";
import { login, register } from "../../Requests/auth";
import { getReportedCases } from "../../Requests/cases";
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

function* montlyReport({ _id }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(getMonthlyReport, _id);
    yield all([
      put(ActionCreators.setMonthly(response.data)),
      put(ActionCreators.stopLoading()),
    ]);
  } catch (error) {}
}

function* getDistrict({ _id }) {
  try {
    yield put(ActionCreators.loading());
    const response = yield call(districtReport, _id);
    console.log(response);
    yield put(ActionCreators.stopLoading());
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

export {
  watchUserRegistration,
  watchUserLogin,
  watchAllReportedCases,
  watchDistrict,
  watchMonthly,
};
