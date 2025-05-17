const express = require('express');
const path = require('path');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the src folder
app.use(express.static(path.join(__dirname, '..', 'src')));

// Serve data JSON files (optional but explicit)
app.use('/data', express.static(path.join(__dirname, '..', 'src', 'data')));

// API routes
app.use('/api', apiRoutes);

app.use('/src', express.static(path.join(__dirname, '..', 'src')));



// Serve index.html from root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
