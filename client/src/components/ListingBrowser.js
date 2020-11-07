import React, { Component } from 'react';

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
                  {listing.title}
                </li>
              )}
            </ul>
            <button
              className="again"
              onClick={this.getListings}>
              Again
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No listings :(</h1>
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