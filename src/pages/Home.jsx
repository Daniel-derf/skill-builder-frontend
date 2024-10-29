import React, { useEffect, useState, useRef } from "react";
import withAuth from "../components/withAuth";
import { useNavigate } from "react-router-dom";
import './Home.css';
import backendURL from "../env/data"

const url = `${backendURL}/interest`

const Home = () => {
  const [interests, setInterests] = useState([]); 
  const [selectedInterestID, setSelectedInterestID] = useState(null);
  const navigate = useNavigate();
  
  const authToken = localStorage.getItem('authToken'); 
  const audioRef = useRef(null);

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
      if (audioRef.current) {
        audioRef.current.play(); 
      }

      setTimeout(() => {
        navigate(`/interest/${selectedInterestID}/task`);
      }, 200)
    }
  }, [selectedInterestID, navigate]);

  const handleInterestSelect = (id) => {

    setSelectedInterestID(id)
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Select an Interest:</h1>
      <ul className="interest-list">
        {interests.map((interest) => (
          <li 
            key={interest.id} 
            className="interest-item"
            onClick={() => handleInterestSelect(interest.id)} 
          >
            {interest.name}
          </li>
        ))}
      </ul>

      {/* Elemento de áudio oculto para o som de seleção */}
      <audio ref={audioRef} src="/select-option.mp3" />
    </div>
  );
}

export default withAuth(Home);
