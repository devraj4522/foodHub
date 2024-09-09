"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles, user } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { userAtom, UserDetails } from "@/recoil/atoms/userAtom";
import { useSetRecoilState } from "recoil";
import HeroSection from "@/components/Hero/Hero";
import ExploreSection from "@/components/Deals/Deals";
import YouCanTrySection from "@/components/TrySection/TrySection";
import RestaurantList from "@/components/RestaurantCard/RestaurantCard";
import LoginCard from "@/components/LoginCard/LoginCard";

export default function Home() {
  const data = {
    name: "Dev Raj Singh",
    email: "dev@tst.com",
    phone: "+91 9122604411",
    address: "Salt Lake Sector V, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700101",
  }

  return (
    <>
      <HeroSection />
      <ExploreSection />
      <YouCanTrySection />
      <RestaurantList />
      <LoginCard />
    </>
  );
}
