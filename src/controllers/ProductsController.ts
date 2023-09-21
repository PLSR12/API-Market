import { Request, Response } from 'express'
import ProductsService from '../services/ProductsService'
import Helper from '../helper/Helper'
const productsService = new ProductsService()

class ProductsController {
  static async createProduct(req: Request, res: Response): Promise<Response> {
    const { name, description, price } = req.body

    try {
      const product = await productsService.create({ name, description, price })

      return res.status(201).send(Helper.ResponseData(201, null, null, product))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const allProducts = await productsService.getAll()

      return res
        .status(201)
        .send(Helper.ResponseData(201, null, null, allProducts))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }
  static async getProductById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const product = await productsService.getById({ id: id })

      return res.status(200).send(Helper.ResponseData(200, null, null, product))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, description, price } = req.body

    try {
      const product = await productsService.update({
        id,
        name,
        description,
        price,
      })

      return res.status(200).send(Helper.ResponseData(200, null, null, product))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await productsService.delete({ id: id })

      return res
        .status(204)
        .send(Helper.ResponseData(204, 'Deleted with successfully', null, null))
    } catch (error) {
      return res.status(500).send(Helper.ResponseData(500, '', error, null))
    }
  }
}

export default ProductsController
