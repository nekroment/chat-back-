import { Conversation } from './../../schema/conversationSchema/conversation.model';
import { ConversationService } from './conversation.service';
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { AuthGuard } from "src/guards/auth.guard";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver(of => Conversation)
@UseGuards(AuthGuard)
export class ConversationResolver {
    constructor (
        private conversationService: ConversationService
    ) {}

    @Mutation(() => Conversation)
    async createConversation(@Args('name') name: string) {
        const newConv = await this.conversationService.createConversation(name);
        pubSub.publish('conversationAdded', {conversationAdded: newConv});
        return newConv;
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