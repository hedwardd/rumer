import React from "react";
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


export const AppRouter = props => {

    let isAuthenticated = props.authenticated;
    

    
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/browse">Browse</Link>
                    </li>

                    <li>
                        <Link to="/addListing">Add Listing</Link>
                    </li>

                    
                    {isAuthenticated ? (
                        <li /* onClick={this._handleSignInClick} */ ><Link to="/api/logout">Log out</Link></li>
                    ) : (
                        <li /* onClick={this._handleSignInClick} */ ><Link to="/login">Log in</Link></li>
                    )}
                    {/* <li>
                        <Link to="/login">Log in</Link>
                    </li> */}
                </ul>

                <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/signup" component={SignupForm} />
                <Route path="/browse" component={ListingBrowser} />
                <Route path="/addListing" component={ListingForm} />
                <Route path="/" />
                </Switch>
            </div>
        </Router>
    );
};

    