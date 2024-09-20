import { prisma } from '@/server/lib/prisma'
import { generateOTP } from '@/server/otp'

export interface UserData {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  role?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  address?: string;
}

export class User {
  static async create(userData: UserData) {
    return prisma.user.create({
      data: {
        ...userData,
        verified: false,
        role: userData.role || 'customer',
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

  static async generateOTP(phone: string) {
    // const otp = generateOTP();
    //TODO: remove this
    const otp = '123456';
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    await prisma.user.update({
      where: { phone },
      data: {
        otpCode: otp,
        otpExpiresAt: expiresAt,
      },
    });

    return otp;
  }

  static async verifyOTP(phone: string, otpToVerify: string) {
    const user = await prisma.user.findUnique({
      where: { phone },
      select: { otpCode: true, otpExpiresAt: true },
    });

    if (!user || !user.otpCode || !user.otpExpiresAt) {
      return false;
    }

    if (user.otpCode === otpToVerify && user.otpExpiresAt > new Date()) {
      await prisma.user.update({
        where: { phone },
        data: {
          verified: true,
          otpCode: null,
          otpExpiresAt: null,
        },
      });
      return true;
    }

    return false;
  }

  static async updateUserDetails(phone: string, userData: Partial<UserData>) {
    return prisma.user.update({
      where: { phone },
      data: userData,
    })
  }

  static async getUserOrders(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: { restaurant: true },
    })
  }

  static async getUserReviews(userId: string) {
    return prisma.review.findMany({
      where: { userId },
      include: { restaurant: true },
    })
  }

  static async getUserFavorites(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    })
  }
}