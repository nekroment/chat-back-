import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ConvoLink {
    
    @Field(type => ID)
    id: number;

    @Field()
    userId: number;

    @Field()
    convId: number;
}