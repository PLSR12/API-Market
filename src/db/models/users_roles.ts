import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../../config/dbConnect'

export interface UserRoleAttributes {
  id?: number
  user_id: string
  role_id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserRoleInput extends Optional<UserRoleAttributes, 'id'> {}
export interface UserRoleOutput extends Required<UserRoleAttributes> {}

class UsersRoles
  extends Model<UserRoleAttributes, UserRoleInput>
  implements UserRoleAttributes
{
  public id!: number
  public user_id!: string
  public role_id!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
UsersRoles.init(
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
    role_id: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
    modelName: 'users_roles',
  }
)

export default UsersRoles
