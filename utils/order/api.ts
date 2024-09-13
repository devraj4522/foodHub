// Creating a a food ordering site 
const API = "http://localhost:3000"

interface Order {
    userId: string
    foodId: string
    quantity: number
    addressId: string
    paymentMethod: string
}

export const createOrder = async (order: Order) => {
    // const response = await axios.post(`${API}/api/order/create`, order)
    // dummy response
    const response = { success: true, message: "Order created successfully", orderId: "1234567890" }
    return response
}

export const getOrders = async (userId: string) => {
    // const response = await axios.get(`${API}/api/order/get/${userId}`)
    // dummy response
    const response = { success: true, message: "Orders fetched successfully", orders: [{ id: "1234567890", userId: "1234567890", foodId: "1234567890", quantity: 1, addressId: "1234567890", paymentMethod: "credit card" }] }
    return response
}

export const getOrder = async (orderId: string) => {
    // const response = await axios.get(`${API}/api/order/get/${orderId}`)
    // dummy response
    const response = { success: true, message: "Order fetched successfully", order: { id: "1234567890", userId: "1234567890", foodId: "1234567890", quantity: 1, addressId: "1234567890", paymentMethod: "credit card" } }
    return response
}

export const addToCart = async (userId: string, foodId: string, quantity: number) => {
    // const response = await axios.post(`${API}/api/order/add-to-cart`, { userId, foodId, quantity })
    // dummy response
    const response = { success: true, message: "Item added to cart successfully", cart: { id: "1234567890", userId: "1234567890", foodId: "1234567890", quantity: 1 } }
    return response
}

export const removeFromCart = async (userId: string, foodId: string) => {
    // const response = await axios.delete(`${API}/api/order/remove-from-cart/${userId}/${foodId}`)   
    // dummy response
    const response = { success: true, message: "Item removed from cart successfully" }
    return response
}

export const updateCart = async (userId: string, foodId: string, quantity: number) => {
    // const response = await axios.put(`${API}/api/order/update-cart/${userId}/${foodId}`, { quantity })
    // dummy response
    // dummy response 
    const response = { success: true, message: "Cart updated successfully", cart: { id: "1234567890", userId: "1234567890", foodId: "1234567890", quantity: 1 } }
    return response
}

export const checkout = async (userId: string, addressId: string, paymentMethod: string) => {
    // const response = await axios.post(`${API}/api/order/checkout/${userId}`, { addressId, paymentMethod })
    // dummy response
    const response = { success: true, message: "Checkout successful", orderId: "1234567890" } 
    return response
}
