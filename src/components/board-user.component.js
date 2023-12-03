import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordEntries: [],
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    this.fetchPasswordEntries();
  }

  fetchPasswordEntries() {
    // Fetch password entries from the backend
    UserService.getUserPasswordEntries().then(
      response => {
        this.setState({
          passwordEntries: response.data
        });
      },
      error => {
        console.error("Error fetching password entries", error);
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <section>
          <h2>Password Entries</h2>
          <ul>
            {this.state.passwordEntries.map(entry => (
              <li key={entry.id}>
                <strong>Title:</strong> {entry.title}<br />
                <strong>Username:</strong> {entry.username}<br />
                <strong>Website:</strong> {entry.website}<br />
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
