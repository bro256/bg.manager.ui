import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    UserService.getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }, []);


  const handleDelete = (userId) => {
    UserService.deleteUser(userId)
      .then((response) => {
        console.log("Delete user response:", response);
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  
  return (
    <div className="container">
      <header className="jumbotron">
        <h2>Registered Users</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.roles.map((role) => (
                      <span key={role.id}>{role.name}, </span>
                    ))}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </header>
    </div>
  );
};

export default Admin;
