import Users from './users'
import UsersPermissions from './users_permissions'
import Roles from './roles'
import RolesPermissions from './roles_permissions'
import Permissions from './permissions'
import UsersRoles from './users_roles'

export const associations = () => {
  Permissions.belongsToMany(Users, {
    through: UsersPermissions,
    as: 'permissions_of_users',
    foreignKey: 'permission_id',
  })
  Permissions.belongsToMany(Roles, {
    through: RolesPermissions,
    as: 'permissions_of_roles',
    foreignKey: 'permission_id',
  })

  Roles.belongsToMany(Users, {
    through: UsersRoles,
    as: 'roles_of_user',
    foreignKey: 'role_id',
  })
  Roles.belongsToMany(Permissions, {
    through: RolesPermissions,
    as: 'roles_of_permissions',
    foreignKey: 'role_id',
  })

  Users.belongsToMany(Roles, {
    through: UsersRoles,
    as: 'user_roles',
    foreignKey: 'user_id',
  })

  Users.belongsToMany(Permissions, {
    through: UsersPermissions,
    as: 'user_permissions',
    foreignKey: 'user_id',
  })
}
