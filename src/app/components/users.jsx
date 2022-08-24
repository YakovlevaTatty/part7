import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import API from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import { Link } from "react-router-dom";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState(API.professions.fetchAll());
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [users, setUsers] = useState();

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  });
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  const pageSize = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  const handleProfessionsSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession.name === selectedProf.name)
      : users;
    const count = filteredUsers.length
      ? filteredUsers.length
      : Object.keys(filteredUsers).length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex">
        {professions && (
          //   usersCrop.map((user) => (
          //     <Link key={user._id} to={`users/${user._id}`}>
          //       <h3>{user}</h3>
          //     </Link>
          //   )) &&
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionsSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          {count > 0 && (
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};
Users.propTypes = {
  users: propTypes.oneOfType([propTypes.object, propTypes.array]),
  // users : propTypes.object.isRequired,
};

export default Users;
