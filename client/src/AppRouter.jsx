import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ListingForm from "./components/ListingForm";
import ListingBrowser from "./components/ListingBrowser";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";


class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            authenticated: false
        }
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this._handleLogin = this._handleLogin.bind(this);
        this._handleLogout = this._handleLogout.bind(this);
    }

    componentDidMount() {
        this.checkIfLoggedIn();
      }

    checkIfLoggedIn() {
        fetch("api/auth", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            }
        })
            .then(res => {
              if (res.status === 200) return res.json();
              throw new Error("Failed to authenticate user.");
            })
            .then(json => {
              this.setState({
                authenticated: true,
                user: json.user
              });
            })
            .catch(error => {
              this.setState({
                authenticated: false,
                error: "Failed to authenticate user."
              });
            });
    }

    _handleLogin(user) {
        this.setState({
            authenticated: true,
            user: user
          });
    }

    _handleLogout() {
        fetch("/api/logout")
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        authenticated: false,
                        user: {}
                      });
                    window.open("/", "_self");
                } else {
                    throw new Error("Failed to log out user.");
                }
            });
    }

    
    render() {

        let isAuthenticated = this.state.authenticated;

        return (
            <Router >
                <div>
                    {isAuthenticated
                        ? (<p>Logged in as {this.state.user.username}</p>)
                        : (<p>Not logged in.</p>)}
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
    
                        <li>
                            <Link to="/browse">Browse</Link>
                        </li>
    
                        {isAuthenticated
                            ? (<li><Link to="/addListing">Add Listing</Link></li>)
                            : ""}
    
                        {isAuthenticated
                            ? (<li><Link onClick={this._handleLogout}>Log out</Link></li>)
                            : (<li><Link to="/login">Log in</Link></li>)
                        }

                    </ul>
    
                    <Switch>
                    <Route path="/login">
                        <LoginForm loginHandler={this._handleLogin} />
                    </Route>
                    <Route path="/signup">
                        <SignupForm />
                    </Route>
                    <Route path="/browse">
                        <ListingBrowser />
                    </Route>
                    <Route path="/addListing">
                        <ListingForm />
                    </Route>
                    <Route path="/" component={()=>(window.open("/browse", "_self"))} />
                    </Switch>
                </div>
            </Router>
        );

    }
};

export default AppRouter;