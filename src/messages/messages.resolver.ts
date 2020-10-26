import { User } from 'src/schema/userSchema/user.model';
import { MessageInput } from './../schema/messageSchema/messages.input';
import { Message } from './../schema/messageSchema/messages.model';
import { UserEntity } from './../entity/user.entity';
import { MessagesService } from './messages.service';
import { Resolver, Query, Mutation, Context, GqlExecutionContext, Args, ResolveField, Parent  } from "@nestjs/graphql";
import { Body, Req, UseGuards, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { measureMemory } from 'vm';


@Resolver(of => Message)
@UseGuards(AuthGuard)
export class MessagesResolver {
    constructor (
        private messagesService: MessagesService
    ) {}

    @Mutation(() => Message)
  async createMessage(@Args('message') message: MessageInput, @Context() context) {

    const user: UserEntity = context.req['user'];
      return await this.messagesService.createMessage(message, user.id);
  }

  @Query(() => [Message])
  async getAllMessages() {
      return await this.messagesService.findAll();
  }

  @ResolveField(() => User)
  async user(
    @Parent() message: Message
  ) {
    return await this.messagesService.findUser(message.userId);
  }
  
}