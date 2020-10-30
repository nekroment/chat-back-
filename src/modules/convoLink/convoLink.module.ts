import { UserService } from './../user/user.service';
import { ConvoLinkEntity } from './../../entity/convoLink.entity';
import { ConvoLinkResolver } from './convoLink.resolver';
import { ConvoLinkService } from './convoLink.service';
import { UserEntity } from './../../entity/user.entity';
import { ConversationEntity } from './../../entity/conversation.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([ConversationEntity, UserEntity, ConvoLinkEntity])],
    controllers: [],
    providers: [ConvoLinkService, ConvoLinkResolver, UserService]
})
export class ConvoLinkModule {}
