import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        values: {
          username: "",
          password: ""
        },
        isSubmitting: false,
        isError: false
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>

                <label>
                    Username
                    <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.values.username}
                    />
                </label>

                <label>
                    Password
                    <input
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    />
                </label>

                <input
                    type="submit"
                    value="Submit"
                />

                <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
                </form>
            </div>
        )
    }

  
}

export default LoginForm;