import React, { Component } from 'react';
import { withRouter } from "react-router";
import BookingForm from "./BookingForm.jsx";
import styled from "styled-components";

const StyledListingFullView = styled.div`
  width: 100%;
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.section`

`;

const ImageSection = styled.section`

`;

const DetailsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DescriptionWrapper = styled.div`
  width: 58.3333%;
`;

class ListingFullView extends Component {
  
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

      <StyledListingFullView>

        <TitleSection>
          <h1>{this.state.title}</h1>
        </TitleSection>

        <ImageSection>
          {images}
        </ImageSection>

        <DetailsSection>

          <DescriptionWrapper>
            <p>{this.state.description}</p>
          </DescriptionWrapper>

          <BookingForm  user={ this.props.user } listingId={this.state._id} />

        </DetailsSection>

      </StyledListingFullView>

    );
  }
}

export default withRouter(ListingFullView);