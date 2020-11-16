import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
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
            ...this.state, 
            [name]: value
        });
    }
    
    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isSubmitting: true });

        const userObject = { 
            username: this.state.username,
            password: this.state.password
        };

        const res = await fetch("/api/user", { 
            method: "POST",
            body: JSON.stringify(userObject),
            headers: { "Content-Type": "application/json" } 
        });
        this.setState({ isSubmitting: false });
        const data = await res.json();
        data.hasOwnProperty("error")
            ? this.setState({ message: data.error, isError: true })
            : this.setState({ message: data.success });
        setTimeout(() => this.setState({ 
            isError: false,
            message: "",
            username: "",
            password: "",
            }),
        1600
        );
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Sign Up</h2>

                    <label>
                        Username
                        <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        />
                    </label>

                    <label>
                        Password
                        <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        />
                    </label>

                    <input
                        type="submit"
                        value="Submit"
                    />

                </form>

                <div>
                    {this.state.isSubmitting ? "Submitting..." : this.state.message}
                </div>

                <p>Already have an account? <Link to={'/login'}>Log in</Link>.</p>
            </div>
        )
    }

  
}

export default SignupForm;