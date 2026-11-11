import 'reflect-metadata'
import express from "express"
import { ApolloServer } from "@apollo/server";  
import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@as-integrations/express5";
import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { buildContext } from './graphql/context';
import { IdeaResolver } from './resolvers/idea.resolver';
import { CommentResolver } from './resolvers/comment.resolver';
import { VoteResolver } from './resolvers/vote.resolver';
import cors from "cors";



async function bootstrap(){
    const app = express() 
    app.use(
    cors({
    origin: [
        process.env.FRONT_URL,
        "http://localhost:5173",
        "https://studio.apollographql.com",
    ].filter((origin): origin is string => Boolean(origin)),
    credentials: true,
    })
);

    const schema = await buildSchema({
        resolvers: [AuthResolver, UserResolver, IdeaResolver, CommentResolver, VoteResolver],
        validate: false,
        emitSchemaFile: './schema.graphql'
    })

    const server = new ApolloServer({
        schema
    })

    await server.start()

    app.use( '/graphql', express.json(), expressMiddleware(server, {
        context: buildContext,
    }) 
)

app.listen({
    port: Number(process.env.PORT) || 4000
}, () => {
    console.log(`Servidor iniciado na porta ${Number(process.env.PORT) || 4000}`)
})
}

bootstrap()