import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { AdminRequest } from '../../../Store/API';


const Casechart = () => {
	const [ monthlyCases, setMonthlyCases ] = useState({});
	const [year, setYear] = useState()
	// console.log(monthlyCases)

	useEffect(() => {
		setMonthlyCases(getMonthlyTotalCases(year));
	}, []);

	const jan = monthlyCases.jan;
	const feb = monthlyCases.feb;
	const mar = monthlyCases.mar;
	const apr = monthlyCases.apr;
	const may = monthlyCases.may;
	const jun = monthlyCases.jun;
	const jul = monthlyCases.jul;
	const aug = monthlyCases.aug;
	const sep = monthlyCases.sep;
	const oct = monthlyCases.oct;
	const nov = monthlyCases.nov;
	const dec = monthlyCases.dec;

	const state = {
		labels: [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC' ],
		datasets: [
			{
				label: 'Case',
				backgroundColor: '#6055a5',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 0,
				data: [ jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec ]
			}
		]
	};

	const getMonthlyTotalCases = async (year) => {
		const baseUrl = 'https://pelard-n.herokuapp.com';
		const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';
		const token = await AdminRequest.getToken({ secret });
		let url  = `${baseUrl}/reports/monthly?year=${year}`
		axios
			.get(url,{
				method: 'GET',
				headers: {
					'content-Type': 'application/json',
					Authorization: token
				}
			})
			.then((res) => {
				// console.log('dev', res.data.data);
				setMonthlyCases(res.data.data);
				return res.data.data;
			})
			.catch((error) => {
				// console.log(error);
			});
	};

	return (
		<div>
			<h3>
				Reported cases in {monthlyCases.year}-<strong> {monthlyCases.total}</strong>
			</h3>
			<input placeholder="Enter Year" value={year} onChange={(e) => setYear(e.target.value)} />
						<button onClick={getMonthlyTotalCases(year)}>Search</button>
			<Bar
				width={100}
				height={300}
				data={state}
				options={{
					maintainAspectRatio: false
					// title: {
					// 	display: true,

					// 	fontSize: 20
					// },
					// legend: {
					// 	display: true
					// }
				}}
			/>
		</div>
	);
};

export default Casechart;
