export async function getAllRestaurants() {
  try {
    let response;
    if (process.env.NODE_ENV === 'development') {
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/restaurants`)
    } else {
      response = await fetch(`/api/restaurant/restaurants`)
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error in fetch actions", error);
    // throw error;
  }
}
