import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import PasswordEntryList from "./PasswordEntryList";

const BoardUser = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [website, setWebsite] = useState("");

  const savePasswordEntry = async (event) => {
    event.preventDefault();

    const passwordEntryData = {
      title: title,
      username: username,
      encryptedPassword: encryptedPassword,
      website: website,
    };

    try {
      await UserService.savePasswordEntry(passwordEntryData);

      // Reset the state after saving
      setId("");
      setTitle("");
      setUsername("");
      setEncryptedPassword("");
      setWebsite("");

      // Reload password entries after saving
      loadPasswordEntries();
    } catch (error) {
      console.error("Error saving password entry", error);
    }
  };

  const loadPasswordEntries = async () => {
    try {
      const result = await UserService.getUserPasswordEntries();
      setPasswordEntries(result.data);
    } catch (error) {
      console.error("Error loading password entries", error);
    }
  };

  // Other functions...

  useEffect(() => {
    // Load password entries on component mount
    loadPasswordEntries();
  }, []);

  return (
    <div className="container mt-4">

      <form>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={encryptedPassword}
            onChange={(e) => setEncryptedPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Website:</label>
          <input
            type="text"
            className="form-control"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary m-4"
            onClick={savePasswordEntry}
          >
            Save
          </button>
        </div>
      </form>

      {/* Display the list of password entries */}
      <PasswordEntryList
          passwordEntries={passwordEntries}
      />
    </div>
  );
};

export default BoardUser;
