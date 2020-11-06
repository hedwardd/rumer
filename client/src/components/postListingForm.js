import React, { Component } from 'react';
import './App.css';

// {
//   title: { type: String, required: true, trim: true },
//   photoURLs: [ { type: String } ],
//   address: {
//     street1: { type: String, lowercase: true, trim: true },
//     street2: { type: String, lowercase: true, trim: true },
//     city: { type: String, lowercase: true, trim: true },
//     zip: { type: String, trim: true, match: /^\d{5}$/ },
//     state: { type: String, lowercase: true, trim: true, minlength: 2, maxlength: 2 },
//   },
//   description: { type: String, trim: true }
// }

class App extends Component {
  // Initialize state
  state = {
    title: "",
    photoURLs: [],
    address: {
      street1: "",
      street2: "",
      city: "",
      zip: "",
      state: "",
    },
    description: ""
    }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;