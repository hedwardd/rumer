import React, { Component } from 'react';

class ListingFullView extends Component {
  // Initialize state
  state = { listings: [] }

  // Fetch listings after first mount
  componentDidMount() {
    this.getListings();
  }

  getListing = () => {
    // Get the listings and store them in state
    fetch('/api/listings')
      .then(res => res.json())
      .then(listings => this.setState({ listings }));
  }

  render() {
    // const { listings } = this.state;

    return (
      <div className="listing-view">
          <h1>Listing</h1>
      </div>
    );
  }
}

export default ListingFullView;