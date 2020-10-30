import { MessageEntity } from './message.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ConversationEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: new Date()})
    date: Date;

    @OneToMany(() => MessageEntity, message => message.conversation, {
        onDelete: 'CASCADE'
    })
    messages: MessageEntity[];
}