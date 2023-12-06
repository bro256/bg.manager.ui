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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text successfully copied to clipboard');
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };

  const openWebsite = (url) => {
    window.open(url, '_blank');
  };


  const clearForm = () => {
    setId("");
    setTitle("");
    setUsername("");
    setEncryptedPassword("");
    setWebsite("");
    setInFavorites(false);
  }



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
      <div class="row">

        <div className="col-md-6">
          {/* Display the list of password entries */}
          <PasswordEntryList
              passwordEntries={passwordEntries}
              editPasswordEntry={editPasswordEntry}
              deletePasswordEntry={deletePasswordEntry}
          />
        </div>

        <div className="col-md-6 ">
          <h2>Password entry information</h2>

          <form  class="row gy-2 gx-3 align-items-center">

            <div className="mb-2">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Title:</label>
              <input type="text" className="form-control form-control-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-0">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Website URL:</label>
              <input type="text" className="form-control form-control-sm"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div class="mb-2">
            <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => openWebsite(website)}
              >
                Visit
              </button>
           

            

            <button
                type="button"
                className="btn btn-secondary btn-sm mx-2"
                onClick={() => copyToClipboard(website)}
              >
                Copy
              </button>
            </div>

            <div className="mb-0">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Username:</label>
              <input type="text" className="form-control form-control-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="mb-2">
            <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => copyToClipboard(website)}
              >
                Copy
              </button>
            </div>
            

            <div className="mb-0">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-sm"
                value={encryptedPassword}
                onChange={(e) => setEncryptedPassword(e.target.value)}
              />
            </div>

            <div class="mb-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </button>
              <button
                  type="button"
                  className="btn btn-secondary btn-sm mx-2"
                  onClick={() => copyToClipboard(encryptedPassword)}
                >
                  Copy
                </button>
            </div>

          


            <div className="mb-1 form-check form-switch">
            <label className="ol-sm-2 col-form-label col-form-label-sm"> In Favorites</label>
            
              <input
                type="checkbox"
                className="form-check-input form-check form-switch md-2"
                checked={inFavorites}
                onChange={() => setInFavorites(!inFavorites)}
              />
            </div>

            <div>
              <button className="btn btn-primary btn-sm" onClick={savePasswordEntry}>
                Save
              </button>
              <button className="btn btn-primary btn-sm mx-2" onClick={updatePasswordEntry}>
                Update
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={clearForm}
              >
                Clear
              </button>

              <button
                className="btn btn-danger btn-sm mx-2"
                onClick={() => deletePasswordEntry(id)}
              >
                Delete
              </button>
            </div>
            
          </form>
        </div>


      </div>
    </div>
  );
};

export default AllPasswords;
