const express = require('express');
const router = express.Router();
const { createQuiz, getQuizById, getAllQuizzes } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createQuiz);
router.get('/:id', getQuizById);
router.get('/all', getAllQuizzes);

module.exports = router;
