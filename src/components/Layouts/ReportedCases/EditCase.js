import React, { useState, useEffect } from 'react';
import { AdminRequest } from '../../../Store/API';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './EditCase.scss';

const EditCase = (props) => {
	const [ violation, setViolation ] = useState({});
	const [ name, setName ] = useState('');
	const [ contact, setContact ] = useState('');
	const [ violationType, setviolationType ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ violationDesc, setviolationDesc ] = useState('');

	useEffect(() => {
		const { data } = props.location.state;
		setViolation(data);
		setName(data.reporter.name);
		setContact(data.reporter.contact);
		setviolationType(data.type);
		setviolationDesc(data.description);
		setLocation(data.location.name);
	}, []);
	// console.log('my case ', violation.reporter && violation.reporter.name);

	const hideModalHandler = () => {
		const profileDOM = document.querySelector('.edit-container');
		profileDOM.classList.add('hide-edit-container');
	};

	const updateViolation = async () => {
		// const data = { name, contact, violationType, location, violationDesc };
		const baseUrl = 'https://pelard-n.herokuapp.com';
		const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';
		const token = await AdminRequest.getToken({ secret });
		const caseID = violation._id;
		axios
			.put(
				`${baseUrl}/violations/${caseID}`,
				{
					type: violationType,
					description: violationDesc,
					reporter: {
						name: name,
						contact: contact
					},
					location: {
						name: location
					}
				},
				{
					headers: {
						'content-Type': 'application/json',
						Authorization: token
					}
				}
			)
			.then((res) => {
				// console.log(res);
				if (res.status === 201) {
					return props.history.push('/overview/cases');
				} else {
					alert('Invalid input');
				}
			})
			.catch((errors) => {
				console.log(errors);
			});
	};

	return (
		<div className="edit-container">
			<div className="edit-form">
				<div className="close-icon">
					<i className="material-icons" onClick={hideModalHandler}>
						close
					</i>
				</div>
				<h3>Enter field to edit</h3>
				<input placeholder="Reporter Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
				<input
					placeholder="Reporter Contact"
					type="text"
					value={contact}
					onChange={(e) => setContact(e.target.value)}
				/>
				<input
					placeholder="Violation Type"
					type="text"
					value={violationType}
					onChange={(e) => setviolationType(e.target.value)}
				/>
				<input
					placeholder="Location"
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
				<textarea
					placeholder="Violation Description"
					value={violationDesc}
					onChange={(e) => setviolationDesc(e.target.value)}
				/>
				<button onClick={updateViolation}>Save changes</button>
				<p>All fields are not Editable for purposes of integrity</p>
			</div>
		</div>
	);
};

export default withRouter(EditCase);
