import React from 'react';

import './DeleteCase.scss';

const DeleteCase = (props) => {
	const hideModalHandler = () => {
		const profileDOM = document.querySelector('.delete-container');
		profileDOM.classList.add('hide-delete-container');
	};

	return (
		<div className="delete-container">
			<div className="delete-form">
				<div className="close-icon">
					<i className="material-icons" onClick={hideModalHandler}>
						close
					</i>
				</div>
				<h2>Case Record will be permanently deleted, are you sure you want to delete?</h2>
				<div className="btns">
					<button type="submit" onClick={hideModalHandler}>
						Cancel
					</button>
					<button type="submit" onClick={props.delete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteCase;
