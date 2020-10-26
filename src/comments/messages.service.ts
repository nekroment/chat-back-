import { MessageInput } from './../schema/messageSchema/messages.input';
import { UserEntity } from './../entity/user.entity';
import { Message } from './../schema/messageSchema/messages.model';
import { MessageEntity } from './../entity/message.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';



@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepository: Repository<MessageEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<MessageEntity[]> {
        return await this,this.messageRepository.find();
      }
    
      async createMessage(message: MessageInput, id: number): Promise<Message> {
        const newMessage = new MessageEntity();
        newMessage.description = message.description;
        newMessage.userId = id;
        return await newMessage.save()
      }

      async findUser(id: number) {
        return await this.userRepository.findOne({id});
      }

}