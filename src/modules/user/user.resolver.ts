import { User } from 'src/schema/userSchema/user.model';
import { UserInfo } from './../../schema/userSchema/user.info';
import { UserService } from './user.service';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GraphQLError } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Resolver(of => UserInfo)
export class UserResolver {
  constructor(
    private userService: UserService
  ) { }


  @Query(() => UserInfo)
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    try {
      const isUser = await this.userService.signIn(email, password);
      return isUser
    } catch (error) {
      return new GraphQLError('Wrong password or email');
    }
  }

  @Query(() => [User])
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Mutation(() => UserInfo)
  async registration(
    @Args('login') login: string,
    @Args('password') password: string,
    @Args('email') email: string
  ) {
    try {
      return await this.userService.registration(login, email, password);
    } catch (error) {
      return new GraphQLError('Something wrong');
    }
  }

  @ResolveField(() => String)
  async token(
    @Parent() userInfo: UserInfo,
  ) {
    try {
      const token = await this.userService.getAccessToken(userInfo.user.id);
      return token;
    } catch (error) {
      console.log(error);
    }
  }
}