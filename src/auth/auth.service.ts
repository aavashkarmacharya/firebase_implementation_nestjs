import { Injectable } from '@nestjs/common';
import { login, logindata } from './auth.dto';
import axios from 'axios';
import * as firebaseAdmin from 'firebase-admin';
import { dot } from 'node:test/reporters';

@Injectable()
export class authservice {
  async login(logindto: login): Promise<{
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    fcmToken?: string;
  }> {
    const email = logindto.email;
    const password = logindto.password;
    const { idToken, refreshToken, expiresIn } =
      await this.SignInwithEmailandpassword(email, password);
    if (logindto.fcmToken) {
      try {
        await firebaseAdmin.messaging().send({
          token: logindto.fcmToken,
          notification: {
            title: 'Login Successful 🔐',
            body: `You logged in successfully as ${email}`,
          },
        });
        console.log('Login notification sent!');
      } catch (err) {
        console.error('Error sending login notification:', err);
      }
    }
    return {
      idToken,
      refreshToken,
      expiresIn,
      fcmToken: logindto.fcmToken,
    };
  }

  async SignInwithEmailandpassword(
    email: string,
    password: string,
  ): Promise<{
    idToken: string;
    refreshToken: string;
    expiresIn: string;
  }> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXq2xOTtTswEcedIMmSwzauNhNMBHLHqo`;

    return await this.sendPostRequest(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }
  async sendPostRequest(
    url: string,
    logindata: logindata,
  ): Promise<{
    idToken: string;
    refreshToken: string;
    expiresIn: string;
  }> {
    const response = await axios.post(url, logindata, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }
  async validaterequest(req: any): Promise<boolean> {
    const authheader = req.headers['authorization'];
    if (!authheader) {
      return false;
    }
    const [bearer, token] = authheader.split(' ');
    if (bearer !== 'Bearer') {
      console.log('invalid input make sure bearer is Bearer!!');
      return false;
    }
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    console.log(`DecodedToken = ${decodedToken}`);
    return true;
  }
}
