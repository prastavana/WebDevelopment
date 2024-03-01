import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import "../assets/css/Register.css"; // Import the CSS file

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = async () => {
        try {
            // Make HTTP POST request to the backend endpoint
            const response = await axios.post('http://localhost:8020/user/save', {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });

            // Log response data if needed
            console.log('Registration successful:', response.data);

            // Clear form fields after successful registration
            setFirstName('');
            setLastName('');
            setEmail('');
            setConfirmPassword('');
            setPassword('');
        } catch (error) {
            // Handle errors if any
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <h1 className="profile-title">REGISTER</h1>
                <div className="profile-row">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="profile-row">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="profile-row">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="profile-row">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="profile-row">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="text"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleSave} className="save-button">
                    Register
                </button>

                <div className="login-link">
                    <p>Already have an account? <a href="./Login">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
