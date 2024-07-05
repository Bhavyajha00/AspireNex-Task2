// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('/api/quiz/all').then((response) => {
      setQuizzes(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
