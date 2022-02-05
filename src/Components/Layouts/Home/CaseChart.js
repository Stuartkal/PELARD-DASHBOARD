import Chart from "chart.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect, useStore, useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "../../../Store/ActionCreators";
import {Line} from 'react-chartjs-2'
import "./Styles.css";

// const chartRef = React.createRef();

const mapState = ({ monthlyReport, user }) => ({ monthlyReport, user });

const mapProps = (dispatch) => ({
  getMonthlyReport: (_id, year) =>
    dispatch(ActionCreators.getMonthly(_id, year)),
});

const connector = connect(mapState, mapProps);

const selectMonthlyReport = ({ monthlyReport }) => monthlyReport;

const CaseChart = ({ monthlyReport, user, getMonthlyReport }) => {
  const [months, setMonths] = useState(monthlyReport);
  const [year, setYear] = useState(new Date().getFullYear());
  const store = useStore();
  // const labels = [
  //   "Jan",
  //   "Feb",
  //   "March",
  //   " April",
  //   " May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  const data = Object.values(months);
  data.splice(12, 2);

  const dispatch = useDispatch()

  const violations = useSelector(state => state.violations)
  const total = useSelector(state => state.exploreViolations.total)

  const year2020 = violations.filter(el => moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const year2021 = violations.filter(el => moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const year2022 = violations.filter(el => moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  
  const jan2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jan' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const feb2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Feb' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const mar2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Mar' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const apr2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Apr' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const may2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'May' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const jun2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jun' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const jul2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jul' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const aug2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Aug' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const sep2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Sep' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const oct2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Oct' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const nov2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Nov' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const dec2020 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Dec' && moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length

  const jan2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jan' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const feb2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Feb' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const mar2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Mar' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const apr2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Apr' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const may2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'May' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const jun2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jun' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const jul2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jul' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const aug2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Aug' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const sep2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Sep' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const oct2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Oct' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const nov2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Nov' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const dec2021 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Dec' && moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length

  const jan2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jan' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const feb2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Feb' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const mar2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Mar' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const apr2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Apr' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const may2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'May' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const jun2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jun' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const jul2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Jul' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const aug2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Aug' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const sep2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Sep' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const oct2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Oct' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const nov2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Nov' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length
  const dec2022 = violations.filter(el => moment(el.reportedDateAndTime).format('MMM') === 'Dec' && moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length

  // console.log(dec2020)

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const cases2020 = [jan2020, feb2020, mar2020, apr2020, may2020, jun2020, jul2020, aug2020, sep2020, oct2020, nov2020, dec2020]
  const cases2021 = [jan2021, feb2021, mar2021, apr2021, may2021, jun2021, jul2021, aug2021, sep2021, oct2021, nov2021, dec2021]
  const cases2022 = [jan2022, feb2022, mar2022, apr2022, may2022, jun2022, jul2022, aug2022, sep2022, oct2022, nov2022, dec2022]

  const _data = {
        labels: labels,
        datasets: [
            {
                label: '2020 cases',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderColor: '#059ca183',
                borderWidth: 1,
                data: cases2020
            },
            {
                label: '2021 cases',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderColor: '#059ca183',
                borderWidth: 1,
                data: cases2021
            },
            {
                label: '2022 cases',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderColor: '#059ca183',
                borderWidth: 1,
                data: cases2022
            }
        ],
        options: {
                scales: {
                    yAxes: [{
                    ticks: {
                        precision: 0
                    }
                    }]
                }
                }
    }

  useEffect(() => {
    getMonthlyReport(user._id, year);
    dispatch(ActionCreators.gettingViolation(user._id, total));
  }, [getMonthlyReport, user._id, year]);

  useEffect(() => {
    const handleChangeMonthly = () => {
      const currentMonthlyReport = selectMonthlyReport(store.getState());
      if (months !== currentMonthlyReport) {
        setMonths(currentMonthlyReport);
      }
    };

    const unsubscribe = store.subscribe(handleChangeMonthly);

    return () => {
      unsubscribe();
    };
  }, [months, setMonths, store]);


  // useEffect(() => {
  //   const myChartRef = chartRef.current.getContext("2d");



  //   new Chart(myChartRef, {
  //     type: "line",
  //     data: {
  //       labels,
  //       datasets: [
  //         {
  //           label: "Case Reported",
  //           data,
  //           backgroundColor: "rgba(0,0,0,0.1)",
  //           borderColor: "#059ca183",
  //           borderWidth:1
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       // maintainAspectRatio: false,
  //     },
  //   });
  // }, [data, labels]);

  // const height = '150'

  return (
    <div className="chart-main">
      {/* <div className="search">
        <p>Enter Year</p>
        <input
          placeholder="Enter year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div> */}
      <h3>Monthly Reported Cases</h3>
      {/* <canvas height={height} id="myChart" ref={chartRef} /> */}
      <Line
          data={_data}
          width={100}
          height={50}
      />
      <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between', width:'50%'}}>
          <div className="total">
          <h5>2020 cases</h5>
          <div className="total-div">
            <h1>{year2020}</h1>
          </div>
        </div>
        <div className="total">
          <h5>2021 cases</h5>
          <div className="total-div">
            <h1>{year2021}</h1>
          </div>
        </div>
        <div className="total">
          <h5>2022 cases</h5>
          <div className="total-div">
            <h1>{year2022}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connector(CaseChart);
