import React from "react";

import "./styles/UsersList.css";
import Gravatar from "./Gravatar";

class UserListItem extends React.Component {
  render() {
    const last_login = this.props.user.last_login.split("T");
    const date = last_login[0];
    const hour = last_login[1].split(".")[0];
    return (
      <div className="BadgesListItem">
        <Gravatar
          className="BadgesListItem__avatar"
          email={this.props.user.email}
        />

        <div>
          {this.props.user.full_name}
          <br />
          <strong>{this.props.user.email}</strong>
          <br />
          {date}
          <br />
          {hour}
        </div>
      </div>
    );
  }
}

function useSearchUsers(users) {
  const [query, setQuery] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  React.useMemo(() => {
    const result = users.filter((user) => {
      return `${user.email}`.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredUsers(result);
  }, [users, query]);

  return { query, setQuery, filteredUsers };
}

function UsersList(props) {
  const users = props.users;

  const { query, setQuery, filteredUsers } = useSearchUsers(users);
  // const filteredBadges = badges.filter(badge => {
  //   return `${badge.firstName} ${badge.lastName}`.toLowerCase().includes(query.toLowerCase());
  // })

  if (filteredUsers.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Users</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          ></input>
        </div>
        <h3>No Users were found</h3>
      </div>
    );
  }

  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter Users</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
      </div>

      <ul className="list-unstyled">
        {filteredUsers.map((user) => {
          return (
            <li key={user.id}>
              <UserListItem user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
