import { UserModel } from "@configs";
import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().uSER

class UserRepository {
    
    public async getUsers(){
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

    public async getUserById(id: string){
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

    public async getUserByUsuario(usuario: string){
        return await userClient.findUnique({
            where: {
                usuario,
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

    public async addUser({nome, usuario, senha}: UserModel) {
        await userClient.create({
            data: {
                nome: nome,
                usuario: usuario,
                senha: senha
            }
        })
    }

    public async updUser(id: string, user: UserModel) {
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
    
    public async delUser(id: string){
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