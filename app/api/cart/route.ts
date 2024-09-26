import { NextRequest, NextResponse } from 'next/server'
import { createCartItemController, updateCartItemController, deleteCartItemController, getCartByUserIdController } from '@/server/controllers/cartController'
import { ICreateCartItemInput } from '@/types/Cart'
import { ICartItem } from '@/types/Cart'

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req.nextUrl
  const userId = searchParams.get('userId')
  const cart = await getCartByUserIdController(userId as string)
  return NextResponse.json(cart, { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data: ICreateCartItemInput = await req.json()
  const cartItem = await createCartItemController(data)
  return NextResponse.json(cartItem, { status: 201 })
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const data: Partial<ICartItem> = await req.json()
  const cartItem = await updateCartItemController(id as string, data)
  return NextResponse.json(cartItem, { status: 200 })
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  await deleteCartItemController(id as string)
  return NextResponse.json({ status: 204 })
}