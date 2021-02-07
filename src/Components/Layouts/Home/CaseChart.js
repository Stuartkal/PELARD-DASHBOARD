import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Chart from "chart.js";
import * as actionCreators from '../../../Store/ActionCreators'

import './Styles.scss'

const chartRef = React.createRef()

const CaseChart = () => {

    const month = useSelector(state => state.report.monthly)
    console.log(month)

    const months = parseInt(month.jul)

    // const jan = month.jan
    // const feb = month && month.feb
    // const mar = month.mar
    // const apr = month.apr
    // const may = month.may
    // const jun = month.jun
    // const jul = month.jul
    // const aug = month.aug
    // const sep = month.sep
    // const oct = month.oct
    // const nov = month.nov
    // const dec = month.dec

    const dispatch = useDispatch()
    
    useEffect(()=>{

        dispatch(actionCreators.monthlyReport())

        const myChartRef = chartRef.current.getContext("2d");

         new Chart(myChartRef ,  {
        type: "line",
        data: {
            //Bring in data
            labels: ["Jan", "Feb", "March"," April"," May", "June", "July","August","September","October","November","December"],
            datasets: [
                {
                    label: "Case Reported",
                    data: [months],
                    backgroundColor: '#5f4fc579',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    })
    },[])

    return (
        <div className="chart-main">
            <h3>{month.year} Monthly Reported Cases</h3>
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </div>
    )
}

export default CaseChart

