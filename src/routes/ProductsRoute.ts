import express from 'express'
import ProductsController from '../controllers/ProductsController'

const router = express.Router()

router
  .post('/products', ProductsController.createProduct)
  .get('/products', ProductsController.getAllProducts)
  .get('/products/:id', ProductsController.getProductById)
  .put('/products/:id', ProductsController.updateProduct)
  .delete('/products/:id', ProductsController.deleteProduct)

export default router
