'use client'
import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Initialize Firebase (make sure to replace with your config)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
initializeApp(firebaseConfig);

export default function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const auth = getAuth();

  const handleSendOTP = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setMessage('OTP sent successfully');
    } catch (error) {
      setMessage('Error sending OTP: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationId, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Verification successful');
      } else {
        setMessage('Verification failed: ' + data.error);
      }
    } catch (error) {
      setMessage('Error verifying OTP: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleSendOTP}>Send OTP</button>
      {verificationId && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}