import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { useGetCart } from '@/hooks/cart/useGetCart';
import { userSavedAddressAtom } from '@/recoil/atoms/locationAtom';
import { useGeolocation } from "@/hooks/location/useGeolocation";
import { useState, useEffect } from "react";
import { userAtom } from "@/recoil/atoms/userAtom";

const Address = () => {
  const savedAddress = useRecoilValue(userSavedAddressAtom)
  const { address } = useGeolocation();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [allAddresses, setAllAddresses] = useState<string[]>([]);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const addresses = [savedAddress, address].filter(Boolean);
    setAllAddresses(addresses);
  }, [user, address, savedAddress]);

  return (
    <Card className="mb-4 shadow-md">
    <CardHeader className="flex gap-3 bg-black text-white">
      <FaMapMarkerAlt size={20} />
      <h2 className="text-lg font-semibold">Delivery Address</h2>
    </CardHeader>
    <CardBody>
      <Select 
        label="Select Address" 
        placeholder="Choose an address"
        selectedKeys={selectedAddress ? [selectedAddress] : []}
        onChange={(e) => setSelectedAddress(e.target.value)}
      >
        {allAddresses.length > 0 ? (
          allAddresses.map((item:any, index:any) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))
        ) : (
          <SelectItem key="no-addresses" value="">
            No saved addresses
          </SelectItem>
        )}
      </Select>
    </CardBody>
  </Card>
  );
};

export default Address;