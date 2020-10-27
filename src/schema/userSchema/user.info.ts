import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserInfo {

    @Field(type => ID)
    id: number;
    
    @Field()
    login: string;

    @Field()
    email: string;


}