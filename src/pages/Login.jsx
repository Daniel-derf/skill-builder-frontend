import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const url = "http://localhost:3001/user/login";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); 
    const { httpConfig } = useFetch(url);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = {
            email,
            password,
        };
    
        try {
            const response = await httpConfig(user, "POST");

            console.log(response)

            if (response.status === 200) {
                setEmail("");
                setPassword("");
                setTimeout(() => navigate("/home"), 1000); 
            } else {
                setMessage(response.message || "Login falhou.");
            }
        } catch (error) {
            setMessage("Ocorreu um erro: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Log In</h1>

            <input type="email" className="form-control" placeholder="Endereço de e-mail" required
                   value={email} onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Senha" required
                   value={password} onChange={e => setPassword(e.target.value)}
            />  

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
