import Chart from "chart.js";
import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { ActionCreators } from "../../../Store/ActionCreators";
import "./Styles.scss";

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

  useEffect(() => {
    getMonthlyReport(user._id, year);
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
            backgroundColor: "#059ca183",
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
      },
    });
  }, [data, labels]);

  const height = '100'

  return (
    <div className="chart-main">
      <div className="search">
        <input
          placeholder="Enter year"
          value={year}
          onChange={(e)=> setYear(e.target.value)}
        />
      </div>
      <h3>{months.year} Monthly Reported Cases</h3>
      <canvas height={height} id="myChart" ref={chartRef} />
    </div>
  );
};

export default connector(CaseChart);
