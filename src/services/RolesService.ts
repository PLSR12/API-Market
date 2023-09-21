import { v4 } from 'uuid'
import Roles, { RoleInput } from '../db/models/roles'
import DtoId from '../interfaces/IDto'

interface IRoleInputUpdate extends RoleInput {
  id: string
}

class RolesService {
  async create(dto: RoleInput) {
    const role = await Roles.findOne({
      where: { name: dto.name },
    })

    if (role) {
      throw new Error('Role already exists')
    }

    try {
      const uuid = v4()

      const newRole = await Roles.create({
        id: uuid,
        name: dto.name,
        description: dto.description,
      })

      return newRole
    } catch (err) {
      throw new Error('Error creating role')
    }
  }

  async getAll() {
    const allRoles = await Roles.findAll()

    return allRoles
  }

  async getById(dto: DtoId) {
    const role = await Roles.findOne({
      where: {
        id: dto.id,
      },
    })

    if (!role) {
      throw new Error('Role not found!')
    }

    return role
  }

  async update(dto: IRoleInputUpdate) {
    const role = await Roles.findOne({
      where: {
        id: dto.id,
      },
    })

    if (!role) {
      throw new Error('Role not found!')
    }

    try {
      role.name = dto.name
      role.description = dto.description

      await role.save()

      return await role.reload()
    } catch (error) {
      throw new Error('Error editing role')
    }
  }

  async delete(dto: DtoId) {
    const role = await Roles.findOne({
      where: {
        id: dto.id,
      },
    })

    if (!role) {
      throw new Error('Role not found!')
    }

    try {
      await Roles.destroy({
        where: {
          id: dto.id,
        },
      })
    } catch (error) {
      throw new Error('Error deleting role')
    }
  }
}

export default RolesService
