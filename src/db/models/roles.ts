import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../../config/dbConnect'

export interface RoleAttributes {
  id?: string
  name: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RoleInput extends Optional<RoleAttributes, 'id'> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class Roles extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: string
  public name!: string
  public description!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Roles.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
    modelName: 'roles',
  }
)

export default Roles
