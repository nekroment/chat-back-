import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Typing{

    @Field({nullable: true})
    userId: number;

    @Field({nullable: true})
    convId: number;

    @Field({nullable: true})
    date: Date;

}