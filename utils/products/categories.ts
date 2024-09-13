const API = process.env.API

export const getCategories = async () => {
    // const response = await axios.get(`${API}/api/products/categories`)
    // dummy response
    const response = { success: true, message: "Categories fetched successfully", categories: [] }
    return response
}

export const getCategory = async (categoryId: string) => {
    // const response = await axios.get(`${API}/api/products/categories/${categoryId}`)
    // dummy response
    const response = { success: true, message: "Category fetched successfully", category: {} }
    return response
}


