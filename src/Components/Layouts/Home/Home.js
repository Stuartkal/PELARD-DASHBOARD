import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import CaseChart from './CaseChart'
import DistrictCase from './DistrictCase'
import { ActionCreators } from '../../../Store/ActionCreators'

import './Styles.css'
const Home = () => {

    const total = useSelector(state => state.exploreViolations.total)
    const user = useSelector(state => state.user)
    // console.log(total)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(ActionCreators.getExploreViolation(user._id, 0, 20))
    },[])

    return (
        <div>
            <Navbar />
            <div className="home-main">
                <div className="left-column">
                    <Sidebar />
                </div>
                <div className="right-column">
                    <CaseChart />
                    <DistrictCase />
                    <div className="total">
                        <h5>0verall cases</h5>
                        <div className="total-div">
                        <h1>{total}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
