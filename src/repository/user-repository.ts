import { UserModel } from "@configs/zod";
import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().user
const roleClient = new PrismaClient().role

class UserRepository {
    
    async getUsers(){
        return await userClient.findMany({
            where: {
                ativo: 1
            },
            select: {
                id: true,
                nome: true,
                usuario: true,
                senha: true,
                role: {
                    select: {
                        descricao: true
                    }
                }
            }
        })
    }

    async getUserById(id: string){
        return await userClient.findUnique({
            where: {
                id,
                ativo: 1
            },
            select: {
                id: true,
                nome: true,
                usuario: true,
                senha: true,
                role: {
                    select: {
                        descricao: true
                    }
                }
            }
        })
    }

    async getUserByUsuario(usuario: string){
        return await userClient.findUnique({
            where: {
                usuario,
                ativo: 1
            },
            select: {
                id: true,
                nome: true,
                usuario: true,
                senha: true,
                role: {
                    select: {
                        descricao: true
                    }
                }
            }
        })
    }

    async addUser({nome, usuario, senha}: UserModel) {
        const roleDescricao = "user"; //Role default de todos os usuarios do sistema
        const role = await roleClient.findUnique({
            where: {
                descricao: roleDescricao
            }
        })

        await userClient.create({
            data: {
                nome: nome,
                usuario: usuario,
                senha: senha,
                role: role?.id
                    ? { connect: { id: role.id } } 
                    : { create: { descricao: roleDescricao } }
            }
        })
    }

    async updUser(id: string, user: UserModel) {
        await userClient.update({
            where: {
                id,
                ativo: 1
            },
            data: {
                nome: user.nome,
                senha: user.senha,
                dt_upd: new Date().toISOString()
            }
        })
    }
    
    async delUser(id: string){
        await userClient.update({
            where: {
                id,
                ativo: 1
            },
            data: {
                ativo: 0,
                dt_del: new Date().toISOString()
            }
        })
    }
}

export { UserRepository }