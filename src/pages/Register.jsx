import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import backendURL from "../env/data";
import './Register.css';

const url = `${backendURL}/user/register`;

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { httpConfig } = useFetch(url);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await httpConfig(formData, "POST");

            if (response.status === 201) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setMessage("Registration successful! Redirecting...");
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setMessage(response.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
        }
    };

    return (
        <>
            <h1 className='login-title'>Skill Builder</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Register</h1>

                <input 
                    name="name"
                    className="form-control" 
                    placeholder="Name" 
                    required
                    value={formData.name} 
                    onChange={handleInputChange}
                />

                <input 
                    name="email"
                    type="email" 
                    className="form-control" 
                    placeholder="Email Address" 
                    required
                    value={formData.email} 
                    onChange={handleInputChange}
                />

                <input 
                    name="password"
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    required
                    value={formData.password} 
                    onChange={handleInputChange}
                />  

                <input 
                    name="confirmPassword"
                    type="password" 
                    className="form-control" 
                    placeholder="Confirm Password" 
                    required
                    value={formData.confirmPassword} 
                    onChange={handleInputChange}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                <p className='register-to-login' onClick={() => navigate('/login')}>Return to log in</p>
                {message && <p>{message}</p>}
            </form>
        </>
    );
};

export default Register;
