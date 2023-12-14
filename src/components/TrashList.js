import React, { useState } from "react";


const TrashList = ({ passwordEntries, toggleInTrashAndUpdate, deletePasswordEntry }) => {

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const entriesPerPage = 20;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = passwordEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(passwordEntries.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  if (!passwordEntries || passwordEntries.length === 0) {
    return <p>No password entries found in trash.</p>;
  }

  return (
    <div className="col-md-12">
      <h2>Trash</h2>
      <table className="table table-sm table-hover mt-3" align="center">
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Title</th>
            <th scope="col">Website URL</th>
            <th scope="col">Username</th>
            <th scope="col">Moved to trash time</th>
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
              <td style={{ width: '15%' }}>{passwordEntry.title.length > 20 ? `${passwordEntry.title.substring(0, 20)}...` : passwordEntry.title}</td>
              <td style={{ width: '25%' }}>{passwordEntry.website.length > 35 ? `${passwordEntry.website.substring(0, 35)}...` : passwordEntry.website}</td>
              <td style={{ width: '20%' }}>{passwordEntry.username.length > 30 ? `${passwordEntry.username.substring(0, 30)}...` : passwordEntry.username}</td>
              <td style={{ width: '20%' }}>{new Date(passwordEntry.updatedAt).toLocaleString('lt-LT')}</td>
              <td style={{ width: '20%' }}>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => toggleInTrashAndUpdate(passwordEntry.id)}>Restore</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => deletePasswordEntry(passwordEntry.id)}>Delete</button></td>
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

export default TrashList;
