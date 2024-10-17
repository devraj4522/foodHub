import HeroSection from "@/components/Hero/Hero";
// import ExploreSection from "@/components/Deals/Deals";
import TopItems from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";
import { getAllRestaurants } from "@/actions/restaurant";
import { notFound } from "next/navigation";
import { getAllRestaurantsController } from "@/server/controllers/restaurantController";
import { Suspense } from "react";

export default async function Home() {
  const restaurants = await getAllRestaurantsController() || [];
  return (
    <>
      <HeroSection />
      <TopItems />
      <Suspense fallback={<div>Loading...</div>}>
      <RestaurantList restaurants={restaurants} />
      </Suspense>
    </>
  );
}
