import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import logo from "../../../assets/images/pelard.png";
import { ActionCreators } from "../../../Store/ActionCreators";
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import "./Styles.css";
const CaseDetails = (props) => {

  const [editModal, setEditModal] = React.useState(false)
  const [evidenceModal, setEvidenceModal] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [state, setState] = React.useState({
    status: '',
    narrative:'',
    image:'',
    evidenceDescription:'',
    evidenceType:'',
    message:'',
    msg:''
  })

  const violation = props.location.state.violation;
  const user = useSelector((state) => state.user);

  // console.log(url,state.image,'ll')
  // console.log(props.location.state.violation)
  const dispatch = useDispatch();

  const updateCaseStatus = () => {
    if(!state.status && !state.narrative) return setState({message:'Please enter all fields'})
    dispatch(
      ActionCreators.updatingCaseStatus(
        user._id,
        violation._id,
        state.status,
        state.narrative,
        violation.status,
        state.status,
        (res) => {
          if(res.success) {
              setState({
                status:'',
                narrative:'',
                message:'Case Status will be updated shortly, Thank You!'
              })
          }
          else {
              setState({
                message:'Case Status was not updated, try again'
              })
          }
        } 
      )
    )
  }

  const updateCaseEvidence = () => {

    if(!state.evidenceDescription && !url) return setState({msg:'Please enter all fields'})

    dispatch(
      ActionCreators.updatingCaseEvidence(
        user._id,
        violation._id,
        url,
        state.evidenceDescription,
        state.evidenceType,
        (res) => {
            if(res.success) {
              setState({
                status:'',
                narrative:'',
                msg:'Case Evidence will be updated shortly, Thank You!'
              })
          }
          else {
              setState({
                msg:'Case Evidence was not updated, try again'
              })
          }
        }
      )
    )
  }


  const array = violation.narratives && violation.narratives.slice(-1).pop()
  // console.log(violation.narratives)

  const deleteViolationHandler = () => {
    dispatch(ActionCreators.deletingCase(user._id, violation._id, (res) => {
      if (res.success === true) {
        props.history.push('/cases')
      }
    }))
  }
  const updateRedirect = () => {
    props.history.push("/edit-details");
  };

  const uploadImage = async () => {

    if(!state.image) return setState({msg:'No image has been selected, please select image'})

      const data = new FormData()
      data.append("file", state.image)
      data.append("upload_preset", "dh1h4tq3")
      data.append("folder","pelard-n")

     await fetch("https://api.cloudinary.com/v1_1/dwa3soopc/image/upload",{
      method:"post",
      body: data
      })
      .then(resp => resp.json())
      .then(data => {
      setUrl(data.url)
      })
      .catch(err => console.log(err))
  }


  const role = user.role
  const admin = 'admin'

  let update_link = (<EditIcon style={{color:'#01579b', fontSize:'30px'}} className="case-icons" onClick={updateRedirect} />)

  if (JSON.stringify(role) !== JSON.stringify(admin)) {
    update_link = null
  }
  

  const convertDate = (date) => new Date(date).toDateString();
  const involved = violation.involved;
  const responses = violation.authorityResponse;
  const injuries = violation.injuries;
  const information = violation.otherInfo;

  return (
    <div>
      <Navbar />
      <div className="case-detail-main">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column">
          <div className="detail-container">
            <img src={logo} alt="logo" />
            <div className="case-header">
              <h2>Case Details</h2>
              <div className="icons">
                <h4>{convertDate(violation.reportedDateAndTime)}</h4>
                <GetAppIcon style={{color:'#01579b', fontSize:'30px'}} className="case-icons"  onClick={() => dispatch(ActionCreators.generatingPdf(violation._id))} />
                {update_link}
                <DeleteIcon style={{color:'#01579b', fontSize:'30px'}} className="case-icons" onClick={deleteViolationHandler} />
              </div>
            </div>
            <div className="case-detail">
              <div className="case-detail-row">
                <div className="label">
                  <h4>Case Status: </h4>
                </div>
                <div className="status">
                  {editModal ? null : <h5>{violation.status}</h5>}
                {!editModal && user.role === 'admin' ? 
                <EditIcon 
                style={{color:'#01579b', fontSize:'20px'}} 
                className="case-icons" 
                onClick={() => setEditModal(true)}/>
                 : null}
                 {violation.status.value === 'pending' ? <button>update to referred request</button> : null}
                 {violation.status.value === 'referred' ? <button>update to under litigation request</button> : null}
                 {violation.status.value === 'under litigation' ? <button>update to resolved request</button> : null}
                </div>
                  {editModal ? <div className="status-update">
                    <select value={state.status} onChange={(e) => setState({ ...state, status: e.target.value })}>
                      <option value="pending">pending</option>
                      <option value="resolved">resolved</option>
                      <option value="referred">referred</option>
                      <option value="under litigation">under litigation</option>
                    </select>
                    <textarea 
                      placeholder="Add brief narative about the status"
                      value={state.narrative}
                      onChange={(e) => setState({ ...state, narrative: e.target.value })}
                    />
                    <div className="status-btn">
                      <button onClick={updateCaseStatus}>Save</button>
                      <button onClick={() => setEditModal(false)}>Close</button>
                    </div>
                    <p>{state.message}</p>
                  </div> : null}
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Case Status Narrative: </h4>
                </div>
                    <div className="detail-column">
                      <div className="detail-row">
                        <div className="row-label">
                          <h5>Narrative: </h5>
                        </div>
                        <div className="row-text">
                          <h5>{array && array.description}</h5>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="row-label">
                          <h5>Previous Status: </h5>
                        </div>
                        <div className="row-text">
                          <h5>{array && array.previousStatus}</h5>
                        </div>
                      </div>
                    </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Reporter's Name: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.reporter}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Phone Number: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.phone}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Town: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.town}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>District: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.district}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Type of Violation: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.type}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Violation Description: </h4>
                </div>
                <div className="detail">
                  <h5>{violation.description}</h5>
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Persons Involved: </h4>
                </div>
                <div className="detail-column">
                  {involved && violation.involved.map((person) => (
                      <div className="detail-column">
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Name: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{person.name}</h5>
                          </div>
                        </div>
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Type: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{person.type}</h5>
                          </div>
                        </div>
                        {person.relevantLinks.map((link) => (
                          <div className="relative-column">
                            <h4>Relative links</h4>
                            <div className="relative-row">
                              <div className="relative-label">
                                <h5>Description: </h5>
                              </div>
                              <div className="relative-text">
                                <h5>{link.description}</h5>
                              </div>
                            </div>
                            <div className="relative-row">
                              <div className="relative-label">
                                <h5>Gender: </h5>
                              </div>
                              <div className="relative-text">
                                <h5>{link.link}</h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Authority Response: </h4>
                </div>
                {responses && violation.authorityResponse.map((response) => (
                    <div className="detail-column">
                      <div className="detail-row">
                        <div className="row-label">
                          <h5>Name: </h5>
                        </div>
                        <div className="row-text">
                          <h5>{response.name}</h5>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="row-label">
                          <h5>Type: </h5>
                        </div>
                        <div className="row-text">
                          <h5>{response.response}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Evidence: </h4>
                </div>
                <div className="detail-column">
                  {injuries && violation.injuries.map((injure) => (
                      <div className="detail-column">
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Description: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{injure.description}</h5>
                          </div>
                        </div>
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Visual: </h5>
                          </div>
                          <div className="row-text">
                            <img src={injure.link} alt="injury photo" />
                          </div>
                        </div>
                      </div>
                    ))}
                    {evidenceModal ? 
                    <div className="evidence-update">
                          <div className="evidence-form">
                              <select 
                            value={state.evidenceType} 
                            onChange={(e) => setState({ ...state, evidenceType: e.target.value })}
                            >
                              <option value="">-evidence type-</option>
                              <option value="visual">visual</option>
                            </select>
                            <textarea 
                            value={state.evidenceDescription} 
                            placeholder="Enter brief description of the evidence"
                            onChange={(e) => setState({ ...state, evidenceDescription: e.target.value })}
                            />
                            <input type="file" onChange={(e) => setState({ ...state, image: e.target.files[0] })}></input>
                            <button onClick={uploadImage}>Upload Image</button>
                          </div>
                        <div>
                        <img src={url} alt="image appears here" className="upload-image"/>
                        </div>
                        <div className="evidence-btn">
                          <button onClick={updateCaseEvidence}>Save</button>
                          <button onClick={() => setEvidenceModal(false)}>Close</button>
                        </div> 
                          <p>{state.msg}</p>
                    </div> : null}
                    {!evidenceModal && user.role === 'admin' ? <div className="evidence-btn">
                      <button onClick={() => setEvidenceModal(true)}>Update Evidence</button>
                    </div> : null}
                </div>
              </div>
              <div className="case-detail-row">
                <div className="label">
                  <h4>Other information: </h4>
                </div>
                <div className="detail-column">
                  {information && violation.otherInfo.map((info) => (
                      <div className="detail-column">
                        <div className="detail-row">
                          <div className="row-label">
                            <h5>Description: </h5>
                          </div>
                          <div className="row-text">
                            <h5>{info.description}</h5>
                          </div>
                        </div>
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
