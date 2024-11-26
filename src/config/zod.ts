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
    data: z.date({message: "Data é um campo obrigatório"}),
    descricao: z.string({message: "Descricao é um campo obrigatório"}),
    tipo: z.string({message: "Tipo é um campo obrigatório"}),
    categoria: z.object({
        id: z.string({message: "ID da categoria é um campo obrigatório"}),
        descricao: z.string().optional(),
        cor: z.string().optional(),
        emoji: z.string().optional()
    }),
    parcelaTotal: z.number({message: "Parcela Total é um campo obrigatório"}).min(1, "Parcela Total deve ser no minimo de 1"),
    parcelaAtual: z.number({message: "Parcela Atual é um campo obrigatório"}).min(1, "Parcela Atual deve ser no minimo de 1"),
    valor: z.number({message: "Valor é um campo obrigatório"}).min(0.01, "Valor deve ser no minimo de R$0.01")
})
export type FieldModel = z.infer<typeof fieldSchema>