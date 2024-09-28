import { NextRequest, NextResponse } from 'next/server';
import { searchMenuItemsController } from '@/server/controllers/menuItemController';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query');
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const menuItems = await searchMenuItemsController(query);
  return NextResponse.json(menuItems);
}

