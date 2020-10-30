import { MessageEntity } from './message.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        nullable: true,
        default: null
    })
    avatar: string;

    @OneToMany(() => MessageEntity, message => message.user)
    messages: MessageEntity[];
}