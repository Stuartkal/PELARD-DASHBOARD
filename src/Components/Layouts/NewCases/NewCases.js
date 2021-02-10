import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { ActionCreators } from "../../../Store/ActionCreators";
import Filters from "../Filters/Filters";
import "./NewCases.css";
import NewTable from "./NewTable";


const mapState = (state) => ({
  loading: state.loading,
  cases: state.cases,
  user: state.user,
  numCases: state.numCases,
  singleCase: state.singleCase
});

const mapProps = (dispatch) => ({
  getCases: (_id, pageSize, pageIndex, filter = {}, range = {}) =>
    dispatch(
      ActionCreators.gettingCases({ _id, pageIndex, pageSize, filter, range })
    ),
  getSingleCase: (_id, id) => dispatch(ActionCreators.gettingCase({_id, id}))
});

const connector = connect(mapState, mapProps);

const selectCases = (state) => {
  return state.cases;
};

const selectLoading = (state) => state.loading;

const NewCases = ({ getCases, getSingleCase, cases, singleCase, user, loading, numCases }) => {
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
      {
        Header: "Date",
        accessor: "reportedDateAndTime",
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
    getSingleCase(user._id,"5fd72e90194a44000473910f")
  }, [getCases, user._id,getSingleCase]);

  console.log(singleCase, 'rrr')

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

  const getCaseHandler = () => {

  }

  return (
    <div className="table">
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
        userId = {user._id}
      />
    </div>
  );
};

export default connector(NewCases);
