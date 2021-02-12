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
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Case Total in Districts",
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
      <h3>Total Cases Reported in Districts</h3>
      <canvas height={height} id="myChart" ref={pieRef} />
      <div className="districts">
          <div className="card">
              <div className="label-txt">
                <h4>Gulu</h4>
              </div>
              <div className="case-txt">
                <h6>Cases</h6>
                <h4>{report.Gulu}</h4>
              </div>
          </div>
          <div className="card">
              <div className="label-txt">
                <h4>Lamwo</h4>
              </div>
              <div className="case-txt">
                <h6>Cases</h6>
                <h4>{report.Lamwo}</h4>
              </div>
          </div>
          <div className="card">
              <div className="label-txt">
                <h4>Kitgum</h4>
              </div>
              <div className="case-txt">
                <h6>Cases</h6>
                <h4>{report.Kitgum}</h4>
              </div>
          </div>
          <div className="card">
              <div className="label-txt">
                <h4>Amuru</h4>
              </div>
              <div className="case-txt">
                <h6>Cases</h6>
                <h4>{report.Amuru}</h4>
              </div>
          </div>
          <div className="card">
              <div className="label-txt">
                <h4>Nwoya</h4>
              </div>
              <div className="case-txt">
                <h6>Cases</h6>
                <h4>{report.Nwoya}</h4>
              </div>
          </div>
          <div className="card">
              <div className="label-txt">
                <h4>Agogo</h4>
              </div>
              <div className="case-txt">
                <h6>Cases</h6>
                <h4>{report.Agogo}</h4>
              </div>
          </div>
          <div className="card">
              <div className="label-txt">
                <h4>Pader</h4>
              </div>
              <div className="case-txt">
                <h6>Cases</h6>
                <h4>{report.Pader}</h4>
              </div>
          </div>
      </div>
    </div>
  );
};

export default connector(DistrictCase);
