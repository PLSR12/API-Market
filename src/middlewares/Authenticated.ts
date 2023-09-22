import { verify, decode } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Response, Request } from 'express'

dotenv.config()

const secret = process.env.SECRET_AUTH as string

const Authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send({
      message: 'Token not provided',
    })
  }

  const [, accessToken] = token.split(' ')

  try {
    verify(accessToken, secret)

    return next()
  } catch {
    res.status(401).send({
      message: 'User not authorized',
    })
  }
}

export default Authenticated
