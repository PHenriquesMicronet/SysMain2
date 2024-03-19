import React, { useState } from 'react'; // Import useState from React
import logo from './Logo-Login.png';
import './App.css';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        console.log(`Logged in as ${username}`);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Logo container */}
                <div className="logo-container">
                    <img src={logo} alt="Your Logo" />
                </div>
                <div className="form-container">
                    <label className="signup-label"><b>Sign Up</b></label>
                    <form onSubmit={handleLogin}>
                        <label>
                            <span class="icon">
                                <FontAwesomeIcon icon={faUser} size="lg" />
                            </span>
                            <input
                                type="text"
                                class="input-field"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            <input
                                type="password"
                                class="input-field"
                                placeholder="Palavra-passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span class="icon"><i class="fa fa-lock"></i></span>
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={rememberMe} // Use rememberMe state for checked prop
                                onChange={() => setRememberMe(!rememberMe)} // Use setRememberMe in handler
                            />
                            <span className="remember-me-label">Remember me</span>
                        </label>
                        <button type="submit">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;