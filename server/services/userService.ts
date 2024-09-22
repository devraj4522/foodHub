import { User } from '../models/User'
import { ICreateUserInput } from '@/types/User'
import { Cart } from '../models/Cart'

export async function createUser(userData: ICreateUserInput) {
  const user = await User.create(userData);
  await Cart.createCart(user.id);
  console.log("User created successfully")
  console.log(user)
  return user
}

export async function getUserByEmail(email: string) {
  return User.findByEmail(email)
}

export async function getUniqueUser(email: string, phone: string) {
  return User.findUnique(email, phone)
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
  let user = await User.findByPhone(phone);
  if (!user) {
    user = await User.create({ phone, name: '' });
    await Cart.createCart(user.id); 
  }
  return User.generateOTP(user.id);
}


export async function updateUserDetails(userData: Partial<ICreateUserInput> & { id: string }) {
  try {
    try {
      return await User.updateUserDetails(userData)
    } catch (error) {
      console.log(error)
      throw new Error("Error Updating value")
    }
  } catch (error) {
    console.log(error)
    throw new Error ("Error Updating value")
  }
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
