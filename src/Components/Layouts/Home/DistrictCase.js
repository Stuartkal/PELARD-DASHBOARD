import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart from "chart.js";
import * as actionCreators from "../../../Store/ActionCreators";

import "./Styles.scss";

const pieRef = React.createRef();

const DistrictCase = () => {
  const month = useSelector((state) => state.monthlyReport);
  console.log(month);

  const months = parseInt(month.feb);

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

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(actionCreators.monthlyReport());

    const myPieRef = pieRef.current.getContext("2d");

    new Chart(myPieRef, {
      type: "pie",
      data: {
        //Bring in data
        labels: ["Gulu", "Lamwo", "Kitgum", "Amuru", "Nwoya", "Agogo", "Pader"],
        datasets: [
          {
            label: "Case Reported",
            data: [20, 30, 10],
            backgroundColor: "#5f4fc579",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, []);

  return (
    <div className="pie-main">
      <canvas id="myChart" ref={pieRef} />
    </div>
  );
};

export default DistrictCase;
