import { ConversationEntity } from './conversation.entity';
import { UserEntity } from './user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MessageEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    userId: number;

    @Column({default: 0})
    convId: number;

    @Column({default: new Date()})
    date: Date;

    @ManyToOne(() => UserEntity, user => user.messages, {
        onDelete: 'CASCADE'
    })
    user: UserEntity;

    @ManyToOne(() => ConversationEntity, conversation => conversation.messages, {
        onDelete: 'CASCADE'
    })
    conversation: ConversationEntity;
}