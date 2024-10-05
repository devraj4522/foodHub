"use client";
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaLanguage, FaCity, FaMapPin } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import * as z from "zod";
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atoms/userAtom';
import { updateUserDetails } from '@/actions/user/userDetails';
import { Loading } from './_components/Loading';
import { userSavedAddressAtom } from "@/recoil/atoms/locationAtom"
import { toast } from 'sonner';
import { ZodError } from 'zod';

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "PIN code must be 6 digits"),
});

type FormData = z.infer<typeof schema>;

const UserAccountSettingsPage: React.FC = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [ savedAddress, setSavedAddress] = useRecoilState(userSavedAddressAtom)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  useEffect(() => {
    setFormData({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? savedAddress,
      city: user?.city ?? "",
      state: user?.state ?? "",
      pinCode: user?.pinCode ?? "",
    })
  }, [user, savedAddress])

  const handleChange = (name: keyof FormData, value: string | boolean) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    
    try {
      schema.parse(updatedFormData);
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(prev => ({
          ...prev,
          [name]: fieldErrors[name]?.[0] || undefined
        }));
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const s = schema.parse(formData);
      const id = user?.id
      if (id === null || id === undefined ) throw Error("User Must have id.")
      const result = await updateUserDetails({...s, id, address: s.address})

      if (result && typeof result === 'object') 
      {
        setUser({...user, ...result})
        setSavedAddress(result.address)
        toast.success("Details Saved!")
      }
      else {
        toast.error(result.error)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please correct the errors in the form")
      } else {
        toast.error("An unexpected error occurred")
      }
    }
    finally{
      setIsLoading(false)
    }
  };


  return (
   isLoading ? <Loading/> : (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
    <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-800">Account Settings</h1>
    
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6 bg-lime-50 border border-b border-gray-200 shadow-inner">
        <div className="flex items-center">
          <div className="md:w-20 md:h-20 w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center text-3xl text-white">
            <FaUser />
          </div>
          <div className="ml-6">
            <h2 className="text-xl md:text-2xl font-semibold text-green-800">{formData.name}</h2>
            <p className="text-sm md:text-base text-lime-600">{formData.email}</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-green-700">Personal Information</h3>
          <div className="space-y-4">
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Name"
              startContent={<FaUser className="text-lime-500" />}
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              size="lg"
              className="w-full"
            />
            <Input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email"
              startContent={<FaEnvelope className="text-lime-500" />}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              size="lg"
              readOnly
              className="w-full"
            />
            <div className="relative">
              <Input
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone"
                required={true}
                startContent={
                  <>
                    <FaPhone className="mr-2 text-lime-500" />
                    <span className="text-green-600">+91</span>
                  </>
                }
                maxLength={10}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone}
                size="lg"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-green-700">Address</h3>
          <div className="space-y-4">
            <Input
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Address"
              startContent={<FaMapMarkerAlt className="text-lime-500" />}
              isInvalid={!!errors.address}
              errorMessage={errors.address}
              size="lg"
              className="w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
                startContent={<FaCity className="text-lime-500" />}
                isInvalid={!!errors.city}
                errorMessage={errors.city}
                size="lg"
                className="w-full"
              />
              <Input
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="State"
                startContent={<FaMapMarkerAlt className="text-lime-500" />}
                isInvalid={!!errors.state}
                errorMessage={errors.state}
                size="lg"
                className="w-full"
              />
              <Input
                value={formData.pinCode}
                onChange={(e) => handleChange("pinCode", e.target.value)}
                placeholder="PIN Code"
                startContent={<FaMapPin className="text-lime-500" />}
                isInvalid={!!errors.pinCode}
                errorMessage={errors.pinCode}
                size="lg"
                className="w-full"
              />
            </div>
          </div>
        </div>

       
        <div className="pt-4">
          <Button
            type="submit"
            color="success"
            className="w-full bg-lime-500 text-white hover:bg-lime-600"
            size="lg"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>

  </div>
   )
  );
};

export default UserAccountSettingsPage;