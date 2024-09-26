export async function getAllRestaurants() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/restaurants`)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error in fetch", error);
    throw error;
  }
}
