import React from 'react';
import RestaurantComponent from './_components/Restaurant';
import { notFound } from 'next/navigation';
import { getRestaurantBySlug } from '@/actions/restaurnat';
import { Suspense } from 'react';

export default async function RestaurantPage({ params }: { params: { slug: string } }) {
  let data = null;
  try {
    data = await getRestaurantBySlug(params.slug);
    if (!data ||  data?.error || data===null) {
    return notFound();
  }
  } catch (error) {
    console.log("error in RestaurantPage")
  }
  return (
    <Suspense fallback={<div className='w-screen h-screen justify-center items-center' > 
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>}>
      <RestaurantComponent data={data} />
    </Suspense>
  );
}