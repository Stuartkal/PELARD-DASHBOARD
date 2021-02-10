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
            <Navbar/>
            <Sidebar/>
            <div className="home-main">
                <CaseChart/>
                <DistrictCase/>
            </div>
        </div>
    )
}

export default Home
