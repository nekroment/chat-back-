import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MessageEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    userId: number;

    @Column({default: new Date()})
    date: Date;
}