import React, { Component } from 'react';
import { ActionCreators } from '../../../Store/ActionCreators';
import { connect } from 'react-redux';
import SignIn from './Signin';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

class LandingPage extends Component {
	state = {
		firstName: '',
		lastName: '',
		userName: '',
		password: '',
		phoneNumber: '',
		email: ''
	};

	componentDidMount() {
		// console.log(this.props);
	}

	handleChange = (key, event) => this.setState({ [key]: event.target.value });

	loginHandler = async () => {
		const { userLogin } = this.props;
		const { userName, password } = this.state;
		userLogin(userName, password, (response) => {
			if ((response.token && response.statusCode === 200) || (201 && response.data)) {
				// console.log('response log signin', response, this.props);
				return this.props.history.push('/overview');
			} else return alert('User Not Registered');
			// if (response.token) {
			// 	// console.log('we are in here.. can we see');
			// 	return this.props.history.push('/overview');
			// } else return;
		});
	};

	registerHandler = () => {
		const { userRegistration } = this.props;
		let { firstName, lastName, userName, email, password, phoneNumber } = this.state;
		userRegistration({ firstName, lastName, userName, email, password, phoneNumber });
	};

	render() {
		const { loading, error } = this.props;

		return (
			<div>
				<SignIn
					loginHandler={this.loginHandler}
					onChange={(key, value) => this.handleChange(key, value)}
					{...this.state}
					loading={loading}
					error={error}
				/>

				<SignUp
					registerHandler={this.registerHandler}
					onChange={(key, value) => this.handleChange(key, value)}
					{...this.state}
					loading={loading}
					error={error}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.adminReducer.loading,
	error: state.adminReducer.error
	// authenticated: state.adminReducer.token,
	// token: state.adminReducer.token
});

const mapDispatchToProps = (dispatch) => ({
	userLogin: (userName, password, callback) => dispatch(ActionCreators.userLoginAction(userName, password, callback)),
	userRegistration: (data) => dispatch(ActionCreators.userRegistrationAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
