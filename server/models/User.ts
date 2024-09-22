import { prisma } from '@/server/lib/prisma'
import { generateOTP } from '@/server/otp'
import { IUser, ICreateUserInput } from '@/types/User';

export class User {
  static async create(userData: ICreateUserInput) {
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

  static async findUnique(email: string, phone: string) {
    return prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },
    })
  }

  static async findById(id: string) {

    return prisma.user.findUnique({ where: { id } })
  }

  static async generateOTP(userId: string) {
    // const otp = generateOTP();
    //TODO: remove this
    const otp = '1234';
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    return prisma.user.update({
      where: { id: userId },
      data: {
        otpCode: otp,
        otpExpiresAt: expiresAt,
      },
    });
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

  static async updateUserDetails(userData: Partial<ICreateUserInput> & { id: string }) {
    const { id, ...updateData } = userData;
    try{
      return prisma.user.update({
        where: { id },
        data: updateData,
      })
    } catch (error) {
      console.log(error)
      throw new Error("Error Updating value")
    }
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