import React, { Component } from 'react';

class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        values: {
            checkIn: "",
            checkOut: ""
        },
        isSubmitting: false,
        isError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isSubmitting: true });

        const bookingObject = { 
            ...this.state.values,
            _associatedListing: this.props.listingId 
        };

        const res = await fetch("/api/bookings", { 
            method: "POST",
            body: JSON.stringify(bookingObject),
            headers: { "Content-Type": "application/json" } 
        });
        this.setState({ isSubmitting: false });
        const data = await res.json();
        !data.hasOwnProperty("error")
            ? this.setState({ message: data.success })
            : this.setState({ message: data.error, isError: true });
        setTimeout(() => this.setState({ 
            isError: false,
            message: "",
            values: { 
                checkIn: "",
                checkOut: "" 
            } 
            }),
        1600
        );
    };

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            values: { 
                ...this.state.values, 
                [name]: value
            
            }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form">
                    <label>
                        Check In Date:
                        <input
                            type="date"
                            required
                            id="checkIn"
                            name="checkIn"
                            label="checkIn"
                            value={this.state.values.checkIn}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Check Out Date:
                        <input
                            type="date"
                            required
                            id="checkOut"
                            name="checkOut"
                            label="checkOut"
                            value={this.state.values.checkOut}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Reserve" />
                </form>
                <div className={`message ${this.state.isError && "error"}`}>
                {this.state.isSubmitting ? "Submitting..." : this.state.message}
                </div>
            </div>
        );
    }
}

export default BookingForm;