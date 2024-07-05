// src/components/CreateQuiz.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      '/api/quiz/create',
      { title, questions },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    ).then(() => {
      alert('Quiz created');
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = parseInt(value, 10);
    setQuestions(newQuestions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz Title"
      />
      {questions.map((q, i) => (
        <div key={i}>
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(i, e.target.value)}
            placeholder={`Question ${i + 1}`}
          />
          {q.options.map((option, j) => (
            <input
              key={j}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(i, j, e.target.value)}
              placeholder={`Option ${j + 1}`}
            />
          ))}
          <select
            value={q.correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(i, e.target.value)}
          >
            {q.options.map((option, j) => (
              <option key={j} value={j}>{`Option ${j + 1}`}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default CreateQuiz;
