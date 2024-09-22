import { useState, useEffect } from 'react';

export const useCountDownResendOtp = (initialCountdown: number = 30) => {
  const [canResendOTP, setCanResendOTP] = useState(true);
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!canResendOTP && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            setCanResendOTP(true);
            return initialCountdown; // Reset countdown to initial value
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [canResendOTP, countdown, initialCountdown]);

  const resetCountdown = () => {
    setCanResendOTP(false);
    setCountdown(initialCountdown);
  };

  return { canResendOTP, countdown, resetCountdown };
};
