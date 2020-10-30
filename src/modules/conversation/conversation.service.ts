import { ConversationEntity } from './../../entity/conversation.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';


@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(ConversationEntity)
        private conversationRepository: Repository<ConversationEntity>
    ) {}

    async createConversation(name: string, userId: number){
        const isExist = await this.conversationRepository.findOne({name});
        if (isExist) {
            return new GraphQLError('Conversation with this name exist.');
        }

        const newConv = new ConversationEntity();
        newConv.date = new Date();
        newConv.name = name;
        newConv.createdBy = userId;
        return await newConv.save();

    }

    async getAllConversation() {
        return await this.conversationRepository.find();
    }
}