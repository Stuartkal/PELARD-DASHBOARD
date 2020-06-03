import React from 'react';
import { withRouter } from 'react-router-dom';

import './Sidebar.scss';
const Dashlink2 = withRouter((props) => {
	const redirectToCases = () => {
		return props.history.push('/overview/cases');
	};

	return (
		<div className="dash-link-main" onClick={redirectToCases}>
			<div className="dash-link1">
				<i class="material-icons">view_list</i>
				<a href="#">All Reported Cases</a>
			</div>
		</div>
	);
});

export default Dashlink2;
