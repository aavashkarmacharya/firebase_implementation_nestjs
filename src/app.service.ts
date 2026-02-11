import { Injectable } from '@nestjs/common';
import { user } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { registeruserdto } from './registeruser.dto';
import * as firebaseAdmin from 'firebase-admin';
import { register } from 'module';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(user)
    private readonly UserRepo: Repository<user>,
  ) {}
  async finduserbyemail(dtoemail: string): Promise<user[]> {
    return await this.UserRepo.find({
      where: { email: dtoemail },
    });
  }
  async registeruser(registeruserdto: registeruserdto) {
    const user = await firebaseAdmin.auth().createUser({
      displayName: registeruserdto.name,
      email: registeruserdto.email,
      password: registeruserdto.password,
    });
    const newuser = this.UserRepo.create({
      name: registeruserdto.name,
      password: registeruserdto.password,
      email: registeruserdto.email,
      fcmToken: registeruserdto.fcmtoken,
    });
    await this.UserRepo.save(newuser);
    if (registeruserdto.fcmtoken) {
      await firebaseAdmin.messaging().send({
        token: registeruserdto.fcmtoken,
        notification: {
          title: 'User registration',
          body: 'user sucessfully registered!',
        },
      });
    }
    return user;
  }

  async showalluser(): Promise<user[]> {
    return await this.UserRepo.find();
  }
}
