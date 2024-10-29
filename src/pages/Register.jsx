import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import backendURL from "../env/data"
import './Register.css'

const url = `${backendURL}/user/register`


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const { httpConfig } = useFetch(url);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = {
            name,
            email,
            password,
            confirmPassword,
        };
    
        try {
            const response = await httpConfig(user, "POST");

            if (response.status === 201) {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setMessage("Registration successful! Redirecting...");
                setTimeout(() => navigate("/login"), 3000); 
            } else {
                setMessage(response.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
        }
    };

    return (<>
        <h1 className='login-title'>Skill Builder</h1>
        <form className='register-form' onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Register</h1>

            <input className="form-control" placeholder="Name" required
                   value={name} onChange={e => setName(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="Email Address" required
                   value={email} onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   value={password} onChange={e => setPassword(e.target.value)}
            />  

            <input type="password" className="form-control" placeholder="Confirm Password" required
                   value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            <p className='register-to-login' onClick={()=>navigate('/login')}>Return to log in</p>
            {message && <p>{message}</p>}
        </form></>
    );
};

export default Register;
