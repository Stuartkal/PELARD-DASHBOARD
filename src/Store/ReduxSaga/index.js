import { all } from 'redux-saga/effects';
import { watchUserRegistration, watchUserLogin, watchAllReportedCases, watchResetPassword } from './AdminSaga';

export default function* rootSaga() {
	yield all([ watchUserRegistration(), watchUserLogin(), watchAllReportedCases(), watchResetPassword() ]);
}
