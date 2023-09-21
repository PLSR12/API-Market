import { Application } from 'express'

import bodyParser from 'body-parser'
import auth from './AuthRoute'
import users from './UsersRoute'
import products from './ProductsRoute'
import permissions from './PermissionsRoute'
import roles from './RolesRoute'

export default (app: Application) => {
  app.use(bodyParser.json(), auth, users, products, permissions, roles)
}
