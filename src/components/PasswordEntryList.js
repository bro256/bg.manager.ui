import React, { useState } from "react";

const PasswordEntryList = ({ passwordEntries, editPasswordEntry, deletePasswordEntry }) => {
  const [passwordVisibility, setPasswordVisibility] = useState({});

  const togglePasswordVisibility = (id) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [id]: !prevVisibility[id] || false,
    }));
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

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
          <th scope="col"></th>
          <th scope="col">Website</th>
          <th scope="col"></th>
          <th scope="col">Modified</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      {passwordEntries.map((passwordEntry, index) => (
        <tbody key={passwordEntry.id}>
          <tr>
            <td>{passwordEntry.title}</td>
            <td>{passwordEntry.username}</td>
            <td style={{ verticalAlign: "middle" }}>
              {passwordVisibility[passwordEntry.id] ? (
                passwordEntry.encryptedPassword
              ) : (
                <span>****************</span>
              )}
            </td>
            <td>
              <button
                type="button"
                className="btn btn-secondary btn-sm mx-2"
                onClick={() => togglePasswordVisibility(passwordEntry.id)}
              >
                {passwordVisibility[passwordEntry.id] ? "hide" : "show"}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm mx-2"
                onClick={() => copyToClipboard(passwordEntry.encryptedPassword)}
              >
                copy
              </button>
            </td>
            <td>{passwordEntry.website}</td>
            <td>
              <button
                type="button"
                className="btn btn-secondary btn-sm mx-2"
                onClick={() => copyToClipboard(passwordEntry.website)}
              >
                copy
              </button>
            </td>

            <td>{passwordEntry.updatedAt}</td>
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
      ))}
    </table>
  );
};

export default PasswordEntryList;
