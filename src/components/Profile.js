import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { decryptPassword } from "../utils/cryptoUtils";

import { CSVLink, CSVDownload } from "react-csv";

const Profile = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);

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
      loadPasswordEntries();
    }
  }, []);

  if (state.redirect) {
    return <Navigate to={state.redirect} />;
  }



  const loadPasswordEntries = async () => {
    try {
      const result = await UserService.getUserPasswordEntries();
      if (result.data && result.data.length > 0) {
        const decryptedEntries = result.data
          .filter(entry => !entry.inTrash)
          .map(entry => {
            try {
              return {
                ...entry,
                password: decryptPassword(
                  entry.encryptedPassword,
                  entry.encryptionIv,
                  sessionStorage.getItem("derivedKey")
                ),
              };
            } catch (error) {
              console.error("Error decrypting entry:", entry, "Error:", error);
              return entry;
            }
          });
        setPasswordEntries(decryptedEntries);
      } else {
        // No entries, set passwordEntries to an empty array
        setPasswordEntries([]);
      }
    } catch (error) {
      console.error("Error loading password entries", error);
      alert("Error loading password entries. Please try again.");
    }
  };


  const { currentUser } = state;

  return (
    <div className="container">
      {state.userReady ? (
        <div>

          <div className="card">
            <div className="card-body">
              <h3 className="card-title">User Account</h3>
              

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
              {/* <p>
                  <strong>Token:</strong>{" "}
                  {currentUser.accessToken.substr(currentUser.accessToken)}
                </p> */}
              </div>
          </div>


          <div className="card">
            <div class="card-body">
              <h3 className="card-title">Export Passwords</h3>
              <div className="row">
                <div className="col">
                  <p>Your passwords will be saved in .CSV file in such format: title, website, username, password. <strong>Store the .CSV files securely, preferably in a location that is not directly accessible from the internet. This prevents unauthorized access to your passwords.</strong> To make sure your passwords are formatted properly, open your .CSV file. </p>
                </div>
              </div>
              <div className="mb-3">
                <CSVLink
                  data={passwordEntries.map((entry) => ({
                    Title: entry.title,
                    Website: entry.website,
                    Username: entry.username,
                    Password: entry.password,
                  }))}
                  filename={"password_entries.csv"}
                >
                  Export to CSV
                </CSVLink>
              </div>
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
};

export default Profile;
