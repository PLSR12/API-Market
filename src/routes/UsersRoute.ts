import express from 'express'
import UsersController from '../controllers/UsersController'

import Authenticated from '../middlewares/Authenticated'

const router = express.Router()
router.use(Authenticated)

router
  .post('/users', UsersController.createUser)
  .get('/users', UsersController.getAllUsers)
  .get('/users/:id', UsersController.getUserById)
  .put('/users/:id', UsersController.updateUser)
  .delete('/users/:id', UsersController.deleteUser)

export default router
