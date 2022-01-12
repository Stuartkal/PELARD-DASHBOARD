import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import { ActionCreators } from '../../../Store/ActionCreators'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import WarningIcon from '@material-ui/icons/Warning'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import NotificationsIcon from '@material-ui/icons/Notifications'
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import './Styles.css'


const useStyles = makeStyles({
  root: {
    width: '60%',
  },
})

const Activities = () => {

  const classes = useStyles()

  const [violationTypes, setViolationTypes] = useState([])
  const [filter, setFilter] = useState('')
  
  
  const user = useSelector(state => state.user)
  const violations = useSelector(state => state.violations)
  const total = useSelector(state => state.exploreViolations.total)
   
  const [limit, setLimit] = useState(total)
  // console.log(total,'hoc')
  
  const dispatch = useDispatch()
  
  const violationsArray = () => {
    violations.map(violation => violationTypes.push(violation.type))
  }
  
  const currentDate = moment(new Date()).format('MMM')
  
    
    let seriousCases = []
    violations.forEach(element => {
      if(element.type === 'Destruction Of Property' && moment(element.reportedDateAndTime).format('MMM') === currentDate) seriousCases.push(element)
    })

    const lengthCheck = seriousCases.length
     
    
    const intimidation =  violations.filter(el => el.type === 'Intimidation').length
    const intimidationPercentage = ((intimidation/total) * 100).toFixed(0)

    const destruction =  violations.filter(el => el.type === 'Destruction Of Property').length
    const destructionPercentage = ((destruction/total) * 100).toFixed(0)
    // console.log(intimidation)

    const harrassment =  violations.filter(el => el.type === 'Harrassment').length
    const harrassmentPercentage = ((harrassment/total) * 100).toFixed(0)

    const premises =  violations.filter(el => el.type === 'Violation of right to privacy in unlawful entry by others of the premises of a person.').length
    const premisesPercentage = ((premises/total) * 100).toFixed(0)

    const home =  violations.filter(el => el.type === 'Violation of right to privacy in unlawful search of the person, home or other personal').length
    const homePercentage = ((home/total) * 100).toFixed(0)

    const property =  violations.filter(el => el.type === 'Violation of the right to own property').length
    const propertyPercentage = ((property/total) * 100).toFixed(0)

    const land =  violations.filter(el => el.type === 'Land Dispute').length
    const landPercentage = ((land/total) * 100).toFixed(0)

    const pending =  violations.filter(el => el.status.value === 'pending').length
    const pendingPercentage = ((pending/total) * 100).toFixed(0)
  
    const resolved =  violations.filter(el => el.status.value === 'resolved').length
    const resolvedPercentage = ((resolved/total) * 100).toFixed(0)

    const referred =  violations.filter(el => el.status.value === 'referred').length
    const referredPercentage = ((referred/total) * 100).toFixed(0)

    const litigation =  violations.filter(el => el.status.value === 'under litigation').length
    const litigationPercentage = ((litigation/total) * 100).toFixed(0)


  const filterHandler = (arr) => {
    return setFilter(arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop())
  }

  const  LinearProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress style={{color:'#2d9ca1', width:'100px', height:'100px'}} variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div className="progress">
          <Typography 
          variant="caption" 
          component="div" 
          style={{
            color:"#2d9ca1", 
            fontSize:'20px', 
            fontWeight:'bold'
          }}>
            {`${Math.round(props.value)}%`}
        </Typography>
        </div>
      </Box>
    </Box>
  );
}

  

  useEffect(() => {
    dispatch(ActionCreators.gettingViolation(user._id, limit))
    dispatch(ActionCreators.districtFilter(user._id, 'Gulu'))
    violationsArray()
    filterHandler(violationTypes)
    // sameValues(violationTypes)
  }, [limit, filter, violationTypes])
    

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
                <h2 style={{ color: 'rgba(0,0,0,0.4)' }}>Violation Types</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="violation-main">
                  <div className="violations-column">
                      <div className="violation-stat">
                          <h4>Intimidation</h4>
                          <LinearProgressWithLabel value={intimidationPercentage} />
                      </div>
                      <div className="violation-stat">
                          <h4>Destruction Of Property</h4>
                          <LinearProgressWithLabel value={destructionPercentage} />
                      </div>
                      <div className="violation-stat">
                          <h4>Harrassment</h4>
                          <LinearProgressWithLabel value={harrassmentPercentage} />
                      </div>
                      <div className="violation-stat">
                          <h4>Violation of right to privacy in unlawful entry by others of the premises of a person</h4>
                          <LinearProgressWithLabel value={premisesPercentage} />
                      </div>
                      <div className="violation-stat">
                          <h4>Violation of right to privacy in unlawful search of the person, home or other personal</h4>
                          <LinearProgressWithLabel value={homePercentage} />
                      </div>
                      <div className="violation-stat">
                          <h4>Violation of the right to own property</h4>
                          <LinearProgressWithLabel value={propertyPercentage} />
                      </div>
                      <div className="violation-stat">
                          <h4>Land Dispute</h4>
                          <LinearProgressWithLabel value={landPercentage} />
                      </div>
                      <div className="violation-stat">
                          <h4>Gender Based Violence/Male</h4>
                          <LinearProgressWithLabel value={20} />
                      </div>
                      <div className="violation-stat">
                          <h4>Gender Based Violence/Female</h4>
                          <LinearProgressWithLabel value={45} />
                      </div>
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
                <h2 style={{ color: 'rgba(0,0,0,0.4)' }}>Case Status Trucker</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="violation-main">
                    <div className={classes.root}>
                      <h3>Pending</h3>
                      <LinearProgress variant="determinate" value={pendingPercentage} />
                      <h5 style={{color:'#2d9ca1'}}>{`${Math.round(pendingPercentage)}%`}</h5>
                      <h5 style={{color:'rgba(0,0,0,0.3)'}}>{pending} of {total} are still Pending</h5>
                    </div>
                    <div className={classes.root}>
                      <h3>Resolved</h3>
                      <LinearProgress variant="determinate" value={resolvedPercentage} />
                      <h5 style={{color:'#2d9ca1'}}>{`${Math.round(resolvedPercentage)}%`}</h5>
                      <h5 style={{color:'rgba(0,0,0,0.3)'}}>{resolved} of {total} cases have been Resolved</h5>
                    </div>
                    <div className={classes.root}>
                      <h3>Referred</h3>
                      <LinearProgress variant="determinate" value={referredPercentage} />
                      <h5 style={{color:'#2d9ca1'}}>{`${Math.round(referredPercentage)}%`}</h5>
                      <h5 style={{color:'rgba(0,0,0,0.3)'}}>{referred} of {total} cases have been Referred</h5>
                    </div>
                    <div className={classes.root}>
                      <h3>Under Litigation</h3>
                      <LinearProgress variant="determinate" value={litigationPercentage} />
                      <h5 style={{color:'#2d9ca1'}}>{`${Math.round(litigationPercentage)}%`}</h5>
                      <h5 style={{color:'rgba(0,0,0,0.3)'}}>{litigation} of {total} cases are still under Litigation</h5>
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
                <div className="accordion-header">
                  <h2 style={{ color: 'rgba(0,0,0,0.4)' }}>Serious Cases</h2>
                { 
                lengthCheck > 0 ? 
                <NotificationsIcon style={{ color: '#eb4d2c', fontSize:'30px' }}/>
                : 
                <NotificationsOffIcon style={{ color: 'rgba(0,0,0,0.1', fontSize:'30px' }}/>
                }
                </div>
              </AccordionSummary>
              <AccordionDetails>
                { lengthCheck > 0 ? <div className="violation-main">
                  {seriousCases.map(sc => (
                    <div className="notify">
                      <div className="icon-container">
                          <WarningIcon style={{ fontSize:'35px', color:'#fff'}}/>
                      </div>
                        <div>
                          <div className="notify-inner">
                            <h5>{sc.type}</h5>
                            <div className="notify-row">
                              <h6>Status: </h6>
                              <h6>{sc.status.value}</h6>
                            </div>
                            <div className="notify-row">
                              <LocationOnIcon style={{ fontSize:'20px', color:'rgba(0,0,0,0.2)'}}/>
                              <h6>{sc.location.district}</h6>
                            </div>
                          </div>
                        </div>
                      <h6 style={{ color:'rgba(0,0,0,0.4)'}}>{moment(sc.reportedDateAndTime).fromNow()}</h6>
                    </div>
                      ))
                  }
                </div> : <h3>No Serious Cases Reported</h3>}

              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activities

// import React from 'react'
// import Sidebar from '../../Navigation/Sidebar'
// import Navbar from '../../Navigation/Navbar'
// import './Styles.css'

// export default function Activities() {
//   return (
//     <div>
//       <Navbar/>
//       <div className="activity-main">
//       <div className="left-column">
//         <Sidebar />
//       </div>
//       <div className="right-column">
//           <h1>Insights</h1>
//       </div>
//     </div>
//     </div>
//   )
// }