import { useEffect } from 'react';
import { verifyToken } from '@/actions/user/auth';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atoms/userAtom';

export const useVerifyJwtToken = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const verifyUserToken = async () => {
        try {
          const userData = await verifyToken();
          setUser(userData.user);
        } catch (error) {
          console.error('Token verification failed:', error);
          setUser(null); // Clear user data if verification fails
        }
     
    };

    verifyUserToken();
  }, [setUser]);

  return { user };
};
