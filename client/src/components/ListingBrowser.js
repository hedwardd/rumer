import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { withRouter } from "react-router";
import ListingWithRouter from "./Listing.js";

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
    const { match } = this.props;

    return (
      <div className="listingBrowser">
        <Switch>
          <Route path={`${match.path}/:listingId`}>
            <ListingWithRouter />
          </Route>
          <Route path={match.path}>
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
          </Route>
        </Switch>
      </div>
    );
  }
}

const ListingBrowserWithRouter = withRouter(ListingBrowser);

export default ListingBrowserWithRouter;