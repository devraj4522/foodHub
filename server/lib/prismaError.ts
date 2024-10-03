import { Prisma } from '@prisma/client';

export function handlePrismaError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return 'This information already exists. Please try with different details.';
      case 'P2025':
        return 'The requested record was not found. Please check your input.';
      case 'P2014':
        return 'The operation failed due to a constraint violation. Please check your input.';
      case 'P2003':
        return 'A foreign key constraint failed. Please ensure all related data exists.';
      case 'P2016':
        return 'The query interpretation failed. Please check your input format.';
      default:
        return `An unexpected database error occurred: ${error.code}`;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return 'The provided data is invalid. Please check your input.';
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return 'A critical database error occurred. Please try again later.';
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'An unexpected error occurred. Please try again.';
  }
}
