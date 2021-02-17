import React, { useEffect, useState } from 'react';
import Sidebar from '../../Routes/SideBar/Sidebar';
import Casechart from './Casechart';
import DistrictCases from './DistrictCases';
import { ViolationRequest } from '../DashOverview/Requests';

import './Overview.scss';

const Overview = () => {
	const humburgerHandler = () => {
		const profileDOM = document.querySelector('.sidebar-main');
		profileDOM.classList.add('sidebar-main-slide');
	};


	const [districtCases, setDistrictCases] = useState({});

	useEffect(() => {
		ViolationRequest.getDistrictTotalCases((response) => {
			// console.log('response in usefeffect', response);
			setDistrictCases(response);
		});
	}, []);

	return (
		<div>
			<Sidebar />
			<div className="overview-main">
				<div className="humburger_menu">
					<i className="material-icons" onClick={humburgerHandler}>
						dehaze
					</i>
				</div>
				<div className="chart-main">
					<div className="chart-container">

						<Casechart />
					</div>
					<div className="chart-main-row">
						<h2>CASE DISTRIBUTION IN DISTRICTS</h2>
						<div className="row">
							<DistrictCases district="GULU" value={districtCases.Gulu} text={districtCases.Gulu} />
							<DistrictCases district="LAMWO" value={districtCases.Lamwo} text={districtCases.Lamwo} />
							<DistrictCases district="KITGUM" value={districtCases.Kitgum} text={districtCases.Kitgum} />
							<DistrictCases district="AMURU" value={districtCases.Amuru} text={districtCases.Amuru} />
							<DistrictCases district="NWOYA" value={districtCases.Nwoya} text={districtCases.Nwoya} />
							<DistrictCases district="AGAGO" value={districtCases.Agogo} text={districtCases.Agogo} />
							<DistrictCases district="PADER" value={districtCases.Pader} text={districtCases.Pader} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Overview;
