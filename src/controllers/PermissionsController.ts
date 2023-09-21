import { Request, Response } from 'express'
import PermissionService from './../services/PermissionsService'
import Helper from '../helper/Helper'
const permissionService = new PermissionService()

class PermissionsController {
  static async createPermission(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { name, description } = req.body

    try {
      const permission = await permissionService.create({ name, description })
      return res
        .status(201)
        .send(Helper.ResponseData(201, null, null, permission))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async getAllPermissions(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const allPermissions = await permissionService.getAll()
      return res
        .status(200)
        .send(Helper.ResponseData(201, null, null, allPermissions))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async getPermissionById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params
      const permission = await permissionService.getById({ id: id })

      return res
        .status(200)
        .send(Helper.ResponseData(201, null, null, permission))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async updatePermission(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params
    const { name, description } = req.body

    try {
      const permission = await permissionService.update({
        id,
        name,
        description,
      })

      return res
        .status(200)
        .send(Helper.ResponseData(200, null, null, permission))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async deletePermission(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params

    try {
      await permissionService.delete({ id: id })

      return res
        .status(204)
        .send(Helper.ResponseData(204, 'Deleted with successfully', null, null))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }
}

export default PermissionsController
