import { hash } from 'bcryptjs'
import { v4 } from 'uuid'
import Users, { UserInput } from '../db/models/users'
import { Optional } from 'sequelize'
import DtoId from '../interfaces/IDto'
import Roles from '../db/models/roles'
import Permissions from '../db/models/permissions'

interface IUserInputUpdate extends Optional<UserInput, 'password'> {
  id: string
}

class UsersService {
  async create(dto: UserInput) {
    const user = await Users.findOne({
      where: { email: dto.email },
    })

    if (user) {
      throw new Error('User already exists')
    }

    try {
      const passwordHash = await hash(dto.password, 8)
      const uuid = v4()

      const newUser = await Users.create({
        id: uuid,
        name: dto.name,
        email: dto.email,
        password: passwordHash,
      })

      return newUser
    } catch (error) {
      throw new Error('Error creating user')
    }
  }
  async getAll() {
    const allUser = await Users.findAll({
      include: [
        {
          model: Roles,
          as: 'user_roles',
          attributes: ['id', 'name', 'description'],
          through: {
            attributes: [],
          },
        },
        {
          model: Permissions,
          as: 'user_permissions',
          attributes: ['id', 'name', 'description'],
          through: {
            attributes: [],
          },
        },
      ],
    })

    return allUser
  }

  async getById(dto: DtoId) {
    const user = await Users.findOne({
      where: { id: dto.id },
    })

    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async update(dto: IUserInputUpdate) {
    const user = await this.getById({ id: dto.id })

    try {
      user.name = dto.name
      user.email = dto.email

      await user.save()

      return user
    } catch (error) {
      throw new Error('Error editing user')
    }
  }
  async delete(dto: DtoId) {
    await this.getById({ id: dto.id })

    try {
      await Users.destroy({ where: { id: dto.id } })
    } catch (error) {
      throw new Error('Error deleting user')
    }
  }
}

export default UsersService
