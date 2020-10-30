import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ConvoLinkEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    convId: number;
}