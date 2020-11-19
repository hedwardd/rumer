import React, { Component } from 'react';
import ReactFilestack from 'filestack-react';

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        title: "",
        photoURLs: [],
        street1: "",
        street2: "",
        city: "",
        zip: "",
        state: "",
        description: ""
      },
      isSubmitting: false,
      isError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    let listingData = {
      ...this.state.values
    }
    const res = await fetch("/api/listings", {
      method: "POST",
      body: JSON.stringify(listingData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    });
    this.setState({ isSubmitting: false });
    const data = await res.json();
    console.log(res.json)
    !data.hasOwnProperty("error")
      ? this.setState({ message: data.success })
      : this.setState({ message: data.error, isError: true });

    setTimeout(
      () =>
        this.setState({
          isSubmitting: false,
          isError: false,
          message: "",
          values: { 
            title: "",
            photoURLs: [],
            street1: "",
            street2: "",
            city: "",
            zip: "",
            state: "",
            description: "" 
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

  handleFileUpload = res => {
    console.log("handleFileUpload triggered.");
    console.log(res);
    if (res.filesUploaded.length) {
      let photoURLs = res.filesUploaded.map(file => file.url);
      this.setState({ 
        values: {
          ...this.state.values,
          photoURLs
        }
      });
    } else {
      console.log("There was an error.");
      console.log(res);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="listing-form">
         <label>
           Title:
           <input
            type="text"
            required
            id="title"
            name="title"
            label="Title"
            value={this.state.values.title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Address line 1:
          <input
            type="text"
            // required
            id="street1"
            name="street1"
            label="Address line 1"
            value={this.state.values.street1}
            onChange={this.handleChange}
            autoComplete="shipping address-line1"
          />
        </label>
        <label>
          Address line 2:
          <input
            type="text"
            id="street2"
            name="street2"
            label="Address line 2"
            value={this.state.values.street2}
            onChange={this.handleChange}
            autoComplete="shipping address-line2"
          />
        </label>
        <label>
          City:
          <input
            type="text"
            // required
            id="city"
            name="city"
            label="City"
            value={this.state.values.city}
            onChange={this.handleChange}
            autoComplete="shipping address-level2"
          />
        </label>
        <label>
          State:
          <input
            type="text"
            // required
            id="state"
            name="state"
            label="State"
            value={this.state.values.state}
            onChange={this.handleChange}
            autoComplete="shipping address-level2"
          />
        </label>
        <label>
          Zip:
          <input
            type="text"
            // required
            id="zip"
            name="zip"
            label="Zip"
            value={this.state.values.zip}
            onChange={this.handleChange}
            autoComplete="shipping postal-code"
          />
        </label>
        <label>
          Description:
          <textarea
            // required
            id="description"
            name="description"
            label="Description"
            value={this.state.values.description}
            onChange={this.handleChange}
          />
        </label>
        <div id="embedded" >
          <ReactFilestack        
            apikey="AndaLCkprQkKsCBl3aG2rz"
            // componentDisplayMode={{
            //   type: 'immediate'
            // }}
            // actionOptions={{
            //   displayMode: "inline",
            //   container: "embedded"
            // }}
            onSuccess={this.handleFileUpload}
            />
        </div>
        <input type="submit" value="Submit" />
      </form>
        <div className={`message ${this.state.isError && "error"}`}>
          {this.state.isSubmitting ? "Submitting..." : this.state.message}
        </div>
      </div>
    );
  }
}

export default ListingForm;