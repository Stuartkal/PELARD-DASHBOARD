import { all } from "redux-saga/effects";
import {
  watchAllReportedCases,
  watchDistrict,
  watchMonthly,
  watchUserLogin,
  watchUserRegistration,
} from "./AdminSaga";

export default function* rootSaga() {
  yield all([
    watchUserRegistration(),
    watchUserLogin(),
    watchAllReportedCases(),
    watchDistrict(),
    watchMonthly(),
  ]);
}
