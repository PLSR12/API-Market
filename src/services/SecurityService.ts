import { Op } from 'sequelize'
import Roles from '../db/models/roles'
import Users from '../db/models/users'
import Permissions from '../db/models/permissions'

interface ICreateAclInput {
  userId: string
  roles: string[]
  permissions: string[]
}

interface ICreatePermissionsRolesInput {
  roleId: string
  permissions: string[]
}

class SecurityService {
  async createAcl(dto: ICreateAclInput) {
    const user: any = await Users.findOne({
      include: [
        {
          model: Roles,
          as: 'user_roles',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: Permissions,
          as: 'user_permissions',
          attributes: ['id', 'name', 'description'],
        },
      ],
      where: { id: dto.userId }, // id do user a ser editado
    })

    if (!user) {
      throw new Error('User not found')
    }

    const rolesAdded = await Roles.findAll({
      where: {
        id: { [Op.in]: dto.roles },
      },
    })
    const permissionsAdded = await Permissions.findAll({
      where: {
        id: { [Op.in]: dto.permissions },
      },
    })
    // para remover as permissões antigas
    await user.removeUser_roles(user.users_roles)
    await user.removeUser_permissions(user.users_permissions)

    // para adicionar as novas permissões
    await user.addUser_roles(rolesAdded)
    await user.addUser_permissions(permissionsAdded)

    const newUser = await Users.findOne({
      include: [
        {
          model: Roles,
          as: 'user_roles',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: Permissions,
          as: 'user_permissions',
          attributes: ['id', 'name', 'description'],
        },
      ],
      where: { id: dto.userId }, // id do user a ser editado
    })

    return newUser
  }

  async createPermissionsRoles(dto: ICreatePermissionsRolesInput) {
    const role: any = await Roles.findOne({
      include: [
        {
          model: Permissions,
          as: 'roles_of_permissions',
          attributes: ['id', 'name', 'description'],
        },
      ],
    })

    if (!role) {
      throw new Error('Role not found')
    }

    const permissionsAdded = await Permissions.findAll({
      where: {
        id: {
          [Op.in]: dto.permissions,
        },
      },
    })

    await role.removeRoles_of_permissions(role.roles_of_permissions)

    await role.addRoles_of_permissions(permissionsAdded)

    const newRole = await Roles.findOne({
      include: [
        {
          model: Permissions,
          as: 'roles_of_permissions',
          attributes: ['id', 'name', 'description'],
        },
      ],
      where: { id: dto.roleId },
    })
    return newRole
  }
}

export default SecurityService
