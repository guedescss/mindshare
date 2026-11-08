import { Arg, Mutation, Resolver } from "type-graphql";
import { RegisterInput } from "../dtos/input/auth.input";
import { RegisterOutput } from "../dtos/output/auth.output";

@Resolver()
export class AuthResolver {
    @Mutation(() => RegisterOutput)
    async register(
        @Arg('data', () => RegisterInput) data: RegisterInput
    ): Promise<RegisterOutput> {

    }
}