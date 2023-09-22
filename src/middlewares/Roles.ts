import { Request, Response, NextFunction } from 'express'
import Roles, { RoleAttributes } from '../db/models/roles'
import Users from '../db/models/users'
import { decodeUserData } from '../helper/decodeUserData'
import Helper from '../helper/Helper'

const RolesMiddleware = (listRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    const userData: any = decodeUserData(token || '')
    const userId: string = userData.id

    const user: any = await Users.findOne({
      include: [
        {
          model: Roles,
          as: 'user_roles',
          attributes: ['id', 'name'],
        },
      ],
      where: { id: userId },
    })

    if (!user) {
      return res
        .status(401)
        .send(Helper.ResponseData(500, 'User not found!', '', null))
    }

    const rolesAdded = user.user_roles
      .map((role: RoleAttributes) => role.name)
      .some((role: string) => listRoles.includes(role))

    if (!rolesAdded) {
      return res
        .status(401)
        .send({ message: 'User not authorized for this route' })
    }

    return next()
  }
}

export default RolesMiddleware
