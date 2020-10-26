import { JwtDto } from './../schema/dto/jwt.payload';
import { User } from './../schema/userSchema/user.model';
import { UserLogin } from './../schema/userSchema/userLogin.input';
import { UserInput } from './../schema/userSchema/user.input';
import { UserDto } from './../schema/dto/user.dto';
import { UserEntity } from './../entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import jwt_decode from "jwt-decode";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private commentRepository: Repository<UserEntity>
  ) {}

  async registration(user: UserInput) {
      const isUser = await this.commentRepository.findOne({email: user.email, login: user.login})
      if(isUser) {
        return new GraphQLError('User with this email or login exist!');
      }
      //const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, 0);

      const newUser = new UserEntity();
      newUser.email = user.email;
      newUser.login = user.login;
      newUser.password = hashedPassword;
      return await newUser.save();
  }

  async findById (id: number) {
    return await this.commentRepository.find({id: id});
  }

  async validateToken(token: string): Promise<JwtDto> {
    const isAuth = await jwt_decode(token);
    console.log(isAuth)
    return isAuth
  }

  async signIn(user: UserLogin) {
      const isUser = await this.commentRepository.findOne({email: user.email});
      if(!isUser) {
        return new GraphQLError('Uncorrect password or email!');
      }

      const isTruePassword = await bcrypt.compare(user.password, isUser.password);
      if (!isTruePassword) {
        return new GraphQLError('Uncorrect password or email!');
      }

      const signUser: User = new User();
      signUser.id = isUser.id;
      signUser.token = await this.getAccessToken(isUser.id);

      return signUser;
  }

  async getAccessToken(id: number) {
      return await jwt.sign({_id: id}, process.env.TOKEN_SECRET || 'secret');
  }

}
