import HeroSection from "@/components/Hero/Hero";
import ExploreSection from "@/components/Deals/Deals";
import TopItems from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";
import { getAllRestaurants } from "@/actions/restaurant";

export default async function Home() {
  let restaurants = [];
  try {
    restaurants = await getAllRestaurants()
  } catch (error) {
    console.log("error in getAllRestaurants", error)
  }
  return (
    <>
      <HeroSection />
      <TopItems />
      <RestaurantList restaurants={restaurants} />
      <ExploreSection />
    </>
  );
}
