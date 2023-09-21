import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../../config/dbConnect'

export interface ProductAttributes {
  id?: string
  name: string
  description: string
  price: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductInput extends Optional<ProductAttributes, 'id'> {}
export interface ProductOutput extends Required<ProductAttributes> {}

class Products
  extends Model<ProductAttributes, ProductInput>
  implements ProductAttributes
{
  public id!: string
  public name!: string
  public description!: string
  public price!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Products.init(
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
    price: {
      type: DataTypes.FLOAT,
    },
  },

  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
    modelName: 'products',
  }
)

export default Products
