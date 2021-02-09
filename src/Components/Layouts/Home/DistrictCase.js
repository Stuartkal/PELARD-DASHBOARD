import Chart from "chart.js";
import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { ActionCreators } from "../../../Store/ActionCreators";
import "./Styles.scss";

const pieRef = React.createRef();

const mapState = ({ districtReport, user }) => ({ districtReport, user });

const mapProps = (dispatch) => ({
  getDistrictReport: (_id) => dispatch(ActionCreators.getDistrict(_id)),
});

const connector = connect(mapState, mapProps);

const selectDistrictReport = ({ districtReport }) => districtReport;

const DistrictCase = ({ districtReport, user, getDistrictReport }) => {
  const [report, setReport] = useState(districtReport);
  const store = useStore();

  if (report.total) delete report.total;
  const labels = Object.keys(report);
  const data = Object.values(report);

  useEffect(() => {
    getDistrictReport(user._id);
  }, [getDistrictReport, user._id]);

  useEffect(() => {
    const handleChangeMonthly = () => {
      const currentDistrictReport = selectDistrictReport(store.getState());
      if (report !== currentDistrictReport) {
        setReport(currentDistrictReport);
      }
    };

    const unsubscribe = store.subscribe(handleChangeMonthly);

    return () => {
      unsubscribe();
    };
  }, [report, store]);

  useEffect(() => {
    const myPieRef = pieRef.current.getContext("2d");

    new Chart(myPieRef, {
      type: "pie",
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
    <div className="pie-main">
      <canvas id="myChart" ref={pieRef} />
    </div>
  );
};

export default connector(DistrictCase);
