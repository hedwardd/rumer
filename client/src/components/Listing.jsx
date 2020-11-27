import React, { Component } from 'react';
import { withRouter } from "react-router";
import BookingForm from "./BookingForm.jsx";

class Listing extends Component {
  
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {};

    this.getListingInfo = this.getListingInfo.bind(this);
  }

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

        {images}

        <p>{this.state.description}</p>

        <BookingForm  user={ this.props.user } listingId={this.state._id} />
        
      </div>
    );
  }
}

export default withRouter(Listing);