import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import './Login.css';
import backendURL from "../env/data"

const url = `${backendURL}/user/login`


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); 
    const { httpConfig } = useFetch(url);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const user = {
            email,
            password,
        };
    
        try {
            const response = await httpConfig(user, "POST");

            if (response.status === 200) {
                setEmail("");
                setPassword("");
                setTimeout(() => navigate("/home"), 0); 
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

                    <input type="email" className="form-control" placeholder="Email Address" required
                           value={email} onChange={e => setEmail(e.target.value)}
                    />

                    <input type="password" className="form-control" placeholder="Password" required
                           value={password} onChange={e => setPassword(e.target.value)}
                    />  

                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Submit
                    </button>
                    <p className='register-to-login' onClick={()=>navigate('/register')}>Register</p>
                    {message && <p>{message}</p>}
                </form>
            )}
        </>
    );
};

export default Login;
