import User, { IUser } from '../models/userModel';


// Register a new user
export const registerUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
  };
  
  // Find user by email
  export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email }).exec();
  };
  
  // Find user by user ID
  export const findUserById = async (userID: string): Promise<IUser | null> => {
    return User.findOne({ userID }).exec();
  };
  
  // Update OTP for user
  export const updateOTP = async (userID: string, otp: string, otpExpiresAt: Date): Promise<IUser | null> => {
    return User.findOneAndUpdate({ userID }, { otp, otpExpiresAt }, { new: true }).exec();
  };
  
  // Verify OTP
  export const verifyOTP = async (userID: string, otp: string): Promise<IUser | null> => {
    const user = await User.findOne({ userID }).exec();
    if (user && user.otp === otp && user.otpExpiresAt > new Date()) {
      user.isVerified = true;
      user.otp = '';
      user.otpExpiresAt = new Date();
      await user.save();
      return user;
    }
    return null;
  };
  

// Save a user document to DB
export const saveUser = async (user: IUser): Promise<IUser> => {
  return user.save();
};

// Check session validity
export const isSessionValid = async (userID: string): Promise<boolean> => {
  const user = await User.findOne({ userID }).exec();
  if (user) {
    const currentTime = Date.now();
    return user.sessionExpiresAt.getTime() > currentTime;
  }
  return false;
};
