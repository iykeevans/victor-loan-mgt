import { findUserByEmail, findUserById, isSessionValid, saveUser } from '../repositories/userRepository';
import { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';

import * as userRepo from '../repositories/userRepository';
import crypto from 'crypto';
import * as emailService from './emailService';

export const checkSessionValidity = async (userID: string): Promise<boolean> => {
  return await isSessionValid(userID);
};

export const authenticateUser = async (email: string, password: string): Promise<IUser | null> => {
  const user = await findUserByEmail(email);

  if (user && await bcrypt.compare(password, user.password)) {
    // Password matched
    return user;
  }
  return null;
};

export const reauthorizeUser = async (userID: string): Promise<IUser | null> => {
  const user = await findUserById(userID);
  if (user) {
    // Reset session expiry if valid user
    user.sessionExpiresAt = new Date(Date.now() + 3600000); // 1 hour from now
    await saveUser(user);
    return user;
  }
  return null;
};



export const saveUserChanges = async (user: IUser): Promise<IUser | null> => {
   
    if (user) {
    
      await saveUser(user);
      return user;
    }
    return null;
  };

// Register a user and send OTP
export const registerUser = async (email: string, password: string, userID: string): Promise<IUser> => {
    
    
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  
    // Create the user and save to DB
    const userData = {
      email,
      password,
      userID,
      sessionExpiresAt: new Date(Date.now() + 3600000), // 1 hour session
      otp,
      otpExpiresAt,
      isVerified: false,
    };
    
    const newUser = await userRepo.registerUser(userData);
  
    // Send OTP to user email
    await emailService.sendOTPEmail(newUser.email, otp);
  
    return newUser;
  };
  
  // Verify OTP
  export const verifyOTP = async (userID: string, otp: string): Promise<IUser | null> => {
    return await userRepo.verifyOTP(userID, otp);
  };
  
