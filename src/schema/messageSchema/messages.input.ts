import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class MessageInput{

    @Field()
    description: string;
}