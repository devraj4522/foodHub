"use client"
import React, { useState } from 'react';
import { FaCog, FaHistory, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { IoBag } from 'react-icons/io5';

import { Button } from "@nextui-org/button";
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atoms/userAtom';
import { useRouter } from 'next/navigation';
import { Avatar } from '@nextui-org/avatar';
import { cartAtom } from '@/recoil/atoms/cartAtom';
import { showCartAtom } from '@/recoil/atoms/cartAtom';
import { toast } from 'sonner';
import { logout } from '@/actions/user/auth';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

const ProfilePageComponent = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [, setCart] = useRecoilState(cartAtom);
  const [, setShowCart] = useRecoilState(showCartAtom);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter()

  const handleSignOut = async () => {
    setUser(null);
    setCart(null);
    setShowCart(false)
    // Remove the auth_token cookie
    await logout();
    toast.success('Signed out successfully');
    router.push('/');
    setShowLogoutModal(false);
  };

  return (
    <>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="hidden md:block  md:text-3xl font-bold mb-4 md:mb-8">My Profile</h1>
      
      <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 bg-lime-50 shadow-inner border-b border-gray-200">
          <div className="flex items-center">
            <div className=" bg-transparent rounded-full flex items-center justify-center text-3xl text-white">
            <Avatar src={"/assets/user.svg"} alt="User" className="w-16 bg-transparent h-16 md:w-20 md:h-20 mt-4" />
            </div>
            <div className="md:ml-6 ml-2">
              <h2 className="md:text-2xl break-words text-lg font-bold text-gray-950">{user?.name}</h2>
              <p className="text-gray-950 break-words text-sm md:text-base">{user?.phone || user?.email}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="md:text-xl text-lg font-bold mb-0 md:mb-4">Settings</h3>
          <ul className="md:space-y-4">
            <li className='px-0'>
              <Button
                variant="light"
                onClick={() => {
                  router.push("/user-settings");
                }}
                startContent={<FaCog className="text-black" />}
                className="w-full md:text-xl text-lg px-0 justify-start text-left"
              >
                Account Settings
              </Button>
            </li>
            <li>
              <Button
                variant="light"
                onClick={() => router.push("/active-orders/"+user?.id)}
                startContent={<IoBag className="text-black" />}
                className="w-full px-0 justify-start text-left"
              >
                Active Orders
              </Button>
            </li>
            <li>
              <Button
                variant="light"
                onClick={() => router.push("/order-history/"+user?.id)}
                startContent={<FaHistory className="text-black" />}
                className="w-full px-0 justify-start text-left"
              >
                Order History
              </Button>
            </li>
            <li>
              <Button 
                onPress={() => setShowLogoutModal(true)}
                className="bg-red-600 mt-4 md:mt-8 text-white hover:bg-red-700 transition-colors duration-300 px-4 py-2 rounded"
              >
                <FaSignOutAlt className="mr-1 sm:mr-2" /> Sign out
              </Button>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
    <Modal isOpen={showLogoutModal} onOpenChange={setShowLogoutModal} placement='center'>
    <ModalContent className="bg-white rounded-lg p-4 max-w-[90%] w-full sm:max-w-sm mx-auto">
      {(onClose) => (
        <>
          <ModalHeader className="text-xl items-center justify-center text-center sm:text-2xl font-bold mb-2 sm:mb-4 flex">
         Sign out
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base">Are you sure you want to sign out?</p>
          </ModalBody>
          <ModalFooter className="flex justify-end space-x-2 sm:space-x-4">
            <Button 
              color="default" 
              variant="flat" 
              onPress={onClose}
              className="px-4 sm:px-6 py-2 text-black bg-gray-200 hover:bg-gray-300 text-sm sm:text-base flex items-center"
            >
              <FaTimes className="mr-1 sm:mr-2" /> Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleSignOut}
              className="px-4 sm:px-6 py-2 text-white bg-black hover:bg-gray-800 text-sm sm:text-base flex items-center"
            >
              <FaSignOutAlt className="mr-1 sm:mr-2" /> Sign out
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  </>
  );
};

export default ProfilePageComponent;
