const API = process.env.API

export const updateUser = async (userId: string, data: any) => {
    // const response = await axios.put(`${API}/api/user/update/${userId}`, data)
    // dummy response
    const response = { success: true, message: "User updated successfully" }
    return response
}

export const createAddress = async (userId: string, data: any) => {
    // const response = await axios.post(`${API}/api/user/address/create/${userId}`, data)
    // dummy response
    const response = { success: true, message: "Address created successfully", addressId: "1234567890" }
    return response
}

export const updateAddress = async (userId: string, addressId: string, data: any) => {
    // const response = await axios.put(`${API}/api/user/address/update/${userId}/${addressId}`, data)
    // dummy response
    const response = { success: true, message: "Address updated successfully" }
    return response
}

export const deleteAddress = async (userId: string, addressId: string) => {
    // const response = await axios.delete(`${API}/api/user/address/delete/${userId}/${addressId}`)
    // dummy response
    const response = { success: true, message: "Address deleted successfully" }
    return response
}

export const getAddresses = async (userId: string) => {
    // const response = await axios.get(`${API}/api/user/address/get/${userId}`)
    // dummy response
    const response = { success: true, message: "Addresses fetched successfully", addresses: [] }
    return response
}

