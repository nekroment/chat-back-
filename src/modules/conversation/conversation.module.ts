import { UserEntity } from './../../entity/user.entity';
import { UserService } from './../user/user.service';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { ConversationEntity } from './../../entity/conversation.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([ConversationEntity, UserEntity])],
    controllers: [],
    providers: [ConversationService, ConversationResolver, UserService]
})
export class ConversationModule {}
