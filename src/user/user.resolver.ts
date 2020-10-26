import { Token } from './../schema/userSchema/token.model';
import { UserLogin } from './../schema/userSchema/userLogin.input';
import { UserInput } from '../schema/userSchema/user.input';
import { UserService } from './user.service';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from 'src/schema/userSchema/user.model';
import { GraphQLError } from 'graphql';

@Resolver(of => User)
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

             return await this.userService.registration(user);
         } catch (error) {
             return new GraphQLError('Something wrong');
         }
     }

     @ResolveField(() => Token)
     async token(
       @Parent() user: User,
     ) {

      try {
         const token = await this.userService.getAccessToken(user.id);

         return token;
      } catch (error) {
         console.log(error);
      }
       
     }


}