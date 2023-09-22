import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../../config/dbConnect'

export interface UserPermissionAttributes {
  id?: number
  user_id: string
  permission_id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserPermissionInput
  extends Optional<UserPermissionAttributes, 'id'> {}
export interface UserPermissionOutput
  extends Required<UserPermissionAttributes> {}

class UsersPermissions
  extends Model<UserPermissionAttributes, UserPermissionInput>
  implements UserPermissionAttributes
{
  public id!: number
  public user_id!: string
  public permission_id!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
UsersPermissions.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
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
    modelName: 'users_permissions',
  }
)

export default UsersPermissions
