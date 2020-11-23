import React, { Component } from 'react';
import { withRouter } from "react-router";

class BookingViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: []
        };
        this.getBookings = this.getBookings.bind(this);
    }

  // Fetch listings after first mount
  componentDidMount() {
    this.getBookings();
  }

  getBookings = () => {
    // Get the listings and store them in state
    fetch("/api/myBookings/", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(res => res.json())
      .then(bookings => this.setState({ bookings }));
  }

  render() {
    // let match = useRouteMatch();
    const { bookings } = this.state;
    // const { match } = this.props;

    return (
      <div className="bookingViewer">
        {/* <Switch>
          <Route path={`${match.path}/:listingId`}>
            <Listing />
          </Route>
          <Route path={match.path}> */}
            {/* Render the listings if we have them */}
            {bookings.length ? (
              <div>
                  
                  <h1>Bookings</h1>
                  <ul>
                    {bookings.map((booking, index) =>
                      <li key={index}>
                        {/* <Link to={`/browse/${listing._id}`}>
                          {listing.title}
                        </Link> */}
                        <p>Check-in Date: {booking.checkIn}</p>
                        <p>Check-out Date: {booking.checkOut}</p>
                      </li>
                    )}
                  </ul>
                  <button
                    className="again"
                    onClick={this.getBookings}>
                    Refresh
                  </button>
                </div>
              ) : (
                // Render a helpful message otherwise
                <div>
                  <h1>No bookings</h1>
                  <button
                    className="again"
                    onClick={this.getBookings}>
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

export default withRouter(BookingViewer);