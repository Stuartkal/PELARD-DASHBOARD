import React from 'react';
import { withRouter } from 'react-router-dom';

import './Sidebar.scss';
const Dashlink3 = withRouter((props) => {
	return (
		<div className="dash-link-main">
			<div className="dash-link1">
				<i class="material-icons">report</i>
				<a href="https://www.report.pelard-n.org/" target="blank">
					Report Cases
				</a>
			</div>
		</div>
	);
});

export default Dashlink3;
