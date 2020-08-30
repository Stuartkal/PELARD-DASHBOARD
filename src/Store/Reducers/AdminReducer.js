import { AdminActions } from '../Actions';

const initialState = {
	userId: '',
	userName: '',
	email: '',
	error: '',
	token: '',
	loading: false,
	allCases: [],
	authenticated: localStorage.getItem('adminToken'),
	mediaAttachments: false,
	modalShowing: false
};

export default function(state = initialState, { type, payload, error }) {
	switch (type) {
		case AdminActions.TOGGLE_MODAL_ACTION:
			return { ...state, modalShowing: !state.modalShowing };
		//USER REGISTRATION
		case AdminActions.USER_REGISTRATION_ACTION:
			return { ...state, loading: true };
		case AdminActions.USER_REGISTRATION_SUCCESS:
			return { ...state, loading: false };
		case AdminActions.USER_REGISTRATION_FAIL:
			return { ...state, loading: false, error: error.message };

		//UESR LOGIN
		case AdminActions.USER_LOGIN_ACTION:
			return { ...state, loading: true };
		case AdminActions.USER_LOGIN_SUCCESS:
			// console.log('token', payload);
			localStorage.setItem('adminToken', payload.token);
			return {
				...state,
				loading: true,
				token: payload.token,
				userId: payload.data.user._id,
				userName: payload.data.user.userName,
				email: payload.data.user.emailS
			};
		case AdminActions.USER_LOGIN_FAIL:
			return { ...state, loading: true, error: error.message };

		//GET ALL REPORTED CASES
		case AdminActions.ALL_REPORTED_CASES_ACTION:
			return { ...state, loading: true };
		case AdminActions.ALL_REPORTED_CASES_SUCCESS:
			return { ...state, loading: false, allCases: payload.data.violations };
		case AdminActions.ALL_REPORTED_CASES_FAIL:
			return { ...state, loading: false };

		//RESET PASSWORD
		case AdminActions.RESET_PASSWORD_ACTION:
			return { ...state, loading: true };
		case AdminActions.RESET_PASSWORD_SUCCESS:
			return { ...state, loading: false };
		case AdminActions.RESET_PASSWORD_FAIL:
			return { ...state, loading: false, error: payload.data.message };
		default:
			return state;

		//UPDATE VIOLATION
		// 		case AdminActions.UPDATE_VIOLATION_ACTION:
		// 			return { ...state, loading: true };
		// 		case AdminActions.UPDATE_VIOLATION_SUCCESS:
		// 			return { ...state, loading: false };
		// 		case AdminActions.USER_LOGIN_FAIL:
		// 			return { ...state, loading: false, error: error.message };
	}
}
