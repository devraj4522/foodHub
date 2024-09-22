import axios from "axios";

export async function getAllRestaurants() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/restaurants`)
    return response.data
  } catch (error) {
    console.error("error in axios", error)
    throw error
  }
}
