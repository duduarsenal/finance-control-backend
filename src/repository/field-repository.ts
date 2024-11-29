import { FieldModel, ParcelaModel } from "@configs/zod"
import { PrismaClient } from "@prisma/client"

const fieldClient = new PrismaClient().field
const userClient = new PrismaClient().user
const parcelaClient = new PrismaClient().parcela

export class FieldRepository{

    async getFieldById(fieldId: string){
        return await fieldClient.findUnique({
            where: {
                id: fieldId
            }
        })
    }

    async getFieldsByUser(usuario: string){
        return await fieldClient.findMany({
            where: {
                user: {
                    usuario
                }
            },
            select: {
                id: true,
                descricao: true,
                tipo: true,
                total: true,
                parcelas: {
                    select: {
                        id: true,
                        data: true,
                        parcela: true,
                        valor: true
                    }
                },
                categoria: {
                    select: {
                        id: true,
                        descricao: true,
                        cor: true,
                        emoji: true
                    }
                }
            }
        })
    }

    async getUserByIdField(fieldId: string){
        return await fieldClient.findUnique({
            where: {
                id: fieldId
            }
        })
    }

    async getParcelaById(parcelaId: string){
        return await parcelaClient.findUnique({
            where: {
                id: parcelaId
            }
        })
    }

    async addField(field: FieldModel, usuario: string){
        const user = await userClient.findUnique({
            where: {
                usuario
            }
        })


        return await fieldClient.create({
            data: {
                descricao: field.descricao,
                tipo: field.tipo,
                total: field.total,
                categoria_id: field.categoria.id,
                user_id: user?.id as string,
                parcelas: {
                    createMany: {
                        data: field.parcelas.map(({data, valor, parcela}) => {
                            return ({
                                data,
                                valor,
                                parcela
                            })
                        })
                    }
                }
            }
        })
    }

    async updField(field: FieldModel){
        return await fieldClient.update({
            where: {
                id: field.id
            },
            data: {
                descricao: field.descricao,
                tipo: field.tipo,
                total: field.total,
                categoria_id: field.categoria.id
            }
        })
    }

    async updParcelaById(parcela: ParcelaModel){
        return await parcelaClient.update({
            where: {
                id: parcela.id
            },
            data: {
                data: parcela.data,
                parcela: parcela.parcela,
                valor: parcela.valor
            }
        })
    }

    async delParcelasByIdField(fieldId: string){
        return await parcelaClient.deleteMany({
            where: {
                field_id: fieldId
            }
        })
    }

    async addParcelasByIdField(parcelas: ParcelaModel[], fieldId: string){
        return await parcelaClient.createMany({
            data: parcelas.map((parcela: ParcelaModel) => {
                return ({
                    data: parcela.data,
                    valor: parcela.valor,
                    parcela: parcela.parcela,
                    field_id: fieldId
                })
            })
        })
    }

    async delField(fieldId: string){
        return await fieldClient.delete({
            where: {
                id: fieldId
            }
        })
    }
    
}