import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Comment {
    
    @Field(type => ID)
    id: number;

    @Field()
    description: string;

    @Field()
    channel: string;

    @Field()
    userId: string;
}