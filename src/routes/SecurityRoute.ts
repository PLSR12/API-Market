const { Router } = require('express')
import SecurityController from '../controllers/SecurityController'

const router = Router()

router
  .post('/security/acl/:userId', SecurityController.createAcl)
  .post(
    '/security/permissions-roles',
    SecurityController.createPermissionsRoles
  )

export default router
