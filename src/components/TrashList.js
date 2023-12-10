import React, { useState } from "react";

const TrashList = ({ passwordEntries}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const entriesPerPage = 20; // Items per page. Adjust as needed
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = passwordEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(passwordEntries.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

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
            <td>{passwordEntry.website.length > 30 ? `${passwordEntry.website.substring(0, 30)}...` : passwordEntry.website}</td>
            <td>{passwordEntry.username}</td>
            <td>{passwordEntry.updatedAt}</td>
            <td>

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

export default TrashList;
