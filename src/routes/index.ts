import { Application } from 'express'

import bodyParser from 'body-parser'
import auth from './AuthRoute'
import users from './UsersRoute'
import products from './ProductsRoute'

export default (app: Application) => {
  app.use(bodyParser.json(), auth, users, products)
}
