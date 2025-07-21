import express from 'express';
import * as propertyController from '../controllers/propertyController.js';
import { protect } from '../middleware/authMiddleware.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route to create a new property
router.post('/', protect, uploadMiddleware, propertyController.createProperty);

// Route to get all properties
router.get('/', propertyController.getAllProperties);

// Route to get user's properties
router.get('/my', protect, propertyController.getMyProperties);

// Route to get a property by ID
router.get('/:id', propertyController.getPropertyById);

// PATCH route for partial updates
router.patch('/:id', protect, propertyController.updateProperty);

// Route to delete a property by ID
router.delete('/:id', protect, propertyController.deleteProperty);

export default router;