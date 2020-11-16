import React, { Component } from "react";
import './App.css';
import { AppRouter } from "./AppRouter.jsx";

class App extends Component {

  state = {
    user: {},
    authenticated: false
  }

  // const _handleSignIn = {

  // }

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("api/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }
  

  render() {
    return <AppRouter authenticated={this.state.authenticated} user={this.state.user} />;
  }
}

export default App;
