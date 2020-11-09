import React from "react";

import "./styles/Room.css";
import confLogo from "../images/chatRoom.png";

import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import api from "../adapters/apis/api";
import MinLoader from "../components/MinLoader";
import { withUser } from "../states/user-context";
import UsersList from "../components/UsersList";
import ChatRoom from "../components/ChatRoom";

class Room extends React.Component {
  state = {
    loading: true,
    error: null,
    dataUsers: null,
    dataMessages: null,
  };

  componentDidMount() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const dataMessages = await api.messages.list(this.props.user.token);
      const dataUsers = await api.users.list(this.props.user.token);
      const data = this.props.user;
      this.setState({
        loading: false,
        data: data,
        dataUsers: dataUsers.results,
        dataMessages: dataMessages.results,
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }
    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <h1 className="TitleRoom">Public Room</h1>

          <UsersList users={this.state.dataUsers} />
          <ChatRoom
            dataMessages={this.state.dataMessages}
            userLogin={this.props.user}
          />
          {this.state.loading && <MinLoader />}
        </div>
      </React.Fragment>
    );
  }
}

export default withUser(Room);
