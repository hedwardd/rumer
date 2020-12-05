import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import ListingFullView from "./ListingFullView.jsx";
import styled from "styled-components";

const StyledListingBrowser = styled.div`
  padding: 0px 80px;
`;

const StyledImg = styled.img`
  width: 20vw;
  height: 20vh;
  border-radius: 1vw;
`;

const StyledUnorderedList = styled.ul`
  display: contents;
`;

const StyledListItem = styled.li`
  list-style-type: none;
`;

const ListingContainer = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  padding: 1vw;
  text-decoration: none;
  color: black;
`;

class ListingBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = { listings: [] };

    this.getListings = this.getListings.bind(this);
  }

  componentDidMount() {
    this.getListings();
  }

  getListings = () => {
    fetch("/api/listings", {
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
    const { match } = this.props;

    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:listingId`}>
            <ListingFullView user={this.props.user} />
          </Route>
          <Route path={match.path}>
              <StyledListingBrowser>

                <h1>Listings</h1>

                {listings.length ? (
                  // Render the listings if we have them
                  <StyledUnorderedList>
                    <hr/>
                    {listings.map((listing, index) =>
                      <StyledListItem key={listing._id}>
                        <ListingContainer>

                          <StyledImg src={listing.photoURLs[0]} />

                          <StyledLink to={`/browse/${listing._id}`}>
                            {listing.title}
                          </StyledLink>

                        </ListingContainer>
                        <hr/>
                      </StyledListItem>
                    )}
                  </StyledUnorderedList>
                ) : (
                  // Otherwise, render a helpful message
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              
              </StyledListingBrowser>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(ListingBrowser);