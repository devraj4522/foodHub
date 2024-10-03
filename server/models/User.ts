import { prisma } from '@/server/lib/prisma'
import { generateOTP } from '@/server/otp'
import { IUser, ICreateUserInput } from '@/types/User';
import { randomBytes, randomInt } from 'crypto';
import { handlePrismaError } from '@/server/lib/prismaError';
export class User {
  static async create(userData: Omit<ICreateUserInput, 'phone'>) {
    return prisma.user.create({
      data: {
        ...userData,
        verified: false,
        role: userData.role || 'customer',
      },
    })
  }

  static async findByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } })
  }

  static async findByPhone(phone: string) {
    return prisma.user.findUnique({ where: { phone } })
  }

  static async findUnique(email: string) {
    return prisma.user.findFirst({
      where: {
        OR: [
          { email },
        ],
      },
    })
  }

  static async findById(id: string) {

    return prisma.user.findUnique({ where: { id } })
  }

  static async generateOTP(userId: string) {
    const otp = randomInt(1000, 9999).toString().padStart(4, '0');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    return prisma.user.update({
      where: { id: userId },
      data: {
        otpCode: otp,
        otpExpiresAt: expiresAt,
      },
    });
  }

  static async verifyOTP(email: string, otpToVerify: string) {
    const user = await prisma.user.findFirst({
      where: { email },
      select: { otpCode: true, otpExpiresAt: true },
    });
    if (!user || !user.otpCode || !user.otpExpiresAt) {
      return false;
    }

    if (user.otpCode === otpToVerify && user.otpExpiresAt > new Date()) {
      await prisma.user.updateMany({
        where: { email: email },
        data: {
          verified: true,
        },
      });
      return true;
    }

    return false;
  }

  static async updateUserDetails(userData: Partial<ICreateUserInput> & { id: string }) {
    const { id, ...updateData } = userData;
    try {
      // Check if phone number is being updated and is unique
      if (updateData.phone) {
        const existingUser = await prisma.user.findFirst({
          where: {
            phone: updateData.phone,
            NOT: { id: id }
          }
        });
        if (existingUser) {
          throw new Error('Phone number already in use');
        }
      }

      return await prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      // console.error("Error updating user details:", error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(handlePrismaError(error));
      }
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