import { UserModel, userSchema } from "@configs";
import { HttpStatusCode } from "@enums";
import { UserRepository } from "@repositorys";
import { Types } from "mongoose";
import { ZodError } from "zod";

const _userRepository = new UserRepository()

export class UserBusiness{
    public async canAddUser({id, nome, senha, usuario}: UserModel): Promise<{status: HttpStatusCode, message: string}>{
        try {
            userSchema.parse({id, nome, senha, usuario})
            if(id)return ({status: HttpStatusCode.BadRequest, message: "id-preenchido"})

            const userByUsuario = await _userRepository.getUserByUsuario(usuario)
            if(userByUsuario) return ({status: HttpStatusCode.BadRequest, message: "usuario-ja-existe"})
            if(!nome || !senha) return ({status: HttpStatusCode.BadRequest, message: "campos-vazios"})
            
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) {
                console.error({message: "type-error", error: error.issues.flatMap((e) => e.message).join(", ")})
                return ({status: HttpStatusCode.BadRequest, message: error.issues.flatMap((e) => e.message).join(", ")})
            }

            console.error({message: "bussines-internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canUpdUser(id: string, {nome, senha, usuario}: UserModel): Promise<{status: HttpStatusCode, message: string}> {
        try {
            userSchema.parse({nome, senha, usuario})
            if(!id) return ({status: HttpStatusCode.BadRequest, message: "id-nao-preenchido"})

            const user = await _userRepository.getUserById(id)
            if(!user) return ({status: HttpStatusCode.BadRequest, message: "usuario-nao-existe"})
            if(user.usuario !== usuario) return ({status: HttpStatusCode.BadRequest, message: "username-alterado"})
            if(!usuario || !senha) return ({status: HttpStatusCode.BadRequest, message: "campos-vazios"})
             
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) {
                console.error({message: "type-error", error: error.issues.flatMap((e) => e.message).join(", ")})
                return ({status: HttpStatusCode.BadRequest, message: error.issues.flatMap((e) => e.message).join(", ")})
            }

            console.error({message: "bussines-internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canDelUser(id: string): Promise<{status: HttpStatusCode, message: string}>{
        try {
            if(!id) return ({status: HttpStatusCode.BadRequest, message: "id-nao-preenchido"})
            if(!Types.ObjectId.isValid(id)) return ({status: HttpStatusCode.BadRequest, message: "id-formato-invalido"})

            const user = await _userRepository.getUserById(id)
            if(!user) return ({status: HttpStatusCode.BadRequest, message: "usuario-nao-existe"})

            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            console.error({message: "bussines-internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }
}