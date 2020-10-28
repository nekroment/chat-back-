import { User } from './../../schema/userSchema/user.model';
import { UserEntity } from './../../entity/user.entity';
import { Message } from './../../schema/messageSchema/messages.model';
import { MessagesService } from './messages.service';
import { Resolver, Query, Mutation, Context, Args, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { PubSub, } from "graphql-subscriptions";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const pubSub = new PubSub();


@Resolver(of => Message)
@UseGuards(AuthGuard)
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService
  ) { }

  @Mutation(() => Message)
  async createMessage(@Args('description') description: string, @Context() context) {

    const user: UserEntity = context.req['user'];
    const newMessage = await this.messagesService.createMessage(description, user.id);
    pubSub.publish('messageAdded', { messageAdded: [newMessage] });
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

  @Subscription(() => [Message], {
    filter: async (payload, variables) => {
      if (payload.messageAdded.length > 1) {
        console.log(payload.date !== variables.date)
        if (payload.date !== variables.date) {
          return false;
        }
      }
      return true;
    },
  })
  messageAdded(@Args('date') date: Date) {
    let s = pubSub.asyncIterator('messageAdded');
    setTimeout(async () => {
      const missingMessages = await this.messagesService.missingMessages(date);
      if (missingMessages.length > 0) {
        pubSub.publish('messageAdded', { messageAdded: missingMessages, date: date });
      }
    })
    return s;
  }

  @ResolveField(() => User)
  async user(
    @Parent() message: Message
  ) {
    return await this.messagesService.findUser(message.userId);
  }

}