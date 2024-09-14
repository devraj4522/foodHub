'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { z } from 'zod';
import { userAtom } from '@/recoil/atoms/userAtom';
import { toast } from 'sonner';
import { useState } from 'react';
import { FiClock, FiArrowLeft } from 'react-icons/fi';
import clsx from 'clsx';
import { FaUtensils, FaPhoneAlt, FaPaperPlane, FaLock, FaRedo } from 'react-icons/fa';

const LoginCard = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [otp, setOtp] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [canResendOTP, setCanResendOTP] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [showOTPScreen, setShowOTPScreen] = useState(false);


  // countdown for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!canResendOTP && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            setCanResendOTP(true);
            return 30; // Reset countdown to 30 seconds
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [canResendOTP, countdown]);

  // show OTP screen if OTP is sent
  useEffect(() => {
    if (otp) {
      setShowOTPScreen(true);
    }
      
  }, [otp, user.isLoggedIn]);

  // send OTP
  const onSubmit = async (data: any) => {
    try {
      // const response = await fetch('/api/login', { phone: data.phone });
      const response = {
        status: 200,
        data: {
          phone: "+91 9111111111",
        }
      }
      if (response.status === 200) {
        setOtp('1234');
        setShowOTPScreen(true);
      }
    } catch (error) {
      // pop up error
      toast.error('Login failed:' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleOTPVerification = async () => {
    try {
      // Implement your OTP verification logic here
      // For example:
      // await verifyOTP(user.phone, data.otp);
      // set user as logged in
      const data = {
        ...user,
        isLoggedIn: true
      }
      setUser({ ...data });
      toast.success('OTP verified successfully');
    } catch (error) {
      toast.error('OTP verification failed:' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleResendOTP = async () => {
    if (canResendOTP) {
      try {
        // Implement your OTP resend logic here
        // For example:
        // await resendOTP(user.phone);
        setOtp(Math.floor(1000 + Math.random() * 9000).toString());
        toast.success('OTP sent successfully');
        setCanResendOTP(false);
        setCountdown(30);
      } catch (error) {
        toast.error('Failed to resend OTP:' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  const handleBack = () => {
    setShowOTPScreen(false);
    setOtp('');
  };

  if (user.isLoggedIn) {
    return <></>;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {setIsOpen(false)}}
      closeButton
      isDismissable={false}
      className="max-w-sm mx-auto relative rounded-lg p-4 md:p-6"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center">
        {
          showOTPScreen && (
            <Button
              onClick={handleBack}
              size="sm"
              className="absolute top-2 left-2 bg-transparent p-0 rounded-full hover:bg-gray-100"
              isIconOnly
            >
              <FiArrowLeft size={20} className="text-gray-900" />
            </Button>
          )
        }
          <div className="text-2xl font-bold text-black mb-2">
            <FaUtensils className="inline-block mr-2" /> FoodKloud
          </div>
          <div className="text-lg text-default-500 text-center">
            {showOTPScreen ? 'Enter OTP' : 'Login or Signup to continue'}
          </div>
        </ModalHeader>
        <ModalBody>
          {!showOTPScreen ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhoneAlt className="text-gray-500" />
                </div>
                <Input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  type="text" 
                  placeholder="Phone Number"
                  className="pl-10 focus:border-green-500 outline-1 focus:border-2 focus:ring-green-500 outline-none"
                  classNames={{
                    input: "bg-transparent",
                    inputWrapper: "bg-default-100 hover:bg-default-200",
                  }}
                  onFocus={(e) => (e.target as HTMLInputElement).setSelectionRange(0, 0)}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
              <Button type="submit" color="primary" className="w-full bg-black hover:bg-gray-800 text-white">
                <FaPaperPlane className="mr-2" /> Send OTP
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between">
                {[...Array(4)].map((_, index) => (
                  <Input
                    key={index}
                    {...register(`otp${index}`, {
                      required: "OTP is required",
                      pattern: { value: /^[0-9]$/, message: "Please enter a valid digit" },
                    })}
                    type="text"
                    maxLength={1}
                    className="w-14 h-14 text-center text-2xl"
                    classNames={{
                      input: "text-center",
                      inputWrapper: "border-2 border-green-500 hover:border-green-600 focus:border-green-700",
                    }}
                    onKeyDown={(e) => {
                      if (e.key >= '0' && e.key <= '9') {
                        if (index < 3) {
                          setTimeout(() => {
                            document.getElementsByName(`otp${index + 1}`)[0].focus();
                          }, 0);
                        }
                      } else if (e.key === 'Backspace') {
                        if (index > 0 && e.currentTarget.value === '') {
                          setTimeout(() => {
                            document.getElementsByName(`otp${index - 1}`)[0].focus();
                          }, 0);
                        }
                      }
                    }}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message as string}</p>}
              <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={handleOTPVerification}>
                <FaLock className="mr-2" /> Verify OTP
              </Button>
              <div className="flex justify-between items-center">
                <Button
                  className={clsx(
                    'flex items-center',
                    canResendOTP ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  )}
                  onClick={handleResendOTP}
                  disabled={!canResendOTP}
                >
                  <FaRedo className="mr-2" /> Resend OTP
                </Button>
                {!canResendOTP && (
                  <div className="flex items-center text-gray-500">
                    <FiClock className="mr-2" />
                    <span>{countdown}s</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginCard;
