import { User } from './../../schema/userSchema/user.model';
import { UserEntity } from './../../entity/user.entity';
import { Message } from './../../schema/messageSchema/messages.model';
import { MessagesService } from './messages.service';
import { Resolver, Query, Mutation, Context, Args, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { PubSub } from "graphql-subscriptions";
import { Loader } from 'nestjs-graphql-dataloader';
import DataLoader from 'dataloader'
import { Typing } from 'src/schema/messageSchema/typing.model';

const pubSub = new PubSub();

const isType: Array<Typing> = [];

function isUserTyping() {
  const time = setInterval(() => {
    for (let i = 0; i < isType.length; i++) {
      const userTyping = Number(new Date()) - Number(isType[i].date);
      if (userTyping >= 2000) {
        isType.splice(i, 1);
        pubSub.publish('isTyping', { isTyping: isType });
        i--;
      }
    }
    if (isType.length === 0) {
      clearInterval(time);
    }
  }, 2000)
}

@Resolver(of => Message)
@UseGuards(AuthGuard)
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService
  ) { }

  @Mutation(() => Message)
  async createMessage(
    @Args('description') description: string,
    @Args('convId') convId: number,
    @Context() context
  ) {

    const user: UserEntity = context.req['user'];
    const newMessage = await this.messagesService.createMessage(description, user.id, convId);
    pubSub.publish('messageAdded', { messageAdded: [newMessage] });
    return newMessage;
  }

  @Query(() => [Message])
  async getAllMessages(@Args("convId", { nullable: true }) convId: number) {
    return await this.messagesService.findAll(convId);
  }

  @Query(() => [Message])
  async moreMesssages(@Args('skip') skip: number, @Args('take') take: number, @Args('convId', { nullable: true }) convId: number) {
    return await this.messagesService.moreMessages(skip, take, convId);
  }

  @Query(() => [Typing])
  async typingUser(
    @Args('userId') userId: number,
    @Args('convId') convId: number
  ) {
    let isExist = false;
    let nobodyTyping = null;
    for (let i = 0; i < isType.length; i++) {
      if (isType[i].userId === userId && isType[i].convId === convId) {
        isType[i].date = new Date();
        isExist = true;
        break;
      }
    }
    if(!isExist) {
      const userTyping = {
        userId,
        convId,
        date: new Date()
      }
      isType.push(userTyping);
      nobodyTyping = isType.length;
    }
    pubSub.publish('isTyping', { isTyping: isType });
    if (nobodyTyping === 1) {
      isUserTyping();
    }
    return isType;

  }

  @Subscription(() => [Typing], {
    filter: async (payload, veriables) => {
      return true;
    },
    resolve: async (payload, variables) => {
      return payload.isTyping;
    }
  })
  async isTyping(@Args('convId') convId: number) {
    return pubSub.asyncIterator('isTyping');
  }

  @Subscription(() => [Message], {
    filter: async (payload, variables) => {
      if (payload.messageAdded.length > 1) {
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
    @Parent() message: Message,
    @Loader(MessagesService) messagesService: DataLoader<User["id"], User>
  ) {
    const neededUser = await messagesService.load(message.userId);
    return neededUser;
  }

}