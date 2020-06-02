import React, { useEffect, useState } from 'react';
import Sidebar from '../../Routes/SideBar/Sidebar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { AdminRequest } from '../../../Store/API';

import './CaseDetails.scss';

const CaseDetails = (props) => {
	// console.log('violations', props);
	const [ caseDetails, setcaseDetails ] = useState({});

	useEffect(() => {
		const { data } = props.location.state;
		setcaseDetails(data);
	}, []);
	console.log('CaseDetails violations', caseDetails);

	//Convert Date
	const convertDate = (date) => new Date(date).toDateString();

	//Toggle Humburger Menu
	const humburgerHandler = () => {
		const profileDOM = document.querySelector('.sidebar-main');
		profileDOM.classList.add('sidebar-main-slide');
	};
	//Create And Download PDFs
	const createAndDownLoadPdf = () => {
		const profId = caseDetails._id;
		console.log('my id', profId);
		return (
			window.open(`https://pelard-n.herokuapp.com/documents/${profId}/generate-pdf`, '_blank') ||
			(window.location.href = `https://pelard-n.herokuapp.com/documents/${profId}/generate-pdf`)
		);
	};

	const involved = caseDetails.involved;
	const responses = caseDetails.authorityResponse;
	// const otherInfo = caseDetails.otherInfo;
	const imageUrls = caseDetails.injuries;

	return (
		<div>
			<Sidebar />

			<div className="case-details-main">
				<Button size="small" style={{ color: '#17448a' }} onClick={() => props.history.push('/overview/cases')}>
					<ArrowBackIcon style={{ color: '#17448a' }} /> Go back
				</Button>
				<div className="humburger_menu">
					<i className="material-icons" onClick={humburgerHandler}>
						dehaze
					</i>
				</div>
				<div className="case-header">
					<h2>Case Details</h2>

					<div className="case-icons">
						<div className="case-date">
							<h4>{convertDate(caseDetails.reportedDateAndTime)}</h4>
						</div>
						{/* <i className="material-icons">share</i> */}
						<i className="material-icons" onClick={createAndDownLoadPdf}>
							file_download
						</i>
					</div>
				</div>
				<div className="separator" />
				<div className="case-row">
					<div className="case-main">
						<div className="case-details">
							{/* <div className="case-details-row">
								<div className="label">
									<h3>Case: </h3>
								</div>
								<div className="detail">
									<h4>{caseDetails && caseDetails._id}</h4>
								</div>
							</div> */}
							<div className="case-details-row">
								<div className="label">
									<h3>Reporter's Name: </h3>
								</div>
								<div className="detail">
									<h4>{caseDetails.reporter && caseDetails.reporter.name}</h4>
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Phone Number: </h3>
								</div>
								<div className="detail">
									<h4>{caseDetails.reporter && caseDetails.reporter.contact}</h4>
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Type of Violation: </h3>
								</div>
								<div className="detail">
									<h4>{caseDetails && caseDetails.type}</h4>
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Location of Violation: </h3>
								</div>
								<div className="detail">
									<h4>{caseDetails.location && caseDetails.location.name}</h4>
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Violance Description: </h3>
								</div>
								<div className="detail">
									<h4>{caseDetails && caseDetails.description}</h4>
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Persons Involved: </h3>
								</div>
								<div className="detail">
									{caseDetails.involved &&
										involved.map((person) => (
											<div className="detail-row">
												<div className="label-data">
													<h3>Person: </h3>
												</div>
												<h4>{person.name}</h4>
												<div className="label-data">
													<h3>Type: </h3>
												</div>
												<h4>{person.type}</h4>
											</div>
										))}
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Authority Response: </h3>
								</div>
								<div className="detail">
									{caseDetails.authorityResponse &&
										responses.map((response) => (
											<div className="detail-row">
												<div className="label-data">
													<h3>Officer: </h3>
												</div>
												<h4>{response.name}</h4>
												<div className="label-data">
													<h3>Response: </h3>
												</div>
												<div className="data">
													<h4>{response.response}</h4>
												</div>
											</div>
										))}
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Injury Description: </h3>
								</div>
								<div className="detail">
									{caseDetails.injuries &&
										imageUrls.map((url) => (
											<div className="detail">
												<h4>{url.description}</h4>
											</div>
										))}
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Injury Media Attachment: </h3>
								</div>
								<div className="gallery">
									{caseDetails.injuries && imageUrls.map((url) => <img src={url.link} alt="image" />)}
								</div>
							</div>
							<div className="case-details-row">
								<div className="label">
									<h3>Injury Image Links: </h3>
								</div>
								<div className="detail">
									{caseDetails.injuries &&
										imageUrls.map((url) => (
											<div className="detail">
												<a href={url.link} target="blank">
													{url.link}
												</a>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CaseDetails;
