import { z } from "zod";

export const userSchema = z.object({
    id: z.string().optional(),
    nome: z.string({message: "Nome é um campo obrigatório"}),
    usuario: z.string({message: "Usuario é um campo obrigatório"}),
    senha: z.string({message: "Senha é um campo obrigatório"}).base64({message: "Senha deve estar em formato base64"}),
    // role: z.object({
    //     descricao: z.string().optional()
    // }).optional()
})

export type UserModel = z.infer<typeof userSchema>

export const authSchema = z.object({
    usuario: z.string({message: "Usuario é um campo obrigatório"}),
    senha: z.string({message: "Senha é um campo obrigatório"}).base64({message: "Senha deve estar em formato base64"}),
})

export type AuthModel = z.infer<typeof authSchema>