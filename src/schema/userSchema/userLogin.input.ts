import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UserLogin {
    
    @Field()
    email: string;

    @Field()
    password: string;
}