import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cloudinary from './config/cloudinary.js';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000', 'https://nextproperty-in2o.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes); // Sahi mounting

// Serve static files from React
app.use(express.static(path.join(__dirname, '../Client/dist')));

// For any other route, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
