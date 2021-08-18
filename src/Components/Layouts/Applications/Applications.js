import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { withRouter } from "react-router-dom";
import { ActionCreators } from "../../../Store/ActionCreators";
import ApplicationTable from "../NewUsers/ApplicationTable";

const mapState = ({ loading, applications, user, numApplications }) => ({
  loading,
  applications,
  user,
  numApplications,
});

const mapProps = (dispatch) => ({
  getApplications: (_id, pageSize, pageIndex, filter = {}, range = {}) =>
    dispatch(
      ActionCreators.gettingApplications(
        _id,
        pageIndex,
        pageSize,
        filter,
        range
      )
    ),
  getApplication: (_id, applicationId, callback) => dispatch(ActionCreators.gettingApplication(_id, applicationId, callback))
});

const connector = connect(mapState, mapProps);

const selectApplications = ({ applications }) => applications;

const selectLoading = ({ loading }) => loading;

const Applications = ({
  getApplications,
  getApplication,
  applications,
  loading,
  user,
  numApplications,
  open
}) => {
  const store = useStore();

  const [applicationList, setApplicationList] = useState(applications);
  const [isLoading, setIsLoading] = useState(loading);
  const [filter, setFilter] = useState({});
  const [range, setRange] = useState({});
  console.log(applications,'apps')
  const data = React.useMemo(() => applicationList, [applicationList]);
  const convertDate = ({ value }) =>
    `${new Date(value).toDateString()} at ${new Date(value)
      .toTimeString()
      .slice(0, 8)}`;

  const columns = React.useMemo(
    () => [
      { Header: "User Name", accessor: "firstName" },
      { Header: "Role", accessor: "role" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Application Date and Time",
        accessor: "applicationDateAndTime",
        Cell: convertDate,
      },
    ],
    []
  );

  useEffect(() => {
    const handleChange = () => {
      const currentValue = selectApplications(store.getState());
      if (applications !== currentValue) {
        setApplicationList(currentValue);
      }
    };

    const unsubscribe = store.subscribe(handleChange);

    return () => {
      unsubscribe();
    };
  }, [store, applications]);

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
    getApplications(user._id, 10, 1);

  }, [getApplications, user._id]);

  const fetchData = React.useCallback(
    ({ pageIndex, pageSize }) => {
      getApplications(user._id, pageSize, pageIndex, filter, range);
    },
    [filter, getApplications, range, user._id]
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

  const getSingleApplicationHandler = (applicationId) => {
    getApplication(user._id, applicationId, (res) => {
      if (res.success === true) {
        open(true)
      }
    })
  }

  return (
    <div className="table">
      <ApplicationTable
        data={data}
        columns={columns}
        fetchData={fetchData}
        pageCount={numApplications}
        loading={isLoading}
        singleApplication={getSingleApplicationHandler}
      />
    </div>
  );
};

export default withRouter(connector(Applications));
