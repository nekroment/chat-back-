import { User } from 'src/schema/userSchema/user.model';
import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Typing{

    @Field()
    user: User

    @Field()
    convId: number;

    @Field()
    date: Date;

}