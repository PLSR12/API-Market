import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import Users, { UserInput } from '../db/models/users'
import dotenv from 'dotenv'
import { Optional } from 'sequelize'

dotenv.config()

const secret = process.env.SECRET_AUTH as string

interface IAuth extends Optional<UserInput, 'name'> {}

class AuthService {
  async login(dto: IAuth) {
    const user = await Users.findOne({
      attributes: ['id', 'email', 'password'],
      where: {
        email: dto.email,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const passwordEquals = await compare(dto.password, user.password)

    if (!passwordEquals) {
      throw new Error('Email or password incorretos')
    }

    const accessToken = sign({ id: user.id, email: user.email }, secret, {
      expiresIn: 86400,
    })

    return { accessToken }
  }
}

export default AuthService
