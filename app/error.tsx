"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiOutlineHome, HiOutlinePhone, HiOutlineShoppingBag } from "react-icons/hi";

export default function Error({
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <img
          src="/images/error-illustration.svg"
          alt="Error Illustration"
          className="mx-auto mb-6 w-48"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We&apos;re sorry, but it seems there was an error. Don&apos;t worry, it&apos;s not your fault!
        </p>
        <button
          onClick={() => reset()}
          className="bg-primary text-white font-semibold py-2 px-4 rounded-full mb-6 hover:bg-primary-dark transition duration-300"
        >
          Try Again
        </button>
        
      </div>
    </div>
  );
}
