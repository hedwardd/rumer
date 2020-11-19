import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withRouter } from "react-router";
import Listing from "./Listing.jsx";

class HostDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: []
        };
        this.getListings = this.getListings.bind(this);
    }

  // Fetch listings after first mount
  componentDidMount() {
    this.getListings();
  }

  getListings = () => {
    let _hostUser = this.props.user._id;
    // Get the listings and store them in state
    fetch(`/api/listings/host/${_hostUser}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(res => res.json())
      .then(listings => this.setState({ listings }));
  }

  render() {
    // let match = useRouteMatch();
    const { listings } = this.state;
    // const { match } = this.props;

    return (
      <div className="listingManager">
        {/* <Switch>
          <Route path={`${match.path}/:listingId`}>
            <Listing />
          </Route>
          <Route path={match.path}> */}
            {/* Render the listings if we have them */}
            {listings.length ? (
              <div>
                  
                  <h1>Listings</h1>
                  <ul className="listings">
                    {listings.map((listing, index) =>
                      <li key={index}>
                        <Link to={`/browse/${listing._id}`}>
                          {listing.title}
                        </Link>
                      </li>
                    )}
                  </ul>
                  <button
                    className="again"
                    onClick={this.getListings}>
                    Refresh
                  </button>
                </div>
              ) : (
                // Render a helpful message otherwise
                <div>
                  <h1>No listings</h1>
                  <button
                    className="again"
                    onClick={this.getListings}>
                    Try Again?
                  </button>
                </div>
              )}
          {/* </Route>
        </Switch> */}
      </div>
    );
  }
}

export default withRouter(HostDashboard);