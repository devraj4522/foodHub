import { getProducts } from "@/utils/products/products";
import { useState, useEffect } from "react";

export const useProducts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts()
                setData(data.products)
            } catch (error) {
                console.log(error) 
            }
        }
        setIsLoading(true)
        fetchData()
        setIsLoading(false)
    }, [])

    return {data, isLoading, error}
}