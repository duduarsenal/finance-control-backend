import { CategoriaModel } from "@configs/zod";
import { PrismaClient } from "@prisma/client";

const categoriaClient = new PrismaClient().categoria

export class CategoriaRepository{

    async getCategoriasByUser(usuario: string){
        return await categoriaClient.findMany({
            where: {
                user: {
                    usuario
                }
            }
        })
    }

    async getCategoriaById(id: string){
        return await categoriaClient.findUnique({
            where: {
                id
            }
        })
    }

    async getCategoriaByDescricaoUser(descricao: string, usuario: string){
        return await categoriaClient.findFirst({
            where: {
                descricao,
                user: {
                    usuario
                }
            }
        })
    }

    async addCategoria(categoria: CategoriaModel, usuario: string){
        return await categoriaClient.create({
            data: {
                descricao: categoria.descricao,
                cor: categoria.cor,
                emoji: categoria.emoji,
                user: {
                    connect: {
                        usuario
                    }
                }
            }
        })
    }

    async updCategoria(id: string, categoria: CategoriaModel) {
        return await categoriaClient.update({
            data: {
                descricao: categoria.descricao,
                cor: categoria.cor,
                emoji: categoria.emoji
            },
            where: {
                id
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