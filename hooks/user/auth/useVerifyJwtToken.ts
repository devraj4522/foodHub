import { useEffect } from 'react';
import { verifyToken } from '@/actions/user/auth';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atoms/userAtom';
import { userSavedAddressAtom } from '@/recoil/atoms/locationAtom';

export const useVerifyJwtToken = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [, setSavedAddress] = useRecoilState(userSavedAddressAtom)
  
  useEffect(() => {
    const verifyUserToken = async () => {
        try {
          const userData = await verifyToken();
          setUser(userData.user);
          setSavedAddress(userData.user.address)
        } catch (error) {
          // console.error('Token verification failed:', error);
          setUser(null); // Clear user data if verification fails
          setSavedAddress('')
        }
     
    };

    verifyUserToken();
  }, [setUser]);

  return { user };
};
