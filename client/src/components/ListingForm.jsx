import React, { Component } from 'react';
import ReactFilestack from 'filestack-react';
import styled from "styled-components";

const StyledListingForm = styled.div`
  // background-color: #FAFAFA;
  // top: 0;
`;

const StyledForm = styled.form`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  background-color: #FFFFFF;
  color: #484848;
  display: flex;
  flex-direction: column;
  color: #484848;
  font-size: 19px;
  line-height: 27.17px;
  padding: 30px 30px 16px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 24px;
`;

const StyledLabel = styled.label`
  margin-bottom: 4px;
  padding-bottom: 8px;
  padding-top: 9px;
`;

const StyledButton = styled.button`
  background-color: #008489;
  border-style: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 24px;
  padding: 10px 22px;
  text-align: center;
`;

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
      <StyledListingForm>

        <StyledForm onSubmit={this.handleSubmit}>

          <h1>Add a Listing</h1>

          <FormSection>
            <StyledLabel>
              Title
            </StyledLabel>

            <input
                type="text"
                required
                id="title"
                name="title"
                label="Title"
                value={this.state.values.title}
                onChange={this.handleChange}
              />
          </FormSection>

          <FormSection>
            <StyledLabel>
              Address line 1
            </StyledLabel>
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
          </FormSection>
          
          <FormSection>
            <StyledLabel>
              Address line 2
            </StyledLabel>

            <input
              type="text"
              id="street2"
              name="street2"
              label="Address line 2"
              value={this.state.values.street2}
              onChange={this.handleChange}
              autoComplete="shipping address-line2"
            />
          </FormSection>
          
          <FormSection>
            <StyledLabel>
              City
            </StyledLabel>

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
          </FormSection>
          
          <FormSection>
            <StyledLabel>
              State
            </StyledLabel>

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
          </FormSection>
          
          <FormSection>
            <StyledLabel>
              Zip
            </StyledLabel>

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
          </FormSection>
          
          <FormSection>
            <StyledLabel>
              Description
            </StyledLabel>

            <textarea
              // required
              id="description"
              name="description"
              label="Description"
              value={this.state.values.description}
              onChange={this.handleChange}
            />
          </FormSection>
          
          <FormSection id="embedded" >
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
          </FormSection>

          <FormSection>
            <StyledButton
              as={"input"}
              type="submit"
              value="Submit"
            />
          </FormSection>

        </StyledForm>

        <div className={`message ${this.state.isError && "error"}`}>
          {this.state.isSubmitting ? "Submitting..." : this.state.message}
        </div>

      </StyledListingForm>
    );
  }
}

export default ListingForm;