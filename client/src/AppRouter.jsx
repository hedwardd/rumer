import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import ListingForm from "./components/ListingForm";
import ListingBrowser from "./components/ListingBrowser";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HostDashboard from "./components/HostDashboard";
import BookingViewer from "./components/BookingViewer";
import NavBar from "./components/NavBar";
import ListingFullView from "./components/ListingFullView";

const _checkIfLoggedIn = async () => {

    const response = await fetch("api/auth", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
	})
	if (response.status === 200) {
		const userData = await response.json();
		return userData.user;
	}
	else return null;
}

const _handleLogout = async () => {

	const response = await fetch("/api/logout");
	return (response.status === 200) ? true : false;
}


export default function AppRouter() {

	const [user, setUser] = useState(null);
	useEffect(() => {
		if (!user) {
			async function attemptUserAuth() {
				const authResult = await _checkIfLoggedIn();
				if (authResult) setUser(authResult);
			}
			attemptUserAuth();
		}
	});

	return (
		<Router >
			<NavBar
				user={ user } 
				_handleLogout={async () => {
					const isSuccess = await _handleLogout();
					if (isSuccess) {
						setUser(null);
						window.open("/", "_self");
					}
				}} 
			/>

			<Switch>
				<Route path="/login">
					<LoginForm loginHandler={(user)=> setUser(user)} />
				</Route>

				<Route path="/signup">
					<SignupForm />
				</Route>

				<Route path="/browse">
					<ListingBrowser user={ user } />
				</Route>

				<Route path={"/listings/:listingId"}>
					<ListingFullView user={user} />
				</Route>

				<Route path="/bookings">
					{user
						? (<BookingViewer />)
						: ()=> window.open("/browse", "_self")}
				</Route>

				<Route path="/addListing">
					{user
						// TO-DO: Does this still need the user prop?
						? (<ListingForm user={ user } />)
						: ()=> window.open("/browse", "_self")}
				</Route>

				<Route path="/hosting">
					{user
						? (<HostDashboard user={ user } />)
						: ()=> window.open("/browse", "_self")}
				</Route>

				<Route path="/">
					{()=>(window.open("/browse", "_self"))}
				</Route>
			</Switch>

		</Router>
	);
};