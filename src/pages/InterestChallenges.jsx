import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import './InterestChallenges.css';
import backendURL from "../env/data"

const url = `${backendURL}/interest/`

const playAudio = (audioRef) => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => console.error("Error playing audio:", error));
  }
};

const fetchInterestChallenges = async (id, authToken, setTasks) => {
  try {
    const res = await fetch(`${url}${id}/task`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    });
    if (!res.ok) throw new Error('Error fetching challenges');
    const data = await res.json();
    setTasks(data.tasks);
  } catch (error) {
    console.error('Error:', error);
  }
};

const InterestChallenges = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const { user, setUser } = useUser();
  const authToken = localStorage.getItem('authToken');

  const audioOpenRef = useRef(null);
  const audioCompleteRef = useRef(null);

  useEffect(() => {
    fetchInterestChallenges(id, authToken, setTasks);
  }, [authToken, id]);

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
    playAudio(audioOpenRef);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const completeChallenge = async (taskID) => {
    try {
      const res = await fetch(`${url}${id}/task/${taskID}/finish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      const data = await res.json();

      setUser((prevUser) => ({ ...prevUser, xp: prevUser.xp + data.xp }));
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskID ? { ...task, completed: true } : task
        )
      );
      playAudio(audioCompleteRef);
    } catch (error) {
      console.error("Error completing challenge:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Challenges</h1>
      <ChallengesList tasks={tasks} onTaskSelect={openModal} />
      {isModalOpen && <ChallengeModal task={selectedTask} onComplete={completeChallenge} onClose={closeModal} />}
      <audio ref={audioOpenRef} src="/select-option.mp3" />
      <audio ref={audioCompleteRef} src="/success-sound.mp3" />
    </div>
  );
};

const ChallengesList = ({ tasks, onTaskSelect }) => (
  <ul className="tasks-list">
    {tasks.map((task) => (
      <li className="task-item" key={task.id} onClick={() => onTaskSelect(task)}>
        <span className="task-title">
          {task.title} - {task.xp}
          {task.completed && <span className="completed-indicator"> OK</span>}
        </span>
      </li>
    ))}
  </ul>
);

const ChallengeModal = ({ task, onComplete, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      {!task.completed && (
        <button onClick={() => onComplete(task.id)} className="complete-button">
          Complete Challenge
        </button>
      )}
      <button onClick={onClose} className="close-button">Close</button>
    </div>
  </div>
);

export default InterestChallenges;
