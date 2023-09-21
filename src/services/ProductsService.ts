import Products, { ProductInput } from '../db/models/products'
import { v4 } from 'uuid'
import DtoId from '../interfaces/IDto'

interface IProductInputUpdate extends ProductInput {
  id: string
}

class ProductsService {
  async create(dto: ProductInput) {
    const product = await Products.findOne({ where: { name: dto.name } })

    if (product) {
      throw new Error('Product already exists')
    }

    try {
      const uuid = v4()

      const newProduct = await Products.create({
        id: uuid,
        name: dto.name,
        description: dto.description,
        price: dto.price,
      })

      return newProduct
    } catch (error) {
      throw new Error('Error creating product')
    }
  }

  async getAll() {
    const allProducts = await Products.findAll()

    return allProducts
  }

  async getById(dto: DtoId) {
    const product = await Products.findOne({ where: { id: dto.id } })

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  async update(dto: IProductInputUpdate) {
    const product = await this.getById({ id: dto.id })

    try {
      product.name = dto.name
      product.description = dto.description
      product.price = dto.price

      await product.save()

      return await product.reload()
    } catch (error) {
      throw new Error('Error editing product')
    }
  }
  async delete(dto: DtoId) {
    await this.getById({ id: dto.id })

    try {
      await Products.destroy({ where: { id: dto.id } })
    } catch (error) {
      throw new Error('Error deleting products')
    }
  }
}

export default ProductsService
