import React from 'react';
import Restaurant from './_components/Restaurant';
import { notFound } from 'next/navigation';
import { getRestaurantBySlug } from '@/actions/restaurnat';

export default async function RestaurantPage({ params }: { params: { slug: string } }) {
    const data = await getRestaurantBySlug(params.slug);
    if (!data || data.error) {
    return notFound();

  }
  
  return <Restaurant data={data} />;
}