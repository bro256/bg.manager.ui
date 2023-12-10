import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import FavoritesList from "./FavoritesList";
import { decryptPassword } from "../utils/cryptoUtils";


const Favorites = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [inFavorites, setInFavorites] = useState(false);
  const [inTrash, setInTrash] = useState(false);



  useEffect(() => {
    loadPasswordEntries();
  }, []);

  const editPasswordEntry = async (passwordEntry) => {
    setId(passwordEntry.id);
    setTitle(passwordEntry.title);
    setUsername(passwordEntry.username);
    setPassword(passwordEntry.password);
    setWebsite(passwordEntry.website);
    setInFavorites(passwordEntry.inFavorites);
  }


  const loadPasswordEntries = async () => {
    try {
      const result = await UserService.getUserPasswordEntriesInFavorites();

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
  
  const toggleInTrashAndUpdate = () => {
    setInTrash((prevInTrash) => !prevInTrash);
    // Note: The useEffect hook will handle the updatePasswordEntry call
  };
  
  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-12">
          <FavoritesList
              passwordEntries={passwordEntries}
              editPasswordEntry={editPasswordEntry}
          />
        </div>
      </div>
    </div>
  );
};

export default Favorites;
