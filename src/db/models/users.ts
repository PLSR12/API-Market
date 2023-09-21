import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../../config/dbConnect'

export interface UserAttributes {
  id: string
  name: string
  email: string
  password: string

  createdAt?: Date
  updatedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class Users extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string
  public name!: string
  public email!: string
  public password!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Users.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
    modelName: 'users',
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  }
)

export default Users
