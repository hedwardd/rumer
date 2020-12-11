import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

const getListings = async (checkIn, checkOut) => {
	const listingURL = (checkIn && checkOut)
		? `/api/listings?checkIn=${checkIn}&checkOut=${checkOut}`
		: `/api/listings`;

	const response = await fetch(listingURL, {
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
  	})
  	if (response.status === 200) {
		const listingsData = await response.json();
		return listingsData;
	}
	else return null;
}

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
}


export default function ListingBrowser ({user}) {
	
	const query = useQuery();
	const checkInParam = query.get("checkIn");
	const checkOutParam = query.get("checkOut");

	const [listings, setListings] = useState([]);
	useEffect(() => {
		async function fetchListingsData() {
			const listingsData = await getListings(checkInParam, checkOutParam);
			setListings(listingsData);
		}
		fetchListingsData();
	}, [checkInParam, checkOutParam]);


	return (
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

							<StyledLink to={`/listings/${listing._id}`}>
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
					<p>No listings available.</p>
				</div>
			)}

		</StyledListingBrowser>
	);
}