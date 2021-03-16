import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import { ActionCreators } from "../../../Store/ActionCreators"

import './Styles.scss'
const Activities = () => {

  const [limit, setLimit] = useState(10)
  const [violationTypes, setViolationTypes] = useState([])
  const [filter, setFilter] = useState('')

  const user = useSelector(state => state.user)
  const violations = useSelector(state => state.violations)


  const dispatch = useDispatch()

  const violationsArray = () => {
    violations.map(violation => violationTypes.push(violation.type))
  }

  const filterHandler = (arr) => {
    return setFilter(arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop())
  }

  useEffect(() => {
    dispatch(ActionCreators.gettingViolation(user._id, limit))
    violationsArray()
    filterHandler(violationTypes)
  }, [limit, filter, violationTypes])

  // console.log(violations)




  return (
    <div>
      <Navbar />
      <div className="activity-main">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column">
          <h1>Insights</h1>
          <div className="accordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h2 style={{ color: 'rgba(0,0,0,0.4)' }}>Frequently Reported Violation</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="violation-main">
                  <div className="header">
                    <h3>Page limit</h3>
                    <input
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                    />
                    <p>Frequent of the {violations.length} violations</p>
                  </div>
                  <div className="header">
                    <ReportProblemIcon style={{ fontSize: '100px', color: 'red' }} />
                    <h1>{filter}</h1>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="accordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h2 style={{ color: 'rgba(0,0,0,0.4)' }}>Authority Responses</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="violation-main">
                  <div className="header">
                    <h3>Page limit</h3>
                    <input
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                    />
                    <p>Frequent of the {violations.length} violations</p>
                  </div>
                  <div className="violation-container">
                    {
                      violations.map(violation =>
                        violation.authorityResponse.map(response => (
                          <div>
                            <h4>{response.name}</h4>
                            <h5>{response.response}</h5>
                          </div>
                        ))
                      )
                    }
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="accordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h2 style={{ color: 'rgba(0,0,0,0.4)' }}>Evidence Gallery</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="violation-main">
                  <div className="header">
                    <h3>Page limit</h3>
                    <input
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                    />
                    <p>Frequent of the {violations.length} violations</p>
                  </div>
                  {
                    violations.map(violation =>
                      violation.injuries.map(injury => (
                        <div className="images">
                          <h4>{injury.description}</h4>
                          <img src={injury.link} />
                        </div>
                      ))
                    )
                  }

                </div>
              </AccordionDetails>
            </Accordion>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Activities
