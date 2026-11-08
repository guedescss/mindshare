import { Field, InputType } from "type-graphql"

// apos input type entende que o bloco é um tipo de input
@InputType()
export class RegisterInput {
    // field faz com que o campo seja exposto no schema graphql 
    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => String)
    password!: string
}