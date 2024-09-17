import { prisma } from '@/server/lib/prisma'

export interface UserData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  password: string;
}

export class User {
  static async create(userData: UserData) {
    return prisma.user.create({
      data: {
        ...userData,
        verified: false,
      },
    })
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }

  static async findByPhone(phone: string) {
    return prisma.user.findUnique({ where: { phone } })
  }

  static async findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  }
}