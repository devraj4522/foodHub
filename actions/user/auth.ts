export const generateOTP = async (email: string) => {
  try {
    const response = await fetch('/api/user/login/generateOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate OTP');
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await fetch('/api/user/login/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to verify OTP');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await fetch('/api/user/login/verifytoken', {
      method: 'GET',
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to verify token');
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};


export const logout = async () => {
  try {
    const response = await fetch('/api/user/login/logout', {
      method: 'GET',
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to logout');
    }
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
