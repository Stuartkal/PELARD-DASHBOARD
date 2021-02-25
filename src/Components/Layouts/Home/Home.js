import React from 'react'
// import {useDispatch} from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import CaseChart from './CaseChart'
import DistrictCase from './DistrictCase'
// import * as actionCreators from '../../../Store/ActionCreators'

import './Styles.scss'
const Home = () => {

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
                </div>
            </div>
        </div>
    )
}

export default Home
