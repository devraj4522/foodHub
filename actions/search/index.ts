
export async function searchRestaurantsORMenuItems(query: string) {
  try {
    console.log("Searching for:", query);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${query}`)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error in fetch actions", error);
    throw error;
  }
}

