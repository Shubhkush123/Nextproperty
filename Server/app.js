import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import './config/cloudinary.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.get('/', (req, res) => {
  res.send('API is running');
});

// Database connection
mongoose.connect(process.env.MONGODB_URI);

export default app;