import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupForm () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(username);
        console.log(password);
        setIsSubmitting(true);
        setMessage("");
        const res = await fetch("/api/user", { 
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: { "Content-Type": "application/json" } 
        });
        setIsSubmitting(false);
        const data = await res.json();
        if (data.hasOwnProperty("error")) setMessage(data.error);
        else {
            setMessage(data.success);
            setTimeout(() => {
                window.open("/login", "_self");
            }, 3000);
        }
	}

    return (
        <div>
            <form onSubmit={event=>handleSubmit(event)}>
                <h2>Sign up</h2>

                <label>
                    Username
                    <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                    />
                </label>

                <label>
                    Password
                    <input
                    type="password"
                    name="password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    />
                </label>

                <input
                    type="submit"
                    value="Submit"
                />

            </form>

            <div>
                {isSubmitting ? "Submitting..." : message}
            </div>

            <p>Already have an account? <Link to={'/login'}>Log in</Link>.</p>
        </div>
    )
}