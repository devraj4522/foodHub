import { createUser, getUserByEmail, } from '../services/userService'
import { UserData } from '../models/User'

export async function registerUser(userData: UserData) {
  const existingUser = await getUserByEmail(userData.email)
  if (existingUser) {
    throw new Error('Email already in use')
  }
  return createUser(userData)
}
