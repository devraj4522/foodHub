import HeroSection from "@/components/Hero/Hero";
import ExploreSection from "@/components/Deals/Deals";
import TopItems from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";


export default async function Home() {
  return (
    <>
      <HeroSection />
      <TopItems />
      {await RestaurantList()}
      <ExploreSection />
    </>
  );
}
