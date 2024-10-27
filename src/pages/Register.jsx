import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const url = "http://localhost:3001/user/register";

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

            console.log(response)

            if (response.status === 201) {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setMessage("Registro bem-sucedido! Redirecionando...");
                setTimeout(() => navigate("/login"), 2000); 
            } else {
                setMessage(response.message || "Registro falhou. Tente novamente.");
            }
        } catch (error) {
            setMessage("Ocorreu um erro: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Por favor, registre-se</h1>

            <input className="form-control" placeholder="Nome" required
                   value={name} onChange={e => setName(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="Endereço de e-mail" required
                   value={email} onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Senha" required
                   value={password} onChange={e => setPassword(e.target.value)}
            />  

            <input type="password" className="form-control" placeholder="Confirmar Senha" required
                   value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Enviar</button>
            {message && <p>{message}</p>} {/* Mensagem de feedback */}
        </form>
    );
};

export default Register;
