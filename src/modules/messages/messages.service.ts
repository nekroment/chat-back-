import { ConversationEntity } from './../../entity/conversation.entity';
import { User } from './../../schema/userSchema/user.model';
import { UserEntity } from './../../entity/user.entity';
import { MessageEntity } from './../../entity/message.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from 'typeorm';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader'



@Injectable()
export class MessagesService extends OrderedNestDataLoader<User['id'], User> {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>
  ) {
    super();
   }

   protected getOptions = () => ({
     query: (keys: Array<User['id']>) => {
       return this.findUser(keys)
     }
   })

   async findUser(keys: number[]) {

     let neededUsers = [];
     for(let key of keys) {
       const user = await this.userRepository.findOne({id: key});
       neededUsers.push(user);
     }
     return neededUsers;
   }

  async convExist(convId: number) {

    let currentConv;

    if (!convId) {
      return 0;
    }
    const convExist = await this.conversationRepository.findOne({id: convId});
    if (!convExist) {
      currentConv = 0;
    } else {
      currentConv = convId;
    }
    return currentConv;
  }

  async findAll(convId: number): Promise<MessageEntity[]> {

    let skip = 0;
    const currentConv = await this.convExist(convId);

    const count = await this.messageRepository.count({convId: currentConv});
    const isMany = count - 1500;
    if (isMany > 0) {
      skip = isMany;
    }
    return await this.messageRepository.find({where: {convId: currentConv}, skip: skip, take: 1500 });
  }

  async moreMessages(skip: number, take: number, convId: number): Promise<MessageEntity[]> {
    const currentConv = await this.convExist(convId);
    return await this.messageRepository.find({ where: {convId: currentConv},skip, take });

  }

  async createMessage(description: string, id: number, convId: number) {

    const currentConv = await this.convExist(convId);

    const user = await this.userRepository.findOne({id});
    const newMessage = new MessageEntity();
    newMessage.description = description;
    newMessage.userId = id;
    newMessage.date = new Date();
    newMessage.convId = currentConv;
    newMessage.user = user;
    return await newMessage.save();
  }

  async missingMessages (date: Date) {
    return await this.messageRepository.find({where: {date: MoreThan(date)}})
  }

}