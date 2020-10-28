import { User } from './../../schema/userSchema/user.model';
import { UserInfo } from './../../schema/userSchema/user.info';
import { UserEntity } from './../../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }

  async registration(login: string, email: string, password: string) {

    function getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const isUser = await this.userRepository.findOne({ email })
    if (isUser) {
      return new GraphQLError('User with this email or login exist!');
    }
    const isLoginExist = await this.userRepository.findOne({ login })
    if (isLoginExist) {
      return new GraphQLError('User with this email or login exist!');
    }
    const colorBack = getRandomColor();
    const colorText = getRandomColor();
    const isAvatar = `https://via.placeholder.com/150/${colorBack}/${colorText}?text=${login[0]}`
    const hashedPassword = await bcrypt.hash(password, 0);
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.login = login;
    newUser.password = hashedPassword;
    newUser.avatar = isAvatar;
    await newUser.save();
    const userInfo: UserInfo = new UserInfo();
    userInfo.user = newUser;
    return userInfo;
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ id });
  }

  async validateToken(token: string) {
    const isAuth = await jwt.verify(token, process.env.TOKEN_SECRET);
    return isAuth
  }

  async signIn(email: string, password: string) {
    const isUser = await this.userRepository.findOne({ email: email });
    if (!isUser) {
      return new GraphQLError('Uncorrect password or email!');
    }
    const isTruePassword = await bcrypt.compare(password, isUser.password);
    if (!isTruePassword) {
      return new GraphQLError('Uncorrect password or email!');
    }
    const signUser: User = new User();
    signUser.id = isUser.id;
    signUser.login = isUser.login;
    signUser.email = isUser.email;
    signUser.avatar = isUser.avatar;
    const userInfo: UserInfo = new UserInfo();
    userInfo.user = signUser;
    return userInfo;
  }

  async getAccessToken(id: number) {

    return await jwt.sign({ _id: id, exp: Math.floor(Date.now() / 1000) + Number(process.env.TOKEN_VALIDITY) }, process.env.TOKEN_SECRET);

  }

}
