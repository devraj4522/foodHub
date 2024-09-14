"use client"
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
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { HiPhoneArrowDownLeft } from "react-icons/hi2";
import { PiShoppingCartSimpleFill } from "react-icons/pi"
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { useRecoilState } from "recoil";
import { FaUserCircle } from "react-icons/fa";
import LoginCard from "./LoginCard/LoginCard";
import { showCartAtom } from "@/recoil/atoms/cartAtom";
import { useGetCartItems } from "@/hooks/cart/useGetCart";
import { Location } from "./Location/Location";
import { useGetUserHook } from "@/hooks/user/getUserHook";

export const Navbar = () => {
  const [showCart, setShowCart] = useRecoilState(showCartAtom);
  const cartItems = useGetCartItems();
  const { user, isLoading } = useGetUserHook();

  const isLoggedIn = !!user;
  const showLoginForm = !isLoggedIn;

  const handleCartClick = () => setShowCart(!showCart);

  const renderCartIcon = () => (
    <Link aria-label="Cart" href="#" onClick={handleCartClick} className="relative">
      <PiShoppingCartSimpleFill className="text-black" size={24} />
      {cartItems.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {cartItems.length}
        </div>
      )}
    </Link>
  );

  const renderLoginButton = () => (
    <Button
      as={Link}
      className="text-sm font-normal text-white bg-black hover:bg-gray-800"
      onClick={() => {}}
      variant="flat"
    >
      Login
    </Button>
  );

  return (
    <NextUINavbar className="lg:py-4 py-2 bg-lime-300" maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit text-black">FoodKloud</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem>
            <Location />
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-6">
          <Link aria-label="Phone" className="flex items-center" href={`tel:${siteConfig.links.phone}`} isExternal>
            <HiPhoneArrowDownLeft className="mr-2 text-black" size={20} />
            <div className="text-black text-sm hidden lg:block">
              Call Us at <br/> <p className="font-bold">{siteConfig.links.phone}</p>
            </div>
          </Link>
          {renderCartIcon()}
          <Link aria-label="Profile" href="/profile">
            <FaUserCircle className="text-black" size={24} />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {isLoggedIn ? (
            <span className="font-bold text-black">{user.name.split(" ")[0]}</span>
          ) : renderLoginButton()}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {renderCartIcon()}
        <NavbarMenuToggle className="text-black" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {['About', 'Pricing', 'Cookie Policy'].map((item) => (
            <NavbarMenuItem key={item}>
              <Link
                color="foreground"
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                size="lg"
                className="text-black"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            {isLoggedIn ? (
              <span className="font-bold text-black">{user.name}</span>
            ) : (
              <Button
                as={Link}
                className="text-sm font-normal text-white bg-black hover:bg-gray-800 w-full"
                onClick={() => {}}
                variant="flat"
              >
                Login
              </Button>
            )}
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
      {showLoginForm && <LoginCard />}
    </NextUINavbar>
  );
};
