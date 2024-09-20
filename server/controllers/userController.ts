import { createUser, getUserByEmail, getUserByPhoneNumber, getUserById as getUserByIdService, verifyOTP, generateOTP, updateUserDetails, getUserOrders, getUserReviews, getUserFavorites } from '../services/userService'
import { UserData } from '../models/User'

export async function registerUser(userData: UserData) {
  const existingUser = await getUserByEmail(userData.email || '')
  if (existingUser) {
    throw new Error('Email already in use')
  }
  return createUser(userData)
}

export async function loginUser(phone: string) {
  const user = await getUserByPhoneNumber(phone)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

export async function getUserById(id: string) {
  return getUserByIdService(id)
}

export async function getUserByPhoneNumberController(phoneNumber: string) {
  return getUserByPhoneNumber(phoneNumber)
}

export async function verifyOtpController(phoneNumber: string, otp: string) {
  return verifyOTP(phoneNumber, otp)
}

export async function generateOtpController(phoneNumber: string) {
  return generateOTP(phoneNumber)
}

export async function updateUserDetailsController(phone: string, userData: Partial<UserData>) {
  return updateUserDetails(phone, userData)
}

export async function getUserOrdersController(userId: string) {
  return getUserOrders(userId)
}

export async function getUserReviewsController(userId: string) {
  return getUserReviews(userId)
}

export async function getUserFavoritesController(userId: string) {
  return getUserFavorites(userId)
}
