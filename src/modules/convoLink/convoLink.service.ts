import { ConvoLinkEntity } from './../../entity/convoLink.entity';
import { UserEntity } from './../../entity/user.entity';
import { ConversationEntity } from './../../entity/conversation.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';


@Injectable()
export class ConvoLinkService {
    constructor(
        @InjectRepository(ConversationEntity)
        private conversationRepository: Repository<ConversationEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(ConvoLinkEntity)
        private convoLinkRepository: Repository<ConvoLinkEntity>
    ) {}
}