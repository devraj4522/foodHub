// import { prisma } from "@/server/lib/prisma";
// import { MenuItem } from "./MenuItem";
// import { CategoryData } from "@/types/Restaurant";


// export class Category {
//   static async getCategoryById(id: string) {
//     return prisma.category.findUnique({
//       where: { id },
//     });
//   }

//   static async getCategoriesByRestaurantId(restaurantId: string) {
//     return prisma.category.findMany({
//       where: {
//         menuItems: {
//           some: {
//             restaurantId: restaurantId
//           }
//         }
//       },
//     });
//   }

//   static async createCategory(data: Omit<CategoryData, 'id' | 'menuItems'>) {
//     return prisma.category.create({
//       data: {
//         name: data.name,
//         description: data.description,
//       },
//     });
//   }

//   static async updateCategory(id: string, data: Partial<Omit<CategoryData, 'id' | 'menuItems'>>) {
//     return prisma.category.update({
//       where: { id },
//       data,
//     });
//   }
  
// }