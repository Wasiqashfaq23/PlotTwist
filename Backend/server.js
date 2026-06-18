const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./Routes/auth');
const propertyRoutes = require('./Routes/properties');
const { notFound, errorHandler } = require('./Middleware/ErrorHandler');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('PlotTwist API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});