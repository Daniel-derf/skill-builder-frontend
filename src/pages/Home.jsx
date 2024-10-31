import React, { useEffect, useState, useRef } from "react";
import withAuth from "../components/withAuth";
import { useNavigate } from "react-router-dom";
import './Home.css';
import backendURL from "../env/data";

const url = `${backendURL}/interest`;

const playAudio = (audioRef) => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => console.error("Error playing audio:", error));
  }
};

const Home = () => {
  const [interests, setInterests] = useState([]); 
  const [selectedInterestID, setSelectedInterestID] = useState(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken"); 
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchInterests = async (authToken, setInterests) => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        });
    
        if (!res.ok) throw new Error("Error fetching interests");
        const data = await res.json();
        setInterests(data.interests);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchInterests(authToken, setInterests);
  }, [authToken]);

  useEffect(() => {
    if (selectedInterestID !== null) {
      playAudio(audioRef);
      setTimeout(() => navigate(`/interest/${selectedInterestID}/task`), 200);
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
      <audio ref={audioRef} src="/select-option.mp3" />
    </div>
  );
}

export default withAuth(Home);
