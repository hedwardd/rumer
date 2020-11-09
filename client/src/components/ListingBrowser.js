import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
// import ListingFullView from "./components/ListingFullView.js";

class ListingBrowser extends Component {
  // Initialize state
  state = { listings: [] }

  // Fetch listings after first mount
  componentDidMount() {
    this.getListings();
  }

  getListings = () => {
    // Get the listings and store them in state
    fetch('/api/listings')
      .then(res => res.json())
      .then(listings => this.setState({ listings }));
  }

  render() {
    // let match = useRouteMatch();
    const { listings } = this.state;

    return (
      <div className="listingBrowser">
        {/* Render the listings if we have them */}
        {listings.length ? (
          <div>
            <h1>Listings</h1>
            <ul className="listings">
              {listings.map((listing, index) =>
                <li key={index}>
                  {/* <Link to={`${match.url}/${listing.id}`}> */}
                    {listing.title}
                    {/* </Link> */}
                </li>
              )}
            </ul>
            <button
              className="again"
              onClick={this.getListings}>
              Again
            </button>

            {/* <Switch>
              <Route path={`${match.path}/:listingId`}>
                <ListingFullView />
              </Route>
              <Route path={match.path}>
                <h3>Please select a Listing.</h3>
              </Route>
            </Switch> */}
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
      </div>
    );
  }
}

export default ListingBrowser;