import { Category, CategoryData } from '../models/Category'

export async function getCategoryById(id: string) {
  return Category.getCategoryById(id)
}

export async function getCategoriesByRestaurantId(restaurantId: string) {
  return Category.getCategoriesByRestaurantId(restaurantId)
}

export async function createCategory(data: Omit<CategoryData, 'id' | 'menuItems'>) {
  return Category.createCategory(data)
}

export async function updateCategory(id: string, data: Partial<Omit<CategoryData, 'id' | 'menuItems'>>) {
  return Category.updateCategory(id, data)
}

