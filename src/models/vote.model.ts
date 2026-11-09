import { Field, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { IdeaModel } from "./idea.model";

@ObjectType()
export class VoteModel {

    @Field(() => ID)
    id!: string

    @Field(() => String)
    IdeaId!: String

    @Field(() => UserModel)
    UserId!: UserModel

    @Field(() => IdeaModel)
    Idea!: IdeaModel

}