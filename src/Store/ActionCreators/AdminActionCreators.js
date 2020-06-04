import { AdminActions } from '../Actions';

export const toggleModalAction = () => ({
	type: AdminActions.TOGGLE_MODAL_ACTION
});

//USER REGISTRATION
export const userRegistrationAction = ({ firstName, lastName, userName, email, password, phoneNumber }) => ({
	type: AdminActions.USER_REGISTRATION_ACTION,
	firstName,
	lastName,
	userName,
	email,
	password,
	phoneNumber
});

export const userRegistrationSuccess = (payload) => ({
	type: AdminActions.USER_REGISTRATION_SUCCESS,
	payload
});

export const userRegistrationFail = (error) => ({
	type: AdminActions.USER_REGISTRATION_FAIL,
	error
});

//USER LOGIN
export const userLoginAction = (userName, password, callback) => ({
	type: AdminActions.USER_LOGIN_ACTION,
	userName,
	password,
	callback
});

export const userLoginSuccess = (payload) => ({
	type: AdminActions.USER_LOGIN_SUCCESS,
	payload
});

export const userLoginFail = (error) => ({
	type: AdminActions.USER_LOGIN_FAIL,
	error
});

//ALL REPORTED CASES
export const allReportedCases = (_id, callback) => ({
	type: AdminActions.ALL_REPORTED_CASES_ACTION,
	_id,
	callback
});

export const allReportedCasesSuccess = (payload) => ({
	type: AdminActions.ALL_REPORTED_CASES_SUCCESS,
	payload
});

export const allReportedCasesFail = (error) => ({
	type: AdminActions.ALL_REPORTED_CASES_FAIL,
	error
});

//RESET PASSWORD
export const resetPasswordAction = (identifier, callback) => ({
	type: AdminActions.RESET_PASSWORD_ACTION,
	identifier,
	callback
});

export const resetPasswordSuccess = (payload) => ({
	type: AdminActions.RESET_PASSWORD_SUCCESS,
	payload
});

export const resetPasswordFail = (error) => ({
	type: AdminActions.RESET_PASSWORD_FAIL,
	error
});
