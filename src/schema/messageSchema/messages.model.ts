import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Message{
    
    @Field(type => ID)
    id: number;

    @Field()
    description: string;

    @Field()
    userId: number;
}