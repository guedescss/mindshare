import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { IdeaModel } from "./idea.model";

@ObjectType()
export class CommentModel {

    @Field(() => ID)
    id!: string

    @Field(() => ID)
    content!: string

    @Field(() => String)
    authorId!: String

    @Field(() => String)
    ideaId!: String

    @Field(() => UserModel, { nullable: true })
    author?: UserModel

    @Field(() => IdeaModel, { nullable: true })
    Idea?: IdeaModel

    @Field(() => GraphQLISODateTime)
    createdAt!: Date
    
    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
    

}