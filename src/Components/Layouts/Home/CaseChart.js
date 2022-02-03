import Chart from "chart.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect, useStore, useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "../../../Store/ActionCreators";
import "./Styles.css";

const chartRef = React.createRef();

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
  const labels = [
    "Jan",
    "Feb",
    "March",
    " April",
    " May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = Object.values(months);
  data.splice(12, 2);

  const dispatch = useDispatch()

  const violations = useSelector(state => state.violations)
  const total = useSelector(state => state.exploreViolations.total)

  const year2020 = violations.filter(el => moment(el.reportedDateAndTime).format('YYYY') === '2020' ).length
  const year2021 = violations.filter(el => moment(el.reportedDateAndTime).format('YYYY') === '2021' ).length
  const year2022 = violations.filter(el => moment(el.reportedDateAndTime).format('YYYY') === '2022' ).length

  const time = '2021-12-20T11:51:22.000Z'

  // console.log(year2022)

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


  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");



    new Chart(myChartRef, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Case Reported",
            data,
            backgroundColor: "rgba(0,0,0,0.1)",
            borderColor: "#059ca183",
            borderWidth:1
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
      },
    });
  }, [data, labels]);

  const height = '150'

  return (
    <div className="chart-main">
      <div className="search">
        <p>Enter Year</p>
        <input
          placeholder="Enter year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <h3>{months.year} Monthly Reported Cases</h3>
      <canvas height={height} id="myChart" ref={chartRef} />
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
