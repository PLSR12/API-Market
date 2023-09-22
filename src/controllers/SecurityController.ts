import { Request, Response } from 'express'
import SecurityService from '../services/SecurityService'
import Helper from '../helper/Helper'
const securityService = new SecurityService()

class SecurityController {
  static async createAcl(req: Request, res: Response): Promise<Response> {
    const { roles, permissions } = req.body
    const { userId } = req.params

    try {
      const acl = await securityService.createAcl({
        roles,
        permissions,
        userId,
      })
      return res.status(201).send(Helper.ResponseData(201, null, null, acl))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async createPermissionsRoles(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { roleId, permissions } = req.body

    try {
      const permissionsRole = await securityService.createPermissionsRoles({
        roleId,
        permissions,
      })

      return res
        .status(201)
        .send(Helper.ResponseData(201, null, null, permissionsRole))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }
}

export default SecurityController
