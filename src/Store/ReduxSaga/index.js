import { all } from "redux-saga/effects";
import {
  watchAllReportedCases,
  watchDistrict,
  watchMonthly,
  watchUserLogin,
  watchPasswordReset,
  watchUserRegistration,
  watchGetSingleCase,
  watchDeleteCase,
  watchUpdateSingleCase,
  watchGeneratePdf,
  watchUpdateRole,
  watchGetAllUsers,
  watchUpdateUser,
  watchDeleteUser,
  watchGetAllApplications,
  watchGetApplication,
  watchUpdateRoleAdmin,
  watchGetViolations,
  watchFilterDistrict,
  watchUpdateCaseStatus,
  watchUpdateCaseEvidence
} from "./AdminSaga";

export default function* rootSaga() {
  yield all([
    watchUserRegistration(),
    watchUserLogin(),
    watchPasswordReset(),
    watchAllReportedCases(),
    watchDistrict(),
    watchMonthly(),
    watchGetSingleCase(),
    watchDeleteCase(),
    watchUpdateSingleCase(),
    watchUpdateCaseStatus(),
    watchUpdateCaseEvidence(),
    watchGeneratePdf(),
    watchUpdateRole(),
    watchGetAllUsers(),
    watchUpdateUser(),
    watchDeleteUser(),
    watchGetAllApplications(),
    watchGetApplication(),
    watchUpdateRoleAdmin(),
    watchGetViolations(),
    watchFilterDistrict()
  ]);
}
