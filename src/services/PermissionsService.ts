import { v4 } from 'uuid'
import Permissions, { PermissionInput } from '../db/models/permissions'
import DtoId from '../interfaces/IDto'

interface IPermissionInputUpdate extends PermissionInput {
  id: string
}

class PermissionService {
  async create(dto: PermissionInput) {
    const permission = await Permissions.findOne({
      where: { name: dto.name },
    })

    if (permission) {
      throw new Error('Permission already exists')
    }

    try {
      const uuid = v4()

      const newPermission = await Permissions.create({
        id: uuid,
        name: dto.name,
        description: dto.description,
      })

      return newPermission
    } catch (err) {
      throw new Error('Error creating permission')
    }
  }

  async getAll() {
    const allPermissions = await Permissions.findAll()

    return allPermissions
  }

  async getById(dto: DtoId) {
    const permission = await Permissions.findOne({
      where: {
        id: dto.id,
      },
    })

    if (!permission) {
      throw new Error('Permission not found!')
    }

    return permission
  }

  async update(dto: IPermissionInputUpdate) {
    const permission = await Permissions.findOne({
      where: {
        id: dto.id,
      },
    })

    if (!permission) {
      throw new Error('Permission not found!')
    }

    try {
      permission.name = dto.name
      permission.description = dto.description

      await permission.save()

      return await permission.reload()
    } catch (error) {
      throw new Error('Error editing permission')
    }
  }

  async delete(dto: DtoId) {
    const permission = await Permissions.findOne({
      where: {
        id: dto.id,
      },
    })

    if (!permission) {
      throw new Error('Permission not found!')
    }

    try {
      await Permissions.destroy({
        where: {
          id: dto.id,
        },
      })
    } catch (error) {
      throw new Error('Error deleting permission')
    }
  }
}

export default PermissionService
