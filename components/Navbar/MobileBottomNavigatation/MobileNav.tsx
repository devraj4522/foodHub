"use client"
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { FaHome, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { showCartAtom } from "@/recoil/atoms/cartAtom";
import { showLoginFormAtom } from "@/recoil/atoms/userAtom";
import { useVerifyJwtToken } from "@/hooks/user/auth/useVerifyJwtToken";
import { useGetCart } from "@/hooks/cart/useGetCart";
import { Navbar as NavbarComponent, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const [showCart, setShowCart] = useRecoilState(showCartAtom);
  const [, setShowLoginForm] = useRecoilState(showLoginFormAtom);
  const { user } = useVerifyJwtToken();
  const cart = useGetCart();
  const router = useRouter()
  const isActive = (path: string) => pathname === path;
  const cartItems = cart?.items || [];
  const isLoggedIn = !!user;

  const handleClick = (key: string) => {
    if (key === 'cart') {
      setShowCart(!showCart)
    }
    else if (key === 'login'){
      setShowCart(false)
      router.push(key)
      setShowLoginForm(true)
    }
    else{
      setShowCart(false)
      router.push(key)
    }
  }
  return (
    <NavbarComponent
     classNames={{
      base: "!top-auto !-bottom-1"
     }}
     shouldHideOnScroll={false}
     isBlurred={false}
     className=" md:hidden fixed  left-0 h-16 bg-white border-t border-gray-200 shadow-lg z-50 w-full " maxWidth="full" isBordered>
      <NavbarContent className="flex justify-between w-full px-2" justify="center">
        <NavbarItem className="flex-1">
          <Link onPress={() => handleClick("/")} className={`flex justify-center items-center w-full h-full ${isActive("/") ? "text-[#b2a500] !opacity-100" : "text-black"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill={isActive("/") ? "#b2a500" : "#000"}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </Link>
        </NavbarItem>
        <NavbarItem className="flex-1">
          <Link onPress={() => handleClick("/search")} className={`flex justify-center items-center w-full h-full ${isActive("/search") ? "text-[#EFDCB1] !opacity-100" : "text-black"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill={isActive("/search") ? "#EFDCB1" : "#000"}>
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </Link>
        </NavbarItem>
        <NavbarItem className="flex-1">
            <Link onPress={() => handleClick("cart")} className={`flex justify-center items-center w-full h-full text-black relative ${isActive("/cart") ? "text-[#EFDCB1] !opacity-100" : "text-black"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill={isActive("/cart") ? "#EFDCB1" : "#000"}>
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 right-[20%] bg-[#06C167] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
        </NavbarItem>
        <ProfileDropDown />
      </NavbarContent>
    </NavbarComponent>
  );
};