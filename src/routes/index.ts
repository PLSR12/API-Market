import { Application } from 'express'

import bodyParser from 'body-parser'
import auth from './AuthRoute'
import users from './UsersRoute'
import products from './ProductsRoute'
import permissions from './PermissionsRoute'
import roles from './RolesRoute'
import security from './SecurityRoute'


export default (app: Application) => {
  app.use(bodyParser.json(), auth, users, security,products, permissions, roles)
}
