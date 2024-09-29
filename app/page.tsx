import HeroSection from "@/components/Hero/Hero";
// import ExploreSection from "@/components/Deals/Deals";
import TopItems from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";
import { getAllRestaurants } from "@/actions/restaurant";

export default async function Home() {
  const restaurants = await getAllRestaurants()
  console.log(restaurants)
  return (
    <>
      <HeroSection />
      <TopItems />
      <RestaurantList restaurants={restaurants} />
    </>
  );
}
