import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'

import './Styles.scss'
const EditCase = (props) => {

    const violation = useSelector((state) => state.singleCase);

    const dispatch = useDispatch()

    const involved = violation.involved;
	const responses = violation.authorityResponse;
	const imageUrls = violation.injuries;
    const information = violation.otherInfo;

    const goBackRedirect = () => {
        props.history.goBack()
    }
    

    return (
        <div>
            <Navbar/>
            <Sidebar/>
           <div className="case-detail-main">
               <div className="detail-container">
                   <div className="case-header">
                   <h2>Update Report</h2>
                   <div className="back-icon" onClick={goBackRedirect} >
                   <i class="material-icons">arrow_back</i>
                   <h4>Go back</h4>
                   </div>
                   </div>
                   <div className="case-detail">
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Reporter's Name: </h4>
                            </div>
                            <div className="detail">
                            <input
                                value={violation.reporter && violation.reporter.name}
                                type="text"
                                placeholder="Enter information"
                            />
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Phone Number: </h4>
                            </div>
                            <div className="detail">
                            <input
                                value={ violation.reporter && violation.reporter.contact}
                                type="text"
                                placeholder="Enter information"
                            />
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Location: </h4>
                            </div>
                            <div className="detail">
                            <input
                                value={violation.location && violation.location.name}
                                type="text"
                                placeholder="Enter information"
                            />
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>District: </h4>
                            </div>
                            <div className="detail">
                            <input
                                value={violation.location && violation.location.district}
                                type="text"
                                placeholder="Enter information"
                            />
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Type of Violation: </h4>
                            </div>
                            <div className="detail">
                            <input
                                value={violation.type}
                                type="text"
                                placeholder="Enter information"
                            />
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Violation Description: </h4>
                            </div>
                            <div className="detail">
                            <input
                                value={violation.description}
                                type="text"
                                placeholder="Enter information"
                            />
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Persons Involved: </h4>
                            </div>
                            <div className="detail-column">
                            {
                                violation.involved && 
                                    involved.map(person => (
                                        <div className="detail-column">
                                            <div className="detail-row">
                                                <div className="row-label">
                                                    <h5>Name: </h5>
                                                </div>
                                                <div className="row-text">
                                                <input
                                                    value={person.name}
                                                    type="text"
                                                    placeholder="Enter information"
                                                />
                                                </div>
                                            </div>
                                            <div className="detail-row">
                                                <div className="row-label">
                                                    <h5>Type: </h5>
                                                </div>
                                                <div className="row-text">
                                                <input
                                                    value={person.type}
                                                    type="text"
                                                    placeholder="Enter information"
                                                />
                                                </div>
                                            </div>
                                            {person.relevantLinks.map(link => (
                                                <div className="relative-column">
                                                    <h4>Relative links</h4>
                                                    <div className="relative-row">
                                                        <div className="relative-label">
                                                            <h5>Description: </h5>
                                                        </div>
                                                        <div className="relative-text">
                                                        <input
                                                            value={link.description}
                                                            type="text"
                                                            placeholder="Enter information"
                                                        />
                                                        </div>
                                                    </div>
                                                    <div className="relative-row">
                                                        <div className="relative-label">
                                                            <h5>Link: </h5>
                                                        </div>
                                                        <div className="relative-text">
                                                            <h5>{link.link}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                            }
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Authority Response: </h4>
                            </div>
                            {
                                violation.authorityResponse && 
                                    responses.map(response => (
                                    <div className="detail-column">
                                        <div className="detail-row">
                                            <div className="row-label">
                                            <h5>Name: </h5>
                                            </div>
                                            <div className="row-text">
                                            <input
                                                    value={response.name}
                                                    type="text"
                                                    placeholder="Enter information"
                                                />
                                            </div>
                                        </div>
                                        <div className="detail-row">
                                            <div className="row-label">
                                            <h5>Type: </h5>
                                            </div>
                                            <div className="row-text">
                                            <input
                                                    value={response.response}
                                                    type="text"
                                                    placeholder="Enter information"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    ))
                            }
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Sustained Injury: </h4>
                            </div>
                            <div className="detail-column">
                                {violation.injuries && imageUrls.map(injure => (
                                    <div className="detail-column">
                                        <div className="detail-row">
                                            <div className="row-label">
                                                <h5>Injury: </h5>
                                            </div>
                                            <div className="row-text">
                                            <input
                                                    value={injure.description}
                                                    type="text"
                                                    placeholder="Enter information"
                                                />
                                            </div>
                                        </div>
                                        <div className="detail-row">
                                            <div className="row-label">
                                                <h5>Link: </h5>
                                            </div>
                                            <div className="row-text">
                                                <h5>{injure.link}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="case-detail-row">
                            <div className="label">
                            <h4>Other information: </h4>
                            </div>
                            <div className="detail-column">
                                {violation.otherInfo && information.map(info => (
                                    <div className="detail-column">
                                        <div className="detail-row">
                                            <div className="row-label">
                                                <h5>Injury: </h5>
                                            </div>
                                            <div className="row-text">
                                            <input
                                                    value={info.description}
                                                    type="text"
                                                    placeholder="Enter information"
                                                />
                                            </div>
                                        </div>
                                        <div className="detail-row">
                                            <div className="row-label">
                                                <h5>Link: </h5>
                                            </div>
                                            <div className="row-text">
                                                <a href={info.link} target="blank">
                                                    {info.link}
                                                </a>
                                            </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="button-div">
                        <button>Cancel</button>
                        <button>Update Report</button>
                    </div>
               </div>
           </div>
        </div>
    )
}

export default EditCase
