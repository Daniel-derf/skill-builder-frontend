import { Link, NavLink, useNavigate } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext"; 
import "./Header.css";
import backendURL from "../env/data"

const url = `${backendURL}/user/me`;

const Header = () => {
  const { user, setUser } = useUser();
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null); 
    navigate('/login'); 
  };

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
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
      } 
      setIsLoading(false);
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
            {user.name} - XP: {isLoading ? "Loading..." : user.xp}
          </div>
        )}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Header;
