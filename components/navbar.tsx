"use client";

import { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles, user } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { FaAngleDown, FaLocationDot } from "react-icons/fa6";
import { HiPhoneArrowDownLeft } from "react-icons/hi2";
import { PiShoppingCartSimpleFill } from "react-icons/pi"
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { useGeolocation } from "@/hooks/location/useGeolocation";
import { userAtom } from "@/recoil/atoms/userAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import { FaUserCircle } from "react-icons/fa";
import LoginCard from "./LoginCard/LoginCard";
import { showCartAtom } from "@/recoil/atoms/cartAtom";

interface Address {
  display_name: string;
}

export const Navbar = () => {
  const [address, setAddress] = useState("Fetching address...");
  const { coordinates, error } = useGeolocation();
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCart, setShowCart] = useRecoilState(showCartAtom);

  useEffect(() => {
    // Check login status from your API
    const checkLoginStatus = async () => {
      try {
        // const response = await fetch('/api/check-auth', {
        //   credentials: 'include' // to include cookies if you're using cookie-based auth
        // });
        const response = {
          ok: true,
          cookies: "test=test",
        }
        if (response.ok) {
          setIsLoggedIn(true);
          // Fetch user details if logged in
          // const userResponse = await fetch('/api/user', {
          //   credentials: 'include'
          // });
          const userResponse = {
            ok: true,
            json: async () => ({
              name: "John Doe",
              email: "john@example.com",
              phone: "+1234567890",
              address: "123 Main St, Anytown, USA",
              city: "Anytown",
              state: "Anystate",
              pincode: "12345"
            })
          }
          if (userResponse.ok) {
            const userData = await userResponse.json();
            // setUser(userData); // Update userAtom with fetched user data
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
      };

      checkLoginStatus();
  }, [setUser]);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      const fetchAddress = async () => {
        try {
          const storedAddress = localStorage.getItem('userAddress');
          const storedTimestamp = localStorage.getItem('addressTimestamp');
          const currentTime = new Date().getTime();
          
          if (storedAddress && storedTimestamp && (currentTime - parseInt(storedTimestamp) < 7 * 60 * 60 * 1000)) {
            // Use stored address if it's less than 7 hours old
            setAddress(storedAddress);
          } else {
            // Fetch new address
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}`
            );
            const data: Address = await res.json();

            // address like Salt Lake Sector V...
            const addresses = data.display_name.split(","); 
            const newAddress = addresses[0] + ", " + addresses[1];

            setAddress(newAddress);
            
            // Store new address and timestamp
            localStorage.setItem('userAddress', newAddress);
            localStorage.setItem('addressTimestamp', currentTime.toString());
          }
        } catch (err) {
          console.error('Error fetching address:', err);
        }
      };

      fetchAddress();
    }
  }, [coordinates]);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  return (
    <NextUINavbar className="lg:py-4 py-2 bg-lime-200" maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full bg-transparent" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit text-lime-600">FoodKloud</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
            <NavbarItem>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium max-w-40 text-wrap",
                )}
                color="foreground"
                href="#"
              >
              <FaLocationDot size={24} className="mr-2 text-lime-500" />  {address} <FaAngleDown className="" />
              </NextLink>
            </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-6">
          <Link aria-label="Phone" className="" href={`tel:${siteConfig.links.phone}`} isExternal>
            <HiPhoneArrowDownLeft className="mr-2 text-green-600 " size={20} />
            <div className="text-[#0b0b0b] text-small ">
            Call Us at <br/> <p className="font-bold">{siteConfig.links.phone}</p>
            </div>
          </Link>
          <Link aria-label="Cart" href="#" onClick={handleCartClick}>
            <PiShoppingCartSimpleFill className="text-green-600" size={24} />
          </Link>
          <Link aria-label="Profile" href="/profile">
            <FaUserCircle className="text-green-600" size={24} />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {!isLoggedIn ? (
            <Button
              as={Link}
              className="text-sm font-normal text-white bg-green-600"
              onClick={(e) => setShowLoginForm(true)}
              variant="flat"
            >
              Login
            </Button>
          ) : (
            <span className=" font-bold" >{user.name.split(" ")[0]}</span>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link aria-label="Github" href="https://github.com" isExternal>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link
              color="foreground"
              href="/about"
              size="lg"
            >
              About
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              color="foreground"
              href="/pricing"
              size="lg"
            >
              Pricing
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              color="foreground"
              href="/cookie-policy"
              size="lg"
            >
              Cookie Policy
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
      {showLoginForm && <LoginCard />}
    </NextUINavbar>
  );
};
