const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
// Register more specific routes FIRST (comments) to avoid conflicts
app.use('/api/news/:newsId/comments', commentRoutes);
// Then register general news routes
app.use('/api/news', newsRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'News Portal API is running' });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
