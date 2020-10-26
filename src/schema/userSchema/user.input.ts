import { Field, InputType} from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class UserInput {
    @Field()
    login: string;
    
    @Field()
    email: string;

    @Field()
    password: string;
}