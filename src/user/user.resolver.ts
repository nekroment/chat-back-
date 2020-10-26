import { UserLogin } from './../schema/userSchema/userLogin.input';
import { UserInput } from '../schema/userSchema/user.input';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from 'src/schema/userSchema/user.model';
import { GraphQLError } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver()
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}


  @Query(() => User)
  async signIn(@Args('user') user: UserLogin) {
      try {
          const isUser =  await this.userService.signIn(user);
          return isUser
      } catch(error) {
        return new GraphQLError('Wrong password or email');
      }
  }

     @Mutation(() => User)
     async registration(@Args('user') user: UserInput) {
         try {
          console.log('test')
             return await this.userService.registration(user);
         } catch (error) {
             return new GraphQLError('Something wrong');
         }
     }


}