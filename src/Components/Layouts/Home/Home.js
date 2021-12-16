import React from 'react'
import {useSelector} from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import CaseChart from './CaseChart'
import DistrictCase from './DistrictCase'
// import * as actionCreators from '../../../Store/ActionCreators'

import './Styles.css'
const Home = () => {

    const total = useSelector(state => state.exploreViolations.total)
    // console.log(total)
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
