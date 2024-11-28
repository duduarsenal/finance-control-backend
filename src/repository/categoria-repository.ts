import { CategoriaModel } from "@configs/zod";
import { PrismaClient } from "@prisma/client";

const categoriaClient = new PrismaClient().categoria
const userClient = new PrismaClient().user

export class CategoriaRepository{
    async getCategorias(){
        return await categoriaClient.findMany()
    }

    async getCategoriaById(id: string){
        return await categoriaClient.findFirst({
            where: {
                id
            }
        })
    }

    async getCategoriaByDescricaoUser(descricao: string, user_id: string){
        return await categoriaClient.findFirst({
            where: {
                descricao,
                user_id
            }
        })
    }

    async addCategoria(categoria: CategoriaModel, username: string){
        const user = await userClient.findFirst({
            where: {
                usuario: username
            }
        })

        return await categoriaClient.create({
            data: {
                descricao: categoria.descricao,
                cor: categoria.cor,
                emoji: categoria.emoji,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
    }

    async delCategoria(id: string){
        return await categoriaClient.delete({
            where: {
                id
            }
        })
    }
}