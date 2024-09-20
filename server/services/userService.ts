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

export async function getUserByPhoneNumber(phone: string) {
  return User.findByPhone(phone)
}

export async function verifyOTP(phone: string, otp: string) {
  return User.verifyOTP(phone, otp)
}

export async function generateOTP(phone: string) {
  return User.generateOTP(phone)
}

export async function updateUserDetails(phone: string, userData: Partial<UserData>) {
  return User.updateUserDetails(phone, userData)
}

export async function getUserOrders(userId: string) {
  return User.getUserOrders(userId)
}

export async function getUserReviews(userId: string) {
  return User.getUserReviews(userId)
}

export async function getUserFavorites(userId: string) {
  return User.getUserFavorites(userId)
}
