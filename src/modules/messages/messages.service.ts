import { Message } from './../../schema/messageSchema/messages.model';
import { User } from './../../schema/userSchema/user.model';
import { UserEntity } from './../../entity/user.entity';
import { MessageEntity } from './../../entity/message.entity';
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
  ) { }

  async findAll(): Promise<MessageEntity[]> {
    let skip = 0;
    const count = await this.messageRepository.count();
    const isMany = count - 1500;
    if (isMany > 0) {
      skip = isMany;
    }
    return await this.messageRepository.find({ skip: skip, take: 1500 });
  }

  async moreMessages(skip: number, take: number): Promise<MessageEntity[]> {
    return await this.messageRepository.find({ skip, take });

  }

  async createMessage(description: string, id: number): Promise<Message> {
    const newMessage = new MessageEntity();
    newMessage.description = description;
    newMessage.userId = id;
    return await newMessage.save()
  }

  async findUser(id: number): Promise<User> {

    const user: User = await this.userRepository.findOne({ id });
    return user;
  }

}