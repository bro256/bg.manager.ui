import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AllPasswordsList from "./AllPasswordsList";
import { encryptPassword, decryptPassword } from "../utils/cryptoUtils";
import { calculatePasswordStrength, generateRandomPassword, getColorForPasswordStrength } from "../utils/passwordUtils";



const AllPasswords = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [inFavorites, setInFavorites] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("None");
  const [inTrash, setInTrash] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    loadPasswordEntries();
    loadCategories();
  }, []);


  useEffect(() => {
    updatePasswordStrength(password);
  }, [password]);


  useEffect(() => {
    if (id) {
      updatePasswordEntry();
    }
  }, [inTrash]);


  const loadCategories = async () => {
    try {
      const response = await UserService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };

  const updatePasswordStrength = (password) => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };


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


  const resetFormState = () => {
    setId("");
    setTitle("");
    setUsername("");
    setPassword("");
    setWebsite("");
    setInFavorites(false);
    setShowPassword(false);
    setSelectedCategory(null);
  };


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
      inTrash: inTrash,
      category: selectedCategory,
    };

    try {
      await UserService.savePasswordEntry(passwordEntryData);
      resetFormState();
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
    setSelectedCategory(passwordEntry.category);
    updatePasswordStrength(passwordEntry.password);
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
        inTrash: inTrash,
        category: selectedCategory,
      };

      // Send the modified details to the server for update
      const response = await UserService.updatePasswordEntry(id, editedPasswordEntry);
      console.log('Edit response:', response);
      resetFormState();
      loadPasswordEntries();
    } catch (error) {
      console.error("Error updating password entry", error);
      alert("Error updating password entry. Please try again.");
    }
  };


  const deletePasswordEntry = async (id) => {
    await UserService.deletePasswordEntry(id);
    resetFormState();
    loadPasswordEntries();
  }


  const performSearch = () => {
    loadPasswordEntries();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const loadPasswordEntries = async () => {
    try {
      const result = await UserService.getUserPasswordEntries();

      // Check if there are entries
      if (result.data && result.data.length > 0) {
        // Decrypt the passwords before setting the state
        const decryptedEntries = result.data
          .filter(entry => !entry.inTrash)
          .map(entry => {

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
        // Filter entries
        const filteredEntries = searchTerm
          ? decryptedEntries.filter(entry => entry.title.toLowerCase().includes(searchTerm.toLowerCase()))
          : decryptedEntries;

        setPasswordEntries(filteredEntries);
      } else {
        // No entries, set passwordEntries to an empty array
        setPasswordEntries([]);
      }
    } catch (error) {
      console.error("Error loading password entries", error);
      alert("Error loading password entries. Please try again.");
    }
  };

  const toggleInTrashAndUpdate = () => {
    setInTrash((prevInTrash) => !prevInTrash);
    // Note: The useEffect hook will handle the updatePasswordEntry call
  };

  return (
    <div className="container mt-4">
      <div className="row">

        {/* Search field */}
        <div className="col-md-8">

          <h2>Password entries</h2>
          <div className="col-md-4 mb-2">
            <label className="col-sm-2 col-form-label col-form-label-sm">Search:</label>
            <div className="input-group">
              <input type="text" className="form-control form-control-sm" placeholder="Search by title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyPress} />
              <button type="button" className="btn btn-primary btn-sm" onClick={performSearch}>Search</button>
            </div>
          </div>

          {/* Display the list of password entries */}
          <AllPasswordsList
            passwordEntries={passwordEntries}
            editPasswordEntry={editPasswordEntry}
            deletePasswordEntry={deletePasswordEntry}
          />
        </div>

        <div className="col-md-4 ">
          <h2>Password entry information</h2>

          {/* Title */}
          <form className="row gy-2 gx-3 align-items-center">
            <div className="mb-2">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Title:</label>
              <input type="text" className="form-control form-control-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            {/* Website */}
            <div className="mb-0">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Website URL:</label>
              <input type="text" className="form-control form-control-sm" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div className="mb-2">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => openWebsite(website)}>Visit</button>
              <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={() => copyToClipboard(website)}>Copy</button>
            </div>

            {/* Categories dropdown menu */}
            <div className="mb-2">
              <label className="col-sm-2 col-form-label col-form-label-sm">Category:</label>
              <select
                className="form-select form-select-sm"
                value={selectedCategory ? selectedCategory.id : ''}
                onChange={(e) => {
                  const categoryId = e.target.value;
                  setSelectedCategory(categoryId ? categories.find(cat => cat.id === parseInt(categoryId)) : null);
                }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Username */}
            <div className="mb-0">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Username:</label>
              <input type="text" className="form-control form-control-sm" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => copyToClipboard(username)}>Copy</button>
            </div>

            {/* Password */}
            <div className="mb-0">
              <label className="ol-sm-2 col-form-label col-form-label-sm">Password:</label>
              <input type={showPassword ? "text" : "password"} className="form-control form-control-sm" value={password} onChange={(e) => {
                setPassword(e.target.value);
                updatePasswordStrength(e.target.value);
              }}
              />
            </div>
            <div className="mb-2">
            <div>
              Password Strength:{" "}
              <span style={{ color: getColorForPasswordStrength(passwordStrength) }}>
                {passwordStrength}
              </span>
            </div>
            </div>
            <div className="mb-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => copyToClipboard(password)}>Copy</button>
              <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={() => setPassword(generateRandomPassword())}>Generate</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>
            </div>

            {/* Favorites */}
            <div className="mb-1 form-check form-switch">
              <label className="col-sm-2 col-form-label col-form-label-sm mx-2">In Favorites</label>
              <input type="checkbox" className="form-check-input form-check form-switch md-2" checked={inFavorites} onChange={() => setInFavorites(!inFavorites)} />
            </div>


            {/* Main buttons */}
            <div className="mb-3">
              <button className="btn btn-primary btn-sm" onClick={savePasswordEntry}>Add</button>
              <button className="btn btn-primary btn-sm mx-2" onClick={updatePasswordEntry}>Update</button>
              <button className="btn btn-primary btn-sm" onClick={resetFormState}>Clear</button>
              <button className="btn btn-danger btn-sm mx-2" onClick={toggleInTrashAndUpdate}>To Trash</button>
              {/* <button className="btn btn-danger btn-sm" onClick={() => deletePasswordEntry(id)}>Delete</button> */}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AllPasswords;
