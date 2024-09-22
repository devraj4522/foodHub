import React from 'react';
import Restaurant from './_components/Restaurant';
import { notFound } from 'next/navigation';
import { getRestaurantBySlug } from '@/actions/restaurnat';

export default async function RestaurantPage({ params }: { params: { slug: string } }) {
  let data = null;
  try {
    data = await getRestaurantBySlug(params.slug);
    if (!data ||  data?.error) {
    return notFound();
  }
   } catch (error) {
    console.log("error in RestaurantPage")
   }
 
  return <Restaurant data={data} />;
}