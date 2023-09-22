import { decode } from 'jsonwebtoken'
import IUserJwt from '../interfaces/IUserJWT'

export const decodeUserData = (token: string): Promise<IUserJwt | null> => {
  const [, accessToken] = token.split(' ')

  const dataUser: any = decode(accessToken)

  return dataUser
}
