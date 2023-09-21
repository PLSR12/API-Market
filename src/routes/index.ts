import express from 'express'
import UsersController from '../controllers/UsersController'
import ProductsController from '../controllers/ProductsController'

const router = express.Router()

//USERS
router
  .post('/users', UsersController.createUser)
  .get('/users', UsersController.getAllUsers)
  .get('/users/:id', UsersController.getUserById)
  .put('/users/:id', UsersController.updateUser)
  .delete('/users/:id', UsersController.deleteUser)

//PRODUCTS
router
  .post('/products', ProductsController.createProduct)
  .get('/products', ProductsController.getAllProducts)
  .get('/products/:id', ProductsController.getProductById)
  .put('/products/:id', ProductsController.updateProduct)
  .delete('/products/:id', ProductsController.deleteProduct)

export default router
