export async function getRestaurantBySlug(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Construct the URL using URL constructor
  const url = new URL('/api/restaurant', baseUrl);
  url.searchParams.append('slug', slug);

  try {
    const response = await fetch(url.toString(), {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    throw error;
  }
}

