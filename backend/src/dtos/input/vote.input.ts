import { Field, InputType } from "type-graphql";

@InputType()
export class CreateVoteInput{
    @Field(() => String)
    content!: string

}