import React, { Component } from 'react';
import { withRouter } from "react-router";
import BookingForm from "./BookingForm.js";

class Listing extends Component {
  
  // Initialize state
  state = { listing: {} }

  // Fetch listing info after first mount
  componentDidMount() {
    this.getListingInfo();
  }

  getListingInfo = () => {
    const listingId = this.props.match.params.listingId;
    // Get the listings and store them in state
    fetch(`/api/listings/${listingId}`)
      .then(res => res.json())
      .then(listing => this.setState({listing}));
  }

  render() {

    return (
      <div className="listing-view">
          <h1>{this.state.listing.title}</h1>
          <p>{this.state.listing.description}</p>
          <BookingForm listingId={this.state.listing._id} />
      </div>
    );
  }
}

const ListingWithRouter = withRouter(Listing);

export default ListingWithRouter;