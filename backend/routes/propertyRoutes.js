import express from 'express';
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getPendingProperties,
  getAllPropertiesForAdmin,
  approveProperty,
} from '../controllers/propertyController.js';

import upload from '../middleware/upload.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Public Routes ---
router.get('/', getAllProperties);

// --- User Protected Routes (Must be placed ABOVE /:id to prevent routing collisions) ---
router.get('/my/listings', protect, getMyProperties);

router.post(
  '/',
  protect,
  upload.single('image'),
  createProperty
);

// --- Admin Protected Routes ---
router.get('/pending', protect, admin, getPendingProperties);
router.get('/admin/all', protect, admin, getAllPropertiesForAdmin);
router.put('/approve/:id', protect, admin, approveProperty);
router.put('/update/:id', updateProperty);
router.delete('/:id', protect, admin, deleteProperty);

// --- Dynamic Route (Must be placed AFTER specific static sub-routes) ---
router.get('/:id', getPropertyById);

export default router;