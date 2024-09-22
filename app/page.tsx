import HeroSection from "@/components/Hero/Hero";
import ExploreSection from "@/components/Deals/Deals";
import TopItems from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";


export default function Home() {
  return (
    <>
      <HeroSection />
      <TopItems />
      <RestaurantList />
      <ExploreSection />
    </>
  );
}
