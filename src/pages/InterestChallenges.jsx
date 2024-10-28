import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import './InterestChallenges.css';

const url = 'http://localhost:3001/interest/';

const InterestChallenges = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const authToken = localStorage.getItem('authToken');
  const { id } = useParams();
  const { user, setUser } = useUser();

  // Referências para os áudios
  const audioOpenRef = useRef(null);      // Som de abrir o modal
  const audioCompleteRef = useRef(null);  // Som de completar o desafio

  useEffect(() => {
    const getInterestChallenges = async () => {
      try {
        const res = await fetch(`${url}${id}/task`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken ? `Bearer ${authToken}` : '',
          },
        });

        if (!res.ok) {
          throw new Error('Error');
        }

        const data = await res.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getInterestChallenges();
  }, [authToken, id]);

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);

    // Toca o som ao abrir o modal
    if (audioOpenRef.current) {
      audioOpenRef.current.pause();
      audioOpenRef.current.currentTime = 0;
      audioOpenRef.current.play().catch(error => console.error("Erro ao tocar áudio de abertura:", error));
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const completeTask = async (taskID) => {
    const res = await fetch(`${url}${id}/task/${taskID}/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken ? `Bearer ${authToken}` : "",
      }
    });

    const data = await res.json();

    setUser((prevUser) => ({ ...prevUser, xp: prevUser.xp + data.xp }));

    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === taskID ? { ...task, completed: true } : task
      )
    );

    // Toca o som de sucesso ao completar o desafio
    if (audioCompleteRef.current) {
      audioCompleteRef.current.pause();
      audioCompleteRef.current.currentTime = 0;
      audioCompleteRef.current.play().catch(error => console.error("Erro ao tocar áudio de sucesso:", error));
    }

    closeModal();
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Challenges</h1>
      <ul className="tasks-list">
        {tasks.map((task) => (
          <li className="task-item" key={task.id} onClick={() => openModal(task)}>
            <span className="task-title">
              {task.title} - {task.xp}
              {task.completed && <span className="completed-indicator"> OK</span>}
            </span>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>
            {!selectedTask.completed && 
              <button
                onClick={() => completeTask(selectedTask.id)}
                className="complete-button"
              >
                Complete Challenge
              </button>}
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Elementos de áudio ocultos para os sons de abertura e conclusão */}
      <audio ref={audioOpenRef} src="/select-option.mp3" />
      <audio ref={audioCompleteRef} src="/success-sound.mp3" />
    </div>
  );
};

export default InterestChallenges;
