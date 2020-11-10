import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Message{
    
    @Field(type => ID)
    id: number;

    @Field()
    description: string;

    @Field(type => Int)
    userId: number;

    @Field(type => Int)
    convId: number;

    @Field()
    date: Date;
}