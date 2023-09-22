import { Request, Response, NextFunction } from 'express'
import Users from '../db/models/users'
import Permissions, { PermissionAttributes } from '../db/models/permissions'
import { decodeUserData } from '../helper/decodeUserData'
import Helper from '../helper/Helper'

const PermissionsMiddleware = (ListPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    const userData: any = decodeUserData(token || '')
    const userId: string = userData.id

    const user: any = await Users.findOne({
      include: [
        {
          model: Permissions,
          as: 'user_permissions',
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

    const permissionsAdded = user.user_permissions
      .map((permission: PermissionAttributes) => permission.name)
      .some((permission: string) => ListPermissions.includes(permission))

    if (!permissionsAdded) {
      return res
        .status(401)
        .send({ message: 'User not authorized for this route' })
    }

    return next()
  }
}

export default PermissionsMiddleware
