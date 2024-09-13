"use client";

import { UserDetails } from "@/recoil/atoms/userAtom";
import { useSetRecoilState } from "recoil";

import HeroSection from "@/components/Hero/Hero";
import ExploreSection from "@/components/Deals/Deals";
import TopItems from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";
import LoginCard from "@/components/LoginCard/LoginCard";
import { QueryClient, QueryClientProvider } from "react-query";


export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HeroSection />
      <ExploreSection />
      <TopItems />
      <RestaurantList />
      <LoginCard />
    </QueryClientProvider>
  );
}
