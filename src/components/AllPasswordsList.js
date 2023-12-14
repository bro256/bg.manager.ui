import React, { useState } from "react";

const PasswordEntryList = ({ passwordEntries, editPasswordEntry, deletePasswordEntry }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination
  const entriesPerPage = 20;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = passwordEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(passwordEntries.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text successfully copied to clipboard');
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };


  if (!passwordEntries || passwordEntries.length === 0) {
    return <p>No password entries found.</p>;
  }

  return (
    <div className="col-md-10">
      <table className="table table-sm table-hover mt-3" align="center">
        <thead className="thead-light">
          <tr>
            <th style={{ width: '4%' }} scope="col"></th>
            <th style={{ width: '32%' }} scope="col">Title</th>
            <th style={{ width: '32%' }} scope="col">Website URL</th>
            <th style={{ width: '32%' }} scope="col">Username</th>
          </tr>
        </thead>
        {currentEntries.map((passwordEntry, index) => (
          <tbody key={passwordEntry.id} onClick={() => editPasswordEntry(passwordEntry)} style={{ cursor: 'pointer' }}>
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
              <td>{passwordEntry.title.length > 20 ? `${passwordEntry.title.substring(0, 20)}...` : passwordEntry.title}</td>
              <td>{passwordEntry.website.length > 35 ? `${passwordEntry.website.substring(0, 35)}...` : passwordEntry.website}</td>
              <td>{passwordEntry.username.length > 30 ? `${passwordEntry.username.substring(0, 30)}...` : passwordEntry.username}</td>
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
