import jwt from 'jsonwebtoken'
import { IUserToken } from '@/types/User'

const JWT_SECRET = process.env.JWT_SECRET


export function generateToken(user: IUserToken): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set')

  }
  return jwt.sign({ user }, JWT_SECRET)
}



export function verifyToken(token: string): any {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set')
  }
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.log(error)
    throw new Error('Token verification failed')
  }
}
