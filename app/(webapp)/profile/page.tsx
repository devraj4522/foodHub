"use client"
import React from 'react';
import { FaUser, FaCog, FaHistory, FaHeart, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atoms/userAtom';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const user = useRecoilValue(userAtom);
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-lime-100">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-lime-300 rounded-full flex items-center justify-center text-3xl text-white">
              <FaUser />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.phone || user?.email}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Settings</h3>
          <ul className="space-y-4">
            <li>
              <Button
                variant="light"
                onClick={() => {
                  router.push("/user-settings");
                }}
                startContent={<FaCog className="text-lime-600" />}
                className="w-full justify-start text-left"
              >
                Account Settings
              </Button>
            </li>
            <li>
              <Button
                variant="light"
                onClick={() => router.push("/order-history/"+user?.id)}
                startContent={<FaHistory className="text-lime-600" />}
                className="w-full justify-start text-left"
              >
                Order History
              </Button>
            </li>
            <li>
              <Button
                variant="light"
                startContent={<FaHeart className="text-lime-600" />}
                className="w-full justify-start text-left"
              >
                Favorites
              </Button>
            </li>
            <li>
              <Button
                variant="light"
                startContent={<FaCreditCard className="text-lime-600" />}
                className="w-full justify-start text-left"
              >
                Payment Methods
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                startContent={<FaSignOutAlt />}
                className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 px-4 py-2 rounded"
              >
                Sign Out
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
