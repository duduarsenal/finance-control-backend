import { z } from "zod";

export const userSchema = z.object({
    id: z.string().optional(),
    nome: z.string({message: "Nome é um campo obrigatório"}),
    usuario: z.string({message: "Usuario é um campo obrigatório"}),
    senha: z.string({message: "Senha é um campo obrigatório"})
        .base64({message: "Campo senha deve estar em formato base64"}),
})
export type UserModel = z.infer<typeof userSchema>

export const authSchema = z.object({
    usuario: z.string({message: "Usuario é um campo obrigatório"}),
    senha: z.string({message: "Senha é um campo obrigatório"})
        .base64({message: "Campo senha deve estar em formato base64"}),
})
export type AuthModel = z.infer<typeof authSchema>

export const categoriaSchema = z.object({
    id: z.string().optional(),
    descricao: z.string({message: "Descrição é um campo obrigatório"}),
    cor: z.string({message: "Cor é um campo obrigatório"}),
    emoji: z.string({message: "Emoji é um campo obrigatório"})
        .regex(/^\p{Extended_Pictographic}+$/u, "Somente emoji são permitidos no campo emoji")
})
export type CategoriaModel = z.infer<typeof categoriaSchema>

export const fieldSchema = z.object({
    id: z.string().optional(),
    descricao: z.string({message: "Descricao do campo é obrigatório"}),
    tipo: z.string({message: "Tipo do campo é obrigatório"}),
    categoria: z.object({
        id: z.string({message: "ID da categoria é um campo obrigatório"}),
        descricao: z.string().optional(),
        cor: z.string().optional(),
        emoji: z.string().optional()
    }, {message: "Categoria do campo é obrigatório"}),
    parcelas: z.array(z.object({
        id: z.string().optional(),
        data: z.string({message: "Data da parcela é um campo obrigatório"}).date("Data da parcela invalida"),
        parcela: z.number().int("N° da parcela deve ser um numero inteiro").min(1, "N° da Parcela deve ser no minimo de 1"),
        valor: z.number().min(0.01, "Valor da Parcela deve ser no minimo de R$0.01")
    }), {message: "Lista de parcelas é um campo obrigatório"}),
    total: z.number({message: "Total é campo do tipo numero obrigatório"}).min(0.01, "Total do campo deve ser no minimo de R$0.01")
})
export type FieldModel = z.infer<typeof fieldSchema>

export const parcelaSchema = z.object({
    id: z.string().optional(),
    data: z.string({message: "Data da parcela é um campo obrigatório"}).date("Data da parcela invalida"),
    parcela: z.number().int("N° da parcela deve ser um numero inteiro").min(1, "N° da Parcela deve ser no minimo de 1"),
    valor: z.number().min(0.01, "Valor da Parcela deve ser no minimo de R$0.01")
})
export type ParcelaModel = z.infer<typeof parcelaSchema>