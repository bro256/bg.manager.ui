import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import PasswordEntryList from "../PasswordEntryList";

const AllPasswords = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [inFavorites, setInFavorites] = useState(false);

  const savePasswordEntry = async (event) => {
    event.preventDefault();

    const passwordEntryData = {
      title: title,
      username: username,
      encryptedPassword: encryptedPassword,
      website: website,
      inFavorites: inFavorites,
    };

  
    try {
      await UserService.savePasswordEntry(passwordEntryData);

      // Reset the state after saving
      setId("");
      setTitle("");
      setUsername("");
      setEncryptedPassword("");
      setWebsite("");
      setInFavorites(false);

      // Reload password entries after saving
      loadPasswordEntries();
    } catch (error) {
      console.error("Error saving password entry", error);
      alert("Error saving password entry. Please try again.");
    }
  };



  const editPasswordEntry = async (passwordEntry) => {
    setId(passwordEntry.id);
    setTitle(passwordEntry.title);
    setUsername(passwordEntry.username);
    setEncryptedPassword(passwordEntry.encryptedPassword);
    setWebsite(passwordEntry.website);
    setInFavorites(passwordEntry.inFavorites);
  }



  const updatePasswordEntry = async () => {
    try {
      const editedPasswordEntry = {
        id: id,
        title: title,
        username: username,
        encryptedPassword: encryptedPassword,
        website: website,
        inFavorites: inFavorites,
      };

      // Send the modified detailsto the server for update
      await UserService.editPasswordEntry(id, editedPasswordEntry);

      // Reset the state after updating
      setId("");
      setTitle("");
      setUsername("");
      setEncryptedPassword("");
      setWebsite("");
      setInFavorites(false);

      // Reload password entries after update
      loadPasswordEntries();
    } catch (error) {
      console.error("Error updating password entry", error);
      alert("Error updating password entry. Please try again.");
    }
  };
  


  const deletePasswordEntry =async (id) => {
    await UserService.deletePasswordEntry(id);
    // Reload password entries after update
    loadPasswordEntries();
  }



  useEffect(() => {
    // Load password entries on component start
    loadPasswordEntries();
  }, []);



  const loadPasswordEntries = async () => {
    try {
      const result = await UserService.getUserPasswordEntries();
      setPasswordEntries(result.data);
    } catch (error) {
      console.error("Error loading password entries", error);
      alert("Error loading password entries. Please try again.");
    }
  };


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
          <label>Website URL:</label>
          <input
            type="text"
            className="form-control"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>In Favorites:</label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={inFavorites}
            onChange={() => setInFavorites(!inFavorites)}
          />
        </div>

        <div>
          <button className="btn btn-primary m-4" onClick={savePasswordEntry}>
            Save
          </button>
          <button className="btn btn-primary m-4" onClick={updatePasswordEntry}>
            Update
          </button>
        </div>
      </form>

      {/* Display the list of password entries */}
      <PasswordEntryList
          passwordEntries={passwordEntries}
          editPasswordEntry={editPasswordEntry}
          deletePasswordEntry={deletePasswordEntry}
      />
    </div>
  );
};

export default AllPasswords;
