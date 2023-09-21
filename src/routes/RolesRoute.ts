import express from 'express'
import RolesController from '../controllers/RolesController'

const router = express.Router()

router
  .post('/roles', RolesController.createRole)
  .get('/roles', RolesController.getAllRoles)
  .get('/roles/:id', RolesController.getRoleById)
  .delete('/roles/:id', RolesController.deleteRole)
  .put('/roles/:id', RolesController.getRoleById)

export default router
