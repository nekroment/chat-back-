import { User } from './user.model';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserInfo {

    @Field(type => User)
    user: User;


}