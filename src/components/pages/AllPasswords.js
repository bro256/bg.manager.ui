import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import PasswordEntryList from "../PasswordEntryList";
import CryptoJS from "crypto-js";



const AllPasswords = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  


  const encryptPassword = (password, derivedKey) => {
    try {
      console.log("Encrypting password...");
  
      // Convert the derived key from hexadecimal to WordArray
      const key = CryptoJS.enc.Hex.parse(derivedKey);
  
      // Generate a random IV
      const iv = CryptoJS.lib.WordArray.random(16); // Increase IV length for GCM
  
      // Encrypt the password using AES-CBC
      const encrypted = CryptoJS.AES.encrypt(password, key, {
        iv: iv,
      });
  
      // Extract the ciphertext and IV
      const encryptedPassword = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      const encryptionIv = iv.toString(CryptoJS.enc.Base64);
  
      console.log("Encrypted Password:", encryptedPassword);
      console.log("Encryption IV:", encryptionIv);
  
      return {
        encryptedPassword,
        encryptionIv,
      };
    } catch (error) {
      console.error("Error during encryption:", error);
      throw error;
    }
  };
  


  const decryptPassword = (encryptedPassword, encryptionIv, derivedKey) => {
    try {
      console.log("Decrypting password...");
  
      // Convert the derived key from hexadecimal to WordArray
      const key = CryptoJS.enc.Hex.parse(derivedKey);
  
      // Convert IV from Base64 to WordArray
      const iv = CryptoJS.enc.Base64.parse(encryptionIv);
  
      // Decrypt the password using AES-CBC
      const decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: CryptoJS.enc.Base64.parse(encryptedPassword),
          iv: iv,
          salt: null, // Not needed for GCM
          key: key,
          algorithm: "AES-CBC",
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          blockSize: 4,
          formatter: CryptoJS.format.OpenSSL,
        },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
  
      // Convert the decrypted WordArray to a UTF-8 string
      const decryptedPassword = decrypted.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted Password:", decryptedPassword);
      return decryptedPassword;
    } catch (error) {
      console.error("Error during decryption:", error);
      throw error;
    }
  };


  
  const clearForm = () => {
    setId("");
    setTitle("");
    setUsername("");
    setPassword("");
    setWebsite("");
    setInFavorites(false);
    setShowPassword(false);
  }



  const savePasswordEntry = async (event) => {
    event.preventDefault();
  
    // Get the derived key from sessionStorage
    const derivedKey = sessionStorage.getItem('derivedKey');
  
    // Encrypt the password using the derived key
    const { encryptedPassword, encryptionIv } = await encryptPassword(password, derivedKey);
  
    console.log("Encrypted values before saving:", encryptedPassword, encryptionIv);
  
    const passwordEntryData = {
      title: title,
      username: username,
      encryptedPassword: encryptedPassword,
      encryptionIv: encryptionIv,
      website: website,
      inFavorites: inFavorites,
    };
  
    try {
      await UserService.savePasswordEntry(passwordEntryData);
  
      // Reset the state after saving
      setId("");
      setTitle("");
      setUsername("");
      setPassword("");
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
    setPassword(passwordEntry.password);
    setWebsite(passwordEntry.website);
    setInFavorites(passwordEntry.inFavorites);
  }


  const updatePasswordEntry = async () => {
    // Get the derived key from sessionStorage
    const derivedKey = sessionStorage.getItem('derivedKey');
  
    try {
      // Encrypt the password using the derived key
      const { encryptedPassword, encryptionIv } = encryptPassword(password, derivedKey);
  
      const editedPasswordEntry = {
        id: id,
        title: title,
        username: username,
        encryptedPassword: encryptedPassword,
        encryptionIv: encryptionIv,
        website: website,
        inFavorites: inFavorites,
      };
  
      // Send the modified details to the server for update
      const response = await UserService.editPasswordEntry(id, editedPasswordEntry);
      console.log('Edit response:', response);
  
      // Reset the state after updating
      setId("");
      setTitle("");
      setUsername("");
      setPassword("");
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
  
      // Check if there are entries
      if (result.data && result.data.length > 0) {
        // Decrypt the passwords before setting the state
        const decryptedEntries = result.data.map(entry => {
          try {
            return {
              ...entry,
              password: decryptPassword(entry.encryptedPassword, entry.encryptionIv, sessionStorage.getItem('derivedKey')),
            };
          } catch (error) {
            console.error('Error decrypting entry:', entry, 'Error:', error);
            return entry; // Return the original entry to avoid breaking the map function
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
  


  return (
    <div className="container mt-4">
      <div className="row">

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

          <form  className="row gy-2 gx-3 align-items-center">

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
            <div className="mb-2">
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
            <div className="mb-2">
            <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => copyToClipboard(username)}
              >
                Copy
              </button>
            </div>
            

            <div className="mb-0">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </button>
              <button
                  type="button"
                  className="btn btn-secondary btn-sm mx-2"
                  onClick={() => copyToClipboard(password)}
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
