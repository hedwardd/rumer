import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StyledAuthForm, StyledFormSection, StyledLabel, StyledButton, StyledLink,
} from './styles/AuthFormStyles';

// NICE-TO-HAVE: If user is already logged in, this page should not render
export default function LoginForm({ loginHandler }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(' ');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(' ');
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    setIsSubmitting(false);
    if (res.status === 401) {
      setPassword('');
      setMessage('The credentials you entered are invalid. Please try again.');
    } else {
      const data = await res.json();
      if (data.error) setMessage(data.error);
      else {
        setMessage(data.success);
        setTimeout(() => {
          loginHandler(data.user);
          window.open('/browse', '_self');
        }, 2000);
      }
    }
  };

  return (
    <StyledAuthForm onSubmit={(event) => handleSubmit(event)}>
      <h2>Log in</h2>

      <StyledFormSection>
        <StyledLabel>
          Username
        </StyledLabel>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </StyledFormSection>

      <StyledFormSection>
        <StyledLabel>
          Password
        </StyledLabel>
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </StyledFormSection>

      <StyledFormSection>
        <StyledButton
          as="input"
          type="submit"
          value="Log in"
        />
      </StyledFormSection>

      <StyledFormSection>
        <p>
          Don&apos;t have an account?
          {' '}
          <StyledLink as={Link} to="/signup">Sign up</StyledLink>
        </p>
      </StyledFormSection>

      <StyledFormSection>
        {isSubmitting ? 'Submitting...' : message}
      </StyledFormSection>
    </StyledAuthForm>
  );
}
