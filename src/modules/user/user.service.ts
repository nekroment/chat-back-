import { User } from './../../schema/userSchema/user.model';
import { UserInfo } from './../../schema/userSchema/user.info';
import { UserEntity } from './../../entity/user.entity';
import { JwtDto } from '../../schema/dto/jwt.payload';
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
    const isUser = await this.userRepository.findOne({ email, login })
    if (isUser) {
      return new GraphQLError('User with this email or login exist!');
    }

    const hashedPassword = await bcrypt.hash(password, 0);
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.login = login;
    newUser.password = hashedPassword;
    await newUser.save();
    const userInfo: UserInfo = new UserInfo();
    userInfo.user = newUser;
    return userInfo;
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ id });
  }

  async validateToken(token: string){
    const isAuth = await jwt.decode(token);
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
    const userInfo: UserInfo = new UserInfo();
    userInfo.user = signUser;
    return userInfo;
  }

  async getAccessToken(id: number) {

    return await jwt.sign({ _id: id },  process.env.TOKEN_SECRET);

  }

}
