import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Conversation {
    
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    date: Date;
}