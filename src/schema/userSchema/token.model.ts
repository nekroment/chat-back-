import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Token {

    @Field()
    token: string;

}