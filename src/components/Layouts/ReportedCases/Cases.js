import React, { Component } from 'react';
import CaseTable from './CaseTable';
import Sidebar from '../../Routes/SideBar/Sidebar';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../Store/ActionCreators';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import Fuse from 'fuse.js';
import { AdminRequest } from '../../../Store/API';

import './Cases.scss';
class Cases extends Component {
	state = {
		role: '',
		searchResult: '',
		filteredCases: [],
		searchFilter: [],
		showBtn: true
	};

	async componentDidMount() {
		const { getAllReportedCases } = this.props;
		const { userId } = this.props;
		getAllReportedCases(userId, (response) => {
			// console.log(response);
			this.setState({ filteredCases: this.props.allCases, searchFilter: this.props.allCases });
		});
	}

	toggleModal = (data) => {
		// console.log('logged data', data);
		return this.props.history.push('/case-details', { data });
	};

	humburgerHandler = () => {
		const profileDOM = document.querySelector('.sidebar-main');
		profileDOM.classList.add('sidebar-main-slide');
	};

	adminRoleHandler = async () => {
		const { role } = this.state;
		const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';
		const token = await AdminRequest.getToken({ secret });
		const baseUrl = 'https://pelard-n.herokuapp.com';
		const { userId } = this.props;
		const response = await fetch(`${baseUrl}/user/${userId}/apply`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			},
			body: JSON.stringify({ role })
		});
		const json = await response.json();
		console.log('my respone', json);
		if (json.statusCode === 201) {
			const profileDOM = document.querySelector('.message-alert');
			profileDOM.classList.add('show-message-alert');
		} else return alert('Request failed');
	};

	handleFormVisibility = () => {
		const profileDOM = document.querySelector('.case-form');
		profileDOM.classList.add('showCase');
		this.setState({ showBtn: false });
	};

	searchHandler = (e) => {
		const search = e.target.value;
		this.setState({
			searchResult: search
		});
		if (search.length === 0) {
			this.setState({
				filteredCases: this.state.searchFilter
			});
		} else {
			const filter = this.state.searchFilter;

			const options = {
				threshold: 0.5,
				distance: 10,
				// useExtendedSearch: false,
				keys: [ 'location.name', 'reporter.name', 'type', 'reportedDateAndTime' ]
			};

			const fuse = new Fuse(filter, options);

			const Result = fuse.search(search);
			// console.log(Result);
			this.setState({ filteredCases: Result });
		}
	};

	render() {
		const { loading } = this.props;
		// console.log(this.props);
		const caseHeader = [
			{ label: 'Reporter ' },
			{ label: 'District' },
			{ label: 'Violations' },
			{ label: 'Phone Number' },
			{ label: 'Date' }
		];
		return (
			<div>
				<Sidebar />
				<div className="humburger_menu">
					<i className="material-icons" onClick={this.humburgerHandler}>
						dehaze
					</i>
				</div>

				{this.state.filteredCases.length > 0 ? (
					<div className="cases-main">
						<div className="search-container">
							<i className="material-icons" onClick={this.searchHandler}>
								search
							</i>
							<input
								placeholder="Search Reporter, Violation, District"
								type="text"
								value={this.state.searchResult}
								onChange={(e) => this.searchHandler(e)}
							/>
						</div>

						<CaseTable
							caseHeaders={caseHeader}
							data={this.state.filteredCases}
							toggleModal={(row) => this.toggleModal(row)}
						/>
					</div>
				) : (
					<div className="cases-main-form">
						{loading && <CircularProgress />}
						{this.state.showBtn && (
							<button onClick={this.handleFormVisibility}>
								GET CONTRIBUTOR ROLE TO ACCESS ALL REPORTED CASES
							</button>
						)}
						<div className="case-form">
							<input
								placeholder="role"
								type="text"
								value={this.state.role}
								onChange={(e) => this.setState({ role: e.target.value })}
							/>
							<button onClick={this.adminRoleHandler}>Request</button>
							<h3>Access will be granted if eligible</h3>
						</div>
						<div className="message-alert">
							<p>Request sent successfully, email verification will be sent to you shortly</p>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.adminReducer.loading,
	allCases: state.adminReducer.allCases,
	userId: state.adminReducer.userId
});

const mapDispatchToProps = (dispatch) => ({
	getAllReportedCases: (_id, callback) => dispatch(ActionCreators.allReportedCases(_id, callback)),
	toggleModal: () => dispatch(ActionCreators.toggleModalAction())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cases));
