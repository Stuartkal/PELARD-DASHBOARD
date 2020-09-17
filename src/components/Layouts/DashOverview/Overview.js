import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
import Sidebar from '../../Routes/SideBar/Sidebar';
import Casechart from './Casechart';
import DistrictCases from './DistrictCases';
// import { ViolationRequest } from '../DashOverview/Requests';
import { AdminRequest } from '../../../Store/API/';
import axios from 'axios';

import './Overview.scss';
// import '../../Routes/SideBar/Sidebar.scss';
const Overview = () => {
	const humburgerHandler = () => {
		const profileDOM = document.querySelector('.sidebar-main');
		profileDOM.classList.add('sidebar-main-slide');
	};

	const [ districtCases, setDistrictCases ] = useState({});

	useEffect(() => {
		setDistrictCases(getDistrictTotalCases());
	}, []);

	const getDistrictTotalCases = async (_id) => {
		const baseUrl = 'https://pelard-n.herokuapp.com';
		const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';
		const token = await AdminRequest.getToken({ secret });

		axios
			.get(`${baseUrl}/reports/districts`, {
				method: 'GET',
				headers: {
					'content-Type': 'application/json',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log('dev', res.data.data);
				setDistrictCases(res.data.data);
				return res.data.data;
			})
			.catch((error) => {
				// console.log(error);
			});
	};

	// console.log('hov', districtCases);

	// console.log(districtCases);
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
							<DistrictCases district="AGOGO" value={districtCases.Agogo} text={districtCases.Agogo} />
							<DistrictCases district="PADER" value={districtCases.Pader} text={districtCases.Pader} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Overview;
