import { Field, InputType} from "@nestjs/graphql";

@InputType()
export class MessageInput{

    @Field()
    description: string;
}