import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

import './LandingPage.scss';
const Signin = withRouter((props) => {
	const showSignUpModal = () => {
		const profileDOM = document.querySelector('.signUp-main');
		profileDOM.classList.add('show-signUp-main');
	};

	return (
		<div>
			<div className="login-main">
				<h1>PELARD-N</h1>
				<h2>Login</h2>
				<div className="input-form">
					<input
						type="text"
						placeholder="userName"
						value={props.userName}
						onChange={(e) => props.onChange('userName', e)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={props.password}
						onChange={(e) => props.onChange('password', e)}
					/>
				</div>
				<div className="login-links">
					Forgot Password?{' '}
					<a href="#" onClick={() => props.history.push('/reset-password')}>
						click here
					</a>
				</div>
				<button onClick={props.loginHandler}>
					{props.loading ? (
						<CircularProgress style={{ color: '#fff', width: '30px', height: '30px' }} />
					) : (
						'Login'
					)}
				</button>
				<div className="signup-link" onClick={props.close}>
					<a href="#" onClick={showSignUpModal}>
						Sign Up here
					</a>
				</div>
				<h3 style={{ color: 'red' }}>{props.error}</h3>
			</div>
		</div>
	);
});

export default Signin;
