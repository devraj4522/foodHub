"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiOutlineHome, HiOutlinePhone, HiOutlineShoppingBag } from "react-icons/hi";
import { Button } from "@nextui-org/button";
import { FaBagShopping } from "react-icons/fa6";

export default function NotFound({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center">
        <img
          src="/assets/not-found.svg"
          alt="Page Not Found"
          className="mx-auto mb-6 w-32 sm:w-40"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Oops! Page not found</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
          We can&apos;t seem to find the page you&apos;re looking for. Let&apos;s get you back on track!
        </p>
        <div className="flex flex-row justify-center items-center gap-3 sm:gap-4">
          <Link href="/" passHref className="w-full sm:w-auto">
            <Button className="bg-black text-white w-full sm:w-auto" size="lg" startContent={<HiOutlineHome />}>
              Home
            </Button>
          </Link>
          <Link href="/search" passHref className="w-full sm:w-auto">
            <Button className="bg-gray-200 text-gray-900 w-full sm:w-auto" size="lg" variant="flat" startContent={<FaBagShopping />}>
              Restaurants
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
