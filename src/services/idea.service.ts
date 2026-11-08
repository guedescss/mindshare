import { prismaClient } from "../../prisma/prisma";
import { CreateIdeaInput } from "../dtos/input/idea.input";


export class IdeaService {
    async createdIdea(data: CreateIdeaInput, authorId: string){
        return prismaClient.idea.create({
            data: {
                title: data.title,
                description: data.description,
                authorId: authorId
            },
        })
    }
}