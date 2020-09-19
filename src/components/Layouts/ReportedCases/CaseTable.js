import React from 'react';

import './Cases.scss';

const CaseTable = ({ caseHeaders, data, toggleModal }) => {
	// let date = new Date(dateTime).toDateString();

	const convertDate = (date) => new Date(date).toDateString();
	return (
		<div className="table-container">
			<table>
				<tbody>
					<tr className="table-header-row">{caseHeaders.map((caseHeader) => <td>{caseHeader.label}</td>)}</tr>
					{data.map((row_) => {
						const row = row_.item ? row_.item : row_;
						// console.log(row);
						return (
							<tr id={row._id} className="table-detail-row" onClick={() => toggleModal(row)}>
								<td>{row.reporter.name}</td>
								<td>{row.location.name}</td>
								<td>{row.type}</td>
								<td>{row.reporter.contact}</td>
								<td>{convertDate(row.reportedDateAndTime)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CaseTable;
