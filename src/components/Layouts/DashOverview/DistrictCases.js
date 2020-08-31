import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import './Overview.scss';

const DistrictCases = (props) => {
	return (
		<div className="card">
			<CircularProgressbar
				value={props.value}
				maxValue={100}
				text={props.text}
				styles={{ path: { stroke: '#6055a5', fontSize: '20px' } }}
			/>
			<h3>Reported cases</h3>
			<h2>{props.district}</h2>
		</div>
	);
};

export default DistrictCases;
