
export async function getMenuItemById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food?id=${id}`);
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


export async function searchMenuItems(query: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/food/search?query=${query}`)
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