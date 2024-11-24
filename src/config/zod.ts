import { z } from "zod";

export const userSchema = z.object({
    id: z.string().optional(),
    nome: z.string({message: "Nome é um campo obrigatório"}),
    usuario: z.string({message: "Usuario é um campo obrigatório"}),
    senha: z.string({message: "Senha é um campo obrigatório"}).base64(),
});

export type User = z.infer<typeof userSchema>;