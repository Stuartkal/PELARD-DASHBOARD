import Chart from "chart.js";
import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { ActionCreators } from "../../../Store/ActionCreators";
import "./Styles.scss";

const chartRef = React.createRef();

const mapState = ({ monthlyReport, user }) => ({ monthlyReport, user });

const mapProps = (dispatch) => ({
  getMonthlyReport: (_id) => dispatch(ActionCreators.getMonthly(_id)),
});

const connector = connect(mapState, mapProps);

const selectMonthlyReport = ({ monthlyReport }) => monthlyReport;

const CaseChart = ({ monthlyReport, user, getMonthlyReport }) => {
  const [months, setMonths] = useState(monthlyReport);
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
    getMonthlyReport(user._id);
  }, [getMonthlyReport, user._id]);

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
            backgroundColor: "#5f4fc579",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [data, labels]);

  return (
    <div className="chart-main">
      <h3>{months.year} Monthly Reported Cases</h3>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default connector(CaseChart);
