import React, { Component } from 'react';
import { withRouter } from "react-router";
import BookingForm from "./BookingForm.jsx";

class Listing extends Component {
  
  // Initialize state
  state = {}

  // Fetch listing info after first mount
  componentDidMount() {
    this.getListingInfo();
  }

  getListingInfo = () => {
    const listingId = this.props.match.params.listingId;
    // Get the listings and store them in state
    fetch(`/api/listings/${listingId}`)
      .then(res => res.json())
      .then(listing => this.setState({...listing}));
  }

  render() {

    let images = null;
    if (this.state.photoURLs) {
      images = this.state.photoURLs.map(url => (
        <img src={url} alt="A look at the listing."></img>
      ))
    }

    console.log(this.state);

    return (
      <div className="listing-view">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          {images}

          <BookingForm listingId={this.state._id} />
      </div>
    );
  }
}

const ListingWithRouter = withRouter(Listing);

export default ListingWithRouter;