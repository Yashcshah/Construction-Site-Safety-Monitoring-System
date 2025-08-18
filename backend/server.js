
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const whitelist = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://3.106.229.80',
  'http://3.106.229.80:3000'
];
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
//app.use('/api/tasks', require('./routes/taskRoutes'));

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }


module.exports = app
app.use(express.json());


app.get('/api/health', (_req, res) => res.json({ ok: true }));


app.use('/api/auth', require('./routes/authRoutes'));


app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/compliance', require('./routes/complianceRoutes'));
app.use('/api/ppe', require('./routes/ppeRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));


if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
