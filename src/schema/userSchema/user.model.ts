import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {

    @Field(type => ID)
    id: number;
    
    @Field()
    login: string;

    @Field()
    email: string;

    @Field({
        nullable: true
    })
    avatar: string;


}