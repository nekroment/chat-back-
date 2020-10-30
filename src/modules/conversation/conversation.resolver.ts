import { UserEntity } from './../../entity/user.entity';
import { Conversation } from './../../schema/conversationSchema/conversation.model';
import { ConversationService } from './conversation.service';
import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { AuthGuard } from "src/guards/auth.guard";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver(of => Conversation)
@UseGuards(AuthGuard)
export class ConversationResolver {
    constructor(
        private conversationService: ConversationService
    ) { }

    @Mutation(() => Conversation)
    async createConversation(
        @Args('name') name: string,
        @Context() context
    ) {
        const user: UserEntity = context.req['user'];
        const newConv = await this.conversationService.createConversation(name, user.id);
        pubSub.publish('conversationAdded', { conversationAdded: newConv });
        return newConv;
    }

    @Mutation(() => Conversation)
    async deleteConversation(
        @Args('convId') convId: number,
        @Context() context
    ) {
        const user: UserEntity = context.req['user'];
        return await this.conversationService.deleteConversation(user.id, convId);
    }

    @Query(() => [Conversation])
    async getAllConversations() {
        return await this.conversationService.getAllConversation();
    }

    @Subscription(() => Conversation)
    conversationAdded() {
        return pubSub.asyncIterator('conversationAdded');
    }
}