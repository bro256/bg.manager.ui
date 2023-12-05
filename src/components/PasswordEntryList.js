import React, { useState } from "react";

const PasswordEntryList = ({ passwordEntries, editPasswordEntry, deletePasswordEntry }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [passwordVisibility, setPasswordVisibility] = useState({});

  // Pagination
  const entriesPerPage = 8; // Items per page. Adjust as needed
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = passwordEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(passwordEntries.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const openWebsite = (url) => {
    window.open(url, '_blank');
  };

  if (!passwordEntries || passwordEntries.length === 0) {
    return <p>No password entries found.</p>;
  }

  return (
    <div>
      <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col"></th>
          <th scope="col">Title</th>
          <th scope="col">Website URL</th>
          <th scope="col">Username</th>
          <th scope="col"></th>
          <th scope="col">Password</th>
          <th scope="col"></th>
          <th scope="col">Modified</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      {currentEntries.map((passwordEntry, index) => (
        <tbody key={passwordEntry.id}>
          <tr>
          <td>
              {passwordEntry.inFavorites ? (
                <span role="img" aria-label="star">
                  ⭐
                </span>
              ) : (
                <span role="img" aria-label="star" style={{ opacity: 0.2 }}>
                  ⭐
                </span>
              )}
            </td>
            <td>{passwordEntry.title}</td>
            <td>{passwordEntry.website}</td>
            <td>{passwordEntry.username}</td>
            <td>
              <button
                type="button"
                className="btn btn-secondary btn-sm mx-2"
                onClick={() => copyToClipboard(passwordEntry.username)}
              >
                copy
              </button>
            </td>
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

            <td>{passwordEntry.updatedAt}</td>
            <td>
              <button
                type="button"
                className="btn btn-primary mx-2 btn-sm mx-2"
                onClick={() => openWebsite(passwordEntry.website)}
              >
                Visit
              </button>
              <button
                type="button"
                className="btn btn-warning btn-sm mx-2"
                onClick={() => editPasswordEntry(passwordEntry)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger mx-2 btn-sm mx-2"
                onClick={() => deletePasswordEntry(passwordEntry.id)}
              >
                Delete
              </button>

            </td>
          </tr>
        </tbody>
      ))}
    </table>


    {/* Pagination */}
    <nav>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
            <button
              onClick={() => setCurrentPage(page)}
              className="page-link"
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    
    
    </div>
  );
};

export default PasswordEntryList;
