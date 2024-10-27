import React, { useEffect, useState } from "react";
import withAuth from "../components/withAuth";
import { useNavigate } from "react-router-dom";
import './Home.css';

const url = 'http://localhost:3001/interest';

const Home = () => {
  const [interests, setInterests] = useState([]); 
  const [selectedInterestID, setSelectedInterestID] = useState(null);
  const navigate = useNavigate();
  
  const authToken = localStorage.getItem('authToken'); 

  useEffect(() => {
    const getInterests = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authToken ? `Bearer ${authToken}` : "",
          },
        });

        if (!res.ok) {
          throw new Error('Erro ao buscar interesses');
        }

        const data = await res.json();
        console.log('interests:', data);
        setInterests(data.interests);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    getInterests();
  }, [authToken]);

  useEffect(() => {
    if (selectedInterestID !== null) {
      navigate(`/interest/${selectedInterestID}/task`);
    }
  }, [selectedInterestID, navigate]);

  return (
    <div className="home-container">
      <h1 className="home-title">Select an Interest:</h1>
      <ul className="interest-list">
        {interests.map((interest) => (
          <li 
            key={interest.id} 
            className="interest-item"
            onClick={() => setSelectedInterestID(interest.id)} 
          >
            {interest.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withAuth(Home);