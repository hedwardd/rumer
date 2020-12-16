import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// NICE-TO-HAVE: If user is already logged in, this page should not render
export default function LoginForm ({loginHandler}) {

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
        const res = await fetch("/api/login", { 
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: { "Content-Type": "application/json" } 
        });
        setIsSubmitting(false);
        if (res.status === 401) {
            setPassword("");
            setMessage("The credentials you entered are invalid. Please try again."); 
        } else {
            const data = await res.json();
            if (data.hasOwnProperty("error")) setMessage(data.error);
            else {
                setMessage(data.success);
                setTimeout(() => {
                    loginHandler(data.user);
                    window.open("/browse", "_self");
                }, 2000);
            }
        }
	}

    return (
        <div>
            <form onSubmit={event=>handleSubmit(event)}>
                <h2>Log in</h2>

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

            <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
        </div>
    )
}
