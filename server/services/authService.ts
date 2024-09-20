import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function generateToken(phoneNumber: string): string {
  return jwt.sign({ phoneNumber }, JWT_SECRET, { expiresIn: '1h' })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
