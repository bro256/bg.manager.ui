import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import FavoritesList from "./FavoritesList";
import { decryptPassword } from "../utils/cryptoUtils";


const Favorites = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);


  useEffect(() => {
    loadPasswordEntries();
  }, []);


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
  
  
  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-12">
          <FavoritesList
              passwordEntries={passwordEntries}
          />
        </div>
      </div>
    </div>
  );
};

export default Favorites;
