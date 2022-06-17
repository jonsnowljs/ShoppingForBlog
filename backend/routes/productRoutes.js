import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

// /api/products
router.route('/').get(getProducts).post(protect, admin, createProduct);
// /top must before /:id, or /:id will response for request to /top
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
// /api/products/top
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
