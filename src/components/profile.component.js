import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [state, setState] = useState({
    redirect: null,
    userReady: false,
    currentUser: { username: "" }
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      setState({ redirect: "/home" });
    } else {
      setState({ currentUser: currentUser, userReady: true });
    }
  }, []);

  if (state.redirect) {
    return <Navigate to={state.redirect} />;
  }

  const { currentUser } = state;

  return (
    <div className="container">
      {state.userReady ? (
        <div>
          <header className="jumbotron">
            <h3>User Account</h3>
          </header>

          <p><strong>User Name:</strong> {currentUser.username}</p>
          <p><strong>User Id:</strong> {currentUser.id}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <strong>User roles:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.accessToken.substr(currentUser.accessToken)}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
