import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import TrashList from "./TrashList";
import { decryptPassword } from "../utils/cryptoUtils";


const Trash = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);


  useEffect(() => {
    loadPasswordEntries();
  }, []);


  const loadPasswordEntries = async () => {
    try {
      const result = await UserService.getUserPasswordEntriesInTrash();

      // Check if there are entries
      if (result.data && result.data.length > 0) {
        setPasswordEntries(result.data);
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
          <TrashList
              passwordEntries={passwordEntries}
          />
        </div>
      </div>
    </div>
  );
};

export default Trash;
