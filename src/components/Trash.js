import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import TrashList from "./TrashList";




const Trash = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);
  const [inTrash, setInTrash] = useState(true);


  useEffect(() => {
    loadPasswordEntries();
  }, []);

  const toggleInTrashAndUpdate = async (id) => {
    try {
      // Make a GET request to toggle the inTrash status
      await UserService.togglePasswordEntryInTrash(id);
      loadPasswordEntries();

    } catch (error) {
      console.error("Error toggling inTrash status", error);
      alert("Error toggling inTrash status. Please try again.");
    }
  };

  const toggleAllInTrashAndUpdate = async () => {
    try {
      for (const passwordEntry of passwordEntries) {
        await UserService.togglePasswordEntryInTrash(passwordEntry.id);
      }
      // Make a GET request to toggle the inTrash status

      loadPasswordEntries();

    } catch (error) {
      console.error("Error toggling all items inTrash status", error);
      alert("Error toggling all items inTrash status. Please try again.");
    }
  };


  const deletePasswordEntry = async (id) => {
    await UserService.deletePasswordEntry(id);
    loadPasswordEntries();
  };


  const deleteAllInTrash = async () => {
    try {
      for (const passwordEntry of passwordEntries) {
        await UserService.deletePasswordEntry(passwordEntry.id);
      }

      loadPasswordEntries();
    } catch (error) {
      console.error("Error deleting all items in trash", error);
      alert("Error deleting all items in trash. Please try again.");
    }
  };


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
            toggleInTrashAndUpdate={toggleInTrashAndUpdate}
            deletePasswordEntry={deletePasswordEntry}
            deleteAllInTrash={deleteAllInTrash}
          />
          {passwordEntries.length > 0 && (
            <div>
              <button className="btn btn-primary btn-sm" onClick={toggleAllInTrashAndUpdate}>Restore All</button>
              <button className="btn btn-danger btn-sm mx-2" onClick={deleteAllInTrash}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trash;
