import React, { useState } from 'react';
import ReactFilestack from 'filestack-react';
import {
  StyledListingForm, FormSection, StyledLabel, StyledButton, StyledTextArea, StyledInput,
} from './styles/ListingFormStyles';

const FilePickerOptions = {
  accept: ['image/*'],
  maxFiles: 3,
};

const InitialState = {
  title: '',
  photoURLs: [],
  street1: '',
  street2: '',
  city: '',
  zip: '',
  state: '',
  description: '',
};

const postListing = async (listingData) => {
  const response = await fetch('/api/listings', {
    method: 'POST',
    body: JSON.stringify(listingData),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  if (response.status !== 200) return null;
  const responseData = await response.json();
  return responseData;
};

export default function ListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [formValues, setFormValues] = useState(InitialState);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileUpload = (res) => {
    if (res.filesUploaded.length) {
      const photoURLs = res.filesUploaded.map((file) => file.url);
      setFormValues({
        ...formValues,
        photoURLs,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await postListing(formValues);
    setIsSubmitting(false);
    if (result.error) setMessage(result.error);
    else if (result) {
      setMessage('Your listing was successfully added!');
      setTimeout(() => {
        setMessage('');
        setFormValues(InitialState);
      }, 3000);
    } else {
      setMessage('Something went wrong.  Please try again.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <StyledListingForm onSubmit={(event) => handleSubmit(event)}>

      <h2>Add a Listing</h2>

      <FormSection>
        <StyledLabel>
          Title
        </StyledLabel>

        <StyledInput
          type="text"
          required
          id="title"
          name="title"
          label="Title"
          value={formValues.title}
          onChange={(event) => handleChange(event)}
        />
      </FormSection>

      <FormSection>
        <StyledLabel>
          Address line 1
        </StyledLabel>
        <StyledInput
          type="text"
          required
          id="street1"
          name="street1"
          label="Address line 1"
          value={formValues.street1}
          onChange={(event) => handleChange(event)}
          autoComplete="shipping address-line1"
        />
      </FormSection>

      <FormSection>
        <StyledLabel>
          Address line 2
        </StyledLabel>

        <StyledInput
          type="text"
          id="street2"
          name="street2"
          label="Address line 2"
          value={formValues.street2}
          onChange={(event) => handleChange(event)}
          autoComplete="shipping address-line2"
        />
      </FormSection>

      <FormSection>
        <StyledLabel>
          City
        </StyledLabel>

        <StyledInput
          type="text"
          required
          id="city"
          name="city"
          label="City"
          value={formValues.city}
          onChange={(event) => handleChange(event)}
          autoComplete="shipping address-level2"
        />
      </FormSection>

      <FormSection>
        <StyledLabel>
          State
        </StyledLabel>

        <StyledInput
          type="text"
          required
          id="state"
          name="state"
          label="State"
          value={formValues.state}
          onChange={(event) => handleChange(event)}
          autoComplete="shipping address-level2"
        />
      </FormSection>

      <FormSection>
        <StyledLabel>
          Zip
        </StyledLabel>

        <StyledInput
          type="text"
          required
          id="zip"
          name="zip"
          label="Zip"
          value={formValues.zip}
          onChange={(event) => handleChange(event)}
          autoComplete="shipping postal-code"
        />
      </FormSection>

      <FormSection>
        <StyledLabel>
          Description
        </StyledLabel>

        <StyledTextArea
          required
          id="description"
          name="description"
          label="Description"
          maxLength={1000}
          rows={10}
          value={formValues.description}
          onChange={(event) => handleChange(event)}
        />
      </FormSection>

      <FormSection id="embedded">
        <ReactFilestack
          apikey="AndaLCkprQkKsCBl3aG2rz"
          actionOptions={FilePickerOptions}
          componentDisplayMode={{
            type: 'button',
            customText: 'Upload Photos (Max: 3)',
          }}
          onSuccess={(res) => handleFileUpload(res)}
        />
      </FormSection>

      <FormSection>
        <StyledButton
          as="input"
          type="submit"
          value="Submit"
        />
      </FormSection>

      <p>{isSubmitting ? 'Submitting...' : ''}</p>

      <p>{message.length ? message : ''}</p>

    </StyledListingForm>
  );
}
