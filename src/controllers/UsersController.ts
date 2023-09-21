import { Request, Response } from 'express'
import UsersService from '../services/UsersService'
import Helper from '../helper/Helper'
const usersService = new UsersService()

class UsersController {
  static async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
      const user = await usersService.create({ name, email, password })

      return res.status(201).send(Helper.ResponseData(201, null, null, user))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const allUsers = await usersService.getAll()

      return res
        .status(200)
        .send(Helper.ResponseData(200, null, null, allUsers))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      const user = await usersService.getById({ id: id })

      return res.status(200).send(Helper.ResponseData(200, null, null, user))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email } = req.body

    try {
      const user = await usersService.update({ id, name, email })

      return res.status(200).send(Helper.ResponseData(200, null, null, user))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await usersService.delete({ id: id })

      return res
        .status(204)
        .send(Helper.ResponseData(204, 'Deleted with successfully', null, null))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }
}

export default UsersController
