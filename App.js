const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// Connect to MongoDB
const dbUri = 'mongodb://localhost:27017/quizapp'; // Replace with your MongoDB URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
