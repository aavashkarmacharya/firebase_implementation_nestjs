import { Injectable } from '@nestjs/common';
import { login, logindata } from './auth.dto';
import { ref } from 'process';
import { ApiExpectationFailedResponse } from '@nestjs/swagger';
import axios from 'axios';

@Injectable()
export class authservice {
  async login(logindto: login) {
    const email = logindto.email;
    const password = logindto.password;
    const { idToken, refreshToken, expiresIn } =
      await this.SignInwithEmailandpassword(email, password);
    return {
      idToken,
      refreshToken,
      expiresIn,
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
}
