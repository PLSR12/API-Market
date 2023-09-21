import express from 'express'
import PermissionsController from '../controllers/PermissionsController'

const router = express.Router()

router
  .post('/permissions', PermissionsController.createPermission)
  .get('/permissions', PermissionsController.getAllPermissions)
  .get('/permissions/:id', PermissionsController.getPermissionById)
  .delete('/permissions/:id', PermissionsController.deletePermission)
  .put('/permissions/:id', PermissionsController.updatePermission)

export default router
