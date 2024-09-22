import { createUser, getUniqueUser, getUserByPhoneNumber, getUserById as getUserByIdService, verifyOTP, generateOTP, updateUserDetails, getUserOrders, getUserReviews, getUserFavorites } from '../services/userService'
import { ICreateUserInput, IUserToken } from '@/types/User'
import { generateToken, verifyToken } from '../services/authService'

export async function registerUser(userData: ICreateUserInput) {

  const existingUser = await getUniqueUser(userData.email || '', userData.phone || '')
  if (existingUser) {
    throw new Error('Email already in use')
  }
  const user = await createUser(userData)
  const tokenData: IUserToken = {
    id: user.id,
    ...userData
  }
  const token = generateToken(tokenData)
  return { user, token }

}

export async function loginUser(phone: string) {
  const user = await getUserByPhoneNumber(phone)
  if (!user) {
    throw new Error('User not found')
  }
  const userData: IUserToken = {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user?.email || "",
    role: user.role,
    city: user.city || "",
    state: user.state || "",
    pinCode: user.pinCode || "",
    address: user.address || "",
  };
  const token = generateToken(userData);
  return { user, token }
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

export async function updateUserDetailsController(userData: Partial<ICreateUserInput> & { id: string }) {
  console.log("userData")
  console.log(userData)
  const user = await updateUserDetails(userData)
  const tokenData: IUserToken = {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user?.email || "",
    role: user.role,
    city: user.city || "",
    state: user.state || "",
    pinCode: user.pinCode || "",
    address: user.address || "",
  }
  const token = generateToken(tokenData)
  return {user, token}
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


export async function getUserFromTokenController(token: string) {
  return verifyToken(token)
}
