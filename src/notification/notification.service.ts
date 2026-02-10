import { Injectable } from '@nestjs/common';
import { authservice } from 'src/auth/auth.service';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class NotificationService {
  async send(token: string, title: string, body: string) {
    return firebaseAdmin.messaging().send({
      token,
      notification: { title, body },
    });
  }
}
