import { AdminActions } from '../Actions';
import { ActionCreators } from '../ActionCreators';
import { AdminRequest } from '../API';
import { call, put, takeLatest } from 'redux-saga/effects';

//USER REGISTRATION
function* watchUserRegistration() {
	yield takeLatest(AdminActions.USER_REGISTRATION_ACTION, registerUser);
}

function* registerUser({ firstName, lastName, userName, email, password, phoneNumber }) {
	try {
		const response = yield call(() =>
			AdminRequest.userRegistration({ firstName, lastName, userName, email, password, phoneNumber })
		);
		yield put(ActionCreators.userRegistrationSuccess(response));
	} catch (error) {
		yield put(ActionCreators.userRegistrationFail(error));
	}
}

//USER LOGIN
function* watchUserLogin() {
	yield takeLatest(AdminActions.USER_LOGIN_ACTION, loginUser);
}

function* loginUser({ userName, password, callback }) {
	try {
		const response = yield call(() => AdminRequest.userLogin(userName, password));
		// console.log('setting token', response);
		yield put(ActionCreators.userLoginSuccess(response));
		if (response.data.user._id) {
			yield sessionStorage.setItem('adminId', response.data.user._id);
		}
		callback(response);
	} catch (error) {
		yield put(ActionCreators.userLoginFail(error));
	}
}

//ALL REPORTED CASES
function* watchAllReportedCases() {
	yield takeLatest(AdminActions.ALL_REPORTED_CASES_ACTION, reportedCases);
}

function* reportedCases({ _id, callback }) {
	try {
		const response = yield call(() => AdminRequest.getReportedCases(_id));
		// console.log('my response', response);
		if (response.statusCode === 401) {
			yield put(ActionCreators.allReportedCasesFail(response));
		} else yield put(ActionCreators.allReportedCasesSuccess(response));
		callback(response.data.violations);
	} catch (error) {
		yield put(ActionCreators.allReportedCasesFail(error));
	}
}

//PASSWORD RESET
function* watchResetPassword() {
	yield takeLatest(AdminActions.RESET_PASSWORD_ACTION, passwordReset);
}

function* passwordReset({ identifier, callback }) {
	try {
		const response = yield call(() => AdminRequest.resetAdminPassword({ identifier, callback }));
		// console.log('password reset response', response);
		callback(response);
		yield put(ActionCreators.resetPasswordSuccess(response));
	} catch (error) {
		yield put(ActionCreators.resetPasswordFail(error));
	}
}

export { watchUserRegistration, watchUserLogin, watchAllReportedCases, watchResetPassword };
