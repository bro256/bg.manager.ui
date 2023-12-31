import React, { useState } from "react";


const FavoritesList = ({ passwordEntries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [passwordVisibility, setPasswordVisibility] = useState({});


  // Pagination
  const entriesPerPage = 20; // Items per page. Adjust as needed
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


  const openWebsite = (url) => {
    window.open(url, '_blank');
  };


  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text successfully copied to clipboard');
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
  };


  if (!passwordEntries || passwordEntries.length === 0) {
    return <p>No password entries found in.</p>;
  }




  return (
    <div className="col-md-12">
      <h2>Favorites</h2>
      <table className="table table-sm table-hover mt-3" align="center">
        <thead className="thead-light">
          <tr>
            <th style={{ width: '2%' }} scope="col"></th>
            <th style={{ width: '13%' }} scope="col">Title</th>
            <th style={{ width: '20%' }} scope="col">Website URL</th>
            <th style={{ width: '5%' }} scope="col"></th>
            <th style={{ width: '20%' }} scope="col">Username</th>
            <th style={{ width: '5%' }} scope="col"></th>
            <th style={{ width: '15%' }} scope="col">Password</th>
            <th style={{ width: '10%' }} scope="col"></th>
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
              <td>{passwordEntry.title.length > 20 ? `${passwordEntry.title.substring(0, 20)}...` : passwordEntry.title}</td>
              <td>{passwordEntry.website.length > 20 ? `${passwordEntry.website.substring(0, 20)}...` : passwordEntry.website}</td>

              <td>
                <button type="button" className="btn btn-primary mx-2 btn-sm mx-2" onClick={() => openWebsite(passwordEntry.website)}>Visit</button>
              </td>
              <td>{passwordEntry.username.length > 20 ? `${passwordEntry.username.substring(0, 20)}...` : passwordEntry.username}</td>
              <td>
                <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={() => copyToClipboard(passwordEntry.username)}>copy</button>
              </td>
              <td style={{ verticalAlign: "middle" }}>
                {passwordVisibility[passwordEntry.id] ? (
                  passwordEntry.password.length > 25
                    ? `${passwordEntry.password.substring(0, 25)}...`
                    : passwordEntry.password
                ) : (
                  <span>**************************</span>
                )}
              </td>
              <td>
                <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={() => copyToClipboard(passwordEntry.password)}>copy</button>
                <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={() => togglePasswordVisibility(passwordEntry.id)}>{passwordVisibility[passwordEntry.id] ? "hide" : "show"}</button>
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

export default FavoritesList;
