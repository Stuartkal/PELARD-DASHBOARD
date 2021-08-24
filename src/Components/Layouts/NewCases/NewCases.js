import React, { useEffect, useState } from "react";
import { connect, useStore, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { ActionCreators } from "../../../Store/ActionCreators";
import Filters from "../Filters/Filters";
import "./NewCases.css";
import NewTable from "./NewTable";
import exportFromJSON from 'export-from-json'
import moment from 'moment'

const mapState = (state) => ({
  loading: state.loading,
  cases: state.cases,
  user: state.user,
  numCases: state.numCases,
});

const mapProps = (dispatch) => ({
  getCases: (_id, pageSize, pageIndex, filter = {}, range = {}) =>
    dispatch(
      ActionCreators.gettingCases({ _id, pageIndex, pageSize, filter, range })
    ),
  getSingleCase: (_id, id, callback) =>
    dispatch(ActionCreators.gettingCase({ _id, id, callback })),
});

const connector = connect(mapState, mapProps);

const selectCases = (state) => {
  return state.cases;
};

const selectLoading = (state) => state.loading;

const NewCases = ({
  getCases,
  cases,
  getSingleCase,
  user,
  loading,
  numCases,
  history,
}) => {
  const store = useStore();

  const [violations, setViolations] = useState(cases);
  const [isLoading, setIsLoading] = useState(loading);
  const [filter, setFilter] = useState({});
  const [range, setRange] = useState({});
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showReporterFilter, setShowReporterFilter] = useState(false);
  const [showStartFilter, setShowStartFilter] = useState(false);
  const [showEndFilter, setShowEndFilter] = useState(false);

  const data = React.useMemo(() => violations, [violations]);
  const convertDate = ({ value }) => new Date(value).toDateString();
  
  const columns = React.useMemo(
    () => [
      { Header: "Reporter", accessor: "reporter.name" },
      { Header: "District", accessor: "location.district" },
      { Header: "Violation", accessor: "type" },
      { Header: "Phone Number", accessor: "reporter.contact" },
      { Header: "Status", accessor: "status.value" },
      {
        Header: "Date",
        accessor: "dateTime",
        Cell: convertDate,
      },
    ],
    []
  );

  useEffect(() => {
    const handleChange = () => {
      const currentValue = selectCases(store.getState());
      if (cases !== currentValue) {
        setViolations(currentValue);
      }
    };

    const unsubscribe = store.subscribe(handleChange);

    return () => {
      unsubscribe();
    };
  }, [cases, store]);

  useEffect(() => {
    const handleChangeLoading = () => {
      const currentValue = selectLoading(store.getState());
      if (isLoading !== currentValue) {
        setIsLoading(currentValue);
      }
    };
    const unsubscribeLoading = store.subscribe(handleChangeLoading);
    return () => {
      unsubscribeLoading();
    };
  }, [isLoading, store]);

  useEffect(() => {
    getCases(user._id, 10, 1);
  }, [getCases, user._id]);

  const fetchData = React.useCallback(
    ({ pageIndex, pageSize }) => {
      getCases(user._id, pageSize, pageIndex, filter, range);
    },
    [filter, getCases, range, user._id]
  );

  const updateFilter = (key, value) => {
    const newFilter = { ...filter, [key]: value };
    if (value === "") delete newFilter[key];

    setFilter(newFilter);
  };

  const updateRange = (key, value) => {
    const newRange = { ...range, [key]: value };
    if (value === "") delete newRange[key];

    setRange(newRange);
  };

  const fileName = 'Report'  
  const exportType = exportFromJSON.types.csv


  const exportToexcel = () => {
    exportFromJSON({data, fileName,exportType})
  }

  const toggleFilter = (name) => {
    switch (name) {
      case "type":
        if (showTypeFilter) updateFilter(name, "");
        setShowTypeFilter(!showTypeFilter);
        break;
      case "reporter":
        if (showReporterFilter) updateFilter(name, "");
        setShowReporterFilter(!showReporterFilter);
        break;
      case "start":
        if (showStartFilter) updateRange(name, "");
        setShowStartFilter(!showStartFilter);
        break;
      case "end":
        if (showEndFilter) updateRange(name, "");
        setShowEndFilter(!showEndFilter);
        break;
      default:
    }
  };

  const getCaseHandler = (id) => {
    getSingleCase(user._id, id, (res) => {
      if (res.success === true) {
        history.push("./case-details", { res });
      }
    });
  };

  return (
    <div className="table">
      <button className="case-btn" onClick={exportToexcel}> Download Excel File </button>
      <Filters
        toggleFilter={toggleFilter}
        showReporterFilter={showReporterFilter}
        showTypeFilter={showTypeFilter}
        showStartFilter={showStartFilter}
        showEndFilter={showEndFilter}
        updateFilter={updateFilter}
        updateRange={updateRange}
      />

      <NewTable
        data={data}
        columns={columns}
        fetchData={fetchData}
        pageCount={numCases}
        loading={loading}
        numCases={numCases}
        userId={user._id}
        getCaseHandler={getCaseHandler}
      />
    </div>
  );
};

export default withRouter(connector(NewCases));
