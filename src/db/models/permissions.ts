import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../../config/dbConnect'

export interface PermissionAttributes {
  id?: string
  name: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PermissionInput extends Optional<PermissionAttributes, 'id'> {}
export interface PermissionOutput extends Required<PermissionAttributes> {}

class Permissions
  extends Model<PermissionAttributes, PermissionInput>
  implements PermissionAttributes
{
  public id!: string
  public name!: string
  public description!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Permissions.init(
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
    modelName: 'permissions',
  }
)

export default Permissions
