import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../../config/dbConnect'

export interface RolePermissionAttributes {
  id?: number
  role_id: string
  permission_id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RolePermissionInput
  extends Optional<RolePermissionAttributes, 'id'> {}
export interface RolePermissionOutput
  extends Required<RolePermissionAttributes> {}

class RolesPermissions
  extends Model<RolePermissionAttributes, RolePermissionInput>
  implements RolePermissionAttributes
{
  public id!: number
  public role_id!: string
  public permission_id!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
RolesPermissions.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.STRING,
    },
    permission_id: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
    modelName: 'roles_permissions',
  }
)

export default RolesPermissions
