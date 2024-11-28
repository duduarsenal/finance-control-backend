import { PrismaClient } from "@prisma/client"

const fieldClient = new PrismaClient().field

export class FieldRepository{
    async getFieldsByUser(usuario: string){
        return await fieldClient.findMany({
            where: {
                user: {
                    usuario
                }
            }
        })
    }
}