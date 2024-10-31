import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import './Login.css';
import backendURL from "../env/data";

const url = `${backendURL}/login`;

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { httpConfig } = useFetch(url);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await httpConfig(credentials, "POST");

            if (response.status === 200) {
                setCredentials({ email: '', password: '' });
                navigate("/home");
            } else {
                setMessage(response.message || "Login failed.");
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className='login-title'>Skill Builder</h1>
            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Log In</h1>

                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email Address" 
                        name="email"
                        value={credentials.email} 
                        onChange={handleInputChange} 
                        required 
                    />

                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        name="password"
                        value={credentials.password} 
                        onChange={handleInputChange} 
                        required 
                    />  

                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Submit
                    </button>
                    <p 
                        className='register-to-login' 
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </p>
                    {message && <p>{message}</p>}
                </form>
            )}
        </>
    );
};

export default Login;
