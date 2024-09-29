import React, { useState } from 'react';
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useRouter } from 'next/navigation';
import { FaHistory, FaCog, FaSearch, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { showLoginFormAtom, userAtom } from '@/recoil/atoms/userAtom';
import { IoLogOutOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { logout } from '@/actions/user/auth';
import { useSetRecoilState } from 'recoil';
import { cartAtom } from '@/recoil/atoms/cartAtom';
const ProfileDropDown: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const setCart = useSetRecoilState(cartAtom);
  const setShowLoginForm = useSetRecoilState(showLoginFormAtom)

  const handleSignOut = async () => {
    setUser(null);
    setCart(null);
    // Remove the auth_token cookie
    await logout();
    toast.success('Signed out successfully');
    router.push('/');
    setShowLogoutModal(false);
  };

  const handleAction = (key: string) => {
    if (key === 'logout') {
      setShowLogoutModal(true);
    }
    else if (key === 'login'){
      setShowLoginForm(true)
    }
    else{
      router.push(key);
    }
  };

  return (
    <>
      {user ? (
        <>
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                as="button"
                className="w-10 h-10 justify-center items-center bg-transparent text-black" size="sm"
                name={user.name}
                src={"/assets/user.svg"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => handleAction(key.toString())}>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="order-history" startContent={<FaHistory />}>
                Order History
              </DropdownItem>
              <DropdownItem key="settings" startContent={<FaCog />}>
                Settings
              </DropdownItem>
              <DropdownItem key="search" startContent={<FaSearch />}>
                Search
              </DropdownItem>
              <DropdownItem key="logout" startContent={<FaSignOutAlt />} color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Modal isOpen={showLogoutModal} onOpenChange={setShowLogoutModal} placement='center'>
            <ModalContent className="bg-white rounded-lg p-4 max-w-[90%] w-full sm:max-w-sm mx-auto">
              {(onClose) => (
                <>
                  <ModalHeader className="text-xl items-center justify-center text-center sm:text-2xl font-bold mb-2 sm:mb-4 flex">
                    <IoLogOutOutline className="mr-2 text-xl text-green-600 font-bold" /> Sign out
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
      ) : (
        <Dropdown>
        <DropdownTrigger>
          <Avatar
            as="button"
            className="w-10 h-10 justify-center items-center bg-transparent text-black" size="sm"
            name={"U"}
            src={"/assets/user.svg"}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="solid" onAction={(key) => handleAction(key.toString())}>
          <DropdownItem key="login" className="h-8 bg-slate-100 gap-2">
            Login
          </DropdownItem>
        </DropdownMenu>
        </Dropdown>
      )
    }
    </>
  );
};

export default ProfileDropDown;
