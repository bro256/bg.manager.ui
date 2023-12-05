import React from "react";

const PasswordEntryList = ({ passwordEntries, editPasswordEntry, deletePasswordEntry }) => {
  if (!passwordEntries || passwordEntries.length === 0) {
    return <p>No password entries found.</p>;
  }

  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Username</th>
          <th scope="col">Password</th>
          <th scope="col">Website</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      {passwordEntries.map((passwordEntry, index) => {
        return (
          <tbody key={passwordEntry.id}>
            <tr>

              <td>{passwordEntry.title}</td>
              <td>{passwordEntry.username}</td>
              <td>{passwordEntry.encryptedPassword}</td>
              <td>{passwordEntry.website}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editPasswordEntry(passwordEntry)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deletePasswordEntry(passwordEntry.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default PasswordEntryList;