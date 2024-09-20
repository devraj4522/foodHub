"use client";
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaLanguage, FaCity, FaMapPin } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import * as z from "zod";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { getUserById } from '@/server/controllers/userController'

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "PIN code must be 6 digits"),
  language: z.string(),
});

type FormData = z.infer<typeof schema>;

const UserAccountSettingsPage: React.FC = async () => {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.name) {
    redirect("/login");
  }


  const userData = await getUserById(session.user.name);
  if (!userData || !userData.name || !userData.email || !userData.phone || !userData.address || !userData.city || !userData.state || !userData.pinCode) {
    return <div>Loading...</div>;
  }

  const [formData, setFormData] = useState<FormData>({
    fullName: userData.name,
    email: userData.email,
    phoneNumber: userData.phone,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    pinCode: userData.pinCode,
    language: "English"
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string[]>>>({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isVerifyPasswordModalOpen, setIsVerifyPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleChange = (name: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      schema.parse(formData);
      setIsVerifyPasswordModalOpen(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Partial<Record<keyof FormData, string[]>>);
      }
    }
  };

  const handlePasswordChange = () => {
    // Implement password change logic here
    console.log("Password changed");
    setIsPasswordModalOpen(false);
  };

  const handleVerifyPassword = () => {
    // Implement password verification logic here
    console.log("Password verified");
    console.log(formData);
    setIsVerifyPasswordModalOpen(false);
    // Handle form submission
  };

  const indianLanguages = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-lime-600">Account Settings</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-lime-300">
        <div className="p-6 bg-lime-50">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center text-3xl text-white">
              <FaUser />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-green-800">{formData.fullName}</h2>
              <p className="text-lime-600">{formData.email}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">Personal Information</h3>
            <div className="space-y-4">
              <Input
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="John Doe"
                startContent={<FaUser className="text-lime-500" />}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.[0]}
                size="lg"
                className="w-full"
              />
              <Input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john.doe@example.com"
                startContent={<FaEnvelope className="text-lime-500" />}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.[0]}
                size="lg"
                className="w-full"
              />
              <div className="relative">
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  placeholder="9876543210"
                  startContent={
                    <>
                      <FaPhone className="mr-2 text-lime-500" />
                      <span className="text-green-600">+91</span>
                    </>
                  }
                  maxLength={10}
                  isInvalid={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.[0]}
                  size="lg"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">Address</h3>
            <div className="space-y-4">
              <Input
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="123 Main St"
                startContent={<FaMapMarkerAlt className="text-lime-500" />}
                isInvalid={!!errors.address}
                errorMessage={errors.address?.[0]}
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
                  errorMessage={errors.city?.[0]}
                  size="lg"
                  className="w-full"
                />
                <Input
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="State"
                  startContent={<FaMapMarkerAlt className="text-lime-500" />}
                  isInvalid={!!errors.state}
                  errorMessage={errors.state?.[0]}
                  size="lg"
                  className="w-full"
                />
                <Input
                  value={formData.pinCode}
                  onChange={(e) => handleChange("pinCode", e.target.value)}
                  placeholder="PIN Code"
                  startContent={<FaMapPin className="text-lime-500" />}
                  isInvalid={!!errors.pinCode}
                  errorMessage={errors.pinCode?.[0]}
                  size="lg"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">Password</h3>
            <Button
              variant="light"
              startContent={<FaLock className="text-lime-500" />}
              className="w-full justify-start text-left text-green-600 hover:bg-lime-100"
              onPress={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </div>

          {/* <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">Notifications</h3>
            <div className="space-y-2">
              <Switch 
                isSelected={formData.emailNotifications}
                onValueChange={(value) => handleChange("emailNotifications", value)}
                className="text-green-600"
              >
                Email Notifications
              </Switch>
              <Switch 
                isSelected={formData.smsNotifications}
                onValueChange={(value) => handleChange("smsNotifications", value)}
                className="text-green-600"
              >
                SMS Notifications
              </Switch>
              <Switch 
                isSelected={formData.pushNotifications}
                onValueChange={(value) => handleChange("pushNotifications", value)}
                className="text-green-600"
              >
                Push Notifications
              </Switch>
            </div>
          </div> */}

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-700">Language</h3>
            <Select
              value={formData.language}
              onChange={(e:any) => handleChange("language", e.target.value)}
              startContent={<FaLanguage className="text-lime-500" />}
              placeholder="Select a language"
              size="lg"
              className="w-full"
            >
              {indianLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </Select>
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

      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="text-green-700">Change Password</ModalHeader>
          <ModalBody>
            <Input
              type="password"
              label="Current Password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button color="success" onPress={handlePasswordChange}>
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isVerifyPasswordModalOpen} onClose={() => setIsVerifyPasswordModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="text-green-700">Verify Password</ModalHeader>
          <ModalBody>
            <Input
              type="password"
              label="Current Password"
              placeholder="Enter your current password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsVerifyPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button color="success" onPress={handleVerifyPassword}>
              Verify and Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserAccountSettingsPage;