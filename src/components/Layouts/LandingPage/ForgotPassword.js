import React, { Component } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import { ActionCreators } from '../../../Store/ActionCreators';
import { connect } from 'react-redux';
import './LandingPage.scss';

class ForgotPassword extends Component {
	state = {
		identifier: ''
	};

	componentDidMount() {
		console.log(this.props);
	}

	resetPasswordHandler = () => {
		const { resetPassword } = this.props;
		const { identifier } = this.state;
		resetPassword(identifier, (response) => {
			if (response.statusCode === 200) {
				return alert('Email sent Successfully');
			} else return alert('Failed');
		});
	};

	render() {
		const identifier = this.state.identifier;
		const { error } = this.props;
		const resetPasswordHandler = this.resetPasswordHandler;
		return (
			<div>
				<div className="login-main">
					<h1>PELARD-N</h1>
					<h2>Forgot Password</h2>
					<p>
						When you fill in your registered email address, you will be sent instructions on how to reset
						your password
					</p>
					<div className="input-form">
						<input
							type="email"
							placeholder="Email"
							value={identifier}
							onChange={(e) => this.setState({ identifier: e.target.value })}
						/>
					</div>
					<Button size="small" style={{ backgroundColor: '#6055a5' }} onClick={resetPasswordHandler}>
						<ArrowForwardIosIcon style={{ color: '#fff' }} />
					</Button>
					<div className="login-links">
						Already have an account Login?{' '}
						<a href="#" onClick={() => this.props.history.push('/')}>
							Login
						</a>
					</div>
					<h3 style={{ color: 'red' }}>{error}</h3>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	error: state.adminReducer.error
});

const mapDispatchToProps = (dispatch) => ({
	resetPassword: (identifier, callback) => dispatch(ActionCreators.resetPasswordAction(identifier, callback))
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
