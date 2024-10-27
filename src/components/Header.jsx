import { Link, NavLink, useNavigate } from "react-router-dom"; 
import React, { useEffect } from "react";
import { useUser } from "./UserContext"; 
import "./Header.css";

const url = 'http://localhost:3001/user/me';

const Header = () => {
  const { user, setUser } = useUser();
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null); 
    navigate('/login'); 
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken ? `Bearer ${authToken}` : "",
        },
      });

      if (res.ok) {
        const userData = await res.json();
        if (JSON.stringify(userData.user) !== JSON.stringify(user)) {
          setUser(userData.user);
        }
      } else {
        const userData = await res.json();
        console.log('else');
        console.log('data: ', userData);
      }
    };

    if (authToken) {
      getUserInfo();
    }
  }, [authToken, user]); 

  
  return (
    <nav className="navbar">
      <Link to="/home" className="app-title">Skill Builder</Link>
      <div className="navbar-center">
        <NavLink className="nav-link" to="/home">Home</NavLink>
        <NavLink className="nav-link" to="/about">About</NavLink>
      </div>
      <div>
        {user && (
          <div className="user-info">
            {user.name} - XP: {user.xp}
          </div>
        )}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Header;
