import { User, UserData } from '../models/User'

export async function createUser(userData: UserData) {
  return User.create(userData)
}

export async function getUserByEmail(email: string) {
  return User.findByEmail(email)
}

export async function getUserById(id: string) {
  return User.findById(id)
}

