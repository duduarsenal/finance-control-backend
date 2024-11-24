import { UserModel } from "@configs/zod";
import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().uSER

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
                senha: true
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
                senha: true
            }
        })
    }

    async getUserByUsuario(usuario: string){
        return await userClient.findFirst({
            where: {
                usuario: usuario,
                ativo: 1
            },
            select: {
                id: true,
                nome: true,
                usuario: true,
                senha: true
            }
        })
    }

    async addUser({nome, usuario, senha}: UserModel) {
        await userClient.create({
            data: {
                nome: nome,
                usuario: usuario,
                senha: senha
            }
        })
    }

    async updUser(id: string, user: UserModel) {
        await userClient.update({
            where: {
                id
            },
            data: {
                ...user,
                dt_upd: new Date().toISOString()
            }
        })
    }
    
    async delUser(id: string){
        await userClient.update({
            where: {
                id
            },
            data: {
                ativo: 0,
                dt_del: new Date().toISOString()
            }
        })
    }
}

export { UserRepository }