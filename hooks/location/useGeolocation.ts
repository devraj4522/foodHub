"use client"
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { locationAtom, addressAtom } from '@/recoil/atoms/locationAtom';
import { fetchLocation } from '@/utils/location/fetchLocation';

export function useGeolocation() {
  const [coordinates, setCoordinates] = useRecoilState(locationAtom);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useRecoilState(addressAtom);
  
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCoordinates({ latitude, longitude });

      const storedAddress = localStorage.getItem('userAddress');
      if (storedAddress) {
        setAddress(storedAddress as string);
      } else {
        fetchLocation(latitude, longitude)
          .then(data => {
            setAddress(data?.display_name as string);
            localStorage.setItem('userAddress', data?.display_name as string);
          })
          .catch(error => setError('Unable to retrieve your location'));
      }
    };

    const handleError = () => {
      setError('Unable to retrieve your location');
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { coordinates, error, address };
}
