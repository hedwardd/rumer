import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  StyledAuthForm, StyledFormSection, StyledLabel, StyledButton, StyledLink,
} from './styles/AuthFormStyles';

export default function SignupForm() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    setIsSubmitting(false);
    const data = await res.json();
    if (data.error) setMessage(data.error);
    else {
      setMessage(data.success);
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }
  };

  return (
    <StyledAuthForm
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2>Sign up</h2>

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
          Already have an account?
          {' '}
          <StyledLink as={Link} to="/login">Log in</StyledLink>
        </p>
      </StyledFormSection>

      <StyledFormSection>
        {isSubmitting ? 'Submitting...' : message}
      </StyledFormSection>
    </StyledAuthForm>
  );
}
