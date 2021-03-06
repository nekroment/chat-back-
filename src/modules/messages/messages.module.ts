import { ConversationEntity } from './../../entity/conversation.entity';
import { UserEntity } from './../../entity/user.entity';
import { MessageEntity } from './../../entity/message.entity';
import { MessagesService } from './messages.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';


@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity, ConversationEntity]), ],
    controllers: [],
    providers: [MessagesService, MessagesResolver, UserService],
  })
  export class MessagesModule {}
  