import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import * as actionCreators from '../../../Store/ActionCreators'

import './Styles.scss'
const Cases = (props) => {

    const cases = useSelector(state => state.get.cases)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(actionCreators.getCases())
    },[dispatch])

    const tableHeaders = [
        { label: 'Reporter', id: '1' },
        { label: 'Location', id: '2' },
        { label: 'Violation Type', id: '3' },
        { label: 'Phone Number', id: '4' },
        { label: 'Date', id: '5' },
    ];
    const convertDate = (date) => new Date(date).toDateString();
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div className="case-main">
                <div className="table-container">
                    <div className="table-header">
                        <div className="header">
                            <h3>Cases</h3>
                            <div className="search-container">
                                <input
                                    placeholder="Search Table"
                                />
                                <i class="material-icons">search</i>
                            </div>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr className="table-header-row" key={tableHeaders.id}>
                                {tableHeaders.map(tableHeader => <td><h6>{tableHeader.label}</h6></td>)}
                            </tr>
                            {cases.map((row) => {
						
                                return (
                                    <tr id={row._id} className="table-detail-row" onClick={() => dispatch(actionCreators.getSingleCase(row._id,(res)=>{
                                        if(res.success === true){
                                            return props.history.push('./case-details')
                                        }
                                    }
                                    
                                    ))}>
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
            </div>
        </div>
    )
}

export default Cases
