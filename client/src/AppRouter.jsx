import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';
import ListingForm from './components/ListingForm';
import ListingBrowser from './components/ListingBrowser';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import HostDashboard from './components/HostDashboard';
import GuestDashboard from './components/GuestDashboard';
import NavBar from './components/NavBar';
import MobileNavBar from './components/MobileNavBar';
import ListingFullView from './components/ListingFullView';
import device from './components/styles/device';

const StyledMainSection = styled.div`
  margin-top: 80px;
  margin-bottom: 75px;
  @media ${device.laptop} {
    margin-top: 96px;
    margin-bottom: 10px;
  }
`;

const _checkIfLoggedIn = async () => {
  const response = await fetch('/api/auth', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  if (response.status === 200) {
    const userData = await response.json();
    return userData.user;
  }
  return null;
};

const _handleLogout = async () => {
  const response = await fetch('/api/logout');
  return (response.status === 200);
};

export default function AppRouter() {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function attemptUserAuth() {
      const authResult = await _checkIfLoggedIn();
      if (authResult) setUser(authResult);
      setCheckedAuth(true);
    }
    if (!user || !checkedAuth) attemptUserAuth();
  }, [user, checkedAuth]);

  function _handleLogin(_user) {
    setUser(_user);
    setCheckedAuth(false);
  }

  const isLoggedIn = !!user;

  return (checkedAuth) ? (
    <Router>
      <NavBar
        user={user}
        _handleLogout={async () => {
          const isSuccess = await _handleLogout();
          if (isSuccess) {
            setUser(null);
          }
        }}
      />
      <MobileNavBar
        user={user}
        _handleLogout={async () => {
          const isSuccess = await _handleLogout();
          if (isSuccess) {
            setUser(null);
          }
        }}
      />

      <StyledMainSection>
        <Switch>
          <Route path="/login">
            {isLoggedIn
              ? <Redirect to="/" />
              : <LoginForm loginHandler={_handleLogin} />}
          </Route>

          <Route path="/signup">
            {isLoggedIn
              ? <Redirect to="/" />
              : <SignupForm />}
          </Route>

          <Route path="/browse">
            <ListingBrowser user={user} />
          </Route>

          <Route path="/listings/:listingId">
            <ListingFullView user={user} />
          </Route>

          <Route path="/bookings">
            {!isLoggedIn
              ? <Redirect to="/login" />
              : <GuestDashboard user={user} />}
          </Route>

          <Route path="/addListing">
            {!isLoggedIn
              ? <Redirect to="/login" />
              : <ListingForm user={user} />}
          </Route>

          <Route path="/hosting">
            {!isLoggedIn
              ? <Redirect to="/login" />
              : <HostDashboard user={user} />}
          </Route>

          <Route path="/">
            <Redirect to="/browse" />
          </Route>
        </Switch>
      </StyledMainSection>
    </Router>
  ) : (<div />);
}
