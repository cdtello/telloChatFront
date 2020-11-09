import React, { Component, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./styles/Home.css";

import logo from "../images/logo.svg";
import communication from "../images/communication.png";
import SignIn from "../components/SignIn";
import { withUser } from "../states/user-context";

const Home = (props) => {
  const history = useHistory();

  const onSignInHandler = (user) => {
    user.user
      .getIdToken()
      .then(function (idToken) {
        console.log(idToken);
        var dataFirebase = {
          token_id: idToken,
        };
        axios
          .post("http://localhost:8000/api/google-login/", dataFirebase)
          .then(function (response) {
            console.log(response.data);
            props.setUser(response.data);
            history.push("/room");
            return response;
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="Home">
      <div className="container">
        <div className="row">
          <div className="Home__col col-12 col-md-4">
            <img src={logo} alt="Logo" className="img-fluid mb-2" />

            <h1>Tello Chat System</h1>
            <section>
              <SignIn onSignIn={onSignInHandler} />
            </section>
          </div>

          <div className="Home__col d-none d-md-block col-md-8">
            <img
              src={communication}
              alt="Astronauts"
              className="img-fluid p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUser(Home);
