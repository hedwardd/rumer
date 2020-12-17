import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLabel = styled.label`
  margin-bottom: 4px;
  padding-bottom: 8px;
  padding-top: 9px;
`;

export default function SignupForm() {
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
        window.open('/login', '_self');
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h2>Sign up</h2>

        <StyledLabel>
          Username
          <input
            type="text"
            id="username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
        </StyledLabel>

        <StyledLabel>
          Password
          <input
            type="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </StyledLabel>

        <input
          type="submit"
          value="Submit"
        />

      </form>

      <div>
        {isSubmitting ? 'Submitting...' : message}
      </div>

      <p>
        Already have an account?
        {' '}
        <Link to="/login">Log in</Link>
        .
      </p>
    </div>
  );
}
