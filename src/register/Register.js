import React from 'react';
import { useRef } from 'react';
import "./register.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000",
    })

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
          } else {
            const user = {
              name: username.current.value,
              email: email.current.value,
              password: password.current.value,
            };
            try {
              await axiosInstance.post("/users", user);
              navigate('/', {replace: true});
            } catch (err) {
              console.log(err);
            }
          }
    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerUpper">
                    <h3 className="registerLogo">Register your account</h3>
                </div>
                <div className="registerLower">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            required
                            ref={username}
                            className="registerInput"
                        />
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            className="registerInput"
                            type="email"
                        />
                        <input
                            placeholder="Password"
                            required
                            ref={password}
                            className="registerInput"
                            type="password"
                            minLength="6"
                        />
                        <input
                            placeholder="Password Again"
                            required
                            ref={passwordAgain}
                            className="registerInput"
                            type="password"
                        />
                        <button className="registerButton" type="submit">
                            Sign Up
                        </button>
                        <button className="registerButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;