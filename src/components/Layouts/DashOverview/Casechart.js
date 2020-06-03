import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const state = {
	labels: [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC' ],
	datasets: [
		{
			label: 'Case',
			backgroundColor: '#6055a5',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 0,
			data: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
		}
	]
};

class Casechart extends Component {
	render() {
		return (
			<div>
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
	}
}

export default Casechart;
