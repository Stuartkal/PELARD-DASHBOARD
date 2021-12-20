import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { withRouter } from "react-router-dom";
import { ActionCreators } from "../../../Store/ActionCreators";
import Filters from "../Filters/Filters";
import "./NewUsers.css";
import UsersTable from "./UsersTable";

const mapState = ({ loading, users, user, numUsers }) => ({
  loading,
  users,
  user,
  numUsers,
});

const mapProps = (dispatch) => ({
  getUsers: (_id, pageSize, pageIndex, filter = {}, range = {}) =>
    dispatch(
      ActionCreators.gettingUsers({ _id, pageIndex, pageSize, filter, range })
    )
});

const connector = connect(mapState, mapProps);

const selectUsers = (state) => {
  return state.users;
};

const selectLoading = ({ loading }) => loading;

const NewUsers = ({ getUsers, users, user, loading, numUsers }) => {
  const store = useStore();

  const [usersDoc, setUsersDoc] = useState(users);
  const [isLoading, setIsLoading] = useState(loading);
  const [filter, setFilter] = useState({});
  const [range, setRange] = useState({});
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showReporterFilter, setShowReporterFilter] = useState(false);
  const [showStartFilter, setShowStartFilter] = useState(false);
  const [showEndFilter, setShowEndFilter] = useState(false);

  const data = React.useMemo(() => usersDoc, [usersDoc]);
  // console.log(data,'kk')
  const columns = React.useMemo(
    () => [
      { Header: "Email", accessor: "email" },
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Username", accessor: "userName" },
      { Header: "Role", accessor: "role" },
      { Header: "Phone Number", accessor: "phoneNumber" },
    ],
    []
  );

  useEffect(() => {
    const handleChange = () => {
      const currentValue = selectUsers(store.getState());
      if (users !== currentValue) {
        setUsersDoc(currentValue);
      }
    };

    const unsubscribe = store.subscribe(handleChange);

    return () => {
      unsubscribe();
    };
  }, [users, store]);

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
    getUsers(user._id, 10, 1);
  }, [getUsers, user._id]);

  const fetchData = React.useCallback(
    ({ pageIndex, pageSize }) => {
      getUsers(user._id, pageSize, pageIndex, filter, range);
    },
    [filter, getUsers, range, user._id]
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

  return (
    <div className="table">
      {/* <Filters
        toggleFilter={toggleFilter}
        showReporterFilter={showReporterFilter}
        showTypeFilter={showTypeFilter}
        showStartFilter={showStartFilter}
        showEndFilter={showEndFilter}
        updateFilter={updateFilter}
        updateRange={updateRange}
      /> */}

      <UsersTable
        data={data}
        columns={columns}
        fetchData={fetchData}
        pageCount={numUsers}
        loading={isLoading}
        numUsers={numUsers}
      />
    </div>
  );
};

export default withRouter(connector(NewUsers));
