import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
// import Home from "./components/home.component";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AllPasswords from "./components/AllPasswords";
import Favorites from "./components/Favorites";
import Trash from "./components/Trash";
import Generator from "./components/PasswordGenerator";
import Moderator from "./components/Moderator";
import Admin from "./components/Admin";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    const logoutListener = () => {
      logOut();
    };

    EventBus.on("logout", logoutListener);

    return () => {
      EventBus.remove("logout", logoutListener);
    };
  }, []);

  const logOut = () => {
    // Remove the derived key from session storage
    sessionStorage.removeItem('derivedKey');

    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to={"/"} className="navbar-brand ms-3">
          Password Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMobileNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileNavOpen ? "show" : ""}`} id="navbarNav">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/passwords"} className="nav-link">
                  All passwords
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/favorites"} className="nav-link">
                  Favorites
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/trash"} className="nav-link">
                  Trash
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/generator"} className="nav-link">
                  Password generator
                </Link>
              </li>
            )}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin
                </Link>
              </li>
            )}

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {/* {currentUser.username} */}
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Log Out
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}


          </div>
        </div>


      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/passwords" element={<AllPasswords />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/mod" element={<Moderator />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;