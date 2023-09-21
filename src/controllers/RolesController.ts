import { Request, Response } from 'express'
import RoleService from './../services/RolesService'
import Helper from '../helper/Helper'
const roleService = new RoleService()

class RoleController {
  static async createRole(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    try {
      const role = await roleService.create({ name, description })
      return res.status(201).send(Helper.ResponseData(201, null, null, role))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async getAllRoles(req: Request, res: Response): Promise<Response> {
    try {
      const allRoles = await roleService.getAll()
      return res
        .status(200)
        .send(Helper.ResponseData(201, null, null, allRoles))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async getRoleById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const role = await roleService.getById({ id: id })

      return res.status(200).send(Helper.ResponseData(201, null, null, role))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async updateRole(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, description } = req.body

    try {
      const role = await roleService.update({
        id,
        name,
        description,
      })

      return res.status(200).send(Helper.ResponseData(200, null, null, role))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async deleteRole(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await roleService.delete({ id: id })

      return res
        .status(204)
        .send(Helper.ResponseData(204, 'Deleted with successfully', null, null))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }
}

export default RoleController
