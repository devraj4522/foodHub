import HeroSection from "@/components/Hero/Hero";
// import ExploreSection from "@/components/Deals/Deals";
import TopItems from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";
import { getAllRestaurants } from "@/actions/restaurant";
import { notFound } from "next/navigation";

export default async function Home() {
  let restaurants = null;
  try {
    restaurants = await getAllRestaurants()
  } catch (error) {
    console.log("error in Home")
    return notFound()
  }
  return (
    <>
      <HeroSection />
      <TopItems />
      <RestaurantList restaurants={restaurants} />
    </>
  );
}
