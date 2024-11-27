import { Request, Response } from 'express';
import * as authService from '../services/authService';
import jwt from 'jsonwebtoken'
import delay from 'delay';

export const checkSession = async (req: Request, res: Response):Promise<any> => {
  await delay(500); // Simulate network delay
  const { userID } = req.query as { userID: string };
  
  if (!userID) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const sessionValid = await authService.checkSessionValidity(userID);
  if (sessionValid) {
    const user = await authService.reauthorizeUser(userID);
    res.json({ loggedIn: true, userId: user?.userID });
  } else {
    res.json({ loggedIn: false });
  }
};

export const authenticateUser = async (req: Request, res: Response):Promise<any> => {
  const { redirect_uri, state, response_type = "code", email, pass, reAuthorizeTry = false } = req.query as any;
  await delay(500); // Simulate network delay

  const user = await authService.authenticateUser(email, pass);
  if (user && !reAuthorizeTry) {
    // Reset session expiry
    user.sessionExpiresAt = new Date(Date.now() + 3600000); // 1 hour from now
    await authService.saveUserChanges(user);

    if (response_type === 'code') {
      res.redirect(`${redirect_uri}?code=SOME_CODE&state=${state}`);
    } else {
      res.redirect(`${redirect_uri}?access_token=${user.accessToken}&token_type=Bearer&expires_in=3600&state=${state}`);
    }
  } else if (reAuthorizeTry) {
    if (response_type === 'code') {
      res.redirect(`${redirect_uri}?code=SOME_CODE&state=${state}`);
    } else {
      res.redirect(`${redirect_uri}?access_token=SOME_ACCESS_TOKEN&token_type=Bearer&expires_in=3600&state=${state}`);
    }
  } else {
    res.status(400).json({ error: "You are not provisioned to use this service" });
  }
};

export const getAuthorizerToken = async (req: Request, res: Response):Promise<any> => {
  const { code, email, pass, reAuthorizeTry = false } = req.query as any;

  await delay(1000); // Simulate network delay
  const user = await authService.authenticateUser(email, pass);

  if (user && !reAuthorizeTry) { 
    const token = jwt.sign({ 
      userId: user.id,
      ...user
       },
        'your_jwt_secret',
    { expiresIn: '1h' });


    const sessionValid = await authService.checkSessionValidity(user.userID);
    if (sessionValid) {
      res.json({
        code,
        access_token: user.accessToken,
        expires_in: 3600,
        refresh_token: user.refreshToken,
        scope: user.scope,
        token_type: "Bearer",
        identifierToken: token 
      });
    } else {
      res.status(400).json({ error: "Your session expired" });
    }
  } else if (reAuthorizeTry) {
    res.json({
      code,
      access_token: "SOME_ACCESS_TOKEN",
      expires_in: 3600,
      refresh_token: "SOME_REFRESH_TOKEN",
      scope: "SOME_SCOPE",
      token_type: "Bearer"
    });
  } else {
    res.status(400).json({ error: "You are not provisioned to use this service" });
  }
};




export const register = async (req: Request, res: Response):Promise<any> => {
  const { email, password, userID } = req.body;

  if (!email || !password || !userID) {
    return res.status(400).json({ error: 'Email, password, and userID are required' });
  }

  try {
    const newUser = await authService.registerUser(email, password, userID);
    res.status(201).json({ message: 'Registration successful. Please check your email for OTP verification.' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

export const verifyOTP = async (req: Request, res: Response):Promise<any> => {
  const { userID, otp } = req.query as { userID: string, otp: string };

  if (!userID || !otp) {
    return res.status(400).json({ error: 'userID and OTP are required' });
  }

  try {
    const user = await authService.verifyOTP(userID, otp);
    if (user) {
      res.json({ message: 'Email verified successfully. Your account is now active.' });
    } else {
      res.status(400).json({ error: 'Invalid OTP or OTP has expired' });
    }
  } catch (error) {
    res.status(500).json({ error: 'OTP verification failed. Please try again.' });
  }
};