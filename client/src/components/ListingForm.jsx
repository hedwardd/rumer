import React, { useState } from "react";
import ReactFilestack from "filestack-react";
import styled from "styled-components";

const FilePickerOptions = {
	accept: ["image/*"],
	maxFiles: 3
  };

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

const handleSubmit = async (listingData) => {

	const response = await fetch("/api/listings", {
		method: "POST",
		body: JSON.stringify(listingData),
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Credentials": true
		}
	});
	if (response.status !== 200) return null;
	else {
		const responseData = await response.json();
		console.log(responseData);
		return responseData;
		// !data.hasOwnProperty("error")
		// ? this.setState({ message: data.success })
		// : this.setState({ message: data.error, isError: true });
	}
};

// TO-DO: Update BookingForm to reflect loading, success/fail of submission
// TO-DO: Update file picker to be able to upload multiple files
export default function ListingForm ({user}) {

	const [formValues, setFormValues] = useState({
		title: "",
		photoURLs: [],
		street1: "",
		street2: "",
		city: "",
		zip: "",
		state: "",
		description: ""
	})

	const handleChange = event => {
		const updatedValue = event.target.value;
		const name = event.target.name;
		setFormValues({
			...formValues, 
			[name]: updatedValue
		});
	}

	const handleFileUpload = res => {
		console.log("handleFileUpload triggered.");
		console.log(res);
		if (res.filesUploaded.length) {
			let photoURLs = res.filesUploaded.map(file => file.url);
			setFormValues({
				...formValues,
				photoURLs
			});
		} else {
			console.log("There was an error.");
			console.log(res);
		}
	}

    return (
		<StyledListingForm>
			
			<StyledForm
				onSubmit={event => {
					event.preventDefault();
					handleSubmit(formValues);
				}}
			>

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
						value={formValues.title}
						onChange={event=>handleChange(event)}
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
						value={formValues.street1}
						onChange={event=>handleChange(event)}
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
						value={formValues.street2}
						onChange={event=>handleChange(event)}
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
						value={formValues.city}
						onChange={event=>handleChange(event)}
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
						value={formValues.state}
						onChange={event=>handleChange(event)}
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
						value={formValues.zip}
						onChange={event=>handleChange(event)}
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
						value={formValues.description}
						onChange={event=>handleChange(event)}
					/>
				</FormSection>
				
				<FormSection id="embedded" >
					<ReactFilestack        
						apikey="AndaLCkprQkKsCBl3aG2rz"
						actionOptions={FilePickerOptions}
						componentDisplayMode={{
							type: "button",
							customText: "Upload Photos (Max: 3)"
						}}
						onSuccess={(res)=>handleFileUpload(res)}
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

			{/* <div className={`message ${this.state.isError && "error"}`}>
				{this.state.isSubmitting ? "Submitting..." : this.state.message}
			</div> */}

		</StyledListingForm>
    );
}