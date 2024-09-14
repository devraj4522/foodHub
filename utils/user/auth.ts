import axios from "axios"

const API = process.env.API

export const sendOtp = async (phone: string) => {
  try {
    // const response = await axios.post(`${API}/api/user/send-otp`, { phone })
    // dummy response
    const response = { success: true }
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const verifyOtpSignup = async (phone: string, otp: string) => {
  try {
    // const response = await axios.post(`${API}/api/user/verify-otp`, { phone, otp })
    // dummy response
    const response = { success: true, message: "OTP verified successfully", token: "1234567890" }
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUser = async () => {
  try {
    // const response = await axios.get(`${API}/api/user/get-user`, { token })
    // dummy response
    const response = { success: true, message: "User fetched successfully", user: { name: "John Doe", email: "john.doe@example.com", address: ["Salt Lake Sector V, Kolkata"] } }
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}


export const login = async (email: string, password: string) => {
    try {
    // const response = await axios.post(`${API}/api/user/login`, { email, password })
    // dummy response
    const response = { success: true, message: "Login successful", token: "1234567890" }
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const logout = async (token: string) => {
  try {
    // const response = await axios.delete(`${API}/api/user/logout`, { token })
    // dummy response
    const response = { success: true, message: "Logout successful" }
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const refresh = async (token: string) => {
  try {
    // const response = await axios.get(`${API}/api/user/refresh`, { token })
    // dummy response
    const response = { success: true, message: "Refresh successful", token: "1234567890" }
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

