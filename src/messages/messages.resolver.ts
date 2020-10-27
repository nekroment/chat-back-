import { UserInfo } from './../schema/userSchema/user.info';
import { UserDto } from './../schema/dto/user.dto';
import { User } from 'src/schema/userSchema/user.model';
import { MessageInput } from '../schema/messageSchema/messages.input';
import { Message } from '../schema/messageSchema/messages.model';
import { UserEntity } from '../entity/user.entity';
import { MessagesService } from './messages.service';
import { Resolver, Query, Mutation, Context, GqlExecutionContext, Args, ResolveField, Parent, Subscription  } from "@nestjs/graphql";
import { Body, Req, UseGuards, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { measureMemory } from 'vm';
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();


@Resolver(of => Message)
@UseGuards(AuthGuard)
export class MessagesResolver {
    constructor (
        private messagesService: MessagesService
    ) {}

    @Mutation(() => Message)
  async createMessage(@Args('message') message: MessageInput, @Context() context) {

    const user: UserEntity = context.req['user'];
    const newMessage = await this.messagesService.createMessage(message, user.id);
    pubSub.publish('messageAdded', {messageAdded: newMessage});
    return newMessage;
  }

  @Query(() => [Message])
  async getAllMessages() {
      return await this.messagesService.findAll();
  }

  @Query(() => [Message])
  async moreMesssages(@Args('skip') skip: number, @Args('take') take: number) {
    return await this.messagesService.moreMessages(skip, take);
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => UserInfo)
  async user(
    @Parent() message: Message
  ) {
    return await this.messagesService.findUser(message.userId);
  }
  
}