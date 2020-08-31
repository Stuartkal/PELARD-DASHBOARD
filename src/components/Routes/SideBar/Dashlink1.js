import React from 'react';
import { withRouter } from 'react-router-dom';

import './Sidebar.scss';
const Dashlink1 = withRouter((props) => {
	const redirectToOverview = () => {
		return props.history.push('/overview');
	};

	return (
		<div className="dash-link-main" onClick={redirectToOverview}>
			<div className="dash-link1">
				<i class="material-icons">dashboard</i>
				<a href="#">Dashboard</a>
			</div>
		</div>
	);
});

export default Dashlink1;
