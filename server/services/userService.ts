import { User } from '../models/User'

import { ICreateUserInput } from '@/types/User'
import { Cart } from '../models/Cart'
import { sendSignupConfirmationEmail } from '../lib/sendInBlueEmail';

export async function createUser(userData: Omit<ICreateUserInput, 'phone'>) {
  const user = await User.create(userData);
  await Cart.createCart(user.id);
  console.log("User created successfully")
  // console.log(user)
  return user
}

export async function getUserByEmail(email: string) {
  return User.findUnique(email)
}

export async function getUniqueUser(email: string) {
  return User.findUnique(email)
}

export async function getUserById(id: string) {

  return User.findById(id)
}

export async function getUserByPhoneNumber(phone: string) {
  return User.findByPhone(phone)
}

export async function verifyOTP(email: string, otp: string) {
  return User.verifyOTP(email, otp)
}

export async function generateOTP(email: string) {
  let user = await User.findByEmail(email);
  if (!user) {
    user = await User.create({ name: '', email, otpCode: '' });
    await Cart.createCart(user.id); 
  }
  try {
    const updated_user = await User.generateOTP(user.id);
    if (user.email && updated_user.email && updated_user.email !== null) {
      sendSignupConfirmationEmail(user.email, updated_user.otpCode as string);
    }else{
      throw new Error("Email not found")
    }
  } catch (error) {
    console.log(error)
    throw new Error("Error Generating OTP")
  }
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
