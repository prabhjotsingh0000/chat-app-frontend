import React from 'react';
import {useRef, useState} from 'react';
import './login.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000",
    })

    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const currEmail = email.current.value;
            const currPassword = password.current.value;
            const response = await axiosInstance.get(`/users/login/${currEmail}/${currPassword}`);
            console.log(response);
            
            const responseUser = response.data;

            if(responseUser.email === currEmail && responseUser.password === currPassword){
                navigate('/chat', {replace: true});
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.message);
        }
    };

    const registerNewUser = () => {
        let path = "register";
        navigate(path);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginUpper">
                    <h3 className="loginLogo">Welcome, let's chat!</h3>
                </div>
                <div className="loginLower">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" type="submit">Log In</button>
                        {errorMessage && <div className="error"> {errorMessage} </div>}
                        <button className="loginRegisterButton" onClick={registerNewUser}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;